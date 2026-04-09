const passport = require("passport");
const { OIDCStrategy } = require("passport-azure-ad");
const User = require("../models/user");

function configurePassport() {
  const clientID = process.env.MICROSOFT_CLIENT_ID;
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;
  const tenantId = process.env.MICROSOFT_TENANT_ID || "common";
  const redirectUrl = process.env.MICROSOFT_REDIRECT_URL;

  if (!clientID || !clientSecret || !redirectUrl) {
    return false;
  }

  passport.use(
    new OIDCStrategy(
      {
        identityMetadata: `https://login.microsoftonline.com/${tenantId}/v2.0/.well-known/openid-configuration`,
        clientID,
        clientSecret,
        responseType: "code",
        responseMode: "form_post",
        redirectUrl,
        allowHttpForRedirectUrl: process.env.NODE_ENV !== "production",
        validateIssuer: false,
        passReqToCallback: false,
        scope: ["profile", "email", "openid"]
      },
      async (iss, sub, profile, accessToken, refreshToken, done) => {
        try {
          const microsoftId = profile && profile.oid;
          const email = profile && profile._json && profile._json.preferred_username;
          const name = (profile && profile.displayName) || "Microsoft User";

          if (!microsoftId) return done(new Error("Microsoft profile missing oid"));
          if (!email) return done(new Error("Microsoft profile missing preferred_username"));

          let user = await User.findOne({ microsoftId });

          if (!user) {
            user = await User.create({
              name,
              email: email.toLowerCase(),
              microsoftId
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user || false);
    } catch (err) {
      done(err);
    }
  });

  return true;
}

module.exports = configurePassport;


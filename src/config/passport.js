const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

function configurePassport() {
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const callbackURL = process.env.GOOGLE_CALLBACK_URL;

  console.log(
    "[auth] Google OAuth configured:",
    Boolean(clientID && clientSecret && callbackURL)
  );

  if (!clientID || !clientSecret || !callbackURL) {
    console.error("[auth] Missing Google OAuth env variables");
    return false;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // 🔍 Extract safe values
          const googleId = profile.id;
          const name = profile.displayName || "No Name";
          const email =
            profile.emails && profile.emails.length > 0
              ? profile.emails[0].value
              : null;

          if (!email) {
            return done(new Error("No email found in Google profile"), null);
          }

          // 🔍 Check existing user
          let user = await User.findOne({ googleId });

          if (!user) {
            // 🆕 Create new user
            user = await User.create({
              googleId,
              name,
              email
            });

            console.log("[auth] New user created:", email);
          } else {
            console.log("[auth] Existing user logged in:", email);
          }

          return done(null, user);
        } catch (error) {
          console.error("[auth] Error in Google strategy:", error);
          return done(error, null);
        }
      }
    )
  );

  // 🔐 Session handling
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user || false);
    } catch (err) {
      done(err, null);
    }
  });

  return true;
}

module.exports = configurePassport;
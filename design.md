# Tracey-CEP | Design & Frontend Architecture

This document serves as a comprehensive guide for generating frontend components and pages for the **Tracey-CEP** (Lost and Found System). Use this structure to maintain consistency across the application.

---

## 🎨 Design System (Aesthetics)
**Theme**: Modern, Premium Dark Mode with Glassmorphism.
- **Background**: Deep Slate (`#0f172a`) with subtle radial gradients (Blue/Emerald).
- **Cards**: Translucent backgrounds (`rgba(30, 41, 59, 0.6)`) with high-blur backdrop filters and 1px borders.
- **Accent Colors**:
  - Primary: Blue (`#3b82f6`)
  - Success: Emerald (`#10b981`)
  - Danger: Red (`#ef4444`)
  - Text: High-contrast white (`#f8fafc`) and muted slate (`#94a3b8`).
- **Typography**: 'Inter', sans-serif (Clean, professional).
- **Interactions**: Smooth hover transitions, scale-up effects on cards, and bouncy toast notifications.

---

## 🏗️ Website Structure

### 1. **Index / Landing Page (`index.html`)**
- **Hero Section**: Powerful call-to-action (CTA) with a search bar ("Search for your lost item...").
- **Quick Actions**: Two large cards/buttons: "I Lost Something" (leads to Report) and "I Found Something" (leads to Report).
- **Stats Counter**: (Optional) Total items found, successfully returned.
- **Recent Items Preview**: Horizontal scroll or grid of the latest approved lost/found items.

### 2. **Item Feed Page (`items.html`)**
- **Filters**: Toggle between "Lost" and "Found". Category dropdowns (Electronics, Wallet, Keys, etc.).
- **Search Bar**: Real-time filtering.
- **Item Cards**:
  - Image preview (top).
  - Badge for status (Lost/Found).
  - Title, Location, and Date.
  - "View Details" button.

### 3. **Item Details Page (`item-details.html`)**
- **Image Gallery**: Large view of the item image.
- **Details Section**: Comprehensive description, category, location found/lost, and user contact info (if public).
- **Action Button**: 
  - If item is **Lost**: "I found this item" button.
  - If item is **Found**: "This is mine" button.
- **Claim Modal**: Triggers when clicking action buttons. Requires a text description ("Proof") and image upload (Proof of ownership).

### 4. **Report Item Page (`report.html`)**
- **Multi-step Form**:
  - Step 1: Basic Info (Title, Category, Type: Lost/Found).
  - Step 2: Location & Date.
  - Step 3: Description & Image Upload (Multer backend support).
- **Success State**: Redirect to a confirmation page or show a "Submission Pending Approval" toast.

### 5. **Admin Dashboard (`admin.html`)** - [DONE]
- Existing panel for reviewing submitted items and claims.
- Functional tabs for moderation.

### 6. **Authentication Page (`login.html`)**
- Minimalist design.
- "Sign in with Google" button (integrates with `/auth/google` backend).

---

## 🔌 Integration Requirements (Backend Points)
When building components, ensure they interact with these existing endpoints:

- **Base URL**: `http://localhost:5000/api`
- **Items**: 
  - `POST /items` -> Save new item.
  - `GET /items?category=...&type=...` -> List items.
- **Claims**:
  - `POST /claims` -> Submit proof for an item. Use `FormData` for image upload.
- **Images**: Serve images via `http://localhost:5000/uploads/[filename]`.

---

## 🛠️ Global Components Checklist
- [ ] **Navbar**: Sticky, translucent with "Login" (if unauthenticated) or "Profile" icon.
- [ ] **Footer**: Simple links (Terms, FAQ, Contact).
- [ ] **Item Card**: Reusable component used in Home and Feed.
- [ ] **Toast Notification System**: Ready-to-use JS function to show Success/Error messages.
- [ ] **Loading Spinner**: Branded spinner for data fetching states.

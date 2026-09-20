# 🚀 E-Commerce

A modern, high-performance, and scalable web application built as part of a technical hiring assessment, highlighting best practices in frontend development, state management, and professional API integration.

---

## 🛠️ Getting Started

Follow these steps to set up and run the project locally on your machine:

### Prerequisites

* **Node.js** (v18 or higher recommended)
* **npm**

### Installation & Execution

1. **Install Dependencies:**
```bash
npm install

```


2. **Run Development Server:**
```bash
npm run dev

```


3. Open your browser and navigate to `http://localhost:5173` (or the local URL provided in your terminal).

---

## 📐 Architecture, Design Decisions & Assumptions

* **Scalable Architecture:** Structured with clear separation of concerns (Components, Pages, Hooks, Services, and Utilities) to ensure long-term maintainability and seamless future expansion.
* **Authentication & Token Lifecycle:**
* Persistent authentication utilizing `accessToken` and `refreshToken` stored in `localStorage`.
* Configured **Axios Interceptors** to detect `401 Unauthorized` errors triggered by expired access tokens, issue a refresh token request, update credentials, and automatically retry failed API requests without disrupting the user flow.
* Session persists until the refresh token expires or the user explicitly logs out.


* **Route Protection & Client-Side Guarding:**
* Protected routes (`cart`, `users`, and `user-details`) are guarded at the application router level.
* Enforced UI-level restrictions preventing unauthenticated users from adding items to the cart (necessary because the backend API endpoints do not mandate a `Bearer` token).


* **Handling Backend API Limitations:**
* **Search vs. Category Filter Conflict:** Since the API does not support concurrent filtering by category and text search, selecting a category automatically clears the search query and vice versa to prevent invalid API requests.


* **Performance Optimization:**
* **Virtualization:** Applied list virtualization on the Users table to efficiently render large datasets while maintaining high frame rates (FPS) and smooth rendering.
* **Debounced Inputs:** Implemented debouncing across all search controls to reduce unnecessary network requests.



---

## ✨ Features & Capabilities

* **Homepage:** Personalizes product recommendations based on selected gender preference (Male / Female).
* **Products Page:** Displays product listings with category filtering, debounced search, and pagination.
* **Product Details Page:** Fully implemented according to project specifications.
* **Users Page:** Virtualized data table with debounced search and pagination support.
* **User Details Page:** Dedicated profile page matching specifications.
* **Internationalization (i18n) & UI Themes:**
* Full **Bilingual Support (Arabic & English)** with native RTL and LTR layout switching.
* Interactive **Dark & Light Theme** modes.


* **Animations:** Micro-interactions and transition animations implemented using **Motion**.
* **SEO & Meta Tags:** Configured meta tags and **OpenGraph** metadata for optimized link previews and social sharing.
* **Lighthouse Scores:** Achieved **95+ scores** across all metrics (Performance, Accessibility, Best Practices, and SEO).

---

## 🤖 AI Tools Disclosure

In line with modern software engineering workflows, Artificial Intelligence (Gemini) was leveraged as a copilot to accelerate development in the following areas:

1. **UI Layout & Design Assistance:** Structural layout concepts and page styling ideas.
2. **Data Mapping & Page Integration:** Formatting, mapping, and cleanly displaying API data schemas across component views.
3. **Authentication Interceptor Logic:** Edge-case handling for the retry mechanism in the Axios Refresh Token Interceptor.
4. **Documentation:** Writing and structuring the `README.md` file.

---

## 📝 Status & Omissions

* ✅ All functional requirements, responsive UI designs, performance goals, and optional enhancements are fully completed.
* ⚠️ **Unit Tests:** Excluded from this assessment release due to time constraints, but the architecture is modularized to support unit and integration testing (e.g., via Vitest or Jest) in future releases.
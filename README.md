# Amd-Slingshot: AI-Powered Retail Shopping Assistant 🚀

Amd-Slingshot is a highly intelligent, interactive retail shopping assistant web application. It leverages AI to learn user behavior, recommend products dynamically, and provide a conversational interface for discovering the perfect items.

## 🌟 Key Features

*   **🧠 AI Chat Assistant:** Powered by Google Gemini, a floating chat widget helps users find products conversationally ("Find me a laptop under $1000", "What goes well with running shoes?").
*   **🎭 Mood-Based Shopping:** Select how you feel (Happy, Relaxed, Energetic, etc.) and let the app suggest matching product vibes.
*   **🛒 Smart Cart Optimizer:** Automatically scans your cart and suggests cheaper, highly-rated alternatives to save you money.
*   **🔮 Predictive Recommendations:** Uses a mock collaborative filtering engine to recommend products based on your past browsing history and current cart items.
*   **🌓 Premium Glassmorphism UI:** Features an incredibly modern, fully responsive design using CSS glassmorphism, animated gradient backgrounds, and 3D hover effects. Includes Dark/Light mode toggle.
*   **❤️ Intelligent Wishlist & Stock Tracking:** (Mock tracking) Automatically alerts when stock is low or items go on discount.

## 🏗️ Technology Stack

*   **Frontend:** Vite, React 18, React Router DOM
*   **Backend:** Node.js, Express
*   **Database & Auth:** Firebase (Prepared for Firestore & Auth, currently running in offline/mock mode for immediate demoing)
*   **AI Integration:** Google Generative AI (Gemini) SDK
*   **Styling:** Pure CSS with CSS Modules, Custom Variables, Keyframe Animations

## 🚦 How to Run the Project

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Configure Environment Variables (Optional but recommended):**
    Create a `.env` file in the root directory and add your Google Gemini API key to enable the real AI chat.
    ```env
    VITE_GEMINI_API_KEY="your_actual_gemini_api_key_here"
    ```
    *Note: If no API key is provided, the chat assistant uses fallback mock responses to ensure the demo still works seamlessly.*

3.  **Start the Development Server:**
    We use `concurrently` to run both the Vite frontend and Express backend simultaneously.
    ```bash
    npm run dev
    ```

4.  **View the App:**
    Open your browser and navigate to `http://localhost:5173`. The backend API runs on `http://localhost:5000`.

## 📁 Project Structure

```
Amd-Slingshot/
├── server/
│   ├── data/
│   │   └── products.json     # 50+ curated mock products
│   ├── index.js              # Express backend API
│   └── recommendation.js     # Mock recommendation engine logic
├── src/
│   ├── components/           # Reusable UI components (Navbar, Cards, etc.)
│   ├── context/              # React Context providers (Auth, Cart, Theme, etc.)
│   ├── firebase/             # Firebase configuration
│   ├── pages/                # Main application views
│   ├── App.jsx               # Main router and provider wrapper
│   ├── index.css             # Global design system & tokens
│   └── main.jsx              # React entry point
├── package.json
└── vite.config.js            # Vite configuration with API proxy
```

## 🔐 Firebase Configuration

The app is currently configured to run smoothly in a "Guest Mode" using extensive local storage and mock product data. To connect real authentication and a live database:
1. Go to `src/firebase/config.js`
2. Replace the placeholder `firebaseConfig` object with your project credentials from the Firebase Console.

//ok it is at top of all
# FarmerEats 🌾
The future of food is direct.

FarmerEats is a decentralized, high-transparency marketplace designed to disrupt the traditional agricultural supply chain. We eliminate the middlemen, the high retail markups, and the mystery of food origin by connecting local producers directly to the consumer's table.

## Core Features
- **Radical Transparency** — Track every product's journey from soil to shelf.
- **Direct Impact** — 100% of the value (minus minimal logistics) goes directly to the farmer.
- **AI-Driven Logistics** — Decentralized, rapid delivery that bypasses supply chain bottlenecks.
- **Premium User Experience** — A seamless, fully responsive React interface designed for the modern ethical consumer.

## Tech Stack
- **Frontend**: React 18 (Hooks, Context API)
- **Routing**: React Router 6
- **Styling**: Vanilla CSS (High-premium design system)
- **API**: Sooprs v2 (with seamless Demo Mode fallback)

## Mobile & Desktop
Fully responsive design with optimized workflows for both consumers and producers.
- **Mobile**: Native-feel bottom tab bar and gesture-based navigation.
- **Desktop**: Power-user sidebar and expanded product grids.

## Setup & Execution
1. Clone the repository.
2. `npm install`
3. `npm start`
The platform will automatically launch at `http://localhost:3000`.

## Folder Structure
```
src/
├── api/
│   └── index.js          # API service layer
├── components/
│   └── UI.jsx            # Reusable components (Button, Input, etc.)
├── screens/
│   ├── Splash.jsx
│   ├── Onboarding.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── AuthScreens.jsx   # ForgotPassword, VerifyOTP, ResetPassword
│   └── Home.jsx
├── App.js                # Router
├── index.js              # Entry point
└── index.css             # Global styles & CSS variables
```

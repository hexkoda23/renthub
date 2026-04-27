# RentHub – Find Your Perfect Home in Nigeria

RentHub is a modern, AI-powered real estate platform dedicated to the Nigerian market. It helps users discover verified listings and uses an AI Neighbourhood Advisor to recommend the best areas based on budget, lifestyle, and safety.

## 🚀 Key Features
- **Verified Property Listings**: Detailed listings with location, price, and amenities.
- **AI Neighbourhood Advisor**: Intelligent recommendations for Lagos, Abuja, Port Harcourt, and more.
- **Interactive Maps**: Google Maps integration for exact property and area visualization.
- **Landlord & Agent Dashboard**: Easy property management and verification tracking.
- **Responsive Design**: Seamless experience across mobile and desktop.

## 🛠 Tech Stack
| Tier | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, TypeScript, Tailwind CSS, Zustand, React Query |
| **Backend** | Node.js, Express, TypeScript, Firebase Admin SDK |
| **Database** | Firestore |
| **AI** | OpenAI GPT-4o |
| **Media** | Cloudinary |

## 📦 Project Structure
- `frontend/`: React application.
- `backend/`: Node.js Express API.
- `shared/`: Shared TypeScript interfaces and constant data (states, amenities).

## 🛠 Local Setup

### 1. Clone & Install
```bash
git clone <repo-url>
cd RENTHUB-1
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env` in the root (or create specific ones in `backend/` and `frontend/`) and fill in the required keys.

### 3. Run Development
```bash
npm run dev
```
Starts both frontend (localhost:5173) and backend (localhost:3000).

## 📜 API Overview
- `GET /api/listings`: Search and filter properties.
- `POST /api/ai/chat`: Interact with the AI Advisor.
- `GET /api/neighbourhoods`: Area statistics and scores.

## 📄 License
MIT

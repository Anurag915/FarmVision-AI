# AI Agriculture Decision Support System

## Description
An enterprise-grade AI Agriculture Decision Support System designed to empower farmers and stakeholders with actionable, data-driven insights. Utilizing advanced machine learning models, the system offers precise crop recommendations, future price forecasting, and production volume predictions tailored to specific regions, seasons, and crop types. The platform features a premium, responsive UI for business intelligence and analytics.

## Features
- **Crop Recommendation**: AI-powered suggestions for the most profitable crops based on geographical location (State, District) and season. Provides risk analysis, expected yield, and confidence metrics.
- **Price Forecast**: Predicts future agricultural market prices using historical data and AI models, complete with interactive trend visualizations.
- **Production Forecast**: Forecasts crop yields over multi-year periods based on cultivated area, with comprehensive area charts and growth metrics.
- **Analytics Dashboard**: A centralized business intelligence dashboard aggregating insights, top-performing crops, revenue comparisons, risk distributions, and model confidence metrics.
- **Data Export**: Seamless CSV export functionality for offline data analysis.

## Tech Stack
### Frontend
- **Framework**: React 19, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State & Forms**: React Hook Form
- **Animations**: Framer Motion
- **Visualizations**: Recharts
- **API Client**: Axios

### Backend
- **Language**: Python 3.14+
- **Machine Learning**: Pandas, Scikit-Learn, CatBoost
- **API**: Flask (or FastAPI)

## Deployment Guide

The application is designed to be deployed with the backend on **Render** and the frontend on **Vercel**.

### 1. Backend (Render)
1. Fork or clone this repository to your GitHub account.
2. Go to [Render](https://render.com) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Configure the service:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app` (or appropriate WSGI command for your setup)
5. Deploy the service and copy the generated Render URL (e.g., `https://your-app.onrender.com`).

### 2. Frontend (Vercel)
1. Go to [Vercel](https://vercel.com) and create a new Project.
2. Import the repository and select the `frontend` folder as the Root Directory.
3. Vercel will automatically detect the **Vite** configuration.
4. In the Environment Variables section, add your backend URL:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-app.onrender.com/api` (Replace with your actual Render URL)
5. Click **Deploy**.

## Contributing & Collaboration

We welcome contributions to improve the AI Agriculture Decision Support System! To collaborate on this project, please follow the standard fork-and-pull workflow:

1. **Fork the repository**: Click the "Fork" button at the top right of the repository page to create a copy in your own GitHub account.
2. **Clone your fork locally**:
   ```bash
   git clone https://github.com/your-username/AI-Agriculture-Decision-Support-System.git
   cd AI-Agriculture-Decision-Support-System
   ```
3. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes**: Implement your new feature, UI improvement, or bug fix.
5. **Commit your changes**:
   ```bash
   git commit -m "feat: add amazing new feature"
   ```
6. **Push to your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Submit a Pull Request**: Go to the original repository and click "Compare & pull request". Provide a clear description of the changes you've made.

## License
MIT License

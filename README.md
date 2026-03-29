# FlashCharge - EV Fleet Management Dashboard

A modern, responsive React-based dashboard for managing Electric Vehicle (EV) charging stations. Monitor real-time charger status, optimize grid power distribution, and manage fleet operations with Firebase authentication and Firestore integration.

## 🚀 Features

- **User Authentication**: Secure login/logout with Firebase Authentication
- **Real-time Monitoring**: Live charger status updates with battery levels and connection states
- **Grid Optimization**: AI-powered algorithm to optimize power distribution and prevent overloads
- **Responsive Design**: Mobile-first design that adapts to desktop and mobile views
- **Interactive UI**: Smooth animations with Framer Motion and Material-UI components
- **Toast Notifications**: User feedback for actions and errors
- **Comprehensive Testing**: Unit tests for core optimization logic

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **UI Library**: Material-UI (MUI)
- **Animations**: Framer Motion
- **Backend**: Firebase (Authentication, Firestore)
- **Testing**: Vitest, React Testing Library
- **Styling**: CSS-in-JS with MUI sx prop
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Authentication and Firestore enabled

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Wahid-ul/flashcharge-fleet-management-dashboard.git
   cd flashcharge-fleet-management-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env` (if available) or create `.env` file
   - Add your Firebase configuration:
     ```
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
     ```

4. **Firebase Setup**
   - Create a Firestore collection called `stations` with charger data
   - Example document structure:
     ```json
     {
       "id": "charger1",
       "locationName": "Station A",
       "currentPowerKW": 50,
       "batteryPercent": 80,
       "status": "Charging",
       "lastUpdated": "2024-01-01T00:00:00.000Z"
     }
     ```

## 🚀 Running the Application

### Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 🧪 Testing

The project includes comprehensive unit tests for the grid optimization logic.

### Run Tests
```bash
npm test
```

### Test Coverage
Tests cover:
- Grid optimization algorithm with threshold handling
- Target identification (highest power charger selection)
- Edge cases: single charger, zero power, multiple max values
- Power reduction logic (preventing negative values)

### Test Files
- `src/tests/optimizeLogic.test.js` - Unit tests for optimization logic

## 📱 Responsive Design

- **Mobile (< 600px)**: Single column layout with car image first, then total power, optimize button, then station cards (2 per row)
- **Desktop (≥ 900px)**: Two-column layout with stations on left, controls and car image stacked on right

## 🔄 Grid Optimization Logic

The AI optimization feature:
- Monitors total power consumption (limit: 100kW)
- Identifies the highest-power charger
- Reduces its power by the excess amount
- Prevents power from going below 0kW
- Updates Firestore with new values

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the maintainers.

---

Built with ❤️ using React and Firebase
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

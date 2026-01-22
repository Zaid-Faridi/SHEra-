# SHERa: Your Personal Hormonal Health Ecosystem 🌸✨

SHERa is a sophisticated, AI-driven mobile application designed to empower women in managing **PCOS, PCOD, and Menstrual Health**. By combining medical-grade assessment engines with holistic wellness modules, SHERa transforms raw health data into a proactive, personalized coaching experience.

---

## 🚀 Key Features

### 📅 Intelligent Cycle Calendar
- **Predictive Engine**: Automatically calculates and marks upcoming period and ovulation days for future months.
- **Interactive Monthly Grid**: A premium UI for tracking history and planning ahead with color-coded markers.
- **Visual Cues**: Coral highlights for current status, pink dots for period days, and lavender for ovulation.

### 📈 Dynamic hormone Curve
- **Real-time Visualization**: A bezier-line chart modeling Estrogen and Progesterone fluctuations tailored to your specific cycle length.
- **Phase Insights**: Contextual data on whether you are in the Follicular, Ovulatory, or Luteal phase.

### 📝 29-Question Diagnostic Engine
- **Medical-Grade Assessment**: A comprehensive onboarding flow covering menstrual history, lifestyle, and clinical symptoms.
- **Risk Analysis (0-100)**: Generates a categorized risk level (Low, Medium, High) with personalized medical recommendations.
- **Adolescent Path**: Specialized diagnostic branch for younger users.

### 🧘‍♀️ Yoga & Wellness Module
- **PCOD Yoga Library**: Curated poses (Butterfly, Cobra, Child's Pose) designed specifically for hormonal balance.
- **Interactive Breathing**: Guided 4-4-6 pranayama timer with breath-synced scaling animations.
- **Online Classes**: Access to Live Group Sessions and an On-Demand video library.

### 🤖 SHERa AI Assistant
- **Proactive Health Coach**: A sophisticated chat interface that interprets your cycle data to provide actionable advice.
- **Daily Hormone Hacks**: Phase-synced micro-tips for diet, exercise, and sleep optimization.

### 🍏 Nutritional Vault
- **Insulin-Friendly Recipes**: A library of recipes curated specifically for PCOS management and cycle-syncing.

### 🤝 Community & Doctor Discovery
- **Anonymous Support Hub**: A safe space for peer-to-peer sharing with anonymous posting capabilities.
- **specialist Directory**: Find and book certified PCOS specialists near you with rating-based filtering.

---

## 🏗️ Architecture

SHERa follows a **Modular, Component-Based Architecture** built on the **Expo Router** framework.

- **Navigation Pattern**: Centralized Floating Action Button (FAB) for AI interaction with a symmetrical 4-tab bar (Home, Wellness, Community, Insights).
- **State Management**: Robust use of React Hooks (`useState`, `useEffect`, `useMemo`) combined with `AsyncStorage` for high-performance local data persistence.
- **Logic Layer**: Independent utility engines for:
    - `RiskScoreCalculation`: Algorithmic weightage of clinical symptoms.
    - `HormoneModeling`: Mathematical modeling of hormonal phases.
    - `CyclePrediction`: Date-based arithmetic for menstrual forecasting.

---

## 🛠️ Technology Stack

- **Framework**: [Expo](https://expo.dev/) / [React Native](https://reactnative.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strictly typed for data integrity)
- **Navigation**: `expo-router` (File-based routing)
- **Styling**: Vanilla `StyleSheet` with a custom Design System (Pink/Lavender palette)
- **Charts**: `react-native-chart-kit`
- **Animations**: `react-native-reanimated` & `Animated` API
- **Persistence**: `@react-native-async-storage/async-storage`

---

## 📂 Project Structure

```
SHEra/
├── app/                          # Main app screens and routing
│   ├── _layout.tsx              # Root layout configuration
│   ├── index.tsx                # Home screen
│   ├── ai-chat.tsx              # AI chat interface
│   ├── breathing.tsx            # Breathing exercises
│   ├── doctors.tsx              # Doctors directory
│   ├── nutrition.tsx            # Nutrition tracker
│   ├── yoga-poses.tsx           # Yoga poses guide
│   ├── log.tsx                  # Health logging
│   ├── (onboarding)/            # Onboarding flow
│   │   ├── index.tsx            # Onboarding welcome
│   │   ├── questions.tsx        # Health questions
│   │   └── summary.tsx          # Risk summary
│   └── (tabs)/                  # Bottom tab navigation
│       ├── ai-bot.tsx           # AI chatbot tab
│       ├── community.tsx        # Community tab
│       ├── insights.tsx         # Health insights tab
│       ├── profile.tsx          # User profile tab
│       └── wellness.tsx         # Wellness recommendations tab
├── components/                  # Reusable components
│   ├── CycleCalendar.tsx       # Menstrual cycle calendar
│   ├── Themed.tsx              # Theme-aware components
│   ├── StyledText.tsx          # Styled text components
│   └── useColorScheme.ts       # Color scheme hook
├── constants/                   # App constants
│   ├── Colors.ts               # Color palette
│   ├── Config.ts               # API configuration
│   └── Onboarding.ts           # Onboarding data
├── utils/                       # Utility functions
│   └── RiskCalculator.ts       # Health risk assessment
├── assets/                      # Images and fonts
│   ├── fonts/                  # Custom fonts
│   └── images/                 # App images
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript configuration
└── app.json                    # Expo configuration
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- Expo Go app on your physical device (to test native features)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```

---

## 🛡️ Security & Privacy
- **Local-First**: Sensitive health data is prioritized for local storage.
- **Anonymous Community**: Toggle identities to ensure privacy in the peer support forum.

---

## 💖 Contributing
SHERa is built for women, by women (and allies). If you'd like to contribute to the mission of improving hormonal health, please submit a PR!

---

*Designed with ❤️ for Hormonal Harmony.*

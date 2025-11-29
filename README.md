<div align="center">

# 📦 Inventory Manager

### React Native • Expo • NativeWind

A lightweight, elegant React Native (Expo) application that simulates user registration, product creation, stock adjustments, and transaction history using local state only—designed according to best practices, modular architecture, and clean component structure.

[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://www.nativewind.dev/)

**⏱️ Completed within 3–5 hour time-box**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Setup](#%EF%B8%8F-setup--run) • [Architecture](#-project-architecture)

</div>

---

## 🚀 Tech Stack

<table>
<tr>
<td>

**Core**

- 🎯 Expo SDK 54
- ⚛️ React Native 0.81
- 🪝 React Hooks (`useState`, `useEffect`, `useContext`)
- 📘 TypeScript

</td>
<td>

**Styling & State**

- 🎨 NativeWind (Tailwind CSS)
- 🗂️ Context API
- 💾 Local in-memory state
- 🚫 No backend required

</td>
</tr>
</table>

---

## ✨ Features Implemented

### 👤 **User Management**

```
✓ Register a user (email + full name)
✓ Basic validation (email format, required fields)
✓ Clean form UI with error handling
```

### 📦 **Product Management**

```
✓ Create products (SKU, name, price, initial quantity)
✓ Validation for positive price & non-negative quantity
✓ Auto-generated unique identifiers
```

### 📉 **Stock Management**

```
✓ Increase / decrease product quantity
✓ Prevent negative inventory (with validation)
✓ Track last updated timestamp
✓ Real-time inventory updates
```

### 📊 **Product Status Dashboard**

```
✓ Display all products in a clean list
✓ Show current quantity, SKU, price
✓ Display last update time
✓ Responsive card-based layout
```

### 📝 **Transaction History**

```
✓ Log every change (create/increase/decrease)
✓ Show before/after quantity
✓ Simple pagination system
✓ Chronological ordering
```

---

## 📁 Project Architecture

```
src/
├── 📂 context/
│   └── InventoryContext.tsx    # Central state management & operations
│
├── 📂 hooks/
│   └── useInventory.ts         # Custom hook for inventory access
│
├── 📂 types/
│   └── index.ts                # TypeScript domain models
│
├── 📂 utils/
│   ├── validation.ts           # Form validation helpers
│   └── formatting.ts           # Date/currency formatters
│
├── 📂 components/
│   ├── 📂 layout/
│   │   ├── Card.tsx            # Reusable card wrapper
│   │   └── ScreenContainer.tsx # Screen layout wrapper
│   │
│   ├── 📂 forms/
│   │   ├── Input.tsx           # Custom text input
│   │   └── Button.tsx          # Styled button component
│   │
│   ├── 📂 user/
│   │   └── UserForm.tsx        # User registration form
│   │
│   ├── 📂 product/
│   │   ├── ProductForm.tsx     # Create product form
│   │   ├── StockAdjust.tsx     # Stock management UI
│   │   └── ProductStatus.tsx   # Product list display
│   │
│   └── 📂 history/
│       └── TransactionList.tsx # Paginated transaction history
│
└── App.tsx                     # Root component
```

<div align="center">

### 🏗️ **Architecture Highlights**

| Layer          | Purpose                        | Benefits                                    |
| -------------- | ------------------------------ | ------------------------------------------- |
| **Context**    | Centralized state & operations | Single source of truth, predictable updates |
| **Hooks**      | Clean data access              | Reusable, testable, type-safe               |
| **Types**      | Domain models                  | Type safety, IntelliSense, self-documenting |
| **Utils**      | Pure helper functions          | Easy to test, zero dependencies             |
| **Components** | Modular UI                     | Composable, maintainable, scalable          |

</div>

---

## 🧠 Approach & Trade-offs

### ✅ **What We Did**

<table>
<tr>
<td width="50%">

**🎯 Local State Architecture**

- Modeled with central `InventoryContext`
- Keeps logic cohesive and testable
- No external state libraries needed

</td>
<td width="50%">

**📐 Domain-Driven Design**

- Clear types (`User`, `Product`, `Transaction`)
- Predictable and maintainable logic
- Self-documenting code

</td>
</tr>
<tr>
<td width="50%">

**🎨 Component Strategy**

- Fully componentized with NativeWind
- Consistent, scalable patterns
- Screen → Sections → Forms hierarchy

</td>
<td width="50%">

**✨ User Experience**

- Meaningful form validation
- Structured layout & consistent spacing
- Simple pagination for history

</td>
</tr>
</table>

### 🔮 **With More Time, I Would Add:**

```diff
+ 💾 Persistence (AsyncStorage)
+ ♿ Better accessibility labels (a11y)
+ 🧪 Unit tests for operations & validation
+ ✨ Refined animations & micro-interactions
+ 🔍 Search & filter functionality
+ 📱 Advanced responsive layouts
+ 🌙 Dark mode support
+ 📊 Data visualization & analytics
```

---

## 🛠️ Setup & Run Instructions

### **Prerequisites**

- Node.js 16+ installed
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Emulator (or Expo Go app on your device)

### **1️⃣ Install Dependencies**

```bash
npm install
```

### **2️⃣ Start Expo Development Server**

```bash
npm start
```

### **3️⃣ Run the App**

<table>
<tr>
<td align="center" width="33%">

**📱 Physical Device**

1. Install **Expo Go** from App Store/Play Store
2. Scan the QR code shown in terminal
3. App opens automatically

</td>
<td align="center" width="33%">

**🤖 Android Emulator**

```bash
# Press 'a' in terminal
# or
npm run android
```

</td>
<td align="center" width="33%">

**🍎 iOS Simulator**

```bash
# Press 'i' in terminal
# or (macOS only)
npm run ios
```

</td>
</tr>
</table>

---

## ✅ Deliverables Status

<div align="center">

| Requirement                                    | Status      |
| ---------------------------------------------- | ----------- |
| GitHub repository with clean code              | ✅ Complete |
| README with setup instructions                 | ✅ Complete |
| Explanation of approach & trade-offs           | ✅ Complete |
| Clean React Native + NativeWind implementation | ✅ Complete |
| Modular, scalable architecture                 | ✅ Complete |
| TypeScript integration                         | ✅ Complete |
| All required features implemented              | ✅ Complete |

</div>

---

## 🤝 Contributing

This is a time-boxed assignment project, but feel free to fork and extend it!

```bash
# Fork the repository
# Create your feature branch
git checkout -b feature/AmazingFeature

# Commit your changes
git commit -m 'Add some AmazingFeature'

# Push to the branch
git push origin feature/AmazingFeature

# Open a Pull Request
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ using React Native & Expo**

⭐ Star this repo if you find it helpful!

[Report Bug](../../issues) • [Request Feature](../../issues)

---

_Completed as a technical assessment_

</div>


# 🔐 Google Şifre Yöneticisi Clone

> A modern, professional password manager built with React, Redux, and Material Design 3. Fully offline with dark mode support.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=react-router&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ **Features**

### 🔐 **Password Management**

- ✅ Add, edit, delete passwords with confirmation
- ✅ Search passwords by site name or username
- ✅ Filter by categories (Favoriler, Genel, Sosyal Medya, Banka, Alışveriş)
- ✅ Mark passwords as favorites with star icon
- ✅ Copy passwords to clipboard with one click
- ✅ Show/hide password toggle

### 🔒 **Security Features**

- ✅ Real-time password strength indicator
- ✅ Individual security scoring per password (0-100)
- ✅ Detects weak passwords and patterns
- ✅ Security dashboard with overall score
- ✅ Password history tracking
- ✅ Automatic password generator (16 characters)

### 📊 **Analytics & History**

- ✅ Security control card with progress bar
- ✅ View all passwords with metadata
- ✅ Timestamp for creation and last use
- ✅ Historical password versions tracking
- ✅ Category-based organization

### 💾 **Data Management**

- ✅ 100% offline - works without internet
- ✅ LocalStorage persistence
- ✅ Export passwords to JSON backup
- ✅ Import passwords from backup
- ✅ Bulk delete with double confirmation
- ✅ Automatic data sync

### 🎨 **User Interface**

- ✅ Google Material Design 3 aesthetic
- ✅ Responsive mobile-first design (480px container)
- ✅ Dark mode with perfect readability
- ✅ Light mode with professional styling
- ✅ Smooth animations and transitions
- ✅ Toast notifications instead of alerts
- ✅ Professional shadows and depth
- ✅ Bottom navigation (4 tabs)

### 🧭 **Navigation**

- ✅ React Router with 4 main pages
- ✅ URL-based routing
- ✅ Browser back/forward support
- ✅ Active tab indicators

---

## 🛠️ **Tech Stack**

### **Frontend**

- **React 19** - Modern UI library
- **Redux Toolkit** - Centralized state management
- **React Router v6** - Client-side routing
- **Lucide React** - Beautiful SVG icons
- **React Toastify** - Toast notifications
- **Vite** - Lightning-fast build tool

### **Styling**

- **CSS3** - Custom properties (variables)
- **Google Material Design 3** - Design system
- **Responsive Design** - Mobile-first approach

### **Storage**

- **LocalStorage** - Browser-based data persistence

---

## 🚀 **Getting Started**

### **Prerequisites**

- Node.js 16.x or higher
- npm or yarn package manager

### **Installation**

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/sifreyoneticisi.git
cd sifreyoneticisi
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open in browser**

### **Build for Production**

```bash
npm run build
```

### **Preview Production Build**

```bash
npm run preview
```

---

## 📁 **Project Structure**

sifreyoneticisi/

├── src/

│ ├── store/ # Redux State Management

│ │ ├── store.js # Redux store configuration

│ │ └── slices/

│ │ ├── passwordSlice.js # Password CRUD + security scoring

│ │ ├── themeSlice.js # Dark/Light theme toggle

│ │ └── uiSlice.js # UI state (tabs, search, form)

│ │

│ ├── components/ # React Components

│ │ ├── Home.jsx # Main password list page

│ │ ├── AddPassword.jsx # Add/Edit password form

│ │ ├── HistoryView.jsx # Password history & metadata

│ │ ├── SettingsView.jsx # Settings & export/import

│ │ ├── BottomNav.jsx # Navigation bar

│ │ ├── Header.jsx # App header

│ │ └── PasswordCard.jsx # Password card component

│ │

│ ├── utils/

│ │ └── toast.js # Toast notification helpers

│ │

│ ├── App.jsx # Main app with Router

│ ├── App.css # Global styling

│ ├── index.css # CSS resets

│ ├── main.jsx # Entry point with Redux Provider

│ └── vite.env.d.ts

│

├── public/

├── index.html

├── package.json

├── vite.config.js

└── README.md

---

## 🎓 **Learning Concepts Applied**

### ✅ **Redux Toolkit**

- `createSlice` for state management
- Actions and reducers
- `useSelector` for reading state
- `useDispatch` for dispatching actions
- LocalStorage persistence

### ✅ **React Router**

- `BrowserRouter` setup
- `Routes` and `Route` components
- `useNavigate` hook for navigation
- URL-based page routing
- Active route detection

### ✅ **React Patterns**

- Component composition
- Props drilling vs Redux
- Custom hooks
- Form handling and validation
- Conditional rendering
- Controlled components

### ✅ **Styling & Design**

- CSS Variables for theming
- Dark/Light mode switching
- Responsive mobile-first design
- Material Design 3 implementation
- Professional shadows and animations

### ✅ **Features Implemented**

- Password strength calculation algorithm
- CRUD operations on passwords
- Real-time search and filtering
- Export/Import JSON files
- Toast notifications
- Browser storage management

---

## 📖 **Usage Guide**

### **Adding a Password**

1. Tap the "Ekle" (Add) tab
2. Fill in the form fields:
   - **Kategori** - Choose a category
   - **Site Adı** - Website/app name (required)
   - **Site URL** - Website link (optional)
   - **Kullanıcı Adı** - Email or username (required)
   - **Şifre** - Password (required)
3. Watch the password strength indicator
4. Tap "Güçlü Şifre Oluştur" to generate a random password
5. Tap "Şifreyi Güvenle Kaydet" to save

### **Editing a Password**

1. Find the password on the home page
2. Tap the edit (pencil) icon
3. Modify the fields
4. Tap "Değişiklikleri Kaydet"

### **Deleting a Password**

1. Find the password on the home page
2. Tap the delete (trash) icon
3. Confirm the deletion

### **Searching & Filtering**

1. Use the search box to find passwords by site name or username
2. Use category chips to filter by category
3. "Favoriler" chip shows only starred passwords

### **Copying Passwords**

1. Find the password
2. Tap the copy (clipboard) icon
3. Password is copied to clipboard (toast notification appears)

### **Viewing History**

1. Tap the "Geçmiş" (History) tab
2. See all passwords sorted by last use
3. View metadata: creation date, last used, security score, etc.

### **Settings**

1. Tap the "Ayarlar" (Settings) tab
2. **Export** - Download all passwords as JSON backup
3. **Import** - Upload JSON backup to restore passwords
4. **Delete All** - Remove all passwords (requires double confirmation)
5. View app information and offline status

### **Dark Mode**

1. Tap the moon/sun icon in the header
2. Theme toggles between light and dark
3. Preference is saved automatically

---

## 🎨 **Design System**

### **Colors (Google Material Design 3)**

#### Light Mode

| Color          | Hex       | Usage                               |
| -------------- | --------- | ----------------------------------- |
| Primary Blue   | `#1A73E8` | Buttons, links, active states       |
| Success Green  | `#188038` | Positive actions, security good     |
| Warning Orange | `#F2994A` | Warnings, alerts                    |
| Danger Red     | `#D93025` | Destructive actions, weak passwords |
| Background     | `#FFFFFF` | Main background                     |
| Surface        | `#F8F9FA` | Cards, containers                   |

#### Dark Mode

| Color          | Hex       | Usage                               |
| -------------- | --------- | ----------------------------------- |
| Primary Blue   | `#8AB4F8` | Buttons, links, active states       |
| Success Green  | `#81C995` | Positive actions, security good     |
| Warning Orange | `#FDD663` | Warnings, alerts                    |
| Danger Red     | `#F28B82` | Destructive actions, weak passwords |
| Background     | `#202124` | Main background                     |
| Surface        | `#2F3033` | Cards, containers                   |

### **Typography**

- **Font Family**: System fonts (San Francisco, Segoe UI, Roboto)
- **Font Smoothing**: Antialiased for crisp text
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold)

---

## 🔐 **Password Strength Algorithm**

The strength calculator evaluates passwords on:

- **Length**: 8 chars (+20), 12 chars (+10), 16+ chars (+10)
- **Uppercase**: Presence of A-Z (+20)
- **Lowercase**: Presence of a-z (included in base)
- **Numbers**: Presence of 0-9 (+20)
- **Special chars**: !@#$%^&\*() etc. (+20)
- **Patterns**: Deducts for sequential/repeated chars (-15/-30)

**Score Scale:**

- 0-20: Çok Zayıf (Very Weak) 🔴
- 21-40: Zayıf (Weak) 🟠
- 41-60: Orta (Medium) 🟡
- 61-80: Güçlü (Strong) 🟢
- 81-100: Çok Güçlü (Very Strong) 💚

---

## 📋 **Pages & Routes**

| Route       | Page         | Features                                      |
| ----------- | ------------ | --------------------------------------------- |
| `/`         | **Home**     | Password list, search, filter, security score |
| `/add`      | **Add/Edit** | Form to add/edit passwords, generator         |
| `/history`  | **History**  | All passwords with metadata, timestamps       |
| `/settings` | **Settings** | Export, import, delete all, app info          |

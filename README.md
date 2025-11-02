# 🎵 MusikKu - Music Explorer

**MusikKu** adalah Sebuah output UTS berupa aplikasi web music explorer yang memungkinkan pengguna untuk mencari, memutar preview, dan mengelola playlist musik menggunakan iTunes Search API.

### 📝 Playlist Management
- **Create Playlist** - Tambah lagu favorit ke playlist
- **Persistent Storage** - Playlist tersimpan di localStorage
- **Track Management** - Play, remove, atau clear playlist

## 🛠️ Tech Stack

- **Framework:** React 18.3.1 + Vite 6.0.5
- **Styling:** Pure CSS
- **Icons:** Lucide React 0.263.1
- **API:** iTunes Search API
- **Storage:** LocalStorage
- **State Management:** React Hooks (useState, useEffect, useRef)

---

## 📋 Prerequisites

Sebelum memulai, pastikan Anda sudah menginstall:

- **Node.js** (v18.0.0 atau lebih baru)
- **Git**
- **Code editor**
  
### Cek Versi Node.js
```bash
node --version
npm --version
```

Jika belum terinstall, download dari: https://nodejs.org/

---

## 🚀 Installation

### 1. Clone Project

**Clone repository dari github**


Buka CMD atau terminal lainnya dan masuk ke folder yang di inginkan untuk menyimpan proyek
```bash
git clone https://github.com/hidroo04/uts-pemweb-123140197.git
```

### 2. Masuk ke Folder Proyek
```bash
cd uts-pemweb-123140197
```

### 3. Install Dependencies
```bash
npm install react
npm install react-dom
npm install lucide-react
```

### 4. Jalankan Proyek
```bash
npm run dev
```

Aplikasi akan berjalan di: **http://localhost:5173**


## 📁 Struktur Project
```
MUSIKKU/
├── node_modules/            
├── public/
│   └── vite.svg             
├── src/
│   ├── assets/             
│   │   └── react.svg
│   ├── components/          
│   │   ├── Header.jsx      
│   │   ├── SearchForm.jsx    
│   │   ├── HomePage.jsx      
│   │   ├── GenreCard.jsx    
│   │   ├── DataTable.jsx     
│   │   ├── DetailCard.jsx   
│   │   └── AudioPlayer.jsx   
│   ├── styles/               
│   │   ├── Header.css
│   │   ├── SearchForm.css
│   │   ├── HomePage.css
│   │   ├── GenreCard.css
│   │   ├── DataTable.css
│   │   ├── DetailCard.css
│   │   └── AudioPlayer.css
│   ├── App.jsx            
│   ├── App.css             
│   ├── index.css             
│   └── main.jsx             
├── .gitignore
├── eslint.config.js
├── index.html               
├── package.json            
├── package-lock.json
├── README.md                
└── vite.config.js            
```

---

# 🌱 EcoStep Uzbekistan

> Chiqindilarni qayta ishlashni rag‘batlantiruvchi va ekologik faollikni kuzatishga yordam beruvchi zamonaviy frontend web-ilova.

## 📌 Loyiha holati

**Frontend portfolio project / prototype.** Hozirgi versiyada ekologik statistika, Eco-Ball, topshiriqlar, reyting, xarita va do‘kon funksiyalari lokal React state orqali ishlaydi. Real backend/API integratsiyasi keyingi bosqich uchun rejalashtirilgan.

## ✨ Asosiy imkoniyatlar

- 📊 Ekologik dashboard va statistikalar
- ♻️ Chiqindi topshirishning 4 bosqichli jarayoni
- 🪙 Eco-Ball tizimi
- 📈 Kunlik va haftalik maqsadlar
- 🏆 Reyting va ekologik tahlil
- 🗺️ Chiqindi yig‘ish punktlari xaritasi
- 🛍️ Eco-Do‘kon va vaucherlar
- 🔔 Toast bildirishnomalari
- 📱 Responsive UI
- 🧩 Qayta foydalaniladigan React komponentlari
- 🛣️ File-based routing
- ❌ Noto‘g‘ri route uchun 404 sahifa
- ⚠️ Global error boundary va server-side error handling

## 🛠️ Texnologiyalar

- **React 19**
- **TypeScript**
- **TanStack Start**
- **TanStack Router**
- **TanStack Query**
- **Tailwind CSS 4**
- **Vite**
- **Lucide React**
- **React Hook Form**
- **Zod**
- **Recharts**
- **Sonner**

## 📁 Loyiha strukturasi

```text
src/
├── components/        # Qayta ishlatiladigan UI komponentlari
│   ├── ui/            # UI primitives
│   └── app-sidebar.tsx
├── hooks/             # Custom React hooks
├── lib/               # Context, server config va yordamchi funksiyalar
├── routes/            # File-based route'lar
├── routeTree.gen.ts   # TanStack Router tomonidan generatsiya qilinadi
├── router.tsx         # Router konfiguratsiyasi
├── server.ts          # Server entry
├── start.ts           # TanStack Start konfiguratsiyasi
└── styles.css         # Design system va global CSS
```

## 🛣️ Asosiy sahifalar

| Route | Vazifasi |
|---|---|
| `/` | Dashboard |
| `/topshirish` | Chiqindi topshirish |
| `/reyting` | Reyting va tahlil |
| `/xarita` | Eko-Xarita |
| `/dokon` | Eco-Do‘kon |

## ⚙️ Loyihani ishga tushirish

### 1. Repository'ni clone qilish

```bash
git clone https://github.com/kadirovulugbek002-prog/eco-step-uz.git
cd eco-step-uz
```

### 2. Dependency'larni o‘rnatish

```bash
npm install
```

### 3. Development server

```bash
npm run dev
```

### 4. Lint

```bash
npm run lint
```

### 5. Production build

```bash
npm run build
```

## 🔐 Xavfsizlik

- `.env`, `.env.local` va boshqa local environment fayllari Git orqali kuzatilmaydi.
- Server-only konfiguratsiya `*.server.ts` fayllarida saqlanadi.
- Maxfiy API key yoki tokenlarni repository'ga commit qilmaslik kerak.

## 👨‍💻 Muallif

**Ulug‘bek Jo‘raboyev** — Junior Frontend Developer

**Stack:** React · TypeScript · JavaScript · Tailwind CSS · Git · GitHub

📍 Tashkent, Uzbekistan

📧 kadirov.ulugbek.002@gmail.com

💬 Telegram: [@Kad1irov1](https://t.me/Kad1irov1)

---

⭐ Portfolio uchun ishlab chiqilgan frontend loyiha.

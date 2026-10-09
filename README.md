
# 🛒 BazarDor — Bangladesh Market Price Tracker

> Know your daily market prices at a glance.

🌐 **Live Demo:** [বাজার দর](https://bazar-dor-liard.vercel.app)

BazarDor is a responsive web application designed to help people in Bangladesh track daily market prices of essential commodities. Users can explore product prices, identify price increases and decreases, browse categories, and compare prices across different markets through a Bengali-friendly interface.

## 📖 Project Overview

BazarDor makes everyday market price information easier to access and understand. It combines product browsing, price comparison, authentication, and profile management in one application.

With BazarDor, users can:

- View daily prices of essential commodities.
- Identify products with the highest price increases and decreases.
- Browse products by category.
- Sort products by price.
- Compare minimum, maximum, and average prices.
- Explore market-wise product prices.
- Create accounts and sign in using email and social authentication.
- Manage their profiles and update personal information.

## ✨ Key Features

### 🏠 Dynamic Home Page
- Hero section with a dynamically formatted Bengali date.
- Infinite-scrolling price ticker.
- Top 6 products with the highest price increases.
- Top 6 products with the highest price decreases.
- Responsive product grid.

### 📂 Category Browsing
- Browse products across multiple commodity categories.
- Sort products by default order, lowest price, or highest price.
- Perform numeric sorting using Bengali numerals.
- Display loading skeletons while data is loading.
- Show a custom empty state for invalid categories.

### 📊 Product Details & Price Comparison
- Display product names, descriptions, emojis, categories, and units.
- Summarize minimum, maximum, and average prices.
- Compare today's prices across 12+ markets.
- Navigate easily with breadcrumb navigation.
- Protect product detail routes through authentication.

### 🔐 Authentication with Better Auth
- Email and password registration and login.
- Google OAuth integration.
- GitHub OAuth integration.
- Password visibility toggle.
- Bengali validation and feedback messages.
- Session-based user information.
- Sign out functionality.
- Redirect unauthenticated users from protected routes.

### 👤 Profile Management
- View name, email, verification status, and login type.
- Display user ID and account creation date.
- Generate an avatar using the user's initials.
- Update profile names through a dedicated route.
- Use Better Auth's official `authClient.updateUser()` API.

### 📱 Responsive User Interface
- Mobile-first design.
- Support for smartphones, tablets, desktops, and large screens.
- Bengali typography using Hind Siliguri and Noto Sans Bengali.
- Reusable UI components.

### ⚙️ Loading, Error Handling & Performance
- Global and route-specific loading states.
- Category-specific and global 404 pages.
- Friendly error and empty states.
- API caching with revalidation.
- Optimized fonts and images.
- SEO metadata.
- Environment-based configuration.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Application framework and routing |
| React 19 | Component-based user interface |
| TypeScript | Static typing and maintainable code |
| Tailwind CSS v4 | Responsive styling |
| Better Auth | Authentication and session management |
| MongoDB Atlas | Database for authentication and user data |
| React Hot Toast | Toast notifications |
| React Icons | Icon library |
| Hind Siliguri | Bengali typography |
| Noto Sans Bengali | Bengali text rendering |
| Vercel | Deployment and hosting |

## 🧱 Project Structure

```text
bazar-dor/
├── public/
│   ├── bazar-hero.png
│   └── logo-icon.png
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   ├── category/
│   │   │   └── [slug]/
│   │   ├── product/
│   │   │   └── [slug]/
│   │   ├── profile/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Category/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── HomeSection/
│   │   ├── ProductCards/
│   │   └── ui/
│   ├── lib/
│   ├── types/
│   └── proxy.ts
├── .env.local
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 📡 API Integration

**Base URL:** `https://api.api-store.workers.dev/api/bazardor`

BazarDor integrates with an API to retrieve product and category information.

| Endpoint | Purpose |
|---|---|
| `/products` | Retrieve all products |
| `/products?category=chal` | Retrieve products by category |
| `/products/1` | Retrieve an individual product |
| `/categories` | Retrieve all categories |
| `/categories/chal` | Retrieve an individual category |

> **Note:** Replace example IDs and category slugs with valid values returned by the API when necessary.

## 🚀 Getting Started

Follow these instructions to run BazarDor locally.

### Prerequisites

Make sure you have the following:

- Node.js 20 or later.
- npm.
- A MongoDB Atlas account.
- Google OAuth credentials, if Google sign-in is enabled.
- GitHub OAuth credentials, if GitHub sign-in is enabled.

### 1. Clone the Repository

```bash
git clone https://github.com/naderarrahman/bazar-dor.git
cd bazar-dor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project's root directory.

```env
BETTER_AUTH_SECRET=your_random_secret_at_least_32_chars
BETTER_AUTH_URL=http://localhost:3000

MONGO_DB_URI=your_mongodb_connection_string

GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret

GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
```

Replace the placeholder values with your actual credentials. Configure only the OAuth providers you intend to use.

**Important:** Never commit `.env.local` or expose your authentication secrets and database credentials publicly.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
```

### 6. Run the Production Build

```bash
npm run start
```

## 🌐 Live Demo

Explore the deployed application:

**[https://bazar-dor-liard.vercel.app](https://bazar-dor-liard.vercel.app)**


## 🔮 Future Improvements

- Add historical price charts to visualize market trends.
- Introduce search and advanced filtering.
- Provide user-selected market comparisons.
- Add price alerts for selected commodities.
- Improve accessibility and automated testing.
- Expand market coverage as reliable data becomes available.

## 👨‍💻 Author

**Nader Ar Rahman**

- **GitHub:** [@naderarrahman](https://github.com/naderarrahman)
- **LinkedIn:** [naderarrahman](https://www.linkedin.com/in/naderarrahman)
- **Facebook:** [Nader Ar Rahman](https://web.facebook.com/naderarrahman)

## 📄 License

This project is available for educational purposes. For reuse or redistribution, add an explicit open-source license file to the repository and specify its terms here.

## 🙏 Acknowledgements

- **Bengali Fonts:** Hind Siliguri and Noto Sans Bengali
- **Icons:** React Icons
- **Authentication:** Better Auth
- **Database:** MongoDB Atlas
- **Deployment:** Vercel

---

<p align="center">
  Made with ❤️ in Bangladesh
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/naderarrahman">
    Developed by <strong>Nader Ar Rahman</strong>
  </a>
</p>
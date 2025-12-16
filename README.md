# URL Shortener - ShortSnap

A modern, production-ready URL shortener application built with Next.js 14, TypeScript, Prisma, and Tailwind CSS. Create short, memorable links and track their performance with built-in analytics.

## Features

- ✂️ **URL Shortening** - Convert long URLs into short, shareable links
- 📊 **Click Analytics** - Track click counts and last clicked timestamps
- 🎨 **Modern UI** - Beautiful, responsive interface with dark mode support
- ⚡ **Fast & Reliable** - Built on Next.js 14 with optimized performance
- 🔒 **URL Validation** - Prevents malicious URLs (javascript:, data:, file: schemes)
- 🎯 **Collision Detection** - Smart short code generation with automatic retry logic
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite (local) / PostgreSQL (production) via Prisma ORM
- **Styling**: Tailwind CSS
- **Deployment**: Vercel-compatible

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   cd urlshortner
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the `.env.example` file to `.env`:

   ```bash
   copy .env.example .env
   ```

   The default configuration uses SQLite for local development:

   ```env
   DATABASE_URL="file:./dev.db"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

   For production with PostgreSQL, update the `DATABASE_URL`:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/urlshortener?schema=public"
   ```

4. **Initialize the database**

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

   This will:

   - Generate the Prisma Client
   - Create the database schema
   - Apply migrations

5. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

### Creating Short Links

1. Navigate to the home page
2. Paste your long URL into the input field
3. Click "Shorten URL"
4. Copy your new short link!

### Managing Links

1. Go to the Dashboard (`/dashboard`)
2. View all your created links with analytics
3. Copy short URLs to clipboard
4. Delete links you no longer need

### Redirecting

Simply visit `http://localhost:3000/{shortCode}` and you'll be redirected to the original URL. Each visit increments the click counter.

## Project Structure

```
urlshortner/
├── app/
│   ├── api/
│   │   └── links/
│   │       ├── route.ts          # POST /api/links, GET /api/links
│   │       └── [id]/
│   │           └── route.ts       # DELETE /api/links/:id
│   ├── dashboard/
│   │   └── page.tsx               # Dashboard page
│   ├── [shortCode]/
│   │   └── page.tsx               # Redirect handler
│   ├── layout.tsx                 # Root layout with navigation
│   ├── page.tsx                   # Home page
│   ├── not-found.tsx              # 404 page
│   └── globals.css                # Global styles
├── components/
│   ├── ui/
│   │   ├── Button.tsx             # Reusable button component
│   │   ├── Input.tsx              # Reusable input component
│   │   ├── Card.tsx               # Card container component
│   │   └── Table.tsx              # Table components
│   ├── UrlShortenerForm.tsx       # URL submission form
│   └── LinksTable.tsx             # Links management table
├── lib/
│   ├── db.ts                      # Prisma client singleton
│   ├── shortcode.ts               # Short code generation logic
│   └── validation.ts              # URL validation utilities
├── types/
│   └── index.ts                   # TypeScript type definitions
├── prisma/
│   └── schema.prisma              # Database schema
└── package.json
```

## Database Schema

### Link Model

| Field         | Type          | Description                     |
| ------------- | ------------- | ------------------------------- |
| id            | String (UUID) | Primary key                     |
| shortCode     | String        | Unique short code (indexed)     |
| originalUrl   | String        | Original long URL               |
| clickCount    | Integer       | Number of clicks (default: 0)   |
| createdAt     | DateTime      | Creation timestamp              |
| lastClickedAt | DateTime      | Last click timestamp (nullable) |

## API Reference

### Create Short Link

```
POST /api/links
Content-Type: application/json

{
  "originalUrl": "https://example.com/very/long/url"
}

Response: 201 Created
{
  "shortUrl": "http://localhost:3000/abc123",
  "shortCode": "abc123",
  "originalUrl": "https://example.com/very/long/url"
}
```

### Get All Links

```
GET /api/links

Response: 200 OK
[
  {
    "id": "uuid",
    "shortCode": "abc123",
    "originalUrl": "https://example.com",
    "clickCount": 42,
    "createdAt": "2025-12-16T12:00:00.000Z",
    "lastClickedAt": "2025-12-16T13:00:00.000Z"
  }
]
```

### Delete Link

```
DELETE /api/links/:id

Response: 200 OK
{
  "success": true
}
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Import the project in Vercel

3. Add environment variables:

   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NEXT_PUBLIC_APP_URL` - Your production URL

4. Deploy!

Vercel will automatically:

- Install dependencies
- Run Prisma migrations
- Build the Next.js application
- Deploy to production

## Development

### Building for Production

```bash
npm run build
npm start
```

### Database Commands

```bash
# Create a new migration
npx prisma migrate dev --name your_migration_name

# Reset database
npx prisma migrate reset

# Open Prisma Studio (database GUI)
npx prisma studio
```

### Linting

```bash
npm run lint
```

## Future Enhancements

This application is designed to be extended with:

- 🔐 Authentication (NextAuth.js)
- 👥 Multi-user support with teams
- 📈 Advanced analytics (geolocation, referrers, devices)
- ⏱️ Rate limiting
- 🗺️ Custom short codes
- 📅 Link expiration
- 🔗 QR code generation
- 💾 Redis caching layer
- 📊 Analytics dashboard

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js 14 and TypeScript

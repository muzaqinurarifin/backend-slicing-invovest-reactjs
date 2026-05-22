# BE_INVOFEST - Backend

Backend API untuk aplikasi event management INVOFEST (Inovasi Teknologi Fest) yang dibangun dengan Express.js + TypeScript + Prisma ORM.

## 📋 Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Tech Stack](#tech-stack)
- [Fitur Utama](#fitur-utama)
- [Instalasi](#instalasi)
- [Cara Menjalankan](#cara-menjalankan)
- [Struktur Folder](#struktur-folder)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [CORS Configuration](#cors-configuration)

## 📌 Tentang Proyek

BE_INVOFEST adalah REST API backend untuk mengelola data event INVOFEST termasuk:

- Events (Seminar, Workshop, Talkshow, Kompetisi)
- Categories (Kategori event)
- Speakers (Pembicara/Narasumber)

API dibangun dengan arsitektur clean yang memisahkan controllers, routes, dan services.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5.2.1
- **Language:** TypeScript
- **Database ORM:** Prisma v6.14.0
- **Database:** PostgreSQL (via Railway)
- **HTTP Server:** Express.js
- **CORS:** cors middleware
- **Environment:** dotenv

## ✨ Fitur Utama

- ✅ REST API untuk CRUD operations
- ✅ CORS configuration untuk cross-origin requests
- ✅ Database migrations dengan Prisma
- ✅ Type-safe queries dengan TypeScript
- ✅ Error handling yang proper
- ✅ Environment variables support
- ✅ Structured folder organization

## 🚀 Instalasi

### Prerequisites

- Node.js >= 16
- npm atau yarn
- PostgreSQL database (local atau cloud)

### Setup

```bash
cd BE_INVOFEST

# Install dependencies
npm install

# Setup environment variables
# Buat file .env
echo DATABASE_URL="postgresql://user:password@localhost:5432/invofest" > .env
echo PORT=3000 >> .env

# Setup database
npx prisma migrate dev --name init
```

## 🏃 Cara Menjalankan

### Development Mode

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

### Build TypeScript

```bash
npm run build
```

### Production Mode

```bash
npm start
```

### Database Migrations

```bash
# Create new migration
npx prisma migrate dev --name <migration_name>

# Reset database (WARNING: hapus semua data)
npx prisma migrate reset

# View database
npx prisma studio
```

## 📁 Struktur Folder

```
BE_INVOFEST/
├── src/
│   ├── index.ts                 # Entry point
│   ├── controllers/             # Business logic
│   │   ├── eventController.ts
│   │   ├── categoryController.ts
│   │   └── speakerController.ts
│   ├── routes/                  # API routes
│   │   ├── eventRoute.ts
│   │   ├── categoryRoute.ts
│   │   └── speakerRoute.ts
│   ├── types/                   # TypeScript types/interfaces
│   │   ├── event.ts
│   │   ├── category.ts
│   │   └── speaker.ts
│   ├── lib/                     # Utilities
│   │   └── db.ts               # Prisma client
│   └── middlewares/             # Express middlewares
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/              # Database migrations
├── dist/                        # Compiled JavaScript (generated)
├── .env                         # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## 🔌 API Endpoints

### Base URL

```
Production: https://backend-slicing-invovest-reactjs-production.up.railway.app
Local: http://localhost:3000
```

### Root

```
GET /
Response: "Ini adalah aplikasi untuk invofest"
```

### Events

```bash
# Get all events
GET /events

# Get event by ID
GET /events/:id

# Create new event
POST /events
Content-Type: application/json
{
  "name": "Seminar IT",
  "categoryId": "1",
  "location": "Jakarta",
  "dateEvent": "2026-05-20T00:00:00Z",
  "description": "Seminar tentang teknologi"
}

# Update event
PUT /events/:id
Content-Type: application/json
{
  "name": "Seminar IT Updated",
  "categoryId": "1",
  "location": "Bandung",
  "dateEvent": "2026-05-21T00:00:00Z",
  "description": "Updated description"
}

# Delete event
DELETE /events/:id
```

### Categories

```bash
# Get all categories
GET /categories

# Get category by ID
GET /categories/:id

# Create new category
POST /categories
Content-Type: application/json
{
  "name": "Seminar"
}

# Update category
PUT /categories/:id
Content-Type: application/json
{
  "name": "Workshop"
}

# Delete category
DELETE /categories/:id
```

### Speakers

```bash
# Get all speakers
GET /speakers

# Get speaker by ID
GET /speakers/:id

# Create new speaker
POST /speakers
Content-Type: application/json
{
  "name": "John Doe",
  "role": "Senior Software Engineer",
  "image": "https://example.com/image.jpg"
}

# Update speaker
PUT /speakers/:id
Content-Type: application/json
{
  "name": "Jane Doe",
  "role": "Tech Lead",
  "image": "https://example.com/image2.jpg"
}

# Delete speaker
DELETE /speakers/:id
```

## 💾 Database

### Schema

#### Event

```prisma
model Event {
  id          Int     @id @default(autoincrement())
  name        String
  categoryId  String
  location    String
  dateEvent   DateTime
  description String
  createdAt   DateTime @default(now())
}
```

#### Category

```prisma
model Category {
  id   Int    @id @default(autoincrement())
  name String
}
```

#### Speaker

```prisma
model Speaker {
  id    Int     @id @default(autoincrement())
  name  String
  role  String
  image String
}
```

### Database URL

```
DATABASE_URL="postgresql://user:password@host:port/database"
```

## 🔐 CORS Configuration

Backend dikonfigurasi untuk menerima request dari:

- `https://slicing-invovest-reactjs.vercel.app`
- `http://localhost:5173` (development frontend)
- Domain lain yang include "localhost" atau "vercel.app"

Edit `src/index.ts` untuk mengubah whitelist:

```typescript
const whitelist = [
  "https://slicing-invovest-reactjs.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
```

## 📝 Environment Variables

Buat file `.env` di root BE_INVOFEST:

```
DATABASE_URL="postgresql://user:password@localhost:5432/invofest"
PORT=3000
NODE_ENV=development
```

## 🎯 Response Format

Semua API responses mengikuti format JSON:

### Success Response

```json
{
  "data": {
    /* ... */
  },
  "message": "Success message"
}
```

### Error Response

```json
{
  "message": "Error message",
  "error": {
    /* error details */
  }
}
```

## 🧪 Testing API

### Menggunakan curl

```bash
# Get all events
curl -i -H "Origin: https://slicing-invovest-reactjs.vercel.app" \
  https://backend-slicing-invovest-reactjs-production.up.railway.app/events

# Create event
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Origin: https://slicing-invovest-reactjs.vercel.app" \
  -d '{"name":"Seminar","categoryId":"1","location":"Jakarta","dateEvent":"2026-05-20","description":"Test"}' \
  http://localhost:3000/events
```

### Menggunakan Postman

1. Import API collection dari request examples di atas
2. Set origin header untuk CORS
3. Gunakan raw JSON untuk request body

## 📦 Dependencies

Lihat [package.json](package.json) untuk daftar lengkap.

Main dependencies:

- `express@^5.2.1` - Web framework
- `@prisma/client@^6.19.3` - Database ORM
- `cors@^2.8.6` - CORS middleware
- `dotenv@^17.4.2` - Environment variables
- `typescript@^5.9.3` - TypeScript compiler

## 🚨 Error Handling

Setiap endpoint memiliki try-catch untuk error handling:

```typescript
try {
  // business logic
  res.json(data);
} catch (error) {
  res.status(500).json({
    message: "Gagal mengambil data",
    error,
  });
}
```

## 📝 HTTP Methods

- `GET` - Retrieve data
- `POST` - Create new resource
- `PUT` - Update entire resource
- `DELETE` - Delete resource
- `OPTIONS` - Preflight untuk CORS

## 🔄 Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Format schema
npx prisma format

# Validate schema
npx prisma validate

# Push schema (tanpa migration)
npx prisma db push

# Check DB status
npx prisma db check
```

## 🚀 Deployment

### Deploy ke Railway

1. Push code ke GitHub
2. Koneksikan repository ke Railway
3. Set environment variables di Railway:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NODE_ENV=production`
4. Railway otomatis build & deploy

### Build & Start

```bash
npm run build
npm start
```

## 💡 Tips Development

1. **Gunakan Prisma Studio untuk view/edit data:**

   ```bash
   npx prisma studio
   ```

2. **Restart dev server saat edit schema:**

   ```bash
   npm run dev
   ```

3. **Check database connection:**
   - Verifikasi DATABASE_URL di .env
   - Pastikan PostgreSQL sudah running

4. **Debug CORS issues:**
   - Check header "Access-Control-Allow-Origin" di browser DevTools
   - Verify origin di whitelist
   - Cek CORS preflight OPTIONS request

## 📄 License

MIT License

---

**Last Updated:** May 22, 2026

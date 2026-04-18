# Nedal Agha Web Development

Production-ready MVP foundation built with Next.js App Router.

## Stack
- Next.js + TypeScript
- Tailwind CSS
- Prisma ORM + MySQL/MariaDB
- Single admin auth via secure cookie session
- Cloudinary image uploads
- Framer Motion + React Three Fiber (Hero-only policy)

## Required Routes
### Public
- `/`
- `/projects`
- `/projects/[slug]`
- `/contact`

### Admin
- `/admin/login`
- `/admin`
- `/admin/projects`
- `/admin/projects/new`
- `/admin/projects/[id]/edit`
- `/admin/messages`
- `/admin/settings`

## Setup
1. Install dependencies:
   - `npm install`
2. Create env file:
   - Copy `.env.example` to `.env`
3. Generate Prisma client:
   - `npm run prisma:generate`
4. Run migrations (once DB is ready):
   - `npm run prisma:migrate`
5. Seed first admin/settings:
   - `npm run prisma:seed`
6. Start dev server:
   - `npm run dev`

## Deployment Target
- GitHub source
- Hostinger Node.js hosting (without VPS)

## Notes
- Admin routes are guarded in `middleware.ts` and by API/session checks.
- Public routes must only expose published data in business logic.
- Contact form includes honeypot + validation for spam mitigation.

# Nedal Agha Web Development

Production-ready MVP blueprint for a full-stack company website and internal admin dashboard.

## Project Goal
Build a professional website that:
- Showcases services and projects
- Receives contact messages
- Provides a private admin panel to manage projects and site settings

## Architecture Constraints
- Next.js App Router + TypeScript
- Tailwind CSS + Framer Motion
- React Three Fiber only for a lightweight Hero section
- Prisma ORM + MySQL or MariaDB
- Single admin authentication
- Cloudinary for image uploads
- Hostinger Node.js hosting compatibility (no VPS assumption)

## Out of Scope (MVP)
- No microservices
- No separate frontend/backend repos
- No PostgreSQL or MongoDB
- No Docker-first deployment model
- No multi-user admin system
- No external CMS

## Required Public Pages
- `/`
- `/projects`
- `/projects/[slug]`
- `/contact`

## Required Admin Pages
- `/admin/login`
- `/admin`
- `/admin/projects`
- `/admin/projects/new`
- `/admin/projects/[id]/edit`
- `/admin/messages`
- `/admin/settings`

## Core MVP Features
- Single admin login with secure session cookie
- CRUD for projects
- Cover and gallery image upload (Cloudinary)
- Feature/publish toggles for projects
- Contact form message storage + admin inbox
- Site settings management

## Suggested Build Sequence
1. Initialize project structure
2. Configure TypeScript, Tailwind, and Prisma
3. Design and migrate database schema
4. Implement auth and session protection
5. Implement upload layer
6. Implement admin CRUD backend
7. Build admin UI
8. Build public UI
9. Polish states, responsiveness, and SEO
10. Add deployment documentation

## Environment Variables
Use `.env.example` once added:
- `DATABASE_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `SESSION_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_SITE_URL`

## Deployment Target
- Source: GitHub
- Runtime: Hostinger Node.js hosting

---
This repository starts with planning artifacts and issue-driven execution for the MVP.
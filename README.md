# 🧾 InvoiceGen

**InvoiceGen** is a modern full-stack invoice generator application built with **Next.js 15**, **React 19**, and **Tailwind CSS 4**, allowing users to securely log in with Google and create, preview, and manage professional invoices. It features a modular UI, live PDF previews, and stores data securely in a Supabase database.

---

## 🔗 Live Demo

- **Live App:** [https://invoice-gen-phi.vercel.app/](https://invoice-gen-phi.vercel.app/)
- **GitHub Repo:** [https://github.com/ve-edant/InvoiceGen](https://github.com/ve-edant/InvoiceGen)

---

## 🚀 Features

- Google OAuth login with NextAuth.js
- Modular invoice form using Redux Toolkit
- Live invoice preview and real-time total calculation
- Accordion-based UI built with Tailwind CSS
- Form validation using React Hook Form + Zod
- User-specific invoice storage using Supabase + Prisma
- Session-aware UI and secure API endpoints

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- Redux Toolkit
- React Hook Form
- Zod

### Backend & Auth
- NextAuth.js (Google Provider)
- Supabase (PostgreSQL)
- Prisma ORM

### Deployment
- Vercel (CI/CD & Hosting)

---

---

## 🧑‍💻 How It Works

1. **Authentication**  
   Google login is handled via NextAuth.js. JWT sessions store user identity, synced with Supabase through Prisma.

2. **Invoice Builder**  
   A step-wise accordion form captures user inputs like company info, client details, items, and notes.

3. **Live Preview**  
   Real-time preview of invoice with calculated totals using controlled form state and Redux.

4. **Data Persistence**  
   Invoices are saved in Supabase and scoped to each user using their JWT session.

5. **Access Control**  
   API routes check sessions via `next-auth/jwt`, allowing only the logged-in user's invoices to be fetched or modified.

---

## 📚 What I Learned
Google OAuth and JWT session handling using NextAuth.js

Secure user data fetching via server-side access control

Form architecture with React Hook Form and Zod

Modular UI design using Tailwind CSS and Redux state management

Full-stack development using Prisma and Supabase

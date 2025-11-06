# GitHub Repository Explorer

A web-based GitHub repository explorer built with **Next.js v16**, **TanStack Query**, and **Tailwind CSS**. This project allows users to search for GitHub repositories, view repository details, and browse contributors with an optimized client-server architecture.

---

## 🚀 Features

- Search GitHub repositories by keyword
- View repository details such as stars, forks, and description
- Browse repository contributors
- Highly optimized data fetching and caching using **TanStack Query**
- Responsive UI styled with **Tailwind CSS**

---

## 🧰 Tech Stack

| Library/Tool | Description |
|--------------|-------------|
| **Next.js 16** | React-based framework with server-side rendering and routing |
| **TanStack Query** | Data fetching and caching for remote APIs |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **GitHub REST API** | Data source for repository information |

---

## 📦 Installation

Make sure you have the following installed:

- **Node.js 18+**
- **npm** or **yarn**

Clone the project:

```bash
git clone https://github.com/akinunal/Ryzebeyond-task.git
cd Ryzebeyond-task
```

Install dependencies:

```bash
npm install
# or
yarn install
```

---

## ▶️ Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Then open your browser and navigate to:

```
http://localhost:3000
```

To create a production build:

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── app/
│   ├── page.tsx          # Main search interface
│   ├── repos/[owner]/[repo]/page.tsx  # Dynamic repository detail pages
│   ├── components        # Reusable UI components and contexts
│   ├── hooks             # Custom hooks
│   ├── services          # Custom TanStack Query hooks and APIs
├── types/                # Typescript Files

```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push to branch (`git push origin feature/my-feature`)
5. Open a Pull Request

import { ICommandCard } from "@/types/global.type";

export const nextCommands : ICommandCard[] = [
    {
        title: "Project Setup",
        commands: [
            { cmd: "npx create-next-app@latest my-app", desc: "# Create a new Next.js project" },
            { cmd: "cd my-app", desc: "# Navigate into project directory" },
            { cmd: "npm install", desc: "# Install dependencies" },
            { cmd: "npm run dev", desc: "# Start development server" },
            { cmd: "npm run build", desc: "# Build for production" },
            { cmd: "npm start", desc: "# Start production server" },
            { cmd: "npm run lint", desc: "# Run linter" }
        ]
    },
    {
        title: "Environment & Config",
        commands: [
            { cmd: "touch .env.local", desc: "# Create local environment file" },
            { cmd: "code .env.local", desc: "# Open env file in VSCode" },
            { cmd: "echo 'NEXT_PUBLIC_API_URL=https://api.example.com' >> .env.local", desc: "# Add env variable" }
        ]
    },
    {
        title: "Dependencies & Packages",
        commands: [
            { cmd: "npm install react react-dom next", desc: "# Install Next.js manually" },
            { cmd: "npm install axios", desc: "# Install Axios for API requests" },
            { cmd: "npm install next-auth", desc: "# Install NextAuth for authentication" },
            { cmd: "npm install @prisma/client", desc: "# Install Prisma client" },
            { cmd: "npm install tailwindcss postcss autoprefixer", desc: "# Install Tailwind CSS" },
            { cmd: "npx tailwindcss init -p", desc: "# Initialize Tailwind config" }
        ]
    },
    {
        title: "Code Quality & Formatting",
        commands: [
            { cmd: "npm install eslint --save-dev", desc: "# Install ESLint" },
            { cmd: "npx eslint .", desc: "# Lint all files" },
            { cmd: "npm install prettier --save-dev", desc: "# Install Prettier" },
            { cmd: "npx prettier --write .", desc: "# Format all files" }
        ]
    },
    {
        title: "Development Utilities",
        commands: [
            { cmd: "npm run dev", desc: "# Run local dev server" },
            { cmd: "npm run build", desc: "# Build for production" },
            { cmd: "npm start", desc: "# Start built app" },
            { cmd: "npm run lint", desc: "# Run linter" },
            { cmd: "npm run format", desc: "# Format project (if setup)" },
            { cmd: "next info", desc: "# Print environment info" }
        ]
    },
    {
        title: "Deployment",
        commands: [
            { cmd: "npm run build", desc: "# Build project for deployment" },
            { cmd: "npm start", desc: "# Run production build" },
            { cmd: "npx vercel", desc: "# Deploy to Vercel" },
            { cmd: "npx vercel --prod", desc: "# Deploy production version" },
            { cmd: "next export", desc: "# Export static site build" }
        ]
    },
    {
        title: "Server Management (VPS/PM2)",
        commands: [
            { cmd: "npm install -g pm2", desc: "# Install PM2 globally" },
            { cmd: "pm2 start npm --name 'next-app' -- run start", desc: "# Run Next.js in PM2" },
            { cmd: "pm2 restart next-app", desc: "# Restart app" },
            { cmd: "pm2 logs next-app", desc: "# View app logs" },
            { cmd: "pm2 stop next-app", desc: "# Stop app" },
            { cmd: "pm2 save", desc: "# Save PM2 process list" },
            { cmd: "pm2 startup", desc: "# Auto-start PM2 on boot" }
        ]
    },
    {
        title: "Misc Tools",
        commands: [
            { cmd: "npx next telemetry disable", desc: "# Disable Next.js telemetry" },
            { cmd: "npx next telemetry status", desc: "# Check telemetry status" },
            { cmd: "npx next info", desc: "# Show system info" },
            { cmd: "npx next lint", desc: "# Run lint via Next CLI" }
        ]
    }
];

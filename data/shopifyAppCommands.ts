import { ICommandCard } from "@/types/global.type";

export const shopifyAppCommands: ICommandCard[] = [
    {
        title: "Installation & Setup",
        commands: [
            { cmd: "npm install -g @shopify/cli @shopify/app", desc: "# Install Shopify CLI globally for apps" },
            { cmd: "shopify version", desc: "# Check Shopify CLI version" },
            { cmd: "shopify login --store your-store-name.myshopify.com", desc: "# Login to your Shopify store" },
            { cmd: "shopify logout", desc: "# Logout from Shopify CLI" },
            { cmd: "shopify whoami", desc: "# Check logged in account" }
        ]
    },
    {
        title: "App Creation",
        commands: [
            { cmd: "shopify app create node", desc: "# Create a new Node.js Shopify app" },
            { cmd: "shopify app create react", desc: "# Create a new React-based Shopify app" },
            { cmd: "shopify app create remix", desc: "# Create a new Remix Shopify app" },
            { cmd: "shopify app create <template> --name my-app", desc: "# Create app with specific template and name" }
        ]
    },
    {
        title: "Development",
        commands: [
            { cmd: "shopify app dev", desc: "# Start app development server (ngrok + Shopify integration)" },
            { cmd: "shopify app dev --store your-store.myshopify.com", desc: "# Run dev server for specific store" },
            { cmd: "shopify app generate extension", desc: "# Generate a new app extension" },
            { cmd: "shopify app generate webhook", desc: "# Generate webhook handler in app" },
            { cmd: "shopify app generate page", desc: "# Generate new app page" }
        ]
    },
    {
        title: "Environment & Configuration",
        commands: [
            { cmd: "touch .env", desc: "# Create environment file for API keys" },
            { cmd: "shopify app configure", desc: "# Configure app settings" },
            { cmd: "shopify app generate api-key", desc: "# Generate API key for app" },
            { cmd: "shopify app update", desc: "# Update Shopify CLI to latest version" }
        ]
    },
    {
        title: "Testing & Debugging",
        commands: [
            { cmd: "shopify app open", desc: "# Open app in browser" },
            { cmd: "shopify app logs", desc: "# View app logs" },
            { cmd: "shopify app test", desc: "# Run app tests if configured" },
            { cmd: "shopify app validate", desc: "# Validate app setup and configuration" }
        ]
    },
    {
        title: "Deployment",
        commands: [
            { cmd: "shopify app deploy", desc: "# Deploy app to Shopify" },
            { cmd: "shopify app deploy --env production", desc: "# Deploy to production environment" },
            { cmd: "shopify app deploy --env staging", desc: "# Deploy to staging environment" },
            { cmd: "shopify app publish", desc: "# Submit app to Shopify App Store" }
        ]
    },
    {
        title: "Version Control Integration",
        commands: [
            { cmd: "git init", desc: "# Initialize Git repository" },
            { cmd: "git add .", desc: "# Stage all files" },
            { cmd: "git commit -m 'Initial Shopify app setup'", desc: "# Commit changes" },
            { cmd: "git push origin main", desc: "# Push to remote repository" }
        ]
    },
    {
        title: "Helpers & Utilities",
        commands: [
            { cmd: "shopify app generate webhook", desc: "# Add webhook to app" },
            { cmd: "shopify app generate function", desc: "# Generate Shopify Function" },
            { cmd: "shopify app help", desc: "# Show all app-related CLI commands" }
        ]
    }
];

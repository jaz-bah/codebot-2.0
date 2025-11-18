import { ICommandCard } from "@/types/global.type";

export const shopifyCliCommands: ICommandCard[] = [
  {
    title: "Installation & Setup",
    commands: [
      {
        cmd: "npm install -g @shopify/cli @shopify/theme",
        desc: "# Install Shopify CLI globally",
      },
      { cmd: "shopify version", desc: "# Check Shopify CLI version" },
      {
        cmd: "shopify login --store your-store-name.myshopify.com",
        desc: "# Login to your Shopify store",
      },
      { cmd: "shopify logout", desc: "# Logout from Shopify CLI" },
      { cmd: "shopify whoami", desc: "# Check which account is logged in" },
    ],
  },
  {
    title: "Theme Initialization",
    commands: [
      {
        cmd: "shopify theme init",
        desc: "# Create a new theme from default template",
      },
      {
        cmd: "shopify theme init my-theme",
        desc: "# Create a new theme in a specific folder",
      },
      {
        cmd: "shopify theme init --clone <repo-url>",
        desc: "# Initialize theme by cloning Git repo",
      },
    ],
  },
  {
    title: "Local Development",
    commands: [
      { cmd: "shopify theme dev", desc: "# Start local development server" },
      {
        cmd: "shopify theme dev --store your-store.myshopify.com",
        desc: "# Run dev server for a specific store",
      },
      {
        cmd: "shopify theme dev --live-reload",
        desc: "# Enable live reload during development",
      },
      {
        cmd: "shopify theme dev --host 0.0.0.0",
        desc: "# Make theme accessible on LAN",
      },
    ],
  },
  {
    title: "Theme Upload & Deployment",
    commands: [
      {
        cmd: "shopify theme push",
        desc: "# Upload current theme to Shopify store",
      },
      {
        cmd: "shopify theme push --unpublished",
        desc: "# Push theme as unpublished (draft)",
      },
      {
        cmd: "shopify theme push --allow-live",
        desc: "# Push directly to the live theme",
      },
      {
        cmd: "shopify theme publish",
        desc: "# Publish theme as the live theme",
      },
      {
        cmd: "shopify theme pull",
        desc: "# Download current theme from Shopify store",
      },
    ],
  },
  {
    title: "Theme Management",
    commands: [
      { cmd: "shopify theme list", desc: "# List all themes in your store" },
      {
        cmd: "shopify theme delete --theme <id>",
        desc: "# Delete a specific theme by ID",
      },
      { cmd: "shopify theme open", desc: "# Open theme in browser" },
      { cmd: "shopify theme info", desc: "# Show current theme info" },
      {
        cmd: "shopify theme check",
        desc: "# Validate theme for errors & best practices",
      },
    ],
  },
  {
    title: "Environment & Configuration",
    commands: [
      { cmd: "shopify logout", desc: "# Logout current user" },
      { cmd: "shopify switch", desc: "# Switch between stores" },
      { cmd: "shopify theme access", desc: "# Manage store access tokens" },
      { cmd: "shopify update", desc: "# Update Shopify CLI to latest version" },
    ],
  },
  {
    title: "Version Control Integration",
    commands: [
      { cmd: "git init", desc: "# Initialize a new Git repository" },
      { cmd: "git add .", desc: "# Add all theme files" },
      {
        cmd: "git commit -m 'Initial Shopify theme setup'",
        desc: "# Commit changes",
      },
      {
        cmd: "git push origin main",
        desc: "# Push theme code to remote repository",
      },
    ],
  },
  {
    title: "Helpers & Debugging",
    commands: [
      { cmd: "shopify theme validate", desc: "# Validate your theme code" },
      { cmd: "shopify theme check", desc: "# Run automated theme checks" },
      { cmd: "shopify theme info", desc: "# Show current theme info" },
      {
        cmd: "shopify theme pull --json",
        desc: "# Download theme as JSON for debugging",
      },
    ],
  },
];

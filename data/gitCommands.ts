import { ICommandCard } from "@/types/global.type";

export const gitCommands : ICommandCard[] = [
    {
        title: "Setup & Configuration",
        commands: [
            { cmd: "git config --global user.name 'Your Name'", desc: "# Set your Git username" },
            { cmd: "git config --global user.email 'you@example.com'", desc: "# Set your Git email" },
            { cmd: "git config --list", desc: "# View all Git configurations" }
        ]
    },
    {
        title: "Starting a Repository",
        commands: [
            { cmd: "git init", desc: "# Initialize a new Git repository" },
            { cmd: "git clone <repo-url>", desc: "# Clone a remote repository" }
        ]
    },
    {
        title: "Basic Snapshotting",
        commands: [
            { cmd: "git status", desc: "# Check status of files" },
            { cmd: "git add <file>", desc: "# Add a specific file" },
            { cmd: "git add .", desc: "# Add all changes" },
            { cmd: "git commit -m 'Your commit message'", desc: "# Commit changes" },
            { cmd: "git diff", desc: "# Show unstaged changes" },
            { cmd: "git diff --staged", desc: "# Show staged changes" }
        ]
    },
    {
        title: "Branching & Merging",
        commands: [
            { cmd: "git branch", desc: "# List all branches" },
            { cmd: "git branch <branch-name>", desc: "# Create a new branch" },
            { cmd: "git checkout <branch-name>", desc: "# Switch to a branch" },
            { cmd: "git switch <branch-name>", desc: "# Modern alternative to checkout" },
            { cmd: "git checkout -b <branch-name>", desc: "# Create + switch to new branch" },
            { cmd: "git merge <branch-name>", desc: "# Merge a branch into current branch" },
            { cmd: "git branch -d <branch-name>", desc: "# Delete a branch" }
        ]
    },
    {
        title: "Remote Repositories",
        commands: [
            { cmd: "git remote -v", desc: "# View remote URLs" },
            { cmd: "git remote add origin <repo-url>", desc: "# Add remote repository" },
            { cmd: "git push -u origin <branch-name>", desc: "# Push branch for first time" },
            { cmd: "git push", desc: "# Push commits to remote" },
            { cmd: "git pull", desc: "# Pull updates from remote" },
            { cmd: "git fetch", desc: "# Fetch changes without merging" },
            { cmd: "git clone <repo-url>", desc: "# Clone remote repository" }
        ]
    },
    {
        title: "Undoing Changes",
        commands: [
            { cmd: "git restore <file>", desc: "# Discard changes in working directory" },
            { cmd: "git reset <file>", desc: "# Unstage a file" },
            { cmd: "git reset --hard", desc: "# Reset all changes to last commit" },
            { cmd: "git revert <commit-id>", desc: "# Revert a specific commit safely" },
            { cmd: "git checkout <commit-id>", desc: "# Checkout a specific commit" }
        ]
    },
    {
        title: "History & Logs",
        commands: [
            { cmd: "git log", desc: "# Show commit history" },
            { cmd: "git log --oneline --graph --decorate", desc: "# Compact visual commit history" },
            { cmd: "git show <commit-id>", desc: "# Show details of a specific commit" },
            { cmd: "git blame <file>", desc: "# Show who modified each line in a file" }
        ]
    },
    {
        title: "Stashing (Temporary Save)",
        commands: [
            { cmd: "git stash", desc: "# Stash current uncommitted changes" },
            { cmd: "git stash list", desc: "# List all stashed changes" },
            { cmd: "git stash pop", desc: "# Apply and remove latest stash" },
            { cmd: "git stash apply", desc: "# Apply latest stash without removing it" }
        ]
    },
    {
        title: "Cleaning Up",
        commands: [
            { cmd: "git clean -f", desc: "# Remove untracked files" },
            { cmd: "git clean -fd", desc: "# Remove untracked files and directories" }
        ]
    },
    {
        title: "Tagging (Releases)",
        commands: [
            { cmd: "git tag", desc: "# List all tags" },
            { cmd: "git tag <tagname>", desc: "# Create a new tag" },
            { cmd: "git push origin <tagname>", desc: "# Push a specific tag to remote" },
            { cmd: "git push origin --tags", desc: "# Push all tags to remote" }
        ]
    }
];

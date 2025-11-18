import { ICommandCard } from "@/types/global.type";

export const vpsCommands: ICommandCard[] = [
    {
        title: "Connection & Access",
        commands: [
            { cmd: "ssh user@your_server_ip", desc: "# Connect to your VPS via SSH" },
            { cmd: "ssh -p 2222 user@your_server_ip", desc: "# Connect to VPS with a custom port" },
            { cmd: "exit", desc: "# Log out from the SSH session" },
            { cmd: "scp file.txt user@your_server_ip:/path", desc: "# Copy file to remote server" },
            { cmd: "scp user@your_server_ip:/path/file.txt .", desc: "# Copy file from server to local" }
        ]
    },
    {
        title: "System Info & Monitoring",
        commands: [
            { cmd: "hostname", desc: "# Show server hostname" },
            { cmd: "uname -a", desc: "# Show system information" },
            { cmd: "top", desc: "# Monitor running processes live" },
            { cmd: "htop", desc: "# Better process viewer (install first)" },
            { cmd: "df -h", desc: "# Check disk space usage" },
            { cmd: "free -m", desc: "# Show memory usage in MB" },
            { cmd: "uptime", desc: "# Show system uptime" },
            { cmd: "who", desc: "# Show who is logged in" }
        ]
    },
    {
        title: "System Management",
        commands: [
            { cmd: "sudo apt update", desc: "# Update package list" },
            { cmd: "sudo apt upgrade -y", desc: "# Upgrade all packages" },
            { cmd: "sudo reboot", desc: "# Reboot the server" },
            { cmd: "sudo shutdown now", desc: "# Shut down immediately" },
            { cmd: "sudo shutdown -r now", desc: "# Restart immediately" }
        ]
    },
    {
        title: "File & Directory Management",
        commands: [
            { cmd: "ls -la", desc: "# List files and folders (detailed)" },
            { cmd: "cd /path/to/folder", desc: "# Navigate to a folder" },
            { cmd: "mkdir myfolder", desc: "# Create a new directory" },
            { cmd: "rm file.txt", desc: "# Delete a file" },
            { cmd: "rm -rf folder", desc: "# Delete a folder and its contents" },
            { cmd: "cp file1.txt file2.txt", desc: "# Copy a file" },
            { cmd: "mv file.txt /new/path", desc: "# Move or rename a file" },
            { cmd: "cat file.txt", desc: "# View file contents" },
            { cmd: "nano file.txt", desc: "# Edit file using nano editor" },
            { cmd: "touch newfile.txt", desc: "# Create an empty file" }
        ]
    },
    {
        title: "User & Permission Management",
        commands: [
            { cmd: "sudo adduser newuser", desc: "# Add a new user" },
            { cmd: "sudo userdel username", desc: "# Delete a user" },
            { cmd: "sudo passwd username", desc: "# Change user password" },
            { cmd: "sudo usermod -aG sudo username", desc: "# Give user sudo privileges" },
            { cmd: "chown user:user file.txt", desc: "# Change file owner" },
            { cmd: "chmod 755 file.txt", desc: "# Change file permissions" }
        ]
    },
    {
        title: "Networking",
        commands: [
            { cmd: "ip a", desc: "# Show IP address info" },
            { cmd: "ping google.com", desc: "# Test network connection" },
            { cmd: "netstat -tuln", desc: "# Show open ports" },
            { cmd: "curl ifconfig.me", desc: "# Show your public IP" },
            { cmd: "ufw status", desc: "# Check firewall status" },
            { cmd: "sudo ufw allow 22", desc: "# Allow SSH (port 22)" },
            { cmd: "sudo ufw enable", desc: "# Enable firewall" }
        ]
    },
    {
        title: "Process & Service Management",
        commands: [
            { cmd: "ps aux", desc: "# Show running processes" },
            { cmd: "sudo systemctl status nginx", desc: "# Check status of a service (example: nginx)" },
            { cmd: "sudo systemctl start nginx", desc: "# Start service" },
            { cmd: "sudo systemctl stop nginx", desc: "# Stop service" },
            { cmd: "sudo systemctl restart nginx", desc: "# Restart service" },
            { cmd: "sudo systemctl enable nginx", desc: "# Enable service at startup" }
        ]
    },
    {
        title: "Package Management (Ubuntu/Debian)",
        commands: [
            { cmd: "sudo apt install nginx -y", desc: "# Install a package (example: nginx)" },
            { cmd: "sudo apt remove nginx -y", desc: "# Remove a package" },
            { cmd: "sudo apt autoremove -y", desc: "# Clean unused packages" },
            { cmd: "dpkg -l", desc: "# List all installed packages" }
        ]
    },
    {
        title: "Security & Firewall",
        commands: [
            { cmd: "sudo ufw allow 80,443/tcp", desc: "# Allow HTTP and HTTPS traffic" },
            { cmd: "sudo ufw deny 23", desc: "# Block Telnet port" },
            { cmd: "sudo ufw status verbose", desc: "# Detailed firewall rules" },
            { cmd: "sudo fail2ban-client status", desc: "# Check Fail2Ban status" }
        ]
    },
    {
        title: "Logs & Debugging",
        commands: [
            { cmd: "tail -f /var/log/syslog", desc: "# Watch system log in real-time" },
            { cmd: "cat /var/log/auth.log", desc: "# Show authentication log" },
            { cmd: "journalctl -u nginx", desc: "# View logs for a specific service" },
            { cmd: "dmesg | less", desc: "# Kernel and hardware messages" }
        ]
    }
];

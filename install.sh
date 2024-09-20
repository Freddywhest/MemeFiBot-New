#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if Node.js is installed
if command_exists node; then
  echo "Preparing to install npm packages..."
else
  echo "Node.js is not installed. Installing Node.js..."

  # Install Node.js (This assumes a Debian-based system like Ubuntu)
  curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
  sudo apt-get install -y nodejs

  # Verify installation
  if command_exists node; then
    echo "Node.js successfully installed."
  else
    echo "Failed to install Node.js. Exiting."
    exit 1
  fi
fi

# Install npm packages
echo "Installing npm packages..."
npm install

# Verify installation of npm packages
if [ $? -eq 0 ]; then
  echo "npm packages successfully installed."
else
  echo "Failed to install npm packages. Exiting."
  exit 1
fi

echo "Copying .env-example to .env..."
cp .env-example .env

echo "Please edit the .env file to add your API_ID and API_HASH."
read -p "Press any key to continue..."

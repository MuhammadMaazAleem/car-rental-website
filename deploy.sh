#!/bin/bash

# Azure deployment script for monorepo structure

echo "Starting deployment..."

# Install server dependencies
echo "Installing server dependencies..."
cd server
npm install --production
cd ..

# Install client dependencies and build
echo "Installing client dependencies..."
cd client
npm install
echo "Building client..."
npm run build
cd ..

echo "Deployment complete!"

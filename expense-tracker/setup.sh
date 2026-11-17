#!/bin/bash
echo "🚀 Installing Backend dependencies..."
cd backend && npm install
echo "🚀 Installing Frontend dependencies..."
cd ../frontend && npm install
echo "✨ All project dependencies installed successfully!"

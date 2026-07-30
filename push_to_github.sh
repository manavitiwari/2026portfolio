#!/bin/bash
# ==============================================================================
# Helper Script to Push Portfolio Code to GitHub
# Usage: ./push_to_github.sh [github-username] [repo-name]
# ==============================================================================

set -e

USERNAME=$1
REPO_NAME=$2

echo "🚀 Setting up Git tracking & GitHub deployment..."

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
  git init
  echo "✅ Initialized empty Git repository."
fi

# Stage all files
git add .
echo "✅ Staged all project files."

# Commit changes
if git diff-index --quiet HEAD -- 2>/dev/null; then
  echo "ℹ️ No changes to commit."
else
  git commit -m "feat: portfolio update with 1+ year experience, sketch drawing canvas, and guitar synth"
  echo "✅ Created Git commit."
fi

# Rename default branch to main
git branch -M main

# If parameters provided, add remote and push
if [ -n "$USERNAME" ] && [ -n "$REPO_NAME" ]; then
  REMOTE_URL="https://github.com/$USERNAME/$REPO_NAME.git"
  echo "🔗 Setting remote origin to $REMOTE_URL..."
  git remote remove origin 2>/dev/null || true
  git remote add origin "$REMOTE_URL"
  echo "⬆️ Pushing code to GitHub repository..."
  git push -u origin main
  echo "🎉 Success! Your code is updated on GitHub at $REMOTE_URL"
else
  echo ""
  echo "----------------------------------------------------------------------"
  echo "📌 Next Steps to Update Code to Your GitHub Account:"
  echo "1. Create a repository on GitHub (e.g. 'portfolio' or 'my-portfolio')."
  echo "2. Run this command in your terminal:"
  echo "   ./push_to_github.sh <your-github-username> <repo-name>"
  echo "   Example: ./push_to_github.sh manavitiwari my-portfolio"
  echo "----------------------------------------------------------------------"
fi

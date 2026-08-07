#!/bin/bash
# ==============================================================================
# Push Portfolio Code to GitHub Repository (Default: 2026portfolio)
# ==============================================================================

set -e

USERNAME=${1:-"manavitiwari"}
REPO_NAME=${2:-"2026portfolio"}

echo "🚀 Preparing Git deployment for GitHub repository '$USERNAME/$REPO_NAME'..."

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
  git init
  echo "✅ Initialized empty Git repository."
fi

# Stage all files
git add .
echo "✅ Staged all project files."

# Commit changes if any
if git diff-index --quiet HEAD -- 2>/dev/null; then
  echo "ℹ️ No uncommitted changes."
else
  git commit -m "feat: updated 2026 portfolio with 1+ year exp, sketch drawing canvas, and guitar synth"
  echo "✅ Created Git commit."
fi

# Set main branch
git branch -M main

REMOTE_URL="https://github.com/$USERNAME/$REPO_NAME.git"
echo "🔗 Remote Origin URL set to: $REMOTE_URL"
git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE_URL"

echo "⬆️ Pushing code to GitHub..."
git push -u origin main

echo "🎉 Success! All code updated on GitHub at $REMOTE_URL"

# Deploying Your Portfolio to GitHub Pages

Follow these steps to publish your portfolio online.

## 1. Create a GitHub Repository
1.  Go to [GitHub.com](https://github.com) and log in.
2.  Click the **+** icon in the top right and select **New repository**.
3.  Name your repository (e.g., `my-portfolio`).
4.  Keep it **Public**.
5.  Click **Create repository**.

## 2. Connect Your Project to GitHub
Open your terminal (in the project folder) and run these commands. Replace `<YOUR_GITHUB_USERNAME>` and `<REPO_NAME>` with your actual details.

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# PRO TIP: If you see "xcode license" errors, run this first:
# sudo xcodebuild -license

# Commit the changes
git commit -m "Initial commit"

# Link to your new GitHub repo
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<REPO_NAME>.git
# Example: git remote add origin https://github.com/Galib2003/my-portfolio.git

# Rename branch to main
git branch -M main

# Push your code
git push -u origin main
```

## 3. Configure the Project URL
You need to update two files with your repository name.

1.  **Open `vite.config.js`**:
    - Find: `base: '/<REPO_NAME>/',`
    - Change it to your actual repo name.
    - Example: `base: '/my-portfolio/',`

2.  **Open `package.json`**:
    - Find: `"homepage": "https://<GITHUB_USERNAME>.github.io/<REPO_NAME>",`
    - Change it to your actual URL.
    - Example: `"homepage": "https://Galib2003.github.io/my-portfolio",`

## 4. Deploy!
Run this command in your terminal:
```bash
npm run deploy
```

This will build your website and upload it to a special `gh-pages` branch.

## 5. Enable GitHub Pages
1.  Go to your repository on GitHub.
2.  Go to **Settings** > **Pages**.
3.  Under **Source**, ensure it is set to **Deploy from a branch**.
4.  Under **Branch**, select `gh-pages` / `/root` and click **Save**.
5.  Your site will be live at the link displayed there shortly!

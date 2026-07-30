# Modern Software Developer Portfolio

A modern, high-performance personal portfolio website built with HTML5, Vanilla CSS3 (glassmorphism design system), and JavaScript.

## 🌟 Highlights & Key Features

- **1+ Year Experience Showcase**: Highlighted in hero section, skills matrix, and timeline.
- **Bio & Extra-Curricular Hobbies**: Bio spotlighting love for **drawing sketches** and **playing guitar**.
- **🎨 Interactive Canvas Drawing Studio**:
  - Live HTML5 drawing board for sketching digital art.
  - Multi-color neon palette, brush size slider, eraser, and PNG export download.
- **🎸 Web Audio Acoustic Guitar Synthesizer**:
  - Real acoustic string pluck physics & audio synthesis.
  - Interactive fretboard strings + preset chord engine (C, G, Am, F, D, Em).
- **Projects Showcase**: Filterable project gallery with preview modals and GitHub links.
- **Responsive & Dynamic**: Glassmorphism dark mode aesthetics with smooth scroll reveal animations.
- **GitHub Integration**: Includes `./push_to_github.sh` for easy one-command pushing to your GitHub ID repository.

---

## 🛠️ Local Setup & Preview

To preview the website locally on your computer:

```bash
# Launch a local server using Python:
python3 -m http.server 8080
```
Then open your browser and navigate to: `http://localhost:8080`

---

## ⬆️ How to Push Code to Your GitHub Account

1. Open your terminal in this workspace folder.
2. Run the deployment script with your GitHub username and repository name:
   ```bash
   chmod +x push_to_github.sh
   ./push_to_github.sh <your-github-username> <repo-name>
   ```
   *Example:*
   ```bash
   ./push_to_github.sh manavitiwari my-portfolio
   ```

---

## 📁 File Structure

```
├── index.html            # Main HTML5 document
├── styles.css            # Custom CSS3 dark glassmorphic design system
├── script.js             # JavaScript logic (Web Audio Guitar, Canvas Studio, Filters)
├── push_to_github.sh     # Executable GitHub push helper script
├── README.md             # Project documentation
├── .gitignore            # Git exclusion rules
└── assets/               # Generated high-resolution images
    ├── hero_avatar.jpg
    ├── guitar_showcase.jpg
    ├── drawing_artwork.jpg
    └── project_preview.jpg
```

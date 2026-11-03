# Speed Dial for Chrome shortcut with AI Customizer 🚀

A premium, futuristic Chrome extension that overrides your default browser home screen, transforming your blank New Tab page into a high-performance productivity dashboard. 

Built using clean HTML, CSS, and vanilla JavaScript—utilizing secure Chrome storage APIs to manage workspace data locally on your machine.

---

## ✨ Features

- **Visual Speed Dial Capsules:** Group your favorite web links into modular, glassmorphism folders to organize your daily workflows (e.g., AI Assistant Hub, School Center, Entertainment Node).
- **Auto-Scrolling Grid Engine:** When a shortcut capsule holds more than 4 bookmarks, an elegant neon vertical scrollbar instantly enables to keep your multi-row grid compact.
- **Minimalist Web Search:** A centered, translucent Google search input bar lets you fire up search streams instantly.
- **"Sue" Theme Configurator:** An instant slide-out sidebar menu allowing users to switch between Futuristic Glass, Neon Cyberpunk, or Stealth Matte Black themes.
- **Dynamic Transparency Slider:** Tacitly adjust the layout opacity to balance font readability with your underlying custom background wallpaper.
- **Dual Time Clock Widgets:** Watch time sweep by with a mechanical analog ring ticking seamlessly behind a clean digital readout.
- **Support Engine:** An integrated Creator Donation module to allow users to securely tip development work.

---

## 🛠️ Local Installation & Testing Guide

You do not need to download this from the Web Store to use it! Follow these simple steps to run this extension locally on your browser for free:

1. **Download/Clone the Directory:** Copy this folder (`browser-speed-dial-ai`) directly onto your computer.
2. **Open Extension Panel:** Launch Google Chrome and navigate to `chrome://extensions/` in your address bar.
3. **Toggle Developer Engine:** In the top-right corner of the Extensions dashboard, turn **ON** the `Developer mode` switch.
4. **Mount the Package:** In the top-left corner, click the **Load unpacked** button.
5. **Select Folder:** Choose the `browser-speed-dial-ai` folder that contains all the project files.
6. **Launch:** Open a brand new Chrome tab to initialize your futuristic, custom dashboard!

---

## 📁 Repository Structure

```text
├── manifest.json   # Extension metadata, permissions configuration, and overrides
├── newtab.html     # Structural layout and skeleton of the dashboard workspace
├── style.css       # Variable theme sheets, grid metrics, and glassmorphic styling
├── script.js      # Dynamic clock logic, storage management, and UI rendering engine
├── icon16.png      # 16x16 pixel system icon profile
├── icon48.png      # 48x48 pixel web store display icon profile
└── icon128.png     # 128x128 pixel primary management icon profile
```

---

## 🔒 Privacy Focus

This extension is built completely privacy-first. All custom website folders, color scheme variables, and custom background image choices are saved directly into your browser's local memory profile using the secure `chrome.storage.local` sandbox. Zero data tracking, zero third-party telemetry, and 100% cloudless background operation.

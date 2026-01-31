# SecurPass Generator

SecurPass is a professional-grade, mobile-responsive password generator built with modern web technologies. It focuses on security, usability, and a sleek aesthetic.

## 🚀 Features

- **Cryptographically Secure**: Uses `window.crypto.getRandomValues()` for generating random characters, ensuring higher security than standard `Math.random()`.
- **Customizable Constraints**: Choose between uppercase, lowercase, numbers, and symbols.
- **Variable Length**: Adjustable password length from 8 to 16 characters.
- **Smart Generation**: Guaranteed to include at least one character from each selected category.
- **One-Tap Copy**: Quick copy-to-clipboard functionality with visual feedback.
- **Responsive Design**: Beautifully crafted with Tailwind CSS and fully responsive across mobile, tablet, and desktop.
- **Modern UI**: Features a glassmorphism design with a dark theme and smooth transitions.

## 🛠️ Tech Stack

- **Framework**: React 19
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Heroicons (SVG)
- **Fonts**: Inter via Google Fonts

## 🔒 Security First

Unlike many online password generators that use predictable random number generators, SecurPass leverages the browser's built-in **Web Crypto API**. This ensures that the entropy source for your passwords is high-quality and suitable for cryptographic purposes.

- **Zero Server-Side Storage**: Passwords are generated entirely in your browser. No data is ever sent to a server.
- **No Predictable Patterns**: Every generation uses a Fisher-Yates shuffle to ensure character placement is entirely random.

## 📂 Project Structure

- `App.tsx`: The main application container and state management.
- `components/PasswordCard.tsx`: The primary UI component for the generator interface.
- `utils/generator.ts`: The core logic for secure character selection and shuffling.
- `index.html`: The entry point with Tailwind CSS and Font configurations.

## 💻 Development

This project is designed to run as an ES module directly in the browser using `esm.sh` for dependencies.

1. Open `index.html` in any modern web browser.
2. The `index.tsx` file serves as the React entry point, automatically importing `App.tsx`.

---
*Created by a Senior Frontend Engineer for maximum security and style.*

# Chrome Extension TypeScript Template

This template provides a clean and minimal setup for building Chrome Extensions using TypeScript, Parcel for bundling, and a well-organized project structure. It’s designed to help you quickly get started with developing Chrome Extensions.

---

## Features

- **TypeScript**: Write your extension in TypeScript for type safety and better developer experience.
- **Parcel**: Fast and zero-configuration bundling for development and production.
- **Modular Structure**: Organized into `background`, `content`, and `popup` scripts for clarity.
- **Manifest V3**: Built to support the latest Chrome Extension Manifest V3.
- **Hot Reloading**: Automatically reloads the extension during development when changes are made.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Google Chrome](https://www.google.com/chrome/) (for testing your extension)

---

## Getting Started

1. **Create a repo from using this template**
   
   Click on 'Use this template' and create a new repository. Choose a repo name and description.

2. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo-url
   cd chrome-extension-ts
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Development Mode**

   To start developing your extension, run:

   ```bash
   npm start
   ```

   This will start Parcel in watch mode, automatically rebuilding your extension whenever you make changes. The output will be generated in the `dist` directory.

5. **Build for Production**

   When you're ready to build your extension for production, run:

   ```bash
   npm run build
   ```

   This will generate optimized and minified files in the `dist/` directory. You can then load this directory as an unpacked extension in Chrome.

6. **Load the Extension in Chrome**

   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" in the top right corner.
   - Click "Load unpacked" and select the `dist` directory from your project.

## Project Structure

Here’s an overview of the project structure:

```
chrome-extension-ts/
├── .git/                   # Git version control files
├── .gitignore              # Specifies files to ignore in Git
├── .parcel-cache/          # Parcel cache files
├── .parcelrc               # Parcel configuration file
├── node_modules/           # Installed dependencies
├── package.json            # Project dependencies and scripts
├── src/                    # Source files
│   ├── background/         # Background script
│   ├── content/            # Content script
│   ├── popup/              # Popup UI
│   └── manifest.json
├── tests/                  # Test file
└── tsconfig.json           # TypeScript configuration
```

---

## Customizing the Template

- **Adding New Scripts**: Place new scripts in the `src` directory and update the `manifest.json` to include them.
- **Styling**: Add CSS files in the `src` directory and import them into your scripts or HTML files.
- **Manifest Configuration**: Modify `src/manifest.json` to suit your extension’s requirements.
- **TypeScript Configuration**: Adjust `tsconfig.json` to customize TypeScript settings.

## Scripts

- `npm start`: Starts the development server with hot reloading.
- `npm run build`: Builds the extension for production.
- `npm run clean`: Clears the Parcel cache and `dist` directory.

---

## Contributing

If you'd like to contribute to this template, feel free to open an issue or submit a pull request. Your contributions are welcome!
# 🎧 PodcastMini

**PodcastMini** is an AI-powered web application that transforms podcast audio into concise, readable summaries. It runs entirely in your browser using client-side AI, ensuring your data remains private and secure.


## ✨ Key Features

- **📂 Audio Upload**: Support for MP3 and WAV files via drag-and-drop or file selection.
- **📝 Transcript Input**: Paste your podcast transcripts directly for analysis.
- **🤖 AI Summarization**: Uses the **DistilBART** model (via `@xenova/transformers`) to generate high-quality summaries locally.
- **🔊 Text-to-Speech**: Listen to your summaries with built-in text-to-speech functionality.
- **🔒 Privacy-First**: All processing happens on your device using WebAssembly. No audio or text is sent to external servers.
- **🎨 Modern UI**: A beautiful, responsive interface built with React and Bootstrap 5.

## 🛠️ Technology Stack

- **Frontend**: [React](https://react.dev/) (v19)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **AI Runtime**: [ONNX Runtime Web](https://onnxruntime.ai/) & [@xenova/transformers](https://huggingface.co/docs/transformers.js)
- **Styling**: [Bootstrap 5](https://getbootstrap.com/) & Custom CSS
- **Language**: JavaScript (ES Modules)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository** (or download the source code):
    ```bash
    git clone <repository-url>
    cd podcastmini
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the application**:
    The terminal will show the local URL (usually `http://localhost:5173` or `http://localhost:5174`). Open this URL in your browser.

## 📖 How to Use

1.  **Upload Audio**: Drag and drop your podcast audio file (.mp3 or .wav) into the upload area.
2.  **Paste Transcript**: If you have the transcript, paste it into the text area.
    *Note: Currently, the app requires the transcript text to generate summaries. Future updates may include automatic speech-to-text.*
3.  **Generate**: Click the **"Generate Summary"** button.
    *First run note: The AI model (~300MB) will be downloaded to your browser cache. This may take a minute.*
4.  **Enjoy**: Read the summary or click "Play" to listen to it.

## 🐛 Troubleshooting

-   **"Unterminated JSX contents"**: This error has been fixed. Ensure you have the latest version of `App.jsx`.
-   **"Cannot read properties of undefined (reading 'registerBackend')"**: This ONNX Runtime error has been fixed by adjusting the configuration initialization.
-   **Model Loading**: If the model fails to load, check your internet connection (needed for the initial download) and refresh the page.

## 📄 License

This project is licensed under the MIT License.

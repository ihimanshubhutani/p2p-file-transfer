# Peer-to-Peer File Sharing App

## Overview

This is a simple peer-to-peer file sharing application built using Node.js, PeerJS, and EJS. It allows users to share files directly between their devices using peer-to-peer connections.

## Features

- **File Upload:** Users can upload files of any size.
- **PeerJS Integration:** PeerJS is used to establish peer-to-peer connections between devices.
- **QR Code Generation:** A QR code is generated for each uploaded file, providing a convenient way to share the download link.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [npm (Node Package Manager)](https://www.npmjs.com/get-npm) installed

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

2. **Install dependencies:**

   ```bash
   npm install

3. **Start the application:**

   ```bash
   npm start

4. **Open your browser and navigate to http://localhost:3000 to use the application.**

## Usage

1. Upload a file using the provided interface.
2. Share the generated QR code with others.
3. Others can scan the QR code to get the download link and download the file directly.

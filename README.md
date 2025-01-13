# Corporate Travel Project

This repository contains the Corporate Travel project. Follow these instructions to set up your development environment.

## Prerequisites

- Python 3.10.10
- Git

## Python Installation

### Windows
1. Download Python 3.10.10 from the [official Python website](https://www.python.org/downloads/release/python-31010/)
2. Run the installer
3. Make sure to check "Add Python 3.10 to PATH" during installation
4. Verify installation by opening Command Prompt and running:
   ```bash
   python --version
   ```

### macOS
1. Install Homebrew if not already installed:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. Install Python 3.10.10:
   ```bash
   brew install python@3.10
   ```
3. Verify installation:
   ```bash
   python3.10 --version
   ```

### Linux (Ubuntu/Debian)
1. Update package list and install prerequisites:
   ```bash
   sudo apt update
   sudo apt install software-properties-common
   ```
2. Add deadsnakes PPA:
   ```bash
   sudo add-apt-repository ppa:deadsnakes/ppa
   ```
3. Install Python 3.10.10:
   ```bash
   sudo apt install python3.10
   ```
4. Verify installation:
   ```bash
   python3.10 --version
   ```

## Project Setup

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd corporate-travel
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:

   **Windows**:
   ```bash
   .\venv\Scripts\activate
   ```

   **macOS/Linux**:
   ```bash
   source venv/bin/activate
   ```

4. Install project dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Verification

After installation, verify your setup:
1. Confirm you're in the virtual environment (you should see `(venv)` in your terminal prompt)
2. Verify Python version:
   ```bash
   python --version
   ```
   Should output: `Python 3.10.10`

## Troubleshooting

If you encounter any issues:
1. Ensure Python 3.10.10 is correctly installed and in your PATH
2. Make sure the virtual environment is activated
3. Try removing and recreating the virtual environment if dependencies fail to install

## Notes

- Always activate the virtual environment before working on the project
- Use `deactivate` command to exit the virtual environment when finished
- Update requirements.txt if you add new dependencies:
  ```bash
  pip freeze > requirements.txt
  ```
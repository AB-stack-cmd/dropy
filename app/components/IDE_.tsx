"use client"
import { useState, useEffect, useRef, useCallback } from "react";

// ─────────────────────────────────────────────────────────────
// TYPES & CONSTANTS
// ─────────────────────────────────────────────────────────────

const LANG_MAP = {
  py: { name: "Python", color: "#3b82f6", icon: "🐍", comment: "#" },
  js: { name: "JavaScript", color: "#f59e0b", icon: "⚡", comment: "//" },
  ts: { name: "TypeScript", color: "#60a5fa", icon: "💎", comment: "//" },
  tsx: { name: "TSX", color: "#38bdf8", icon: "⚛", comment: "//" },
  jsx: { name: "JSX", color: "#f97316", icon: "⚛", comment: "//" },
  html: { name: "HTML", color: "#ef4444", icon: "🌐", comment: "<!--" },
  css: { name: "CSS", color: "#a78bfa", icon: "🎨", comment: "/*" },
  json: { name: "JSON", color: "#34d399", icon: "📋", comment: "//" },
  md: { name: "Markdown", color: "#94a3b8", icon: "📝", comment: "//" },
  sh: { name: "Shell", color: "#4ade80", icon: "🔧", comment: "#" },
  rs: { name: "Rust", color: "#fb923c", icon: "🦀", comment: "//" },
  go: { name: "Go", color: "#67e8f9", icon: "🐹", comment: "//" },
};

const getExt = (name) => name.split(".").pop()?.toLowerCase() || "";
const getLang = (name) => LANG_MAP[getExt(name)] || { name: "Text", color: "#94a3b8", icon: "📄", comment: "#" };

const DEFAULT_FILES = [
  {
    id: "r", name: "my-project", type: "folder", open: true,
    children: [
      {
        id: "src", name: "src", type: "folder", open: true,
        children: [
          { id: "f1", name: "main.py", type: "file", content: `#!/usr/bin/env python3
"""Main entry point for the application."""

import sys
import os
from typing import Optional

def greet(name: str, formal: bool = False) -> str:
    """Generate a greeting message."""
    prefix = "Good day" if formal else "Hello"
    return f"{prefix}, {name}! 👋"

def fibonacci(n: int) -> list[int]:
    """Return first n Fibonacci numbers."""
    if n <= 0:
        return []
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]

def main() -> Optional[int]:
    print("=" * 48)
    print("  NovIDE Python Runtime")
    print("=" * 48)
    
    # Greeting
    print(greet("Developer"))
    print(greet("Sir", formal=True))
    
    # Data structures
    data = {
        "python": sys.version.split()[0],
        "platform": sys.platform,
        "cwd": os.getcwd(),
    }
    
    print("\\nEnvironment:")
    for k, v in data.items():
        print(f"  {k:12} → {v}")
    
    # Fibonacci
    fib = fibonacci(10)
    print(f"\\nFibonacci(10): {fib}")
    
    # List comprehension
    squares = {x: x**2 for x in range(1, 6)}
    print(f"\\nSquares: {squares}")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
` },
          { id: "f2", name: "app.ts", type: "file", content: `/**
 * TypeScript Application Entry Point
 * @version 1.0.0
 */

interface Config {
  host: string;
  port: number;
  debug: boolean;
  features: string[];
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

const config: Config = {
  host: "localhost",
  port: 3000,
  debug: process.env.NODE_ENV !== "production",
  features: ["auth", "api", "websocket"],
};

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  // Simulated async fetch
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {} as T,
        status: 200,
        message: "OK",
        timestamp: new Date(),
      });
    }, 100);
  });
}

function createLogger(prefix: string) {
  return {
    info: (msg: string) => console.log(\`[INFO] [\${prefix}] \${msg}\`),
    warn: (msg: string) => console.warn(\`[WARN] [\${prefix}] \${msg}\`),
    error: (msg: string) => console.error(\`[ERR]  [\${prefix}] \${msg}\`),
  };
}

const log = createLogger("App");

(async () => {
  log.info("Starting application...");
  log.info(\`Config: \${JSON.stringify(config, null, 2)}\`);
  
  const response = await fetchData<Config>("/api/config");
  log.info(\`Response status: \${response.status}\`);
  
  config.features.forEach((feature, i) => {
    log.info(\`Feature [\${i + 1}]: \${feature} ✓\`);
  });
  
  log.info("Application ready.");
})();
` },
          { id: "f3", name: "utils.py", type: "file", content: `"""Utility functions and helpers."""

from functools import lru_cache, wraps
from typing import Any, Callable, TypeVar
import time
import json

T = TypeVar("T")


def timer(func: Callable) -> Callable:
    """Decorator to measure execution time."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"⏱  {func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper


@lru_cache(maxsize=128)
def expensive_computation(n: int) -> int:
    """Cached computation — only runs once per unique input."""
    total = sum(i ** 2 for i in range(n))
    return total


@timer
def process_data(data: list[Any]) -> dict:
    """Process a list and return statistics."""
    if not data:
        return {}
    
    numbers = [x for x in data if isinstance(x, (int, float))]
    strings = [x for x in data if isinstance(x, str)]
    
    return {
        "total": len(data),
        "numbers": len(numbers),
        "strings": len(strings),
        "sum": sum(numbers) if numbers else 0,
        "mean": sum(numbers) / len(numbers) if numbers else 0,
        "max": max(numbers) if numbers else None,
        "min": min(numbers) if numbers else None,
    }


def flatten(nested: list, depth: int = -1) -> list:
    """Recursively flatten a nested list."""
    result = []
    for item in nested:
        if isinstance(item, list) and depth != 0:
            result.extend(flatten(item, depth - 1))
        else:
            result.append(item)
    return result


if __name__ == "__main__":
    sample = [1, "hello", 2.5, [3, 4], "world", 5]
    stats = process_data(sample)
    print(json.dumps(stats, indent=2))
    
    nested = [1, [2, [3, [4, 5]]]]
    print(f"Flat: {flatten(nested)}")
    print(f"Depth-1: {flatten(nested, 1)}")
` },
        ]
      },
      {
        id: "components", name: "components", type: "folder", open: false,
        children: [
          { id: "f4", name: "Button.tsx", type: "file", content: `import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

const VARIANTS = {
  primary:   "bg-blue-600 hover:bg-blue-500 text-white shadow-md",
  secondary: "bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border border-zinc-600",
  ghost:     "bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100",
  danger:    "bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30",
};

const SIZES = {
  sm: "text-xs px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2 gap-2",
  lg: "text-base px-5 py-2.5 gap-2.5",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={\`
        inline-flex items-center justify-center rounded-lg font-medium
        transition-all duration-150 active:scale-[0.97]
        disabled:opacity-40 disabled:cursor-not-allowed
        \${VARIANTS[variant]} \${SIZES[size]} \${className}
      \`}
    >
      {loading && (
        <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"/>
          <path fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" opacity="0.75"/>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
` },
          { id: "f5", name: "Input.tsx", type: "file", content: `import React, { useState } from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  error?: string;
  prefix?: string;
  suffix?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label, placeholder, type = "text",
  value, onChange, hint, error, prefix, suffix, required,
}) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <div className={\`
        flex items-center rounded-lg border overflow-hidden bg-zinc-900
        transition-all duration-200
        \${error   ? "border-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.15)]"
          : focused ? "border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.15)]"
          : "border-zinc-800 hover:border-zinc-700"}
      \`}>
        {prefix && <span className="pl-3 text-zinc-600 text-sm font-mono">{prefix}</span>}
        <input
          type={type} value={value} onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent py-2.5 px-3 text-sm text-zinc-100
                     placeholder-zinc-700 outline-none font-mono"
        />
        {suffix && <span className="pr-3 text-zinc-600 text-sm font-mono">{suffix}</span>}
      </div>
      {(hint || error) && (
        <p className={\`text-xs font-mono \${error ? "text-red-400" : "text-zinc-600"}\`}>
          {error || hint}
        </p>
      )}
    </div>
  );
};

export default Input;
` },
        ]
      },
      {
        id: "public", name: "public", type: "folder", open: false,
        children: [
          { id: "f6", name: "index.html", type: "file", content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NovIDE App</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-zinc-950 text-zinc-100 min-h-screen font-mono">
  <div id="root"></div>
  
  <header class="border-b border-zinc-800 px-8 py-5">
    <div class="max-w-5xl mx-auto flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-zinc-100">
          Nov<span class="text-blue-400">IDE</span>
        </h1>
        <p class="text-sm text-zinc-600 mt-1">Build. Ship. Repeat.</p>
      </div>
      <nav class="flex gap-6 text-sm text-zinc-500">
        <a href="#" class="hover:text-zinc-100 transition-colors">Docs</a>
        <a href="#" class="hover:text-zinc-100 transition-colors">GitHub</a>
        <a href="#" class="hover:text-zinc-100 transition-colors">Discord</a>
      </nav>
    </div>
  </header>
  
  <main class="max-w-5xl mx-auto px-8 py-16 space-y-12">
    <section class="space-y-6">
      <div class="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 
                  text-blue-400 text-xs font-mono px-3 py-1.5 rounded-full">
        <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
        Production Ready
      </div>
      <h2 class="text-5xl font-black text-zinc-100 leading-tight">
        Code with<br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          confidence
        </span>
      </h2>
      <p class="text-zinc-500 max-w-lg leading-relaxed">
        A modern IDE experience with multi-language support,
        intelligent package management, and real-time execution.
      </p>
      <div class="flex gap-3">
        <button class="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl
                       font-semibold text-sm transition-colors">
          Get Started →
        </button>
        <button class="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 
                       px-6 py-3 rounded-xl font-semibold text-sm transition-colors">
          View Source
        </button>
      </div>
    </section>
  </main>
</body>
</html>` },
          { id: "f7", name: "styles.css", type: "file", content: `/* Global Styles */
:root {
  --bg-primary:   #09090b;
  --bg-surface:   #18181b;
  --bg-elevated:  #27272a;
  --accent:       #3b82f6;
  --accent-glow:  rgba(59, 130, 246, 0.2);
  --text-primary: #f4f4f5;
  --text-muted:   #71717a;
  --border:       #3f3f46;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 14px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover { background: #52525b; }

/* Selection */
::selection {
  background: var(--accent-glow);
  color: var(--text-primary);
}

/* Focus ring */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

.fade-in { animation: fadeIn 0.3s ease forwards; }
` },
        ]
      },
      { id: "f8", name: "package.json", type: "file", content: `{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A NovIDE starter project",
  "main": "src/app.ts",
  "scripts": {
    "dev":    "tsx watch src/app.ts",
    "build":  "tsc --noEmit && esbuild src/app.ts --bundle --outfile=dist/app.js",
    "start":  "node dist/app.js",
    "test":   "vitest run",
    "lint":   "eslint . --ext .ts,.tsx",
    "format": "prettier --write ."
  },
  "dependencies": {},
  "devDependencies": {
    "typescript":  "^5.3.0",
    "tsx":         "^4.6.0",
    "esbuild":     "^0.20.0",
    "vitest":      "^1.2.0",
    "eslint":      "^8.56.0",
    "prettier":    "^3.2.0"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}` },
      { id: "f9", name: "requirements.txt", type: "file", content: `# Python dependencies
# Generated by pip freeze

requests>=2.31.0
numpy>=1.26.0
pandas>=2.1.0
fastapi>=0.109.0
uvicorn[standard]>=0.27.0
pydantic>=2.5.0
sqlalchemy>=2.0.0
alembic>=1.13.0
pytest>=7.4.0
black>=23.12.0
ruff>=0.1.0
mypy>=1.8.0
` },
      { id: "f10", name: "README.md", type: "file", content: `# 🚀 My NovIDE Project

> A modern, full-stack starter with Python + TypeScript

## Quick Start

\`\`\`bash
# Python
python -m venv .venv
source .venv/bin/activate   # or .venv\\Scripts\\activate on Windows
pip install -r requirements.txt
python src/main.py

# Node.js / TypeScript
npm install
npm run dev
\`\`\`

## Project Structure

\`\`\`
my-project/
├── src/
│   ├── main.py          # Python entry point
│   ├── app.ts           # TypeScript entry point
│   └── utils.py         # Utility functions
├── components/
│   ├── Button.tsx        # Button component
│   └── Input.tsx         # Input component
├── public/
│   ├── index.html        # HTML template
│   └── styles.css        # Global styles
├── package.json          # Node.js config
├── requirements.txt      # Python deps
└── README.md             # This file
\`\`\`

## Package Managers

| Language   | Manager | Command               |
|------------|---------|----------------------|
| Python     | pip     | \`pip install <pkg>\`  |
| JavaScript | npm     | \`npm install <pkg>\`  |
| JavaScript | yarn    | \`yarn add <pkg>\`     |
| JavaScript | pnpm    | \`pnpm add <pkg>\`     |
| Rust       | cargo   | \`cargo add <crate>\`  |
| Go         | go      | \`go get <module>\`    |

## License

MIT © 2026 NovIDE
` },
    ]
  }
];

// ─────────────────────────────────────────────────────────────
// PACKAGE REGISTRY DATA — simulates real registry responses
// ─────────────────────────────────────────────────────────────

const PYPI_POPULAR = [
  { name: "requests", version: "2.31.0", desc: "Python HTTP for Humans.", weekly: "80M", category: "HTTP" },
  { name: "numpy", version: "1.26.3", desc: "Fundamental package for scientific computing.", weekly: "45M", category: "Science" },
  { name: "pandas", version: "2.1.4", desc: "Powerful data analysis and manipulation library.", weekly: "35M", category: "Data" },
  { name: "fastapi", version: "0.109.0", desc: "Fast web framework for building APIs with Python.", weekly: "12M", category: "Web" },
  { name: "flask", version: "3.0.1", desc: "A lightweight WSGI web application framework.", weekly: "28M", category: "Web" },
  { name: "django", version: "5.0.1", desc: "The web framework for perfectionists.", weekly: "20M", category: "Web" },
  { name: "pydantic", version: "2.5.3", desc: "Data validation using Python type hints.", weekly: "55M", category: "Validation" },
  { name: "sqlalchemy", version: "2.0.25", desc: "The Python SQL Toolkit and ORM.", weekly: "18M", category: "Database" },
  { name: "pytest", version: "7.4.4", desc: "Simple and powerful testing framework.", weekly: "25M", category: "Testing" },
  { name: "black", version: "23.12.1", desc: "The uncompromising code formatter.", weekly: "15M", category: "Tooling" },
  { name: "httpx", version: "0.26.0", desc: "A next generation HTTP client.", weekly: "14M", category: "HTTP" },
  { name: "celery", version: "5.3.6", desc: "Distributed task queue.", weekly: "8M", category: "Queue" },
  { name: "redis", version: "5.0.1", desc: "Python client for Redis.", weekly: "12M", category: "Database" },
  { name: "uvicorn", version: "0.27.0", desc: "Lightning-fast ASGI server.", weekly: "18M", category: "Server" },
  { name: "boto3", version: "1.34.0", desc: "AWS SDK for Python.", weekly: "22M", category: "Cloud" },
  { name: "scrapy", version: "2.11.0", desc: "A fast web crawling framework.", weekly: "2M", category: "Scraping" },
  { name: "pillow", version: "10.2.0", desc: "Python Imaging Library fork.", weekly: "18M", category: "Image" },
  { name: "matplotlib", version: "3.8.2", desc: "Comprehensive plotting library.", weekly: "10M", category: "Visualization" },
  { name: "scikit-learn", version: "1.4.0", desc: "Machine learning in Python.", weekly: "8M", category: "ML" },
  { name: "tensorflow", version: "2.15.0", desc: "ML framework by Google.", weekly: "5M", category: "ML" },
  { name: "torch", version: "2.1.2", desc: "PyTorch deep learning framework.", weekly: "6M", category: "ML" },
  { name: "openai", version: "1.10.0", desc: "OpenAI Python API library.", weekly: "4M", category: "AI" },
  { name: "langchain", version: "0.1.0", desc: "Build LLM-powered applications.", weekly: "3M", category: "AI" },
  { name: "rich", version: "13.7.0", desc: "Rich text and beautiful formatting.", weekly: "8M", category: "CLI" },
  { name: "click", version: "8.1.7", desc: "Composable command line toolkit.", weekly: "25M", category: "CLI" },
  { name: "typer", version: "0.9.0", desc: "Build CLI apps based on type hints.", weekly: "4M", category: "CLI" },
  { name: "aiohttp", version: "3.9.1", desc: "Async HTTP client/server framework.", weekly: "12M", category: "Async" },
  { name: "cryptography", version: "42.0.0", desc: "Cryptographic recipes and primitives.", weekly: "35M", category: "Security" },
  { name: "paramiko", version: "3.4.0", desc: "SSH2 protocol library.", weekly: "8M", category: "SSH" },
  { name: "arrow", version: "1.3.0", desc: "Better dates and times for Python.", weekly: "6M", category: "Datetime" },
];

const NPM_POPULAR = [
  { name: "react", version: "18.2.0", desc: "React is a JavaScript library for building UIs.", weekly: "22M", category: "UI" },
  { name: "typescript", version: "5.3.3", desc: "TypeScript is a superset of JavaScript.", weekly: "35M", category: "Language" },
  { name: "next", version: "14.1.0", desc: "The React Framework for Production.", weekly: "5M", category: "Framework" },
  { name: "vite", version: "5.0.12", desc: "Next generation frontend tooling.", weekly: "8M", category: "Build" },
  { name: "tailwindcss", version: "3.4.1", desc: "Utility-first CSS framework.", weekly: "9M", category: "CSS" },
  { name: "express", version: "4.18.2", desc: "Fast, minimalist web framework for Node.js.", weekly: "25M", category: "Web" },
  { name: "lodash", version: "4.17.21", desc: "A modern JavaScript utility library.", weekly: "40M", category: "Utility" },
  { name: "axios", version: "1.6.5", desc: "Promise based HTTP client.", weekly: "45M", category: "HTTP" },
  { name: "zod", version: "3.22.4", desc: "TypeScript-first schema validation.", weekly: "12M", category: "Validation" },
  { name: "prisma", version: "5.8.1", desc: "Next-generation ORM for Node.js.", weekly: "2M", category: "Database" },
  { name: "vitest", version: "1.2.2", desc: "Blazing fast unit test framework.", weekly: "3M", category: "Testing" },
  { name: "playwright", version: "1.41.1", desc: "End-to-end testing framework.", weekly: "2M", category: "Testing" },
  { name: "zustand", version: "4.5.0", desc: "Bear necessities for state management.", weekly: "3M", category: "State" },
  { name: "framer-motion", version: "11.0.3", desc: "Animation library for React.", weekly: "2M", category: "Animation" },
  { name: "date-fns", version: "3.3.0", desc: "Modern JavaScript date utility library.", weekly: "20M", category: "DateTime" },
  { name: "sharp", version: "0.33.2", desc: "High performance image processing.", weekly: "5M", category: "Image" },
  { name: "socket.io", version: "4.7.4", desc: "Real-time bidirectional event-based comm.", weekly: "3M", category: "Realtime" },
  { name: "stripe", version: "14.14.0", desc: "Stripe API wrapper for Node.js.", weekly: "1M", category: "Payments" },
  { name: "openai", version: "4.26.0", desc: "OpenAI Node.js API library.", weekly: "2M", category: "AI" },
  { name: "@tanstack/query", version: "5.17.19", desc: "Async state management for React.", weekly: "4M", category: "State" },
];

const CARGO_POPULAR = [
  { name: "serde", version: "1.0.195", desc: "Serialization framework for Rust.", weekly: "145M", category: "Serialization" },
  { name: "tokio", version: "1.35.1", desc: "Async runtime for Rust.", weekly: "80M", category: "Async" },
  { name: "reqwest", version: "0.11.23", desc: "Ergonomic HTTP client for Rust.", weekly: "25M", category: "HTTP" },
  { name: "clap", version: "4.4.18", desc: "Command line argument parser.", weekly: "30M", category: "CLI" },
  { name: "anyhow", version: "1.0.79", desc: "Flexible error handling.", weekly: "40M", category: "Error" },
  { name: "axum", version: "0.7.4", desc: "Ergonomic web framework.", weekly: "12M", category: "Web" },
];

const GO_POPULAR = [
  { name: "github.com/gin-gonic/gin", version: "v1.9.1", desc: "HTTP web framework written in Go.", weekly: "—", category: "Web" },
  { name: "github.com/go-gorm/gorm", version: "v1.25.5", desc: "ORM library for Go.", weekly: "—", category: "Database" },
  { name: "github.com/stretchr/testify", version: "v1.8.4", desc: "Toolkit with common assertions.", weekly: "—", category: "Testing" },
  { name: "github.com/spf13/cobra", version: "v1.8.0", desc: "CLI library for Go.", weekly: "—", category: "CLI" },
  { name: "go.uber.org/zap", version: "v1.26.0", desc: "Blazing fast structured logging.", weekly: "—", category: "Logging" },
];

const REGISTRIES = {
  pip:  { name: "PyPI",      color: "#3b82f6",  icon: "🐍", packages: PYPI_POPULAR,  installCmd: (p) => `pip install ${p}`, uninstallCmd: (p) => `pip uninstall -y ${p}` },
  npm:  { name: "npm",       color: "#f59e0b",  icon: "⚡", packages: NPM_POPULAR,   installCmd: (p) => `npm install ${p}`, uninstallCmd: (p) => `npm uninstall ${p}` },
  yarn: { name: "yarn",      color: "#60a5fa",  icon: "🧶", packages: NPM_POPULAR,   installCmd: (p) => `yarn add ${p}`,    uninstallCmd: (p) => `yarn remove ${p}` },
  pnpm: { name: "pnpm",      color: "#f97316",  icon: "📦", packages: NPM_POPULAR,   installCmd: (p) => `pnpm add ${p}`,    uninstallCmd: (p) => `pnpm remove ${p}` },
  cargo:{ name: "Cargo",     color: "#fb923c",  icon: "🦀", packages: CARGO_POPULAR, installCmd: (p) => `cargo add ${p}`,   uninstallCmd: (p) => `cargo remove ${p}` },
  go:   { name: "go get",    color: "#67e8f9",  icon: "🐹", packages: GO_POPULAR,    installCmd: (p) => `go get ${p}`,      uninstallCmd: (p) => `go mod tidy` },
};

// ─────────────────────────────────────────────────────────────
// UTILITY: generate unique IDs
// ─────────────────────────────────────────────────────────────
let idSeq = 1000;
const genId = () => `n${++idSeq}`;

// ─────────────────────────────────────────────────────────────
// FILE TREE HELPERS
// ─────────────────────────────────────────────────────────────
function findNode(id, nodes) {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children) {
      const f = findNode(id, n.children);
      if (f) return f;
    }
  }
  return null;
}

function findParent(id, nodes, parent = null) {
  for (const n of nodes) {
    if (n.id === id) return parent;
    if (n.children) {
      const f = findParent(id, n.children, n);
      if (f !== undefined) return f;
    }
  }
  return undefined;
}

function getFilePath(id, nodes, path = "") {
  for (const n of nodes) {
    const cur = path ? `${path}/${n.name}` : n.name;
    if (n.id === id) return cur;
    if (n.children) {
      const f = getFilePath(id, n.children, cur);
      if (f) return f;
    }
  }
  return null;
}

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

// Resizer — vertical
function ResizerV({ onResize }) {
  const dragging = useRef(false);
  const lastX = useRef(0);

  const onMouseDown = (e) => {
    dragging.current = true;
    lastX.current = e.clientX;
    e.preventDefault();
  };

  useEffect(() => {
    const move = (e) => {
      if (!dragging.current) return;
      const delta = e.clientX - lastX.current;
      lastX.current = e.clientX;
      onResize(delta);
    };
    const up = () => { dragging.current = false; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [onResize]);

  return (
    <div
      onMouseDown={onMouseDown}
      className="w-1 flex-shrink-0 bg-zinc-800 hover:bg-blue-500/60 cursor-col-resize transition-colors duration-150 relative group"
    >
      <div className="absolute inset-y-0 -left-1 -right-1"/>
    </div>
  );
}

// Resizer — horizontal
function ResizerH({ onResize }) {
  const dragging = useRef(false);
  const lastY = useRef(0);

  const onMouseDown = (e) => {
    dragging.current = true;
    lastY.current = e.clientY;
    e.preventDefault();
  };

  useEffect(() => {
    const move = (e) => {
      if (!dragging.current) return;
      const delta = e.clientY - lastY.current;
      lastY.current = e.clientY;
      onResize(delta);
    };
    const up = () => { dragging.current = false; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [onResize]);

  return (
    <div
      onMouseDown={onMouseDown}
      className="h-1 flex-shrink-0 bg-zinc-800 hover:bg-blue-500/60 cursor-row-resize transition-colors duration-150 relative group"
    >
      <div className="absolute -top-1 -bottom-1 inset-x-0"/>
    </div>
  );
}

// File icon
function FileIcon({ name, size = 13 }) {
  const lang = getLang(name);
  const ext = getExt(name);
  const icons = {
    py:"🐍", ts:"💎", tsx:"⚛", js:"⚡", jsx:"⚛", html:"🌐", css:"🎨",
    json:"📋", md:"📝", sh:"🔧", rs:"🦀", go:"🐹", txt:"📄", lock:"🔒",
  };
  return <span style={{ fontSize: size }}>{icons[ext] || "📄"}</span>;
}

// Badge
function Bdg({ children, color = "#3b82f6" }) {
  return (
    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border"
      style={{ color, borderColor: `${color}40`, background: `${color}10` }}>
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// FILE TREE ITEM
// ─────────────────────────────────────────────────────────────
function TreeItem({ node, depth, activeId, onSelect, onToggle, onCtx }) {
  const lang = getLang(node.name);
  const isFile = node.type === "file";
  const isActive = activeId === node.id;

  return (
    <>
      <div
        className={`flex items-center gap-1.5 py-[3px] px-2 rounded-md cursor-pointer select-none group transition-colors duration-100 ${
          isActive ? "bg-blue-500/15 text-zinc-100" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
        }`}
        style={{ paddingLeft: `${8 + depth * 14}px` }}
        onClick={() => isFile ? onSelect(node.id) : onToggle(node.id)}
        onContextMenu={(e) => { e.preventDefault(); onCtx(e, node); }}
      >
        {!isFile && (
          <svg className={`w-3 h-3 flex-shrink-0 transition-transform duration-150 ${node.open ? "rotate-90" : ""} text-zinc-600`}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        )}
        {isFile ? (
          <FileIcon name={node.name}/>
        ) : (
          <span className="text-[13px]">{node.open ? "📂" : "📁"}</span>
        )}
        <span className="text-xs truncate flex-1">{node.name}</span>
        {isFile && (
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono"
            style={{ color: lang.color }}>
            {lang.name}
          </span>
        )}
      </div>
      {!isFile && node.open && node.children?.map(child => (
        <TreeItem key={child.id} node={child} depth={depth + 1} activeId={activeId}
          onSelect={onSelect} onToggle={onToggle} onCtx={onCtx}/>
      ))}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// SYNTAX HIGHLIGHTER (lightweight, no deps)
// ─────────────────────────────────────────────────────────────
function highlight(code, ext) {
  const e = (s) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  let c = e(code);

  if (ext === "json") {
    c = c
      .replace(/("(?:[^"\\]|\\.)*")\s*:/g, '<span style="color:#93c5fd">$1</span>:')
      .replace(/:\s*("(?:[^"\\]|\\.)*")/g, ': <span style="color:#86efac">$1</span>')
      .replace(/:\s*(\d+\.?\d*)/g, ': <span style="color:#fda4af">$1</span>')
      .replace(/\b(true|false|null)\b/g, '<span style="color:#c4b5fd">$1</span>');
    return c;
  }
  if (ext === "md") {
    c = c
      .replace(/^(#{1,6})\s(.+)$/gm, '<span style="color:#93c5fd">$1</span> <span style="color:#e2e8f0;font-weight:700">$2</span>')
      .replace(/\*\*(.*?)\*\*/g, '<span style="color:#fbbf24;font-weight:700">**$1**</span>')
      .replace(/`([^`]+)`/g, '<span style="color:#86efac;background:#1a2e1a;padding:0 3px;border-radius:3px">$1</span>')
      .replace(/^(\s*[-*+])\s/gm, '<span style="color:#60a5fa">$1</span> ')
      .replace(/^\s*(>\s.+)$/gm, '<span style="color:#94a3b8;font-style:italic">$1</span>');
    return c;
  }

  const COLORS = {
    keyword: "#c084fc",
    string:  "#86efac",
    comment: "#6272a4",
    number:  "#fda4af",
    builtin: "#60a5fa",
    decorator: "#fbbf24",
    type:    "#67e8f9",
    op:      "#94a3b8",
  };

  const pyKw = /\b(def|class|return|import|from|as|if|elif|else|for|while|try|except|finally|with|yield|lambda|pass|break|continue|and|or|not|in|is|None|True|False|async|await|raise|del|global|nonlocal|assert)\b/g;
  const tsKw = /\b(const|let|var|function|class|return|import|export|from|if|else|for|while|do|try|catch|finally|throw|new|typeof|instanceof|void|delete|async|await|yield|interface|type|enum|extends|implements|abstract|public|private|protected|static|readonly|declare|namespace|module|default|switch|case|break|continue|null|undefined|true|false)\b/g;

  const strings = /(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g;
  const comments_py = /#.*/g;
  const comments_c  = /\/\/.*/g;
  const comments_ml = /\/\*[\s\S]*?\*\//g;
  const numbers     = /\b(\d+\.?\d*)\b/g;
  const decorators  = /@\w+/g;
  const tsTypes     = /\b([A-Z][a-zA-Z0-9]*)\b/g;

  const placeholders = new Map();
  let pi = 0;
  const ph = (s) => { const k = `\x00${pi++}\x00`; placeholders.set(k, s); return k; };

  // Strings first
  c = c.replace(strings, (m) => ph(`<span style="color:${COLORS.string}">${m}</span>`));
  // Comments
  if (["py","sh","rb","pl"].includes(ext)) c = c.replace(comments_py, (m) => ph(`<span style="color:${COLORS.comment};font-style:italic">${m}</span>`));
  else { c = c.replace(comments_ml, (m) => ph(`<span style="color:${COLORS.comment};font-style:italic">${m}</span>`)); c = c.replace(comments_c, (m) => ph(`<span style="color:${COLORS.comment};font-style:italic">${m}</span>`)); }
  // Numbers
  c = c.replace(numbers, `<span style="color:${COLORS.number}">$1</span>`);
  // Decorators
  if (["py","ts","tsx","js","jsx"].includes(ext)) c = c.replace(decorators, (m) => `<span style="color:${COLORS.decorator}">${m}</span>`);
  // Types
  if (["ts","tsx"].includes(ext)) c = c.replace(tsTypes, (m) => `<span style="color:${COLORS.type}">${m}</span>`);
  // Keywords
  if (ext === "py") c = c.replace(pyKw, (m) => `<span style="color:${COLORS.keyword}">${m}</span>`);
  else c = c.replace(tsKw, (m) => `<span style="color:${COLORS.keyword}">${m}</span>`);

  // Restore placeholders
  placeholders.forEach((v, k) => { c = c.split(k).join(v); });
  return c;
}

// ─────────────────────────────────────────────────────────────
// EDITOR AREA
// ─────────────────────────────────────────────────────────────
function Editor({ content, filename, onChange, onRun }) {
  const [lineNums, setLineNums] = useState([]);
  const textRef = useRef(null);
  const ext = getExt(filename || "");
  const lang = getLang(filename || "");

  useEffect(() => {
    const lines = (content || "").split("\n").length;
    setLineNums(Array.from({ length: Math.max(lines, 1) }, (_, i) => i + 1));
  }, [content]);

  const handleKey = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.target;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newVal = ta.value.slice(0, start) + "    " + ta.value.slice(end);
      onChange(newVal);
      setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + 4; }, 0);
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "s") { e.preventDefault(); }
    if (e.key === "F5") { e.preventDefault(); onRun(); }
  };

  const highlighted = highlight(content || "", ext);

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-[#0d0e14] relative">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800/60 bg-zinc-950/80 flex-shrink-0">
        <span className="text-sm" style={{ color: lang.color }}>{lang.icon}</span>
        <span className="text-xs text-zinc-400 font-mono">{filename || "untitled"}</span>
        <div className="flex-1"/>
        <button
          onClick={onRun}
          className="flex items-center gap-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400 text-xs font-mono px-3 py-1.5 rounded-lg transition-all duration-150 active:scale-[0.97]"
        >
          <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor"><path d="M0 0l8 5-8 5V0z"/></svg>
          Run
        </button>
      </div>
      {/* Code area */}
      <div className="flex-1 overflow-auto flex" style={{ fontFamily: '"JetBrains Mono","Fira Code",monospace' }}>
        {/* Line numbers */}
        <div className="flex-shrink-0 select-none text-right pr-4 pt-4 pb-4 pl-4 text-zinc-700 text-xs leading-6 bg-[#0d0e14] border-r border-zinc-800/50 min-w-[48px]">
          {lineNums.map(n => <div key={n}>{n}</div>)}
        </div>
        {/* Textarea (editable) + highlight overlay */}
        <div className="flex-1 relative overflow-hidden">
          {/* Highlighted layer */}
          <pre className="absolute inset-0 pt-4 pr-4 pb-4 pl-4 text-xs leading-6 text-zinc-300 pointer-events-none overflow-hidden whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
          {/* Editable textarea */}
          <textarea
            ref={textRef}
            value={content || ""}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKey}
            spellCheck={false}
            autoComplete="off"
            className="absolute inset-0 w-full h-full pt-4 pr-4 pb-4 pl-4 text-xs leading-6 bg-transparent text-transparent caret-blue-400 outline-none resize-none selection:bg-blue-500/25"
            style={{ fontFamily: '"JetBrains Mono","Fira Code",monospace', caretColor: "#60a5fa" }}
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PACKAGE MANAGER PANEL
// ─────────────────────────────────────────────────────────────
function PackageManager({ onInstall, installedPkgs, onUninstall }) {
  const [registry, setRegistry] = useState("pip");
  const [search, setSearch] = useState("");
  const [searchTab, setSearchTab] = useState("browse"); // browse | installed
  const reg = REGISTRIES[registry];

  const filtered = reg.packages.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.desc.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const installedList = installedPkgs.filter(p => p.registry === registry);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Registry selector */}
      <div className="flex-shrink-0 p-3 border-b border-zinc-800 space-y-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {Object.entries(REGISTRIES).map(([key, r]) => (
            <button key={key}
              onClick={() => setRegistry(key)}
              className={`flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-lg border transition-all duration-150 ${
                registry === key
                  ? "border-blue-500/50 bg-blue-500/10 text-blue-300"
                  : "border-zinc-800 text-zinc-600 hover:border-zinc-700 hover:text-zinc-400"
              }`}
            >
              <span>{r.icon}</span>
              <span>{r.name}</span>
            </button>
          ))}
        </div>
        <div className="relative">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${reg.name} packages…`}
            className="w-full pl-8 pr-3 py-2 bg-zinc-900 border border-zinc-800 focus:border-blue-500/50 rounded-lg text-xs text-zinc-300 placeholder-zinc-600 outline-none font-mono transition-colors"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 flex border-b border-zinc-800">
        {["browse", "installed"].map(t => (
          <button key={t}
            onClick={() => setSearchTab(t)}
            className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
              searchTab === t ? "text-blue-400 border-b border-blue-500" : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            {t}{t === "installed" && installedList.length > 0 && ` (${installedList.length})`}
          </button>
        ))}
      </div>

      {/* Package list */}
      <div className="flex-1 overflow-y-auto">
        {searchTab === "browse" ? (
          filtered.length === 0 ? (
            <div className="p-6 text-center text-zinc-600 text-xs font-mono">No packages found for "{search}"</div>
          ) : (
            filtered.map(pkg => {
              const isInstalled = installedPkgs.some(p => p.name === pkg.name && p.registry === registry);
              return (
                <div key={pkg.name} className="px-3 py-2.5 border-b border-zinc-900 hover:bg-zinc-900/60 group transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-mono text-zinc-200 font-semibold">{pkg.name}</span>
                        <span className="text-[10px] font-mono text-zinc-600">v{pkg.version}</span>
                        <Bdg color={reg.color}>{pkg.category}</Bdg>
                        {pkg.weekly !== "—" && (
                          <span className="text-[10px] font-mono text-zinc-700">↓{pkg.weekly}/wk</span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-600 mt-0.5 leading-relaxed line-clamp-2">{pkg.desc}</p>
                    </div>
                    <button
                      onClick={() => isInstalled ? onUninstall(pkg.name, registry) : onInstall(pkg.name, pkg.version, registry)}
                      className={`flex-shrink-0 text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all duration-150 active:scale-95 ${
                        isInstalled
                          ? "border-zinc-700 text-zinc-500 hover:border-rose-500/50 hover:text-rose-400 hover:bg-rose-500/10"
                          : "border-blue-500/30 text-blue-400 hover:bg-blue-500/15 hover:border-blue-500/60"
                      }`}
                    >
                      {isInstalled ? "✕ Remove" : "+ Install"}
                    </button>
                  </div>
                </div>
              );
            })
          )
        ) : (
          installedList.length === 0 ? (
            <div className="p-6 text-center text-zinc-600 text-xs font-mono">
              No packages installed yet.<br/>
              <span className="text-zinc-700">Browse and click Install to add packages.</span>
            </div>
          ) : (
            installedList.map(pkg => (
              <div key={pkg.name} className="px-3 py-2.5 border-b border-zinc-900 hover:bg-zinc-900/60 group transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"/>
                    <span className="text-xs font-mono text-zinc-300">{pkg.name}</span>
                    <span className="text-[10px] font-mono text-zinc-600">v{pkg.version}</span>
                  </div>
                  <button
                    onClick={() => onUninstall(pkg.name, registry)}
                    className="text-[11px] font-mono px-2 py-1 rounded-lg border border-zinc-800 text-zinc-600 hover:border-rose-500/40 hover:text-rose-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TERMINAL
// ─────────────────────────────────────────────────────────────
function Terminal({ lines, onCommand, installedPkgs }) {
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [activeRegistry, setActiveRegistry] = useState("pip");

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [lines]);

  const submit = () => {
    const cmd = input.trim();
    if (!cmd) return;
    setHistory(h => [cmd, ...h.slice(0, 99)]);
    setHistIdx(-1);
    setInput("");
    onCommand(cmd);
  };

  const lineColor = {
    cmd:     "text-emerald-400",
    out:     "text-zinc-400",
    err:     "text-rose-400",
    info:    "text-amber-400",
    success: "text-emerald-400",
    system:  "text-sky-400",
    install: "text-blue-400",
    warn:    "text-yellow-400",
  };

  const linePrefix = {
    cmd:     "❯ ",
    err:     "✗ ",
    success: "✓ ",
    system:  "⚡ ",
    install: "📦 ",
    warn:    "⚠ ",
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-zinc-950">
      {/* Quick commands */}
      <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 border-b border-zinc-800 overflow-x-auto">
        <span className="text-[10px] font-mono text-zinc-700 mr-1 whitespace-nowrap">Quick:</span>
        {[
          { label: "pip install numpy",      cmd: "pip install numpy" },
          { label: "npm install react",       cmd: "npm install react" },
          { label: "pip list",               cmd: "pip list" },
          { label: "npm list",               cmd: "npm list" },
          { label: "cargo add serde",        cmd: "cargo add serde" },
          { label: "pip install requests",   cmd: "pip install requests" },
          { label: "yarn add tailwindcss",   cmd: "yarn add tailwindcss" },
          { label: "pnpm add vite",          cmd: "pnpm add vite" },
        ].map(q => (
          <button key={q.cmd}
            onClick={() => onCommand(q.cmd)}
            className="text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-800 text-zinc-600 hover:text-zinc-300 hover:border-zinc-700 whitespace-nowrap transition-colors"
          >
            {q.label}
          </button>
        ))}
      </div>
      {/* Output */}
      <div ref={outputRef} className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5" onClick={() => inputRef.current?.focus()}>
        {lines.map((line, i) => (
          <div key={i} className={`text-xs font-mono leading-5 ${lineColor[line.type] || "text-zinc-400"}`}>
            {line.type === "separator"
              ? <div className="border-t border-zinc-800/60 my-1"/>
              : <>
                  <span className="text-zinc-700 select-none">{linePrefix[line.type] || ""}</span>
                  <span style={{ whiteSpace: "pre-wrap" }}>{line.text}</span>
                </>
            }
          </div>
        ))}
      </div>
      {/* Input */}
      <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 border-t border-zinc-800 bg-zinc-950">
        <span className="text-emerald-500 text-sm font-mono select-none">❯</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") submit();
            if (e.key === "ArrowUp") {
              e.preventDefault();
              const next = Math.min(histIdx + 1, history.length - 1);
              setHistIdx(next);
              setInput(history[next] || "");
            }
            if (e.key === "ArrowDown") {
              e.preventDefault();
              const next = Math.max(histIdx - 1, -1);
              setHistIdx(next);
              setInput(next >= 0 ? history[next] : "");
            }
            if (e.key === "Tab") {
              e.preventDefault();
              // Auto-complete from packages
              const reg = REGISTRIES[activeRegistry];
              if (reg) {
                const partial = input.split(" ").pop();
                const match = reg.packages.find(p => p.name.startsWith(partial));
                if (match) {
                  const parts = input.split(" ");
                  parts[parts.length - 1] = match.name;
                  setInput(parts.join(" "));
                }
              }
            }
          }}
          placeholder='Type a command… (try "pip install flask")'
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent text-zinc-200 text-xs font-mono outline-none placeholder-zinc-800"
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTEXT MENU
// ─────────────────────────────────────────────────────────────
function CtxMenu({ pos, node, onClose, onNewFile, onNewFolder, onRename, onDelete }) {
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (!ref.current?.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="fixed z-50 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl shadow-black/60 py-1.5 min-w-[160px]"
      style={{ left: pos.x, top: pos.y }}>
      {node.type === "file" && (
        <button onClick={() => { onClose(); }} className="w-full text-left px-3 py-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
          📂 Open File
        </button>
      )}
      <button onClick={() => { onNewFile(node); onClose(); }} className="w-full text-left px-3 py-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
        📄 New File
      </button>
      <button onClick={() => { onNewFolder(node); onClose(); }} className="w-full text-left px-3 py-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
        📁 New Folder
      </button>
      <div className="border-t border-zinc-800 my-1"/>
      <button onClick={() => { onRename(node); onClose(); }} className="w-full text-left px-3 py-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
        ✏️ Rename
      </button>
      <div className="border-t border-zinc-800 my-1"/>
      <button onClick={() => { onDelete(node.id); onClose(); }} className="w-full text-left px-3 py-1.5 text-xs font-mono text-rose-500 hover:text-rose-300 hover:bg-rose-500/10 transition-colors">
        🗑 Delete
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────────────────────
function Modal({ title, onClose, onConfirm, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-80 shadow-2xl shadow-black/60"
        onClick={e => e.stopPropagation()}>
        <h3 className="text-sm font-semibold text-zinc-100 mb-4">{title}</h3>
        {children}
        <div className="flex gap-2 mt-4">
          <button onClick={onClose} className="flex-1 py-2 text-xs font-mono text-zinc-400 hover:text-zinc-100 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2 text-xs font-mono text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">Confirm</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────
export default function NovIDE() {
  // Layout
  const [sidebarW, setSidebarW] = useState(220);
  const [pkgPanelW, setPkgPanelW] = useState(260);
  const [terminalH, setTerminalH] = useState(220);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pkgPanelOpen, setPkgPanelOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [activePanel, setActivePanel] = useState("packages"); // packages | extensions

  // Files
  const [files, setFiles] = useState(DEFAULT_FILES);
  const [openTabs, setOpenTabs] = useState([{ id: "f1", name: "main.py" }]);
  const [activeTab, setActiveTab] = useState("f1");
  const [fileContents, setFileContents] = useState({});
  const [modifiedTabs, setModifiedTabs] = useState(new Set());

  // Terminal
  const [termLines, setTermLines] = useState([
    { type: "system", text: "NovIDE Terminal v1.0 — Multi-language Package Manager" },
    { type: "system", text: "Supports: pip · npm · yarn · pnpm · cargo · go get" },
    { type: "out",    text: "Type 'help' for available commands. Press Tab for autocomplete." },
    { type: "separator" },
  ]);

  // Packages
  const [installedPkgs, setInstalledPkgs] = useState([
    { name: "requests", version: "2.31.0", registry: "pip" },
    { name: "react", version: "18.2.0", registry: "npm" },
    { name: "typescript", version: "5.3.3", registry: "npm" },
  ]);

  // Context menu & modals
  const [ctxMenu, setCtxMenu] = useState(null);
  const [modal, setModal] = useState(null); // { type, node, value }

  // ── helpers ──
  const tlog = (type, text) => setTermLines(l => [...l, { type, text }]);

  const getContent = (id) => {
    if (fileContents[id] !== undefined) return fileContents[id];
    const node = findNode(id, files[0].children);
    return node?.content || "";
  };

  const openFile = (id) => {
    const node = findNode(id, files[0].children);
    if (!node || node.type !== "file") return;
    if (!openTabs.find(t => t.id === id)) {
      setOpenTabs(tabs => [...tabs, { id, name: node.name }]);
    }
    setActiveTab(id);
  };

  const closeTab = (id) => {
    const newTabs = openTabs.filter(t => t.id !== id);
    setOpenTabs(newTabs);
    setModifiedTabs(m => { const n = new Set(m); n.delete(id); return n; });
    if (activeTab === id) setActiveTab(newTabs[newTabs.length - 1]?.id || null);
  };

  const updateContent = (id, val) => {
    setFileContents(c => ({ ...c, [id]: val }));
    setModifiedTabs(m => new Set([...m, id]));
  };

  const saveFile = (id) => {
    const val = fileContents[id];
    if (val !== undefined) {
      setFiles(f => {
        const clone = JSON.parse(JSON.stringify(f));
        const node = findNode(id, clone[0].children);
        if (node) node.content = val;
        return clone;
      });
    }
    setModifiedTabs(m => { const n = new Set(m); n.delete(id); return n; });
    tlog("success", `Saved ${openTabs.find(t => t.id === id)?.name || id}`);
  };

  // ── Toggle folder ──
  const toggleFolder = (id) => {
    setFiles(f => {
      const clone = JSON.parse(JSON.stringify(f));
      const node = findNode(id, clone[0].children);
      if (node) node.open = !node.open;
      return clone;
    });
  };

  // ── Delete node ──
  const deleteNode = (id) => {
    setFiles(f => {
      const clone = JSON.parse(JSON.stringify(f));
      const removeFrom = (arr) => {
        const idx = arr.findIndex(n => n.id === id);
        if (idx !== -1) { arr.splice(idx, 1); return true; }
        for (const n of arr) if (n.children && removeFrom(n.children)) return true;
        return false;
      };
      removeFrom(clone[0].children);
      return clone;
    });
    setOpenTabs(tabs => tabs.filter(t => t.id !== id));
    if (activeTab === id) setActiveTab(null);
  };

  // ── Install package ──
  const installPkg = (name, version, registry) => {
    const reg = REGISTRIES[registry];
    tlog("separator");
    tlog("cmd", reg.installCmd(name));
    tlog("install", `Fetching ${name}@${version} from ${reg.name}…`);
    setTimeout(() => tlog("out", `Resolving dependencies…`), 200);
    setTimeout(() => tlog("out", `Downloading ${name}-${version}…`), 500);
    setTimeout(() => {
      tlog("success", `Successfully installed ${name}@${version}`);
      setInstalledPkgs(p => {
        if (p.some(x => x.name === name && x.registry === registry)) return p;
        return [...p, { name, version, registry }];
      });
    }, 900);
  };

  // ── Uninstall package ──
  const uninstallPkg = (name, registry) => {
    const reg = REGISTRIES[registry];
    tlog("separator");
    tlog("cmd", reg.uninstallCmd(name));
    setTimeout(() => {
      tlog("warn", `Removing ${name}…`);
      tlog("success", `Successfully removed ${name}`);
      setInstalledPkgs(p => p.filter(x => !(x.name === name && x.registry === registry)));
    }, 400);
  };

  // ── Run code ──
  const runCode = () => {
    if (!activeTab) return;
    const node = findNode(activeTab, files[0].children);
    if (!node) return;
    const content = getContent(activeTab);
    const ext = getExt(node.name);
    saveFile(activeTab);

    tlog("separator");
    tlog("cmd", `run ${node.name}`);
    tlog("system", `Executing: ${node.name}`);

    if (ext === "py") {
      setTimeout(() => {
        // Capture print statements
        const prints = [];
        const printRe = /print\s*\((.+)\)/g;
        let m;
        while ((m = printRe.exec(content)) !== null) {
          let expr = m[1].trim().replace(/f?["'`](.*?)["'`]/g, "$1").replace(/\{([^}]+)\}/g, "<$1>");
          prints.push(expr);
        }
        if (prints.length > 0) prints.forEach(p => tlog("out", p));
        else tlog("out", "(Script has no print() output)");
        tlog("success", `Process exited with code 0`);
      }, 300);
    } else if (["js", "ts", "tsx", "jsx"].includes(ext)) {
      const logs = [];
      const fake = { log: (...a) => logs.push(a.map(String).join(" ")), error: (...a) => logs.push("[err] " + a.map(String).join(" ")), info: (...a) => logs.push(a.map(String).join(" ")) };
      const fakeRequire = (m) => {
        if (m === "os") return { platform: () => "linux", arch: () => "x64" };
        if (m === "path") return { join: (...a) => a.join("/") };
        return {};
      };
      try {
        const fn = new Function("console", "require", "process", content);
        fn(fake, fakeRequire, { version: "v20.0.0", argv: ["node"], cwd: () => "/", env: {} });
      } catch (e) { logs.push("[error] " + e.message); }
      setTimeout(() => {
        logs.forEach(l => tlog(l.startsWith("[err") ? "err" : "out", l));
        tlog("success", "Process exited with code 0");
      }, 200);
    } else if (ext === "html") {
      const w = window.open("", "_blank");
      if (w) { w.document.write(content); w.document.close(); }
      tlog("success", "HTML preview opened in new window");
    } else if (ext === "json") {
      try { JSON.parse(content); tlog("success", "Valid JSON ✓"); }
      catch (e) { tlog("err", "Invalid JSON: " + e.message); }
    } else {
      tlog("info", `No runner for .${ext} files`);
    }
  };

  // ── Terminal command handler ──
  const handleCommand = useCallback((raw) => {
    const cmd = raw.trim();
    tlog("separator");
    tlog("cmd", cmd);

    const parts = cmd.split(/\s+/);
    const c = parts[0].toLowerCase();

    // ── pip ──
    if (c === "pip" || c === "pip3") {
      const sub = parts[1];
      if (sub === "install") {
        const pkgs = parts.slice(2).filter(p => !p.startsWith("-"));
        if (!pkgs.length) { tlog("err", "Usage: pip install <package>"); return; }
        pkgs.forEach(name => {
          const found = PYPI_POPULAR.find(p => p.name.toLowerCase() === name.toLowerCase());
          tlog("install", `Collecting ${name}…`);
          setTimeout(() => {
            tlog("out", `Downloading ${name}…`);
            setTimeout(() => {
              tlog("success", `Successfully installed ${name}${found ? `-${found.version}` : ""}`);
              setInstalledPkgs(prev => {
                if (prev.some(p => p.name === name && p.registry === "pip")) return prev;
                return [...prev, { name, version: found?.version || "latest", registry: "pip" }];
              });
            }, 600);
          }, 300);
        });
      } else if (sub === "uninstall") {
        const name = parts[2];
        if (!name) { tlog("err", "Usage: pip uninstall <package>"); return; }
        tlog("warn", `Uninstalling ${name}…`);
        setTimeout(() => {
          tlog("success", `Successfully uninstalled ${name}`);
          setInstalledPkgs(prev => prev.filter(p => !(p.name === name && p.registry === "pip")));
        }, 400);
      } else if (sub === "list") {
        const pips = installedPkgs.filter(p => p.registry === "pip");
        if (!pips.length) { tlog("out", "No packages installed."); return; }
        tlog("out", "Package                Version");
        tlog("out", "─────────────────────── ───────");
        pips.forEach(p => tlog("out", `${p.name.padEnd(24)}${p.version}`));
      } else if (sub === "freeze") {
        const pips = installedPkgs.filter(p => p.registry === "pip");
        pips.forEach(p => tlog("out", `${p.name}==${p.version}`));
      } else if (sub === "show") {
        const name = parts[2];
        const found = PYPI_POPULAR.find(p => p.name === name);
        if (found) {
          tlog("out", `Name: ${found.name}`);
          tlog("out", `Version: ${found.version}`);
          tlog("out", `Summary: ${found.desc}`);
        } else tlog("err", `Package ${name} not found`);
      } else if (!sub) {
        tlog("out", "pip <command>");
        tlog("out", "  install <pkg>    Install packages");
        tlog("out", "  uninstall <pkg>  Remove packages");
        tlog("out", "  list             List installed");
        tlog("out", "  freeze           Output requirements format");
        tlog("out", "  show <pkg>       Show package info");
      } else tlog("err", `Unknown pip command: ${sub}`);
      return;
    }

    // ── npm ──
    if (c === "npm") {
      const sub = parts[1];
      if (sub === "install" || sub === "i") {
        const pkgs = parts.slice(2).filter(p => !p.startsWith("-"));
        if (!pkgs.length) {
          tlog("info", "npm warn idealTree ...");
          tlog("success", "up to date, audited 0 packages");
          return;
        }
        pkgs.forEach(name => {
          const found = NPM_POPULAR.find(p => p.name === name);
          tlog("install", `npm: resolving ${name}…`);
          setTimeout(() => {
            tlog("success", `+ ${name}@${found?.version || "latest"}`);
            setInstalledPkgs(prev => {
              if (prev.some(p => p.name === name && p.registry === "npm")) return prev;
              return [...prev, { name, version: found?.version || "latest", registry: "npm" }];
            });
          }, 500);
        });
      } else if (sub === "uninstall" || sub === "remove" || sub === "rm") {
        const name = parts[2];
        setTimeout(() => {
          tlog("success", `removed 1 package: ${name}`);
          setInstalledPkgs(prev => prev.filter(p => !(p.name === name && p.registry === "npm")));
        }, 300);
      } else if (sub === "list" || sub === "ls") {
        const npms = installedPkgs.filter(p => p.registry === "npm");
        tlog("out", "my-project");
        npms.forEach(p => tlog("out", `  └─ ${p.name}@${p.version}`));
      } else if (sub === "run") {
        const script = parts[2];
        tlog("info", `> my-project@1.0.0 ${script}`);
        tlog("info", `> Running script: ${script}`);
      } else if (sub === "init") {
        tlog("out", 'Wrote to package.json:\n{\n  "name": "my-project",\n  "version": "1.0.0"\n}');
      } else {
        tlog("out", "Usage: npm <install|uninstall|list|run|init>");
      }
      return;
    }

    // ── yarn ──
    if (c === "yarn") {
      const sub = parts[1];
      if (sub === "add") {
        const name = parts[2];
        const found = NPM_POPULAR.find(p => p.name === name);
        tlog("install", `yarn add ${name}…`);
        setTimeout(() => {
          tlog("success", `✓ ${name}@${found?.version || "latest"}`);
          setInstalledPkgs(prev => {
            if (prev.some(p => p.name === name && p.registry === "yarn")) return prev;
            return [...prev, { name, version: found?.version || "latest", registry: "yarn" }];
          });
        }, 500);
      } else if (sub === "remove") {
        const name = parts[2];
        setTimeout(() => {
          tlog("success", `✓ Removed ${name}`);
          setInstalledPkgs(prev => prev.filter(p => !(p.name === name && p.registry === "yarn")));
        }, 300);
      } else if (!sub || sub === "install") {
        tlog("out", "[1/4] Resolving packages…");
        setTimeout(() => tlog("success", "Done in 0.12s."), 400);
      } else {
        tlog("out", "Usage: yarn <add|remove|install>");
      }
      return;
    }

    // ── pnpm ──
    if (c === "pnpm") {
      const sub = parts[1];
      if (sub === "add") {
        const name = parts[2];
        const found = NPM_POPULAR.find(p => p.name === name);
        tlog("install", `pnpm add ${name}…`);
        setTimeout(() => {
          tlog("success", `+ ${name} ${found?.version || "latest"}`);
          setInstalledPkgs(prev => {
            if (prev.some(p => p.name === name && p.registry === "pnpm")) return prev;
            return [...prev, { name, version: found?.version || "latest", registry: "pnpm" }];
          });
        }, 400);
      } else if (sub === "remove") {
        const name = parts[2];
        tlog("warn", `Removing ${name}…`);
        setTimeout(() => {
          tlog("success", `Removed ${name}`);
          setInstalledPkgs(prev => prev.filter(p => !(p.name === name && p.registry === "pnpm")));
        }, 300);
      } else {
        tlog("out", "Usage: pnpm <add|remove|install|list>");
      }
      return;
    }

    // ── cargo ──
    if (c === "cargo") {
      const sub = parts[1];
      if (sub === "add") {
        const name = parts[2];
        const found = CARGO_POPULAR.find(p => p.name === name);
        tlog("install", `    Updating crates.io index…`);
        setTimeout(() => {
          tlog("out", `      Adding ${name} v${found?.version || "latest"} to dependencies`);
          tlog("success", `       Added ${name} v${found?.version || "latest"}`);
          setInstalledPkgs(prev => {
            if (prev.some(p => p.name === name && p.registry === "cargo")) return prev;
            return [...prev, { name, version: found?.version || "latest", registry: "cargo" }];
          });
        }, 600);
      } else if (sub === "remove") {
        const name = parts[2];
        tlog("success", `Removed ${name} from Cargo.toml`);
        setInstalledPkgs(prev => prev.filter(p => !(p.name === name && p.registry === "cargo")));
      } else if (sub === "build") {
        tlog("out", "   Compiling my-project v1.0.0");
        setTimeout(() => tlog("success", "    Finished dev [unoptimized] target"), 800);
      } else if (sub === "run") {
        tlog("out", "   Compiling my-project v1.0.0");
        setTimeout(() => { tlog("success", "    Finished dev"); tlog("out", "     Running `target/debug/my-project`"); }, 800);
      } else {
        tlog("out", "Usage: cargo <add|remove|build|run|test>");
      }
      return;
    }

    // ── go ──
    if (c === "go") {
      const sub = parts[1];
      if (sub === "get") {
        const name = parts[2];
        const found = GO_POPULAR.find(p => p.name === name || name?.includes(p.name.split("/").pop()));
        tlog("install", `go: downloading ${name}…`);
        setTimeout(() => {
          tlog("success", `go: added ${name}`);
          setInstalledPkgs(prev => {
            if (prev.some(p => p.name === name && p.registry === "go")) return prev;
            return [...prev, { name: name || "unknown", version: found?.version || "latest", registry: "go" }];
          });
        }, 500);
      } else if (sub === "mod") {
        const subsub = parts[2];
        if (subsub === "tidy") tlog("success", "Tidied go.mod");
        else if (subsub === "init") tlog("success", `go: created module ${parts[3] || "my-module"}`);
        else tlog("out", "Usage: go mod <init|tidy|download>");
      } else if (sub === "run") {
        tlog("out", "Running Go file…");
        setTimeout(() => tlog("success", "Process exited 0"), 400);
      } else if (sub === "build") {
        tlog("out", "Building…");
        setTimeout(() => tlog("success", "Build successful"), 600);
      } else {
        tlog("out", "Usage: go <get|run|build|test|mod>");
      }
      return;
    }

    // ── General commands ──
    if (c === "help") {
      tlog("info",  "─── Package Managers ───────────────────────────");
      tlog("out",   "  pip install/uninstall/list/freeze <pkg>");
      tlog("out",   "  npm install/uninstall/run/list <pkg>");
      tlog("out",   "  yarn add/remove <pkg>");
      tlog("out",   "  pnpm add/remove <pkg>");
      tlog("out",   "  cargo add/remove/build/run <crate>");
      tlog("out",   "  go get/mod/run/build <module>");
      tlog("info",  "─── IDE Commands ────────────────────────────────");
      tlog("out",   "  run          Run current file");
      tlog("out",   "  ls           List project files");
      tlog("out",   "  clear        Clear terminal");
      tlog("out",   "  echo <text>  Print text");
      return;
    }

    if (c === "clear") { setTermLines([]); return; }
    if (c === "run") { runCode(); return; }
    if (c === "echo") { tlog("out", parts.slice(1).join(" ")); return; }
    if (c === "ls" || c === "dir") {
      const list = [];
      const walk = (arr, depth) => {
        arr.forEach(n => {
          list.push("  ".repeat(depth) + (n.type === "folder" ? "📁 " : "📄 ") + n.name);
          if (n.children) walk(n.children, depth + 1);
        });
      };
      walk(files[0].children, 0);
      list.forEach(l => tlog("out", l));
      return;
    }
    if (c === "pwd") { tlog("out", "/home/novide/my-project"); return; }
    if (c === "node" && parts[1]) {
      tlog("info", `Executing ${parts[1]} with Node.js`);
      return;
    }
    if (c === "python" || c === "python3") {
      if (parts[1]) { tlog("info", `Executing ${parts[1]} with Python`); return; }
      tlog("out", "Python 3.12.0 (NovIDE)"); tlog("out", 'Type "help" for more information.'); return;
    }
    tlog("err", `Command not found: ${c}. Type 'help' for available commands.`);
  }, [installedPkgs, files, activeTab, fileContents]);

  // ── Context menu handlers ──
  const handleNewFile = (contextNode) => {
    setModal({ type: "newFile", parentId: contextNode.type === "folder" ? contextNode.id : findParent(contextNode.id, files[0].children)?.id || "r", value: "" });
  };
  const handleNewFolder = (contextNode) => {
    setModal({ type: "newFolder", parentId: contextNode.type === "folder" ? contextNode.id : findParent(contextNode.id, files[0].children)?.id || "r", value: "" });
  };
  const handleRename = (node) => {
    setModal({ type: "rename", nodeId: node.id, value: node.name });
  };

  const confirmModal = () => {
    if (!modal) return;
    if (modal.type === "newFile" || modal.type === "newFolder") {
      const newNode = { id: genId(), name: modal.value, type: modal.type === "newFile" ? "file" : "folder", content: "", children: modal.type === "newFolder" ? [] : undefined, open: modal.type === "newFolder" };
      setFiles(f => {
        const clone = JSON.parse(JSON.stringify(f));
        const parent = modal.parentId === "r" ? clone[0] : findNode(modal.parentId, clone[0].children);
        if (parent) { parent.children = parent.children || []; parent.children.push(newNode); parent.open = true; }
        return clone;
      });
      if (modal.type === "newFile") openFile(newNode.id);
    } else if (modal.type === "rename") {
      setFiles(f => {
        const clone = JSON.parse(JSON.stringify(f));
        const node = findNode(modal.nodeId, clone[0].children);
        if (node) node.name = modal.value;
        return clone;
      });
      setOpenTabs(tabs => tabs.map(t => t.id === modal.nodeId ? { ...t, name: modal.value } : t));
    }
    setModal(null);
  };

  // ── Active file info ──
  const activeNode = activeTab ? findNode(activeTab, files[0].children) : null;
  const activeContent = activeTab ? getContent(activeTab) : "";
  const activeLang = activeNode ? getLang(activeNode.name) : null;

  // ── Right panel tabs ──
  const rightPanelTabs = [
    { id: "packages", label: "Packages", icon: "📦" },
    { id: "extensions", label: "Extensions", icon: "🔌" },
  ];

  const EXTENSIONS = [
    { name: "Python Language Server", id: "pylsp", desc: "IntelliSense, linting, formatting for Python", enabled: true, icon: "🐍" },
    { name: "TypeScript Hero", id: "tshero", desc: "Import management and auto-organize for TS", enabled: true, icon: "💎" },
    { name: "ESLint", id: "eslint", desc: "Find and fix JavaScript/TypeScript problems", enabled: false, icon: "🔍" },
    { name: "Prettier", id: "prettier", desc: "Opinionated code formatter", enabled: true, icon: "✨" },
    { name: "GitLens", id: "gitlens", desc: "Supercharge Git capabilities", enabled: false, icon: "🔀" },
    { name: "Tailwind CSS IntelliSense", id: "tailwind", desc: "Autocomplete for Tailwind class names", enabled: true, icon: "🎨" },
    { name: "Docker", id: "docker", desc: "Manage Docker containers and images", enabled: false, icon: "🐳" },
    { name: "REST Client", id: "rest", desc: "Send HTTP requests directly in editor", enabled: false, icon: "🌐" },
  ];

  const [extensions, setExtensions] = useState(EXTENSIONS);

  // Stable resize callbacks (prevent useEffect deps changing every render)
  const resizeSidebar = useCallback((d) => setSidebarW(w => Math.max(160, Math.min(400, w + d))), []);
  const resizeTerminal = useCallback((d) => setTerminalH(h => Math.max(80, Math.min(500, h - d))), []);
  const resizePkgPanel = useCallback((d) => setPkgPanelW(w => Math.max(200, Math.min(420, w - d))), []);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-zinc-950 text-zinc-100"
      style={{ fontFamily: '"JetBrains Mono","Fira Code",Menlo,monospace' }}>

      {/* ── TITLE BAR ── */}
      <div className="flex-shrink-0 h-10 flex items-center gap-0 border-b border-zinc-800 bg-zinc-950 select-none">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 border-r border-zinc-800 h-full">
          <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center">
            <span className="text-white font-black text-[9px]">N</span>
          </div>
          <span className="text-xs font-bold text-zinc-300">NovIDE</span>
          <span className="text-[10px] font-mono text-zinc-700">v2.0</span>
        </div>

        {/* Menu bar */}
        {["File", "Edit", "View", "Run", "Terminal", "Help"].map(m => (
          <button key={m} className="h-full px-3 text-xs text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors">
            {m}
          </button>
        ))}

        {/* Center — breadcrumb */}
        <div className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-mono text-zinc-700">
          <span>my-project</span>
          {activeNode && (
            <>
              <span>/</span>
              <span className="text-zinc-500">{activeNode.name}</span>
            </>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 px-3">
          <button onClick={() => setSidebarOpen(s => !s)} className={`p-1.5 rounded text-xs transition-colors ${sidebarOpen ? "text-blue-400 bg-blue-500/10" : "text-zinc-600 hover:text-zinc-300"}`} title="Toggle Sidebar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>
          </button>
          <button onClick={() => setPkgPanelOpen(s => !s)} className={`p-1.5 rounded text-xs transition-colors ${pkgPanelOpen ? "text-blue-400 bg-blue-500/10" : "text-zinc-600 hover:text-zinc-300"}`} title="Toggle Package Panel">
            <span className="text-[12px]">📦</span>
          </button>
          <button onClick={() => setTerminalOpen(s => !s)} className={`p-1.5 rounded text-xs transition-colors ${terminalOpen ? "text-blue-400 bg-blue-500/10" : "text-zinc-600 hover:text-zinc-300"}`} title="Toggle Terminal">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 17l4-4-4-4"/><path d="M12 19h8"/></svg>
          </button>
          <div className="w-px h-4 bg-zinc-800 mx-1"/>
          <button onClick={runCode} className="flex items-center gap-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono px-3 py-1 rounded-lg transition-all active:scale-95">
            <svg width="7" height="9" viewBox="0 0 7 9" fill="currentColor"><path d="M0 0l7 4.5L0 9V0z"/></svg>
            Run
          </button>
        </div>
      </div>

      {/* ── MAIN WORKSPACE ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* ── LEFT SIDEBAR — File tree ── */}
        {sidebarOpen && (
          <>
            <div className="flex flex-col overflow-hidden bg-zinc-950 border-r border-zinc-800" style={{ width: sidebarW }}>
              {/* Sidebar header */}
              <div className="flex-shrink-0 flex items-center justify-between px-3 py-2 border-b border-zinc-800">
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-600">Explorer</span>
                <div className="flex gap-0.5">
                  <button onClick={() => setModal({ type: "newFile", parentId: "r", value: "" })} className="p-1 rounded text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition-colors text-xs" title="New File">📄+</button>
                  <button onClick={() => setModal({ type: "newFolder", parentId: "r", value: "" })} className="p-1 rounded text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition-colors text-xs" title="New Folder">📁+</button>
                </div>
              </div>

              {/* Project name */}
              <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 border-b border-zinc-900">
                <span className="text-[11px] font-mono text-zinc-500 font-semibold">my-project</span>
                <span className="text-[10px] text-zinc-700 font-mono">{installedPkgs.length} pkgs</span>
              </div>

              {/* Tree */}
              <div className="flex-1 overflow-y-auto py-1">
                {files[0]?.children?.map(node => (
                  <TreeItem key={node.id} node={node} depth={0} activeId={activeTab}
                    onSelect={openFile} onToggle={toggleFolder}
                    onCtx={(e, n) => setCtxMenu({ pos: { x: e.clientX, y: e.clientY }, node: n })}
                  />
                ))}
              </div>

              {/* Installed packages list */}
              <div className="flex-shrink-0 border-t border-zinc-800">
                <div className="px-3 py-1.5 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-600">Packages</span>
                  <span className="text-[10px] font-mono text-zinc-700">{installedPkgs.length}</span>
                </div>
                <div className="max-h-24 overflow-y-auto pb-1">
                  {installedPkgs.slice(0, 8).map(p => (
                    <div key={`${p.registry}-${p.name}`} className="flex items-center gap-1.5 px-3 py-0.5">
                      <span className="text-[10px]">{REGISTRIES[p.registry]?.icon || "📦"}</span>
                      <span className="text-[11px] font-mono text-zinc-500 truncate">{p.name}</span>
                      <span className="text-[10px] font-mono text-zinc-700 ml-auto">{p.version}</span>
                    </div>
                  ))}
                  {installedPkgs.length > 8 && (
                    <p className="text-[10px] font-mono text-zinc-700 px-3">+{installedPkgs.length - 8} more</p>
                  )}
                </div>
              </div>
            </div>
            <ResizerV onResize={resizeSidebar}/>
          </>
        )}

        {/* ── CENTER — Editor + Terminal ── */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">

          {/* Tabs */}
          <div className="flex-shrink-0 flex items-end gap-0 bg-zinc-950 border-b border-zinc-800 overflow-x-auto">
            {openTabs.map(tab => {
              const lang = getLang(tab.name);
              const isActive = tab.id === activeTab;
              const isModified = modifiedTabs.has(tab.id);
              return (
                <div key={tab.id}
                  className={`flex items-center gap-1.5 px-3 py-2 cursor-pointer border-r border-zinc-800 transition-colors group flex-shrink-0 relative ${
                    isActive ? "bg-zinc-900 text-zinc-200" : "bg-zinc-950 text-zinc-600 hover:text-zinc-300 hover:bg-zinc-900/60"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {isActive && <div className="absolute top-0 left-0 right-0 h-px bg-blue-500"/>}
                  <FileIcon name={tab.name} size={11}/>
                  <span className="text-xs font-mono">{tab.name}</span>
                  {isModified && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"/>}
                  <button
                    onClick={e => { e.stopPropagation(); isModified ? saveFile(tab.id) : closeTab(tab.id); }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-600 hover:text-zinc-300 text-xs"
                    title={isModified ? "Save" : "Close"}
                  >
                    {isModified ? "💾" : "✕"}
                  </button>
                </div>
              );
            })}
            {openTabs.length === 0 && (
              <div className="px-4 py-2 text-xs text-zinc-700 font-mono italic">No files open</div>
            )}
          </div>

          {/* Editor / Welcome */}
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            {activeTab && activeNode ? (
              <Editor
                content={activeContent}
                filename={activeNode.name}
                onChange={(val) => updateContent(activeTab, val)}
                onRun={runCode}
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-6 text-zinc-700 bg-[#0d0e14]">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <span className="text-3xl">💎</span>
                </div>
                <div className="text-center">
                  <h2 className="text-lg font-bold text-zinc-400">NovIDE</h2>
                  <p className="text-sm text-zinc-700 mt-1 font-mono">Open a file or create a new one</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {[["F5", "Run file"], ["Ctrl+S", "Save"], ["Ctrl+N", "New file"], ["Ctrl+`", "Terminal"]].map(([k, v]) => (
                    <div key={k} className="flex gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                      <span className="text-blue-400">{k}</span>
                      <span className="text-zinc-600">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Terminal */}
          {terminalOpen && (
            <>
              <ResizerH onResize={resizeTerminal}/>
              <div className="flex-shrink-0 flex flex-col border-t border-zinc-800 overflow-hidden" style={{ height: terminalH }}>
                {/* Terminal header */}
                <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 border-b border-zinc-800 bg-zinc-950">
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-600">Terminal</span>
                  <div className="flex items-center gap-1 ml-2">
                    {Object.entries(REGISTRIES).map(([key, r]) => (
                      <span key={key} className="text-[11px] font-mono text-zinc-700 hover:text-zinc-400 cursor-pointer transition-colors"
                        onClick={() => handleCommand(r.installCmd("").replace(" ", " ").trimEnd())}
                        title={`${r.name} terminal`}>
                        {r.icon}
                      </span>
                    ))}
                  </div>
                  <div className="flex-1"/>
                  <button onClick={() => setTermLines([])} className="text-[10px] font-mono text-zinc-700 hover:text-zinc-400 transition-colors">clear</button>
                  <button onClick={() => setTerminalOpen(false)} className="text-[10px] font-mono text-zinc-700 hover:text-zinc-400 transition-colors">✕</button>
                </div>
                <Terminal lines={termLines} onCommand={handleCommand} installedPkgs={installedPkgs}/>
              </div>
            </>
          )}
        </div>

        {/* ── RIGHT PANEL — Package Manager ── */}
        {pkgPanelOpen && (
          <>
            <ResizerV onResize={resizePkgPanel}/>
            <div className="flex flex-col overflow-hidden border-l border-zinc-800 bg-zinc-950" style={{ width: pkgPanelW }}>
              {/* Panel tabs */}
              <div className="flex-shrink-0 flex border-b border-zinc-800">
                {rightPanelTabs.map(t => (
                  <button key={t.id}
                    onClick={() => setActivePanel(t.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-mono transition-colors ${
                      activePanel === t.id ? "text-blue-400 border-b border-blue-500 bg-blue-500/5" : "text-zinc-600 hover:text-zinc-400"
                    }`}
                  >
                    <span>{t.icon}</span>{t.label}
                  </button>
                ))}
              </div>

              {activePanel === "packages" ? (
                <PackageManager
                  onInstall={installPkg}
                  installedPkgs={installedPkgs}
                  onUninstall={uninstallPkg}
                />
              ) : (
                <div className="flex-1 overflow-y-auto">
                  <div className="p-3 border-b border-zinc-800">
                    <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-600 mb-2">Installed Extensions</p>
                    <span className="text-xs text-zinc-700 font-mono">{extensions.filter(e => e.enabled).length} active</span>
                  </div>
                  {extensions.map(ext => (
                    <div key={ext.id} className="px-3 py-2.5 border-b border-zinc-900 hover:bg-zinc-900/40 group transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex gap-2 min-w-0">
                          <span className="text-base flex-shrink-0 mt-0.5">{ext.icon}</span>
                          <div className="min-w-0">
                            <p className="text-xs font-mono text-zinc-300 leading-tight">{ext.name}</p>
                            <p className="text-[11px] text-zinc-600 mt-0.5 leading-relaxed">{ext.desc}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setExtensions(exts => exts.map(e => e.id === ext.id ? { ...e, enabled: !e.enabled } : e))}
                          className={`flex-shrink-0 text-[11px] font-mono px-2 py-1 rounded-lg border transition-colors ${
                            ext.enabled
                              ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                              : "border-zinc-800 text-zinc-600 hover:border-blue-500/30 hover:text-blue-400"
                          }`}
                        >
                          {ext.enabled ? "On" : "Off"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ── STATUS BAR ── */}
      <div className="flex-shrink-0 h-6 flex items-center gap-3 px-3 border-t border-zinc-800 bg-zinc-950 text-[10px] font-mono overflow-hidden">
        {activeLang && (
          <>
            <span style={{ color: activeLang.color }} className="flex items-center gap-1">
              {activeLang.icon} {activeLang.name}
            </span>
            <span className="text-zinc-800">│</span>
          </>
        )}
        <span className="text-zinc-700">
          {activeNode ? getFilePath(activeTab, files[0].children) || activeNode.name : "No file"}
        </span>
        <span className="text-zinc-800">│</span>
        <span className="text-zinc-700">
          {installedPkgs.length} package{installedPkgs.length !== 1 ? "s" : ""}
        </span>
        <div className="flex-1"/>
        <span className="text-zinc-700">UTF-8</span>
        <span className="text-zinc-800">│</span>
        <span className="text-zinc-700">LF</span>
        <span className="text-zinc-800">│</span>
        {modifiedTabs.size > 0 && (
          <span className="text-amber-500">{modifiedTabs.size} unsaved</span>
        )}
        <span className="text-zinc-700">NovIDE 2.0</span>
      </div>

      {/* Context Menu */}
      {ctxMenu && (
        <CtxMenu
          pos={ctxMenu.pos}
          node={ctxMenu.node}
          onClose={() => setCtxMenu(null)}
          onNewFile={handleNewFile}
          onNewFolder={handleNewFolder}
          onRename={handleRename}
          onDelete={(id) => deleteNode(id)}
        />
      )}

      {/* Modal */}
      {modal && (
        <Modal
          title={modal.type === "newFile" ? "New File" : modal.type === "newFolder" ? "New Folder" : "Rename"}
          onClose={() => setModal(null)}
          onConfirm={confirmModal}
        >
          <input
            autoFocus
            value={modal.value}
            onChange={e => setModal(m => ({ ...m, value: e.target.value }))}
            onKeyDown={e => { if (e.key === "Enter") confirmModal(); if (e.key === "Escape") setModal(null); }}
            placeholder={modal.type === "newFile" ? "filename.py" : modal.type === "newFolder" ? "folder-name" : "new name"}
            className="w-full bg-zinc-800 border border-zinc-700 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-zinc-100 font-mono outline-none transition-colors"
          />
          <p className="text-xs text-zinc-600 font-mono mt-2">
            {modal.type === "newFile" ? "Supports .py .ts .tsx .js .html .css .json .md .sh .rs .go" : "Enter folder name"}
          </p>
        </Modal>
      )}
    </div>
  );
}
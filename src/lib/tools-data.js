export const categories = [
  { id: 'all', name: 'All Tools', icon: '🧰', count: 55 },
  { id: 'text', name: 'Text Tools', icon: '📝', count: 10 },
  { id: 'image', name: 'Image Tools', icon: '🖼️', count: 8 },
  { id: 'dev', name: 'Developer', icon: '💻', count: 10 },
  { id: 'converter', name: 'Converters', icon: '🔄', count: 8 },
  { id: 'generator', name: 'Generators', icon: '⚡', count: 8 },
  { id: 'calculator', name: 'Calculators', icon: '🧮', count: 6 },
  { id: 'security', name: 'Security', icon: '🔒', count: 3 },
  { id: 'color', name: 'Color Tools', icon: '🎨', count: 2 },
  { id: 'pdf', name: 'PDF Tools', icon: '📄', count: 6 },
];

export const tools = [
  // TEXT TOOLS
  { id: 'word-counter', name: 'Word Counter', desc: 'Count words, characters, sentences and paragraphs in your text', category: 'text', icon: '📊', color: '#8b5cf6', tag: 'Popular' },
  { id: 'case-converter', name: 'Case Converter', desc: 'Convert text between uppercase, lowercase, title case and more', category: 'text', icon: '🔤', color: '#3b82f6' },
  { id: 'lorem-ipsum', name: 'Lorem Ipsum Generator', desc: 'Generate dummy placeholder text for your designs', category: 'text', icon: '📄', color: '#06b6d4' },
  { id: 'text-reverser', name: 'Text Reverser', desc: 'Reverse the order of characters or words in your text', category: 'text', icon: '🔁', color: '#10b981' },
  { id: 'remove-duplicates', name: 'Remove Duplicate Lines', desc: 'Remove duplicate lines from your text content', category: 'text', icon: '🗑️', color: '#ef4444' },
  { id: 'text-to-slug', name: 'Text to Slug', desc: 'Convert text to URL-friendly slug format', category: 'text', icon: '🔗', color: '#f59e0b' },
  { id: 'find-replace', name: 'Find & Replace', desc: 'Find and replace text with support for regex', category: 'text', icon: '🔍', color: '#ec4899' },
  { id: 'text-diff', name: 'Text Diff Checker', desc: 'Compare two texts and highlight the differences', category: 'text', icon: '📋', color: '#8b5cf6' },
  { id: 'string-encoder', name: 'String Encode/Decode', desc: 'Encode or decode strings using Base64, URL, HTML encoding', category: 'text', icon: '🔐', color: '#3b82f6' },
  { id: 'markdown-preview', name: 'Markdown Preview', desc: 'Write Markdown and see live preview instantly', category: 'text', icon: '📑', color: '#06b6d4' },

  // IMAGE TOOLS
  { id: 'image-compressor', name: 'Image Compressor', desc: 'Compress images without losing quality, supports JPEG, PNG, WebP', category: 'image', icon: '📦', color: '#8b5cf6', tag: 'Popular' },
  { id: 'image-resizer', name: 'Image Resizer', desc: 'Resize images to custom dimensions while maintaining aspect ratio', category: 'image', icon: '📐', color: '#3b82f6' },
  { id: 'image-converter', name: 'Image Converter', desc: 'Convert between JPG, PNG, WebP, BMP and other formats', category: 'image', icon: '🖼️', color: '#06b6d4', tag: 'Popular' },
  { id: 'image-cropper', name: 'Image Cropper', desc: 'Crop images to specific dimensions or aspect ratios', category: 'image', icon: '✂️', color: '#10b981' },
  { id: 'image-to-base64', name: 'Image to Base64', desc: 'Convert images to Base64 encoded strings', category: 'image', icon: '💾', color: '#f59e0b' },
  { id: 'svg-to-png', name: 'SVG to PNG', desc: 'Convert SVG vector images to PNG raster format', category: 'image', icon: '🎯', color: '#ec4899' },
  { id: 'image-filters', name: 'Image Filters', desc: 'Apply grayscale, sepia, blur and other filters to images', category: 'image', icon: '🎭', color: '#ef4444' },
  { id: 'screenshot-mockup', name: 'Screenshot Mockup', desc: 'Create device mockup screenshots for your websites', category: 'image', icon: '📱', color: '#8b5cf6' },

  // DEVELOPER TOOLS
  { id: 'json-formatter', name: 'JSON Formatter', desc: 'Format, validate and beautify JSON data with syntax highlighting', category: 'dev', icon: '{ }', color: '#f59e0b', tag: 'Popular' },
  { id: 'json-to-csv', name: 'JSON to CSV', desc: 'Convert JSON arrays to CSV format for spreadsheets', category: 'dev', icon: '📊', color: '#10b981' },
  { id: 'html-minifier', name: 'HTML Minifier', desc: 'Minify HTML code by removing whitespace and comments', category: 'dev', icon: '📦', color: '#ef4444' },
  { id: 'css-minifier', name: 'CSS Minifier', desc: 'Minify CSS code for faster page load times', category: 'dev', icon: '🎨', color: '#3b82f6' },
  { id: 'js-minifier', name: 'JS Minifier', desc: 'Minify JavaScript code to reduce file size', category: 'dev', icon: '⚡', color: '#f59e0b' },
  { id: 'regex-tester', name: 'Regex Tester', desc: 'Test and debug regular expressions with live matching', category: 'dev', icon: '🔎', color: '#8b5cf6' },
  { id: 'code-beautifier', name: 'Code Beautifier', desc: 'Format and beautify HTML, CSS, and JavaScript code', category: 'dev', icon: '✨', color: '#ec4899' },
  { id: 'jwt-decoder', name: 'JWT Decoder', desc: 'Decode and inspect JSON Web Tokens (JWT)', category: 'dev', icon: '🔓', color: '#06b6d4' },
  { id: 'cron-parser', name: 'Cron Expression Parser', desc: 'Parse and validate cron expressions with readable output', category: 'dev', icon: '⏰', color: '#10b981' },
  { id: 'sql-formatter', name: 'SQL Formatter', desc: 'Format and beautify SQL queries for better readability', category: 'dev', icon: '🗃️', color: '#3b82f6' },

  // CONVERTERS
  { id: 'unit-converter', name: 'Unit Converter', desc: 'Convert between length, weight, temperature and more units', category: 'converter', icon: '📏', color: '#06b6d4', tag: 'Popular' },
  { id: 'color-converter', name: 'Color Converter', desc: 'Convert between HEX, RGB, HSL and CMYK color formats', category: 'converter', icon: '🎨', color: '#ec4899' },
  { id: 'number-base', name: 'Number Base Converter', desc: 'Convert between Binary, Octal, Decimal, Hexadecimal', category: 'converter', icon: '🔢', color: '#8b5cf6' },
  { id: 'timestamp-converter', name: 'Timestamp Converter', desc: 'Convert between Unix timestamps and readable dates', category: 'converter', icon: '📅', color: '#f59e0b' },
  { id: 'csv-to-json', name: 'CSV to JSON', desc: 'Convert CSV data to JSON array format', category: 'converter', icon: '🔄', color: '#10b981' },
  { id: 'xml-to-json', name: 'XML to JSON', desc: 'Convert XML data to JSON format', category: 'converter', icon: '📋', color: '#3b82f6' },
  { id: 'yaml-to-json', name: 'YAML to JSON', desc: 'Convert YAML to JSON and vice versa', category: 'converter', icon: '📝', color: '#ef4444' },
  { id: 'currency-converter', name: 'Currency Converter', desc: 'Convert between world currencies with live rates', category: 'converter', icon: '💰', color: '#06b6d4' },

  // GENERATORS
  { id: 'password-generator', name: 'Password Generator', desc: 'Generate strong, secure passwords with custom rules', category: 'generator', icon: '🔑', color: '#ef4444', tag: 'Popular' },
  { id: 'qr-generator', name: 'QR Code Generator', desc: 'Create QR codes for URLs, text, WiFi, contacts and more', category: 'generator', icon: '📱', color: '#8b5cf6', tag: 'Popular' },
  { id: 'uuid-generator', name: 'UUID Generator', desc: 'Generate unique UUIDs (v4) for your applications', category: 'generator', icon: '🆔', color: '#3b82f6' },
  { id: 'hash-generator', name: 'Hash Generator', desc: 'Generate MD5, SHA-1, SHA-256 hashes from text', category: 'generator', icon: '🔐', color: '#06b6d4' },
  { id: 'gradient-generator', name: 'Gradient Generator', desc: 'Create beautiful CSS gradients with live preview', category: 'generator', icon: '🌈', color: '#ec4899' },
  { id: 'meta-tag-generator', name: 'Meta Tag Generator', desc: 'Generate SEO meta tags for your web pages', category: 'generator', icon: '🏷️', color: '#f59e0b' },
  { id: 'favicon-generator', name: 'Favicon Generator', desc: 'Create favicons from images in multiple sizes', category: 'generator', icon: '⭐', color: '#10b981' },
  { id: 'placeholder-image', name: 'Placeholder Image', desc: 'Generate placeholder images with custom size and color', category: 'generator', icon: '🖼️', color: '#8b5cf6' },

  // CALCULATORS
  { id: 'age-calculator', name: 'Age Calculator', desc: 'Calculate exact age in years, months, days and more', category: 'calculator', icon: '🎂', color: '#ec4899', tag: 'Popular' },
  { id: 'bmi-calculator', name: 'BMI Calculator', desc: 'Calculate Body Mass Index with health status', category: 'calculator', icon: '⚖️', color: '#10b981' },
  { id: 'percentage-calculator', name: 'Percentage Calculator', desc: 'Calculate percentages, increases and decreases', category: 'calculator', icon: '%', color: '#3b82f6' },
  { id: 'loan-calculator', name: 'Loan Calculator', desc: 'Calculate monthly payments, interest, and amortization', category: 'calculator', icon: '🏦', color: '#f59e0b' },
  { id: 'tip-calculator', name: 'Tip Calculator', desc: 'Calculate tip amounts and split bills between people', category: 'calculator', icon: '💵', color: '#8b5cf6' },
  { id: 'date-difference', name: 'Date Difference', desc: 'Calculate the difference between two dates', category: 'calculator', icon: '📆', color: '#06b6d4' },

  // SECURITY
  { id: 'password-strength', name: 'Password Strength Checker', desc: 'Check how strong your password is against attacks', category: 'security', icon: '🛡️', color: '#ef4444' },
  { id: 'ip-lookup', name: 'IP Address Lookup', desc: 'Look up details about any IP address', category: 'security', icon: '🌐', color: '#3b82f6' },
  { id: 'url-parser', name: 'URL Parser', desc: 'Parse and analyze URL components', category: 'security', icon: '🔗', color: '#10b981' },

  // COLOR TOOLS
  { id: 'color-picker', name: 'Color Picker', desc: 'Pick colors and get values in multiple formats', category: 'color', icon: '🎨', color: '#ec4899' },
  { id: 'palette-generator', name: 'Palette Generator', desc: 'Generate harmonious color palettes from a base color', category: 'color', icon: '🎭', color: '#8b5cf6' },

  // PDF TOOLS
  { id: 'merge-pdf', name: 'Merge PDF', desc: 'Combine multiple PDF files into a single document', category: 'pdf', icon: '📎', color: '#ef4444' },
  { id: 'image-to-pdf', name: 'Image to PDF', desc: 'Convert JPG, PNG images to PDF documents', category: 'pdf', icon: '🖼️', color: '#3b82f6' },
  { id: 'pdf-to-image', name: 'PDF to Image', desc: 'Convert PDF pages to JPG or PNG images', category: 'pdf', icon: '📸', color: '#10b981' },
  { id: 'pdf-to-text', name: 'PDF to Text', desc: 'Extract text content from PDF files', category: 'pdf', icon: '📝', color: '#f59e0b' },
  { id: 'pdf-metadata', name: 'PDF Metadata Editor', desc: 'View and edit title, author, and keywords of PDF', category: 'pdf', icon: 'ℹ️', color: '#8b5cf6' },
  { id: 'pdf-security', name: 'PDF Password Tool', desc: 'Add or remove password protection from PDFs', category: 'pdf', icon: '🔒', color: '#ec4899' },
  { id: 'morse-code', name: 'Morse Code Converter', desc: 'Encode and decode text into Morse code signals', category: 'text', icon: '📻', color: '#8b5cf6' },
  { id: 'base64-to-image', name: 'Base64 to Image', desc: 'Convert Base64 encoded strings back into viewable images', category: 'image', icon: '🖼️', color: '#3b82f6' },
  { id: 'css-triangle', name: 'CSS Triangle Generator', desc: 'Visual tool for generating CSS-only triangle shapes', category: 'dev', icon: '🔺', color: '#10b981' },
  { id: 'js-runner', name: 'JavaScript Runner', desc: 'Execute and test snippets of JavaScript code in a safe playground', category: 'dev', icon: '⚡', color: '#f59e0b' },
  { id: 'text-to-speech', name: 'Text to Speech', desc: 'Convert your text into spoken words using the browser voice engine', category: 'text', icon: '🔊', color: '#ec4899' },
];

export function getToolById(id) {
  return tools.find(t => t.id === id);
}

export function getToolsByCategory(categoryId) {
  if (categoryId === 'all') return tools;
  return tools.filter(t => t.category === categoryId);
}

export function searchTools(query) {
  const lower = query.toLowerCase();
  return tools.filter(t =>
    t.name.toLowerCase().includes(lower) ||
    t.desc.toLowerCase().includes(lower) ||
    t.category.toLowerCase().includes(lower)
  );
}

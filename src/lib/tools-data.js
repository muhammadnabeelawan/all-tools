export const categories = [
  { id: 'all', name: 'All Tools', icon: '🧰', count: 65 },
  { id: 'text', name: 'Text Tools', icon: '📝', count: 12 },
  { id: 'image', name: 'Image Tools', icon: '🖼️', count: 9 },
  { id: 'dev', name: 'Developer', icon: '💻', count: 12 },
  { id: 'converter', name: 'Converters', icon: '🔄', count: 8 },
  { id: 'generator', name: 'Generators', icon: '⚡', count: 8 },
  { id: 'calculator', name: 'Calculators', icon: '🧮', count: 7 },
  { id: 'security', name: 'Security', icon: '🔒', count: 3 },
  { id: 'color', name: 'Color Tools', icon: '🎨', count: 2 },
  { id: 'pdf', name: 'PDF Tools', icon: '📄', count: 6 },
  { id: 'productivity', name: 'Productivity', icon: '🚀', count: 4 },
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
  { id: 'morse-code', name: 'Morse Code Converter', desc: 'Encode and decode text into Morse code signals', category: 'text', icon: '📻', color: '#8b5cf6' },
  { id: 'text-to-speech', name: 'Text to Speech', desc: 'Convert your text into spoken words using the browser voice engine', category: 'text', icon: '🔊', color: '#ec4899' },

  // IMAGE TOOLS
  { id: 'image-compressor', name: 'Image Compressor', desc: 'Compress images without losing quality, supports JPEG, PNG, WebP', category: 'image', icon: '📦', color: '#8b5cf6', tag: 'Popular' },
  { id: 'image-resizer', name: 'Image Resizer', desc: 'Resize images to custom dimensions while maintaining aspect ratio', category: 'image', icon: '📐', color: '#3b82f6' },
  { id: 'image-converter', name: 'Image Converter', desc: 'Convert between JPG, PNG, WebP, BMP and other formats', category: 'image', icon: '🖼️', color: '#06b6d4', tag: 'Popular' },
  { id: 'image-cropper', name: 'Image Cropper', desc: 'Crop images to specific dimensions or aspect ratios', category: 'image', icon: '✂️', color: '#10b981' },
  { id: 'image-to-base64', name: 'Image to Base64', desc: 'Convert images to Base64 encoded strings', category: 'image', icon: '💾', color: '#f59e0b' },
  { id: 'svg-to-png', name: 'SVG to PNG', desc: 'Convert SVG vector images to PNG raster format', category: 'image', icon: '🎯', color: '#ec4899' },
  { id: 'image-filters', name: 'Image Filters', desc: 'Apply grayscale, sepia, blur and other filters to images', category: 'image', icon: '�', color: '#ef4444' },
  { id: 'screenshot-mockup', name: 'Screenshot Mockup', desc: 'Create device mockup screenshots for your websites', category: 'image', icon: '📱', color: '#8b5cf6' },
  { id: 'base64-to-image', name: 'Base64 to Image', desc: 'Convert Base64 strings back to images', category: 'image', icon: '🖼️', color: '#3b82f6' },

  // DEVELOPER TOOLS
  { id: 'json-formatter', name: 'JSON Formatter', desc: 'Format, validate and beautify JSON data', category: 'dev', icon: '{ }', color: '#f59e0b', tag: 'Popular' },
  { id: 'json-to-csv', name: 'JSON to CSV', desc: 'Convert JSON arrays to CSV format', category: 'dev', icon: '📊', color: '#10b981' },
  { id: 'html-minifier', name: 'HTML Minifier', desc: 'Minify HTML code', category: 'dev', icon: '📦', color: '#ef4444' },
  { id: 'css-minifier', name: 'CSS Minifier', desc: 'Minify CSS code', category: 'dev', icon: '🎨', color: '#3b82f6' },
  { id: 'js-minifier', name: 'JS Minifier', desc: 'Minify JavaScript code', category: 'dev', icon: '⚡', color: '#f59e0b' },
  { id: 'regex-tester', name: 'Regex Tester', desc: 'Test and debug regular expressions', category: 'dev', icon: '🔎', color: '#8b5cf6' },
  { id: 'code-beautifier', name: 'Code Beautifier', desc: 'Beautify HTML, CSS, and JS code', category: 'dev', icon: '✨', color: '#ec4899' },
  { id: 'jwt-decoder', name: 'JWT Decoder', desc: 'Decode and inspect JSON Web Tokens', category: 'dev', icon: '🔓', color: '#06b6d4' },
  { id: 'cron-parser', name: 'Cron Parser', desc: 'Parse cron expressions into human-readable text', category: 'dev', icon: '⏰', color: '#10b981' },
  { id: 'sql-formatter', name: 'SQL Formatter', desc: 'Format and beautify SQL queries', category: 'dev', icon: '🗃️', color: '#3b82f6' },
  { id: 'css-triangle', name: 'CSS Triangle Generator', desc: 'Visual tool for CSS triangles', category: 'dev', icon: '🔺', color: '#10b981' },
  { id: 'js-runner', name: 'JavaScript Runner', desc: 'Safe playground for JS snippets', category: 'dev', icon: '⚡', color: '#f59e0b' },

  // CONVERTERS
  { id: 'unit-converter', name: 'Unit Converter', desc: 'Convert length, weight, temperature and more', category: 'converter', icon: '📏', color: '#06b6d4', tag: 'Popular' },
  { id: 'color-converter', name: 'Color Converter', desc: 'Convert between HEX, RGB, HSL and CMYK', category: 'converter', icon: '🎨', color: '#ec4899' },
  { id: 'number-base', name: 'Number Base Converter', desc: 'Convert between Binary, Octal, Decimal, Hex', category: 'converter', icon: '🔢', color: '#8b5cf6' },
  { id: 'timestamp-converter', name: 'Timestamp Converter', desc: 'Convert Unix timestamps and dates', category: 'converter', icon: '📅', color: '#f59e0b' },
  { id: 'csv-to-json', name: 'CSV to JSON', desc: 'Convert CSV data to JSON array', category: 'converter', icon: '🔄', color: '#10b981' },
  { id: 'xml-to-json', name: 'XML to JSON', desc: 'Convert XML data to JSON format', category: 'converter', icon: '📋', color: '#3b82f6' },
  { id: 'yaml-to-json', name: 'YAML to JSON', desc: 'Convert YAML to JSON and vice versa', category: 'converter', icon: '📝', color: '#ef4444' },
  { id: 'currency-converter', name: 'Currency Converter', desc: 'Convert between currencies with rates', category: 'converter', icon: '💰', color: '#06b6d4' },

  // GENERATORS
  { id: 'password-generator', name: 'Password Generator', desc: 'Generate strong, secure passwords', category: 'generator', icon: '🔑', color: '#ef4444', tag: 'Popular' },
  { id: 'qr-generator', name: 'QR Code Generator', desc: 'Create QR codes for URLs, text, WiFi', category: 'generator', icon: '📱', color: '#8b5cf6', tag: 'Popular' },
  { id: 'uuid-generator', name: 'UUID Generator', desc: 'Generate unique UUIDs (v4)', category: 'generator', icon: '🆔', color: '#3b82f6' },
  { id: 'hash-generator', name: 'Hash Generator', desc: 'Generate MD5, SHA-1, SHA-256 hashes', category: 'generator', icon: '🔐', color: '#06b6d4' },
  { id: 'gradient-generator', name: 'Gradient Generator', desc: 'Create beautiful CSS gradients', category: 'generator', icon: '🌈', color: '#ec4899' },
  { id: 'meta-tag-generator', name: 'Meta Tag Generator', desc: 'Generate SEO meta tags', category: 'generator', icon: '🏷️', color: '#f59e0b' },
  { id: 'favicon-generator', name: 'Favicon Generator', desc: 'Create favicons in multiple sizes', category: 'generator', icon: '⭐', color: '#10b981' },
  { id: 'placeholder-image', name: 'Placeholder Image', desc: 'Generate custom placeholder images', category: 'generator', icon: '🖼️', color: '#8b5cf6' },

  // CALCULATORS
  { id: 'age-calculator', name: 'Age Calculator', desc: 'Calculate exact age in years, months, days', category: 'calculator', icon: '🎂', color: '#ec4899', tag: 'Popular' },
  { id: 'bmi-calculator', name: 'BMI Calculator', desc: 'Calculate BMI with health status', category: 'calculator', icon: '⚖️', color: '#10b981' },
  { id: 'percentage-calculator', name: 'Percentage Calculator', desc: 'Calculate percentages and differences', category: 'calculator', icon: '%', color: '#3b82f6' },
  { id: 'loan-calculator', name: 'Loan Calculator', desc: 'Calculate monthly payments and interest', category: 'calculator', icon: '🏦', color: '#f59e0b' },
  { id: 'tip-calculator', name: 'Tip Calculator', desc: 'Calculate tips and split bills', category: 'calculator', icon: '💵', color: '#8b5cf6' },
  { id: 'date-difference', name: 'Date Difference', desc: 'Calculate the difference between two dates', category: 'calculator', icon: '📆', color: '#06b6d4' },
  { id: 'bmr-calculator', name: 'BMR Calculator', desc: 'Calculate your Basal Metabolic Rate', category: 'calculator', icon: '🥗', color: '#10b981' },

  // SECURITY
  { id: 'password-strength', name: 'Password Strength', desc: 'Check password security strength', category: 'security', icon: '🛡️', color: '#ef4444' },
  { id: 'ip-lookup', name: 'IP Lookup', desc: 'Look up IP address details', category: 'security', icon: '🌐', color: '#3b82f6' },
  { id: 'url-parser', name: 'URL Parser', desc: 'Analyze URL components', category: 'security', icon: '🔗', color: '#10b981' },

  // COLOR TOOLS
  { id: 'color-picker', name: 'Color Picker', desc: 'Pick colors and get values', category: 'color', icon: '🎨', color: '#ec4899' },
  { id: 'palette-generator', name: 'Palette Generator', desc: 'Generate harmonious color palettes', category: 'color', icon: '🎭', color: '#8b5cf6' },

  // PDF TOOLS
  { id: 'merge-pdf', name: 'Merge PDF', desc: 'Combine multiple PDF files', category: 'pdf', icon: '📎', color: '#ef4444' },
  { id: 'image-to-pdf', name: 'Image to PDF', desc: 'Convert images to PDF', category: 'pdf', icon: '🖼️', color: '#3b82f6' },
  { id: 'pdf-to-image', name: 'PDF to Image', desc: 'Convert PDF pages to images', category: 'pdf', icon: '📸', color: '#10b981' },
  { id: 'pdf-to-text', name: 'PDF to Text', desc: 'Extract text content from PDFs', category: 'pdf', icon: '📝', color: '#f59e0b' },
  { id: 'pdf-metadata', name: 'PDF Metadata', desc: 'Edit PDF metadata', category: 'pdf', icon: 'ℹ️', color: '#8b5cf6' },
  { id: 'pdf-security', name: 'PDF Security', desc: 'Add/remove PDF passwords', category: 'pdf', icon: '🔒', color: '#ec4899' },

  // PRODUCTIVITY
  { id: 'pomodoro-timer', name: 'Pomodoro Timer', desc: 'Focus sessions (25/5 technique)', category: 'productivity', icon: '🍅', color: '#ef4444' },
  { id: 'list-randomizer', name: 'List Randomizer', desc: 'Shuffle or pick from lists', category: 'productivity', icon: '🎲', color: '#8b5cf6' },
  { id: 'stopwatch', name: 'Stopwatch', desc: 'Precise timing with laps', category: 'productivity', icon: '⏱️', color: '#3b82f6' },
  { id: 'scratchpad', name: 'Quick Scratchpad', desc: 'Browser-based notepad with auto-save', category: 'productivity', icon: '�', color: '#f59e0b' },
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

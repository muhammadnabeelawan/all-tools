'use client';
import { useState } from 'react';

export default function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    return (
        <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={handleCopy}>
            {copied ? '✓ Copied' : '📋 Copy'}
        </button>
    );
}

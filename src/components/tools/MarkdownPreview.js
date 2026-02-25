'use client';
import { useState } from 'react';

export default function MarkdownPreview() {
    const [md, setMd] = useState('# Hello World\n\nThis is **bold** and *italic* text.\n\n## Features\n- Item 1\n- Item 2\n- Item 3\n\n> A blockquote\n\n`inline code`\n\n```\ncode block\n```\n\n[Link](https://example.com)');

    const render = (text) => {
        let html = text
            .replace(/^### (.*$)/gim, '<h3 style="margin:16px 0 8px;font-size:1.1rem">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 style="margin:20px 0 10px;font-size:1.3rem">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 style="margin:24px 0 12px;font-size:1.6rem">$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code style="background:rgba(139,92,246,0.15);padding:2px 6px;border-radius:4px;font-size:0.85em">$1</code>')
            .replace(/^> (.*$)/gim, '<blockquote style="border-left:3px solid var(--accent-purple);padding:8px 16px;margin:12px 0;color:var(--text-secondary)">$1</blockquote>')
            .replace(/^- (.*$)/gim, '<li style="margin:4px 0;margin-left:20px">$1</li>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:var(--accent-purple)">$1</a>')
            .replace(/\n/g, '<br/>');
        return html;
    };

    return (
        <div className="grid-2">
            <div className="input-group" style={{ height: '100%' }}>
                <label>Markdown</label>
                <textarea className="input-field" value={md} onChange={e => setMd(e.target.value)} style={{ height: '400px', fontFamily: 'monospace' }} />
            </div>
            <div className="input-group">
                <label>Preview</label>
                <div style={{
                    padding: 20,
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-secondary)',
                    minHeight: 400,
                    lineHeight: 1.7,
                }} dangerouslySetInnerHTML={{ __html: render(md) }} />
            </div>
        </div>
    );
}

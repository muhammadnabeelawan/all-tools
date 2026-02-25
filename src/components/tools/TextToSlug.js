'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function TextToSlug() {
    const [text, setText] = useState('');
    const slug = text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');
    return (
        <>
            <div className="input-group">
                <label>Enter text</label>
                <input className="input-field" value={text} onChange={e => setText(e.target.value)} placeholder="My Blog Post Title" />
            </div>
            {slug && (
                <div className="result-container">
                    <div className="result-header"><span className="result-title">URL Slug</span><CopyButton text={slug} /></div>
                    <div className="result-content" style={{ fontSize: '1.1rem', color: 'var(--accent-green)' }}>{slug}</div>
                </div>
            )}
        </>
    );
}

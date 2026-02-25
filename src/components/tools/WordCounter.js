'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function WordCounter() {
    const [text, setText] = useState('');
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0;
    const readingTime = Math.ceil(words / 200);

    return (
        <>
            <div className="input-group">
                <label>Enter your text</label>
                <textarea
                    className="input-field"
                    placeholder="Paste or type your text here..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                    rows={8}
                />
            </div>
            <div className="grid-3" style={{ marginTop: 16 }}>
                <div className="metric-card"><div className="metric-value">{words}</div><div className="metric-label">Words</div></div>
                <div className="metric-card"><div className="metric-value">{chars}</div><div className="metric-label">Characters</div></div>
                <div className="metric-card"><div className="metric-value">{charsNoSpace}</div><div className="metric-label">No Spaces</div></div>
                <div className="metric-card"><div className="metric-value">{sentences}</div><div className="metric-label">Sentences</div></div>
                <div className="metric-card"><div className="metric-value">{paragraphs}</div><div className="metric-label">Paragraphs</div></div>
                <div className="metric-card"><div className="metric-value">{readingTime}m</div><div className="metric-label">Reading Time</div></div>
            </div>
        </>
    );
}

'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function HtmlMinifier() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const minify = () => {
        const minified = input
            .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
            .replace(/>\s+</g, '><')         // Remove whitespace between tags
            .replace(/\s{2,}/g, ' ')         // Collapse multiple spaces
            .trim();
        setOutput(minified);
    };

    return (
        <>
            <div className="input-group">
                <label>HTML Source</label>
                <textarea className="input-field" value={input} onChange={e => setInput(e.target.value)} placeholder="<html>...</html>" rows={8} />
            </div>
            <button className="btn btn-primary btn-block" onClick={minify}>📦 Minify HTML</button>
            {output && (
                <div className="result-container" style={{ marginTop: 16 }}>
                    <div className="result-header">
                        <span className="result-title">Minified HTML</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                Saved: {((1 - output.length / input.length) * 100).toFixed(1)}%
                            </span>
                            <CopyButton text={output} />
                        </div>
                    </div>
                    <div className="result-content">{output}</div>
                </div>
            )}
        </>
    );
}

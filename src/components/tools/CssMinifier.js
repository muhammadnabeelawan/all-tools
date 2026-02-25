'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function CssMinifier() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const minify = () => {
        const minified = input
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
            .replace(/\s*([{}|:;,])\s*/g, '$1') // Remove spaces around delimiters
            .replace(/\s{2,}/g, ' ')            // Collapse spaces
            .trim();
        setOutput(minified);
    };

    return (
        <>
            <div className="input-group">
                <label>CSS Source</label>
                <textarea className="input-field" value={input} onChange={e => setInput(e.target.value)} placeholder=".class { color: red; }" rows={8} />
            </div>
            <button className="btn btn-primary btn-block" onClick={minify}>📦 Minify CSS</button>
            {output && (
                <div className="result-container" style={{ marginTop: 16 }}>
                    <div className="result-header">
                        <span className="result-title">Minified CSS</span>
                        <CopyButton text={output} />
                    </div>
                    <div className="result-content">{output}</div>
                </div>
            )}
        </>
    );
}

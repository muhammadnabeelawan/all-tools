'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function JsMinifier() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const minify = () => {
        // Note: This is a very basic minifier. For production, a library like Terser would be used.
        const minified = input
            .replace(/\/\*[\s\S]*?\*\//g, '')    // Remove block comments
            .replace(/\/\/.*/g, '')              // Remove line comments
            .replace(/\s+/g, ' ')                // Collapse whitespace
            .replace(/\s*([{}()\[\]=+\-*/%!|&<>?:;,])\s*/g, '$1') // Remove spaces around operators
            .trim();
        setOutput(minified);
    };

    return (
        <>
            <div className="input-group">
                <label>JavaScript Source</label>
                <textarea className="input-field" value={input} onChange={e => setInput(e.target.value)} placeholder="function hello() { console.log('hi'); }" rows={8} />
            </div>
            <button className="btn btn-primary btn-block" onClick={minify}>⚡ Minify JS</button>
            {output && (
                <div className="result-container" style={{ marginTop: 16 }}>
                    <div className="result-header">
                        <span className="result-title">Minified JS</span>
                        <CopyButton text={output} />
                    </div>
                    <div className="result-content">{output}</div>
                </div>
            )}
        </>
    );
}

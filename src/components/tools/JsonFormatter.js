'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function JsonFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [indent, setIndent] = useState(2);

    const format = () => {
        try {
            const obj = JSON.parse(input);
            setOutput(JSON.stringify(obj, null, indent));
            setError('');
        } catch (e) {
            setError(e.message);
            setOutput('');
        }
    };

    const minify = () => {
        try {
            const obj = JSON.parse(input);
            setOutput(JSON.stringify(obj));
            setError('');
        } catch (e) {
            setError(e.message);
            setOutput('');
        }
    };

    return (
        <>
            <div className="input-group">
                <label>JSON Input</label>
                <textarea className="input-field" value={input} onChange={e => setInput(e.target.value)} placeholder='{"key": "value"}' rows={8} />
            </div>
            <div className="input-group">
                <label>Indent Spaces: {indent}</label>
                <input type="range" className="range-slider" min="1" max="8" value={indent} onChange={e => setIndent(Number(e.target.value))} />
            </div>
            {error && <p style={{ color: 'var(--accent-red)', fontSize: '0.85rem', marginBottom: 12 }}>❌ {error}</p>}
            <div className="btn-group">
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={format}>✨ Format / Beautify</button>
                <button className="btn btn-secondary" onClick={minify}>📦 Minify</button>
            </div>
            {output && (
                <div className="result-container" style={{ marginTop: 16 }}>
                    <div className="result-header"><span className="result-title">Output</span><CopyButton text={output} /></div>
                    <div className="result-content">{output}</div>
                </div>
            )}
        </>
    );
}

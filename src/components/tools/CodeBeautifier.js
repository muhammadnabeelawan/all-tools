'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function CodeBeautifier() {
    const [code, setCode] = useState('');
    const [type, setType] = useState('json');
    const [output, setOutput] = useState('');

    const beautify = () => {
        if (!code) return;
        try {
            if (type === 'json') {
                setOutput(JSON.stringify(JSON.parse(code), null, 2));
            } else {
                // Simple beautification for HTML/CSS using regex (placeholder for full library)
                let beautified = code
                    .replace(/>\s*</g, '>\n<')
                    .replace(/{\s*/g, ' {\n  ')
                    .replace(/;\s*/g, ';\n  ')
                    .replace(/\n\s*}/g, '\n}');
                setOutput(beautified);
            }
        } catch (e) {
            alert('Invalid code format');
        }
    };

    return (
        <>
            <div className="input-group">
                <label>Select Format</label>
                <div className="grid-3">
                    <button className={`btn ${type === 'json' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setType('json')}>JSON</button>
                    <button className={`btn ${type === 'html' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setType('html')}>HTML</button>
                    <button className={`btn ${type === 'css' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setType('css')}>CSS</button>
                </div>
            </div>
            <div className="input-group">
                <label>Input Code</label>
                <textarea className="input-field" value={code} onChange={e => setCode(e.target.value)} rows={8} placeholder={`Paste your ${type} here...`} />
            </div>
            <button className="btn btn-primary btn-block" onClick={beautify}>✨ Beautify Code</button>

            {output && (
                <div className="result-container" style={{ marginTop: 24 }}>
                    <div className="result-header">
                        <span className="result-title">Beautified Code</span>
                        <CopyButton text={output} />
                    </div>
                    <pre className="result-content" style={{ maxHeight: 600, fontSize: '0.85rem' }}>{output}</pre>
                </div>
            )}
        </>
    );
}

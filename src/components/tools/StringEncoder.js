'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function StringEncoder() {
    const [text, setText] = useState('');
    const [mode, setMode] = useState('base64-encode');

    const process = () => {
        try {
            switch (mode) {
                case 'base64-encode': return btoa(unescape(encodeURIComponent(text)));
                case 'base64-decode': return decodeURIComponent(escape(atob(text)));
                case 'url-encode': return encodeURIComponent(text);
                case 'url-decode': return decodeURIComponent(text);
                case 'html-encode': return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                case 'html-decode': return text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
                default: return text;
            }
        } catch { return 'Error: Invalid input for this operation'; }
    };
    const [result, setResult] = useState('');

    return (
        <>
            <div className="input-group">
                <label>Input</label>
                <textarea className="input-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text to encode/decode..." rows={4} />
            </div>
            <div className="input-group">
                <label>Mode</label>
                <select className="input-field" value={mode} onChange={e => setMode(e.target.value)}>
                    <option value="base64-encode">Base64 Encode</option>
                    <option value="base64-decode">Base64 Decode</option>
                    <option value="url-encode">URL Encode</option>
                    <option value="url-decode">URL Decode</option>
                    <option value="html-encode">HTML Encode</option>
                    <option value="html-decode">HTML Decode</option>
                </select>
            </div>
            <button className="btn btn-primary btn-block" onClick={() => setResult(process())}>Convert</button>
            {result && (
                <div className="result-container" style={{ marginTop: 16 }}>
                    <div className="result-header"><span className="result-title">Result</span><CopyButton text={result} /></div>
                    <div className="result-content">{result}</div>
                </div>
            )}
        </>
    );
}

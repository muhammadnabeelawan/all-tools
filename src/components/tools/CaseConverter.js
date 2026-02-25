'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function CaseConverter() {
    const [text, setText] = useState('');
    const convert = (type) => {
        switch (type) {
            case 'upper': return text.toUpperCase();
            case 'lower': return text.toLowerCase();
            case 'title': return text.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());
            case 'sentence': return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
            case 'toggle': return text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
            case 'camel': return text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, c) => c.toUpperCase());
            case 'snake': return text.toLowerCase().replace(/\s+/g, '_');
            case 'kebab': return text.toLowerCase().replace(/\s+/g, '-');
            default: return text;
        }
    };
    const [result, setResult] = useState('');

    return (
        <>
            <div className="input-group">
                <label>Enter your text</label>
                <textarea className="input-field" placeholder="Type text here..." value={text} onChange={e => setText(e.target.value)} rows={4} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {[['upper', 'UPPER CASE'], ['lower', 'lower case'], ['title', 'Title Case'], ['sentence', 'Sentence case'], ['toggle', 'tOGGLE'], ['camel', 'camelCase'], ['snake', 'snake_case'], ['kebab', 'kebab-case']].map(([k, l]) => (
                    <button key={k} className="btn btn-secondary btn-sm" onClick={() => setResult(convert(k))}>{l}</button>
                ))}
            </div>
            {result && (
                <div className="result-container">
                    <div className="result-header"><span className="result-title">Result</span><CopyButton text={result} /></div>
                    <div className="result-content">{result}</div>
                </div>
            )}
        </>
    );
}

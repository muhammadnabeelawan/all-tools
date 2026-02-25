'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function RemoveDuplicates() {
    const [text, setText] = useState('');
    const [caseSensitive, setCaseSensitive] = useState(true);
    const removeDups = () => {
        const lines = text.split('\n');
        const seen = new Set();
        return lines.filter(line => {
            const key = caseSensitive ? line : line.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        }).join('\n');
    };
    const result = text ? removeDups() : '';
    const removed = text ? text.split('\n').length - result.split('\n').length : 0;
    return (
        <>
            <div className="input-group">
                <label>Paste your lines</label>
                <textarea className="input-field" value={text} onChange={e => setText(e.target.value)} placeholder="One item per line..." rows={8} />
            </div>
            <div className="checkbox-group" style={{ marginBottom: 16 }}>
                <label className="checkbox-label">
                    <input type="checkbox" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} />
                    <span>Case Sensitive</span>
                </label>
            </div>
            {result && (
                <>
                    <p style={{ color: 'var(--accent-green)', fontSize: '0.85rem', marginBottom: 12 }}>✓ Removed {removed} duplicate line(s)</p>
                    <div className="result-container">
                        <div className="result-header"><span className="result-title">Unique Lines</span><CopyButton text={result} /></div>
                        <div className="result-content">{result}</div>
                    </div>
                </>
            )}
        </>
    );
}

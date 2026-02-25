'use client';
import { useState, useEffect } from 'react';

export default function RegexTester() {
    const [pattern, setPattern] = useState('[a-z]+');
    const [flags, setFlags] = useState('g');
    const [text, setText] = useState('The quick brown fox jumps over the lazy dog');
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!pattern) {
            setMatches([]);
            setError('');
            return;
        }
        try {
            const regex = new RegExp(pattern, flags);
            const m = [...text.matchAll(regex)];
            setMatches(m);
            setError('');
        } catch (e) {
            setError(e.message);
            setMatches([]);
        }
    }, [pattern, flags, text]);

    return (
        <>
            <div className="grid-2">
                <div className="input-group">
                    <label>Regex Pattern</label>
                    <input className="input-field" value={pattern} onChange={e => setPattern(e.target.value)} placeholder="e.g. [a-z]+" />
                </div>
                <div className="input-group">
                    <label>Flags</label>
                    <input className="input-field" value={flags} onChange={e => setFlags(e.target.value)} placeholder="g, i, m..." />
                </div>
            </div>
            {error && <p style={{ color: 'var(--accent-red)', fontSize: '0.85rem', marginBottom: 12 }}>❌ {error}</p>}

            <div className="input-group">
                <label>Test Text</label>
                <textarea className="input-field" value={text} onChange={e => setText(e.target.value)} rows={4} />
            </div>

            <div className="result-container">
                <div className="result-header">
                    <span className="result-title">Matches ({matches.length})</span>
                </div>
                <div style={{ padding: '16px', wordBreak: 'break-all', lineHeight: 2 }}>
                    {text.split('').map((char, i) => {
                        const isMatch = matches.some(m => i >= m.index && i < m.index + m[0].length);
                        return (
                            <span key={i} style={{
                                background: isMatch ? 'rgba(139, 92, 246, 0.3)' : 'transparent',
                                borderRadius: '2px',
                                padding: '2px 0'
                            }}>{char}</span>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

'use client';
import { useState } from 'react';

export default function TextDiff() {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [diff, setDiff] = useState(null);

    const compare = () => {
        const lines1 = text1.split('\n');
        const lines2 = text2.split('\n');
        const maxLen = Math.max(lines1.length, lines2.length);
        const result = [];
        for (let i = 0; i < maxLen; i++) {
            const l1 = lines1[i] ?? '';
            const l2 = lines2[i] ?? '';
            if (l1 === l2) result.push({ type: 'same', line: l1, num: i + 1 });
            else {
                if (l1) result.push({ type: 'removed', line: l1, num: i + 1 });
                if (l2) result.push({ type: 'added', line: l2, num: i + 1 });
            }
        }
        setDiff(result);
    };

    return (
        <>
            <div className="grid-2">
                <div className="input-group">
                    <label>Original Text</label>
                    <textarea className="input-field" value={text1} onChange={e => setText1(e.target.value)} placeholder="Paste original text..." rows={8} />
                </div>
                <div className="input-group">
                    <label>Modified Text</label>
                    <textarea className="input-field" value={text2} onChange={e => setText2(e.target.value)} placeholder="Paste modified text..." rows={8} />
                </div>
            </div>
            <button className="btn btn-primary btn-block" onClick={compare}>Compare Texts</button>
            {diff && (
                <div className="result-container" style={{ marginTop: 16 }}>
                    <div className="result-title" style={{ marginBottom: 12 }}>Differences</div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.8 }}>
                        {diff.map((d, i) => (
                            <div key={i} style={{
                                padding: '4px 12px',
                                background: d.type === 'added' ? 'rgba(16,185,129,0.1)' : d.type === 'removed' ? 'rgba(239,68,68,0.1)' : 'transparent',
                                color: d.type === 'added' ? 'var(--accent-green)' : d.type === 'removed' ? 'var(--accent-red)' : 'var(--text-secondary)',
                                borderLeft: `3px solid ${d.type === 'added' ? 'var(--accent-green)' : d.type === 'removed' ? 'var(--accent-red)' : 'transparent'}`,
                            }}>
                                <span style={{ opacity: 0.5, marginRight: 12 }}>{d.num}</span>
                                {d.type === 'added' ? '+ ' : d.type === 'removed' ? '- ' : '  '}{d.line}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

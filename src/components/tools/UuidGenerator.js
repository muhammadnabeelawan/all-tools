'use client';
import { useState, useEffect } from 'react';
import CopyButton from '@/components/CopyButton';

export default function UuidGenerator() {
    const [uuids, setUuids] = useState([]);
    const [count, setCount] = useState(5);

    const generate = () => {
        const newUuids = Array.from({ length: count }, () => {
            // Basic v4 UUID generator (fallback if crypto.randomUUID not available)
            if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        });
        setUuids(newUuids);
    };

    useEffect(() => {
        generate();
    }, []);

    return (
        <>
            <div className="input-group">
                <label>Number of UUIDs to Generate (1 to 20)</label>
                <div style={{ display: 'flex', gap: 10 }}>
                    <input
                        className="input-field"
                        type="number"
                        min="1"
                        max="20"
                        value={count}
                        onChange={e => setCount(parseInt(e.target.value) || 1)}
                    />
                    <button className="btn btn-primary btn-sm" onClick={generate}>🔄 Regenerate</button>
                </div>
            </div>

            <div style={{ marginTop: 24 }}>
                <div className="result-header">
                    <span className="result-title">Generated UUIDs (v4)</span>
                    <CopyButton text={uuids.join('\n')} />
                </div>
                <div className="result-content" style={{ maxHeight: 600 }}>
                    {uuids.map((uuid, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            background: 'var(--bg-secondary)',
                            marginBottom: 8,
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.9rem',
                            fontFamily: 'monospace',
                            color: 'var(--text-muted)'
                        }}>
                            <span>{uuid}</span>
                            <CopyButton text={uuid} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

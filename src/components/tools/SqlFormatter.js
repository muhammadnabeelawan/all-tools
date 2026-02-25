'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function SqlFormatter() {
    const [inp, setInp] = useState('');
    const [out, setOut] = useState('');

    const format = () => {
        if (!inp) return;
        try {
            // Basic SQL formatter using simple regex
            const sql = inp
                .replace(/\s+/g, ' ')
                .replace(/\b(SELECT|FROM|WHERE|INSERT|INTO|UPDATE|SET|DELETE|GROUP BY|ORDER BY|HAVING|LIMIT|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|AND|OR|ON|VALUES|CREATE|ALTER|DROP|TABLE)\b/gi, (match) => `\n${match.toUpperCase()}`)
                .replace(/,/g, ',\n  ')
                .replace(/\(/g, ' (\n  ')
                .replace(/\)/g, '\n)')
                .trim();
            setOut(sql);
        } catch (e) {
            console.error(e);
            setOut('Invalid SQL data');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="input-group">
                <label>Input SQL</label>
                <textarea className="input-field" value={inp} onChange={e => setInp(e.target.value)} rows={8} placeholder="SELECT * FROM users WHERE id = 1" />
            </div>
            <button className="btn btn-primary btn-block" onClick={format}>⚡ Format SQL</button>

            {out && (
                <div className="result-container" style={{ marginTop: 24 }}>
                    <div className="result-header">
                        <span className="result-title">Formatted SQL</span>
                        <CopyButton text={out} />
                    </div>
                    <pre className="result-content" style={{ maxHeight: 600 }}>{out}</pre>
                </div>
            )}
        </div>
    );
}

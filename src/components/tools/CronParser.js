'use client';
import { useState } from 'react';

export default function CronParser() {
    const [cron, setCron] = useState('0 0 * * *');
    const [description, setDescription] = useState('');

    const parse = () => {
        const parts = cron.trim().split(/\s+/);
        if (parts.length !== 5) {
            setDescription('Invalid cron expression. Please provide 5 parts (minute, hour, day, month, day-of-week).');
            return;
        }

        const [m, h, d, mo, dw] = parts;
        let desc = 'This cron runs: ';

        if (m === '*' && h === '*' && d === '*' && mo === '*' && dw === '*') {
            desc += 'every minute of every day.';
        } else {
            desc += `at ${h === '*' ? 'every hour' : `hour ${h}`}:${m === '*' ? 'every minute' : `minute ${m}`}`;
            desc += `, on Day ${d === '*' ? 'of every month' : d}`;
            desc += `, in Month ${mo === '*' ? 'of every year' : mo}`;
            desc += `, and on Weekday ${dw === '*' ? 'of every week' : dw}.`;
        }

        setDescription(desc);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="input-group">
                <label>Cron Expression (standard 5-part)</label>
                <input className="input-field" value={cron} onChange={e => setCron(e.target.value)} placeholder="* * * * *" />
                <button className="btn btn-primary btn-block" style={{ marginTop: '1rem' }} onClick={parse}>⚡ Parse Cron</button>
            </div>

            {description && (
                <div className="result-container">
                    <div className="result-header">
                        <span className="result-title">Human Readable Output</span>
                    </div>
                    <div className="result-content" style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                        {description}
                    </div>
                </div>
            )}
        </div>
    );
}

'use client';
import { useState, useEffect } from 'react';

const COMMON_ZONES = [
    { name: 'UTC (GMT)', zone: 'UTC' },
    { name: 'New York (EST/EDT)', zone: 'America/New_York' },
    { name: 'London (GMT/BST)', zone: 'Europe/London' },
    { name: 'Tokyo (JST)', zone: 'Asia/Tokyo' },
    { name: 'Dubai (GST)', zone: 'Asia/Dubai' },
    { name: 'Singapore (SGT)', zone: 'Asia/Singapore' },
    { name: 'Sydney (AEDT/AEST)', zone: 'Australia/Sydney' },
];

export default function TimeZoneConverter() {
    const [baseTime, setBaseTime] = useState(new Date().toISOString().slice(0, 16));
    const [baseZone, setBaseZone] = useState('UTC');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const date = new Date(baseTime);
        const converted = COMMON_ZONES.map(z => {
            return {
                ...z,
                time: date.toLocaleString('en-US', {
                    timeZone: z.zone,
                    dateStyle: 'medium',
                    timeStyle: 'short',
                })
            };
        });
        setResults(converted);
    }, [baseTime]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="grid-2">
                <div className="input-group">
                    <label>Base Date & Time</label>
                    <input
                        className="input-field"
                        type="datetime-local"
                        value={baseTime}
                        onChange={e => setBaseTime(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Summary</label>
                    <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '4px', fontSize: '0.9rem' }}>
                        Converting from your local device time to global standard zones.
                    </div>
                </div>
            </div>

            <div className="result-container">
                <div className="result-header">
                    <span>Converted Global Times</span>
                </div>
                <div className="result-content">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {results.map(r => (
                            <div key={r.zone} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '16px',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px'
                            }}>
                                <div>
                                    <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{r.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.zone}</div>
                                </div>
                                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                                    {r.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

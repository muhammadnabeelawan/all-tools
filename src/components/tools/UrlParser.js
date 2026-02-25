'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function UrlParser() {
    const [url, setUrl] = useState('https://www.google.com/search?q=hello#world');
    const [parsed, setParsed] = useState(null);

    const parse = () => {
        try {
            const u = new URL(url);
            const params = Object.fromEntries(u.searchParams.entries());
            setParsed({
                protocol: u.protocol,
                hostname: u.hostname,
                port: u.port || 'default',
                pathname: u.pathname,
                search: u.search,
                hash: u.hash,
                queryParams: params
            });
        } catch (err) {
            alert('Invalid URL');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="input-group">
                <label>URL to Parse</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        className="input-field"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder="e.g. https://www.google.com/search?q=hello#world"
                    />
                    <button className="btn btn-primary" onClick={parse}>⚡ Parse URL</button>
                </div>
            </div>

            {parsed && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {['protocol', 'hostname', 'port', 'pathname', 'search', 'hash'].map(field => (
                        <div key={field} className="metric-card">
                            <div className="metric-label">{field.toUpperCase()}</div>
                            <div className="metric-value" style={{ color: 'var(--accent-primary)', wordBreak: 'break-all' }}>{parsed[field]}</div>
                            <CopyButton text={parsed[field]} />
                        </div>
                    ))}
                </div>
            )}

            {parsed && Object.keys(parsed.queryParams).length > 0 && (
                <div className="result-container">
                    <div className="result-header">
                        <span>Query Parameters ({Object.keys(parsed.queryParams).length})</span>
                    </div>
                    <div className="result-content">
                        {Object.entries(parsed.queryParams).map(([k, v]) => (
                            <div key={k} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '10px 14px',
                                background: 'var(--bg-secondary)',
                                marginBottom: 8,
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.9rem',
                                color: 'var(--text-muted)'
                            }}>
                                <span style={{ fontWeight: 'bold', color: 'var(--accent-success)' }}>{k}</span>
                                <span>{v}</span>
                                <CopyButton text={v} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

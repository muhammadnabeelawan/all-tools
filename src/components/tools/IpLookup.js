'use client';
import { useState, useEffect } from 'react';

export default function IpLookup() {
    const [ipData, setIpData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchIp, setSearchIp] = useState('');

    const fetchIp = async (ip = '') => {
        setLoading(true);
        try {
            const res = await fetch(`https://ipapi.co/${ip}/json/`);
            const data = await res.json();
            setIpData(data);
        } catch (err) {
            console.error(err);
            alert('Error fetching IP data');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchIp();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="input-group">
                <label>Search IP Address</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        className="input-field"
                        value={searchIp}
                        onChange={e => setSearchIp(e.target.value)}
                        placeholder="e.g. 8.8.8.8"
                    />
                    <button className="btn btn-primary" onClick={() => fetchIp(searchIp)} disabled={loading}>
                        {loading ? 'Searching...' : '🔍 Search'}
                    </button>
                </div>
            </div>

            {ipData && (
                <div className="grid-2" style={{ gap: '1.5rem' }}>
                    <div className="metric-card">
                        <div className="metric-label">IP Address</div>
                        <div className="metric-value" style={{ color: 'var(--accent-primary)' }}>{ipData.ip}</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">Location</div>
                        <div className="metric-value">{ipData.city}, {ipData.region}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{ipData.country_name}</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">ISP</div>
                        <div className="metric-value" style={{ fontSize: '1.1rem' }}>{ipData.org}</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">Timezone</div>
                        <div className="metric-value" style={{ fontSize: '1.1rem' }}>{ipData.timezone}</div>
                    </div>
                </div>
            )}

            {ipData && (
                <div className="result-container">
                    <div className="result-header">
                        <span>Full Details</span>
                    </div>
                    <pre className="result-content" style={{ fontSize: '0.85rem', maxHeight: '300px' }}>
                        {JSON.stringify(ipData, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}

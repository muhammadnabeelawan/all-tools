'use client';
import { useState, useEffect } from 'react';
import CopyButton from '@/components/CopyButton';

export default function TimestampConverter() {
    const [unix, setUnix] = useState('');
    const [date, setDate] = useState('');
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    const convertUnix = () => {
        if (!unix) return;
        const d = new Date(parseInt(unix) * 1000);
        setDate(d.toLocaleString());
    };

    const convertDate = () => {
        if (!date) return;
        const d = new Date(date);
        if (!isNaN(d.getTime())) {
            setUnix(Math.floor(d.getTime() / 1000).toString());
        } else {
            alert('Invalid date format');
        }
    };

    return (
        <>
            <div className="metric-card" style={{ marginBottom: 24, textAlign: 'center' }}>
                <div className="metric-label">Current Unix Timestamp</div>
                <div className="metric-value" style={{ color: 'var(--accent-primary)' }}>{Math.floor(now / 1000)}</div>
                <CopyButton text={Math.floor(now / 1000)} />
            </div>

            <div className="grid-2">
                <div className="input-group">
                    <label>Unix Timestamp (Seconds)</label>
                    <input className="input-field" type="number" value={unix} onChange={e => setUnix(e.target.value)} placeholder="1624536000" />
                    <button className="btn btn-primary btn-sm" onClick={convertUnix} style={{ marginTop: 10 }}>📅 Get Date</button>
                </div>
                <div className="input-group">
                    <label>Human Readable Date</label>
                    <input className="input-field" value={date} onChange={e => setDate(e.target.value)} placeholder="2021-06-24 12:00:00" />
                    <button className="btn btn-outline btn-sm" onClick={convertDate} style={{ marginTop: 10 }}>🔢 Get Unix</button>
                </div>
            </div>

            {date && (
                <div className="result-container" style={{ marginTop: 24 }}>
                    <div className="result-header">
                        <span className="result-title">Result Date</span>
                        <CopyButton text={date} />
                    </div>
                    <div className="result-content">{date}</div>
                </div>
            )}
        </>
    );
}

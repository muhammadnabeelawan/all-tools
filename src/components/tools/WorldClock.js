'use client';
import { useState, useEffect } from 'react';

const CITIES = [
    { name: 'London', zone: 'Europe/London', icon: '🇬🇧' },
    { name: 'New York', zone: 'America/New_York', icon: '🇺🇸' },
    { name: 'Tokyo', zone: 'Asia/Tokyo', icon: '🇯🇵' },
    { name: 'Dubai', zone: 'Asia/Dubai', icon: '🇦🇪' },
    { name: 'Singapore', zone: 'Asia/Singapore', icon: '🇸🇬' },
    { name: 'Sydney', zone: 'Australia/Sydney', icon: '🇦🇺' },
];

export default function WorldClock() {
    const [times, setTimes] = useState({});

    useEffect(() => {
        const updateTimes = () => {
            const newTimes = {};
            CITIES.forEach(city => {
                newTimes[city.name] = new Date().toLocaleTimeString('en-US', {
                    timeZone: city.zone,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                });
            });
            setTimes(newTimes);
        };

        updateTimes();
        const interval = setInterval(updateTimes, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {CITIES.map(city => (
                <div key={city.name} className="metric-card" style={{
                    background: 'var(--bg-secondary)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{ fontSize: '2rem' }}>{city.icon}</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{city.name}</div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontFamily: 'monospace',
                        color: 'var(--accent-primary)',
                        fontWeight: '700'
                    }}>
                        {times[city.name] || '--:--:--'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{city.zone}</div>
                </div>
            ))}
        </div>
    );
}

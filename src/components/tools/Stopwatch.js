'use client';
import { useState, useEffect, useRef } from 'react';

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [laps, setLaps] = useState([]);
    const timerRef = useRef();

    useEffect(() => {
        if (isActive) {
            const start = Date.now() - time;
            timerRef.current = setInterval(() => {
                setTime(Date.now() - start);
            }, 10);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isActive]);

    const format = (t) => {
        const mins = Math.floor(t / 60000);
        const secs = Math.floor((t % 60000) / 1000);
        const ms = Math.floor((t % 1000) / 10);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    };

    const handleLap = () => {
        setLaps([{ id: Date.now(), time }, ...laps]);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div style={{
                fontSize: '6rem',
                fontWeight: '800',
                fontFamily: 'monospace',
                color: 'var(--text-primary)',
                textShadow: '0 0 30px rgba(59, 130, 246, 0.2)'
            }}>
                {format(time)}
            </div>

            <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '500px' }}>
                <button className={`btn btn-block ${isActive ? 'btn-outline' : 'btn-primary'}`} onClick={() => setIsActive(!isActive)}>
                    {isActive ? '⏸ Stop' : '▶ Start'}
                </button>
                <button className="btn btn-block btn-outline" onClick={handleLap} disabled={!isActive}>🚩 Lap</button>
                <button className="btn btn-outline" onClick={() => { setTime(0); setIsActive(false); setLaps([]); }}>🔄 Reset</button>
            </div>

            {laps.length > 0 && (
                <div className="result-container" style={{ width: '100%', maxWidth: '500px' }}>
                    <div className="result-header">
                        <span>Laps</span>
                        <span>{laps.length} Total</span>
                    </div>
                    <div className="result-content" style={{ maxHeight: '300px' }}>
                        {laps.map((l, i) => (
                            <div key={l.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '12px 16px',
                                borderBottom: '1px solid var(--border-color)',
                                fontSize: '1rem'
                            }}>
                                <span style={{ color: 'var(--text-muted)' }}>Lap {laps.length - i}</span>
                                <span style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{format(l.time)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

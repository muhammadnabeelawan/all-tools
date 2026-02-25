'use client';
import { useState, useEffect } from 'react';

export default function PomodoroTimer() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('work'); // work, short, long

    useEffect(() => {
        let timer = null;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
            audio.play().catch(e => console.log('Audio blocked', e));
            alert(`${mode === 'work' ? 'Work' : 'Break'} session complete!`);
        }
        return () => clearInterval(timer);
    }, [isActive, timeLeft, mode]);

    const switchMode = (m, mins) => {
        setMode(m);
        setTimeLeft(mins * 60);
        setIsActive(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
                <button className={`btn btn-sm ${mode === 'work' ? 'btn-primary' : 'btn-outline'}`} onClick={() => switchMode('work', 25)}>Work</button>
                <button className={`btn btn-sm ${mode === 'short' ? 'btn-primary' : 'btn-outline'}`} onClick={() => switchMode('short', 5)}>Short Break</button>
                <button className={`btn btn-sm ${mode === 'long' ? 'btn-primary' : 'btn-outline'}`} onClick={() => switchMode('long', 15)}>Long Break</button>
            </div>

            <div style={{
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                border: '8px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-secondary)',
                boxShadow: '0 0 50px rgba(139, 92, 246, 0.1)',
                position: 'relative'
            }}>
                <div style={{ fontSize: '4.5rem', fontWeight: '800', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                    {formatTime(timeLeft)}
                </div>
                <div style={{ fontSize: '1rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px' }}>
                    {mode}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '400px' }}>
                <button className="btn btn-primary btn-block" style={{ fontSize: '1.25rem' }} onClick={() => setIsActive(!isActive)}>
                    {isActive ? '⏸ Pause' : '▶ Start Focus'}
                </button>
                <button className="btn btn-outline" onClick={() => switchMode(mode, mode === 'work' ? 25 : mode === 'short' ? 5 : 15)}>🔄 Reset</button>
            </div>
        </div>
    );
}

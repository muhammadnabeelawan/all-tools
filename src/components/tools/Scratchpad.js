'use client';
import { useState, useEffect } from 'react';
import CopyButton from '@/components/CopyButton';

export default function Scratchpad() {
    const [text, setText] = useState('');
    const [status, setStatus] = useState('All changes saved locally');

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('all-tools-scratchpad');
        if (saved) setText(saved);
    }, []);

    // Auto-save to localStorage
    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem('all-tools-scratchpad', text);
            setStatus('All changes saved locally');
        }, 500);

        setStatus('Saving...');
        return () => clearTimeout(timer);
    }, [text]);

    const clear = () => {
        if (confirm('Are you sure you want to clear your scratchpad?')) {
            setText('');
            localStorage.removeItem('all-tools-scratchpad');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {status}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <CopyButton text={text} />
                    <button className="btn btn-outline btn-xs" onClick={clear}>🗑️ Clear</button>
                </div>
            </div>

            <textarea
                className="input-field"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Start typing anything... Your notes are automatically saved to your browser's local storage."
                style={{
                    minHeight: '500px',
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    padding: '24px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    fontFamily: 'inherit'
                }}
            />
        </div>
    );
}

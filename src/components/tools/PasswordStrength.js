'use client';
import { useState } from 'react';

export default function PasswordStrength() {
    const [password, setPassword] = useState('');

    const calculateStrength = (pwd) => {
        let score = 0;
        if (!pwd) return { score: 0, text: 'N/A', color: 'var(--text-muted)' };

        // Length
        if (pwd.length >= 8) score += 1;
        if (pwd.length >= 12) score += 1;

        // Character types
        if (/[A-Z]/.test(pwd)) score += 1;
        if (/[0-9]/.test(pwd)) score += 1;
        if (/[^a-zA-Z0-9]/.test(pwd)) score += 1;

        if (score <= 2) return { score, text: 'Weak', color: '#ef4444' };
        if (score <= 4) return { score, text: 'Medium', color: '#f59e0b' };
        return { score, text: 'Strong', color: '#10b981' };
    };

    const strength = calculateStrength(password);

    const checks = [
        { label: 'Minimum 8 characters', met: password.length >= 8 },
        { label: 'Includes Uppercase (A-Z)', met: /[A-Z]/.test(password) },
        { label: 'Includes Numbers (0-9)', met: /[0-9]/.test(password) },
        { label: 'Includes special characters (!@#$)', met: /[^a-zA-Z0-9]/.test(password) }
    ];

    return (
        <>
            <div className="input-group">
                <label>Enter Password to Check</label>
                <input
                    className="input-field"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Secure password here..."
                />
            </div>

            <div className="result-container" style={{ marginTop: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span className="result-title">Security Score: {strength.text}</span>
                    <span style={{ color: strength.color, fontWeight: 'bold' }}>{strength.score}/5</span>
                </div>
                <div style={{ height: 12, background: 'var(--bg-secondary)', borderRadius: 6, overflow: 'hidden' }}>
                    <div style={{
                        height: '100%',
                        width: `${(strength.score / 5) * 100}%`,
                        background: strength.color,
                        transition: 'width 0.3s ease'
                    }} />
                </div>
            </div>

            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                {checks.map((check, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        color: check.met ? 'var(--accent-success)' : 'var(--text-muted)',
                        fontSize: '0.85rem'
                    }}>
                        <span>{check.met ? '✅' : '❌'}</span>
                        <span>{check.label}</span>
                    </div>
                ))}
            </div>
        </>
    );
}

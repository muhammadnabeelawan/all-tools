'use client';
import { useState, useEffect } from 'react';
import CopyButton from '@/components/CopyButton';

export default function PasswordGenerator() {
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    });
    const [password, setPassword] = useState('');

    const generate = () => {
        let charset = '';
        if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (options.numbers) charset += '0123456789';
        if (options.symbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        if (!charset) {
            setPassword('Select at least one option');
            return;
        }

        let res = '';
        for (let i = 0; i < length; i++) {
            res += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(res);
    };

    useEffect(() => {
        generate();
    }, [length, options]);

    return (
        <>
            <div className="result-container" style={{ marginBottom: 24 }}>
                <div className="result-header">
                    <span className="result-title">Generated Password</span>
                    <CopyButton text={password} />
                </div>
                <div className="result-content" style={{ fontSize: '1.25rem', letterSpacing: '2px', textAlign: 'center' }}>
                    {password}
                </div>
            </div>

            <div className="input-group">
                <label>Password Length: {length}</label>
                <input
                    type="range"
                    min="4"
                    max="50"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                />
            </div>

            <div className="grid-2">
                <label className="checkbox-group">
                    <input type="checkbox" checked={options.uppercase} onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })} />
                    <span>Uppercase (A-Z)</span>
                </label>
                <label className="checkbox-group">
                    <input type="checkbox" checked={options.lowercase} onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })} />
                    <span>Lowercase (a-z)</span>
                </label>
                <label className="checkbox-group">
                    <input type="checkbox" checked={options.numbers} onChange={(e) => setOptions({ ...options, numbers: e.target.checked })} />
                    <span>Numbers (0-9)</span>
                </label>
                <label className="checkbox-group">
                    <input type="checkbox" checked={options.symbols} onChange={(e) => setOptions({ ...options, symbols: e.target.checked })} />
                    <span>Symbols (!@#$)</span>
                </label>
            </div>

            <button className="btn btn-primary btn-block" style={{ marginTop: 24 }} onClick={generate}>
                🔄 Regenerate Password
            </button>

            <style jsx>{`
        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          color: var(--text-secondary);
          padding: 8px;
          border-radius: var(--radius-sm);
          transition: background 0.2s;
        }
        .checkbox-group:hover {
          background: var(--bg-card);
        }
        .checkbox-group input {
          width: 18px;
          height: 18px;
          accent-color: var(--accent-primary);
        }
      `}</style>
        </>
    );
}

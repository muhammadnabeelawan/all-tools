'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function JwtDecoder() {
    const [token, setToken] = useState('');
    const [decoded, setDecoded] = useState(null);
    const [error, setError] = useState('');

    const decode = () => {
        try {
            if (!token) return;
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid JWT format');
            }
            const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            setDecoded({ header, payload });
            setError('');
        } catch (e) {
            setError(e.message);
            setDecoded(null);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="input-group">
                <label>JWT Token</label>
                <textarea
                    className="input-field"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter JWT token here..."
                    rows={5}
                />
                <button className="btn btn-primary btn-block" onClick={decode} style={{ marginTop: '1rem' }}>⚡ Decode</button>
            </div>

            {error && <div style={{ color: 'var(--accent-red)', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem' }}>❌ {error}</div>}

            {decoded && (
                <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="result-container">
                        <div className="result-header">
                            <span>Header</span>
                            <CopyButton text={JSON.stringify(decoded.header, null, 2)} />
                        </div>
                        <pre className="result-content" style={{ maxHeight: '400px', fontSize: '0.8rem' }}>{JSON.stringify(decoded.header, null, 2)}</pre>
                    </div>
                    <div className="result-container">
                        <div className="result-header">
                            <span>Payload</span>
                            <CopyButton text={JSON.stringify(decoded.payload, null, 2)} />
                        </div>
                        <pre className="result-content" style={{ maxHeight: '400px', fontSize: '0.8rem' }}>{JSON.stringify(decoded.payload, null, 2)}</pre>
                    </div>
                </div>
            )}
        </div>
    );
}

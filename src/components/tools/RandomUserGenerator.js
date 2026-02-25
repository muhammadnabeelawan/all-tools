'use client';
import { useState, useEffect } from 'react';
import CopyButton from '@/components/CopyButton';

export default function RandomUserGenerator() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://randomuser.me/api/');
            const data = await res.json();
            setUser(data.results[0]);
        } catch (err) {
            alert('Error fetching user');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <button className="btn btn-primary btn-block" onClick={fetchUser} disabled={loading}>
                {loading ? 'Generating...' : '👤 Generate New User'}
            </button>

            {user && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="metric-card" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '2.5rem',
                        textAlign: 'center'
                    }}>
                        <img
                            src={user.picture.large}
                            alt="Profile"
                            style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '1.5rem', border: '5px solid var(--accent-primary)' }}
                        />
                        <h2 style={{ fontSize: '2rem', margin: '0 0 8px 0' }}>{user.name.first} {user.name.last}</h2>
                        <p style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>@{user.login.username}</p>
                    </div>

                    <div className="grid-2">
                        {[
                            { label: 'Email', value: user.email },
                            { label: 'Phone', value: user.phone },
                            { label: 'Location', value: `${user.location.city}, ${user.location.country}` },
                            { label: 'Birthday', value: new Date(user.dob.date).toLocaleDateString() },
                            { label: 'Password', value: user.login.password },
                        ].map(attr => (
                            <div key={attr.label} className="result-container" style={{ margin: 0 }}>
                                <div className="result-header" style={{ padding: '8px 12px' }}>
                                    <span>{attr.label}</span>
                                    <CopyButton text={attr.value} />
                                </div>
                                <div style={{ padding: '12px', fontSize: '1rem', fontWeight: '500' }}>{attr.value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="result-container">
                        <div className="result-header">
                            <span>Full Data (JSON)</span>
                            <CopyButton text={JSON.stringify(user, null, 2)} />
                        </div>
                        <pre className="result-content" style={{ fontSize: '0.8rem', maxHeight: '300px' }}>
                            {JSON.stringify(user, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}

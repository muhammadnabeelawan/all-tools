'use client';
import { useState } from 'react';

export default function Dictionary() {
    const [word, setWord] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const search = async () => {
        if (!word) return;
        setLoading(true);
        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const json = await res.json();
            if (!res.ok) throw new Error(json.message || 'Word not found');
            setData(json[0]);
        } catch (err) {
            alert(err.message);
            setData(null);
        }
        setLoading(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="input-group">
                <label>Search Word (English)</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input className="input-field" value={word} onChange={e => setWord(e.target.value)} onKeyPress={e => e.key === 'Enter' && search()} placeholder="e.g. Innovation, Serendipity..." />
                    <button className="btn btn-primary" onClick={search} disabled={loading}>
                        {loading ? 'Searching...' : '🔍 Search'}
                    </button>
                </div>
            </div>

            {data && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="metric-card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '3rem', margin: 0, textTransform: 'capitalize' }}>{data.word}</h2>
                        <p style={{ color: 'var(--accent-primary)', fontSize: '1.25rem' }}>{data.phonetic}</p>
                    </div>

                    {data.meanings.map((m, i) => (
                        <div key={i} className="result-container">
                            <div className="result-header">
                                <span className="result-title" style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>{m.partOfSpeech}</span>
                            </div>
                            <div className="result-content">
                                <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                                    {m.definitions.map((def, j) => (
                                        <li key={j} style={{ marginBottom: '1rem' }}>
                                            <div style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{def.definition}</div>
                                            {def.example && (
                                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                                                    "{def.example}"
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

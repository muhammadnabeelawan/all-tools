'use client';
import { useState } from 'react';

export default function ListRandomizer() {
    const [items, setItems] = useState('');
    const [result, setResult] = useState(null);
    const [shuffled, setShuffled] = useState([]);

    const handleRandom = () => {
        const list = items.split('\n').map(i => i.trim()).filter(i => i !== '');
        if (list.length === 0) return;
        const random = list[Math.floor(Math.random() * list.length)];
        setResult(random);
    };

    const handleShuffle = () => {
        const list = items.split('\n').map(i => i.trim()).filter(i => i !== '');
        const s = [...list].sort(() => Math.random() - 0.5);
        setShuffled(s);
        setResult(null);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="input-group">
                <label>List of Items (one per line)</label>
                <textarea
                    className="input-field"
                    value={items}
                    onChange={e => setItems(e.target.value)}
                    rows={10}
                    placeholder="Apples&#10;Oranges&#10;Bananas&#10;Grapes"
                />
            </div>

            <div className="grid-2">
                <button className="btn btn-primary" onClick={handleRandom}>🎲 Pick Random</button>
                <button className="btn btn-outline" onClick={handleShuffle}>🔀 Shuffle List</button>
            </div>

            {result && (
                <div className="metric-card" style={{ textAlign: 'center', borderColor: 'var(--accent-primary)', animation: 'pulse 2s infinite' }}>
                    <div className="metric-label">Selected Item</div>
                    <div className="metric-value">{result}</div>
                </div>
            )}

            {shuffled.length > 0 && (
                <div className="result-container">
                    <div className="result-header">
                        <span>Shuffled List</span>
                        <button className="btn btn-outline btn-xs" onClick={() => setShuffled([])}>Clear</button>
                    </div>
                    <div className="result-content">
                        {shuffled.map((item, i) => (
                            <div key={i} style={{
                                padding: '8px 12px',
                                background: 'var(--bg-secondary)',
                                marginBottom: '4px',
                                borderRadius: '4px',
                                fontSize: '0.9rem'
                            }}>
                                {i + 1}. {item}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

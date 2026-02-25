'use client';
import { useState } from 'react';

export default function PercentageCalculator() {
    const [val1, setVal1] = useState(20);
    const [val2, setVal2] = useState(150);
    const [val3, setVal3] = useState(30);
    const [val4, setVal4] = useState(150);

    const res1 = (val1 * val2 / 100).toFixed(2);
    const res2 = (val3 / val4 * 100).toFixed(2);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <section>
                <div className="input-field" style={{ marginBottom: '1rem', border: 'none', background: 'transparent' }}>What is {val1}% of {val2}?</div>
                <div className="grid-2" style={{ gap: '1rem' }}>
                    <input className="input-field" type="number" value={val1} onChange={e => setVal1(parseFloat(e.target.value) || 0)} placeholder="Percentage" />
                    <input className="input-field" type="number" value={val2} onChange={e => setVal2(parseFloat(e.target.value) || 0)} placeholder="Value" />
                </div>
                <div className="metric-card" style={{ marginTop: '1rem', borderColor: 'var(--accent-primary)' }}>
                    <div className="metric-label">Result</div>
                    <div className="metric-value">{res1}</div>
                </div>
            </section>

            <section>
                <div className="input-field" style={{ marginBottom: '1rem', border: 'none', background: 'transparent' }}>{val3} is what % of {val4}?</div>
                <div className="grid-2" style={{ gap: '1rem' }}>
                    <input className="input-field" type="number" value={val3} onChange={e => setVal3(parseFloat(e.target.value) || 0)} placeholder="Value" />
                    <input className="input-field" type="number" value={val4} onChange={e => setVal4(parseFloat(e.target.value) || 0)} placeholder="Total" />
                </div>
                <div className="metric-card" style={{ marginTop: '1rem', borderColor: 'var(--accent-success)' }}>
                    <div className="metric-label">Result Percentage</div>
                    <div className="metric-value">{res2}%</div>
                </div>
            </section>
        </div>
    );
}

'use client';
import { useState } from 'react';

export default function PercentageCalculator() {
    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');
    const [val3, setVal3] = useState('');
    const [val4, setVal4] = useState('');

    // What is X% of Y?
    const res1 = (val1 && val2) ? (Number(val1) / 100 * Number(val2)).toFixed(2) : null;
    // X is what % of Y?
    const res2 = (val3 && val4) ? (Number(val3) / Number(val4) * 100).toFixed(2) : null;

    return (
        <>
            <div className="input-group">
                <label>What is % of ?</label>
                <div className="grid-2">
                    <input className="input-field" type="number" value={val1} onChange={e => setVal1(e.target.value)} placeholder="Percentage (e.g. 20)" />
                    <input className="input-field" type="number" value={val2} onChange={e => setVal2(e.target.value)} placeholder="Value (e.g. 150)" />
                </div>
            </div>
            {res1 !== null && (
                <div className="result-container" style={{ marginBottom: 32 }}>
                    <div className="result-value">{res1}</div>
                    <div className="result-label" style={{ textAlign: 'center' }}>Result</div>
                </div>
            )}

            <div className="input-group">
                <label>is what % of ?</label>
                <div className="grid-2">
                    <input className="input-field" type="number" value={val3} onChange={e => setVal3(e.target.value)} placeholder="Value (e.g. 30)" />
                    <input className="input-field" type="number" value={val4} onChange={e => setVal4(e.target.value)} placeholder="Total (e.g. 150)" />
                </div>
            </div>
            {res2 !== null && (
                <div className="result-container">
                    <div className="result-value">{res2}%</div>
                    <div className="result-label" style={{ textAlign: 'center' }}>Result</div>
                </div>
            )}
        </>
    );
}

'use client';
import { useState } from 'react';

export default function VatCalculator() {
    const [amount, setAmount] = useState(100);
    const [rate, setRate] = useState(20);
    const [type, setType] = useState('add'); // add or remove

    const val = parseFloat(amount) || 0;
    const r = parseFloat(rate) || 0;

    let vatAmount = 0;
    let netAmount = 0;
    let grossAmount = 0;

    if (type === 'add') {
        netAmount = val;
        vatAmount = val * (r / 100);
        grossAmount = val + vatAmount;
    } else {
        grossAmount = val;
        netAmount = val / (1 + r / 100);
        vatAmount = grossAmount - netAmount;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="grid-3" style={{ gap: '1rem' }}>
                <div className="input-group">
                    <label>Calculation Type</label>
                    <div className="grid-2" style={{ gap: '8px' }}>
                        <button className={`btn btn-sm ${type === 'add' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setType('add')}>Add VAT</button>
                        <button className={`btn btn-sm ${type === 'remove' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setType('remove')}>Remove VAT</button>
                    </div>
                </div>
                <div className="input-group">
                    <label>Amount ($)</label>
                    <input className="input-field" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>VAT Rate (%)</label>
                    <input className="input-field" type="number" value={rate} onChange={e => setRate(e.target.value)} />
                </div>
            </div>

            <div className="grid-3" style={{ gap: '1.5rem' }}>
                <div className="metric-card">
                    <div className="metric-label">Net Amount</div>
                    <div className="metric-value">${netAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div className="metric-card">
                    <div className="metric-label">VAT Amount ({r}%)</div>
                    <div className="metric-value" style={{ color: 'var(--accent-primary)' }}>${vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div className="metric-card" style={{ borderColor: 'var(--accent-primary)' }}>
                    <div className="metric-label">Gross Amount</div>
                    <div className="metric-value" style={{ fontWeight: '800' }}>${grossAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {type === 'add'
                    ? `Adding ${r}% VAT to $${netAmount.toFixed(2)} equals $${grossAmount.toFixed(2)}.`
                    : `Removing ${r}% VAT from $${grossAmount.toFixed(2)} equals $${netAmount.toFixed(2)}.`
                }
            </div>
        </div>
    );
}

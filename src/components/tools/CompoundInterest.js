'use client';
import { useState } from 'react';

export default function CompoundInterest() {
    const [principal, setPrincipal] = useState(10000);
    const [rate, setRate] = useState(5.5);
    const [years, setYears] = useState(10);
    const [compound, setCompound] = useState(12); // monthly

    const p = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(years) || 0;
    const n = parseInt(compound);

    // A = P(1 + r/n)^(nt)
    const amount = p * Math.pow(1 + r / n, n * t);
    const interest = amount - p;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="grid-2">
                <div className="input-group">
                    <label>Principal Amount ($)</label>
                    <input className="input-field" type="number" value={principal} onChange={e => setPrincipal(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Annual Interest Rate (%)</label>
                    <input className="input-field" type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} />
                </div>
            </div>

            <div className="grid-2">
                <div className="input-group">
                    <label>Time Period (Years)</label>
                    <input className="input-field" type="number" value={years} onChange={e => setYears(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Compounding Frequency</label>
                    <select className="input-field" value={compound} onChange={e => setCompound(e.target.value)}>
                        <option value="1">Annually (1x year)</option>
                        <option value="2">Semi-annually (2x year)</option>
                        <option value="4">Quarterly (4x year)</option>
                        <option value="12">Monthly (12x year)</option>
                        <option value="365">Daily (365x year)</option>
                    </select>
                </div>
            </div>

            <div className="grid-2" style={{ gap: '1.5rem' }}>
                <div className="metric-card" style={{ borderColor: 'var(--accent-primary)' }}>
                    <div className="metric-label">Future Value</div>
                    <div className="metric-value">${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div className="metric-card" style={{ borderColor: 'var(--accent-success)' }}>
                    <div className="metric-label">Total Interest</div>
                    <div className="metric-value" style={{ color: 'var(--accent-success)' }}>+${interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
            </div>
        </div>
    );
}

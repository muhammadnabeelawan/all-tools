'use client';
import { useState } from 'react';

export default function SavingsGoal() {
    const [target, setTarget] = useState(50000);
    const [initial, setInitial] = useState(5000);
    const [years, setYears] = useState(5);
    const [returnRate, setReturnRate] = useState(7);

    const goal = parseFloat(target) || 0;
    const start = parseFloat(initial) || 0;
    const t = parseFloat(years) || 0;
    const r = (parseFloat(returnRate) || 0) / 100 / 12; // monthly rate
    const n = t * 12; // total months

    // PMT = (FV - PV(1+r)^n) / [((1+r)^n - 1) / r]
    const pwr = Math.pow(1 + r, n);
    const monthlySavings = r > 0
        ? (goal - start * pwr) / ((pwr - 1) / r)
        : (goal - start) / n;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="grid-2">
                <div className="input-group">
                    <label>Savings Goal ($)</label>
                    <input className="input-field" type="number" value={target} onChange={e => setTarget(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Already Saved ($)</label>
                    <input className="input-field" type="number" value={initial} onChange={e => setInitial(e.target.value)} />
                </div>
            </div>

            <div className="grid-2">
                <div className="input-group">
                    <label>Time to Reach Goal (Years)</label>
                    <input className="input-field" type="number" value={years} onChange={e => setYears(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Expected Annual Return (%)</label>
                    <input className="input-field" type="number" step="0.1" value={returnRate} onChange={e => setReturnRate(e.target.value)} />
                </div>
            </div>

            <div className="metric-card" style={{ textAlign: 'center', borderColor: 'var(--accent-primary)', padding: '2.5rem' }}>
                <div className="metric-label">You need to save</div>
                <div className="metric-value" style={{ fontSize: '4rem', color: 'var(--accent-primary)' }}>
                    ${Math.max(0, monthlySavings).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="metric-label" style={{ marginTop: '8px' }}>every month</div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', fontSize: '0.95rem' }}>
                <h4 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>💡 Financial Breakdown</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Total to Save:</span>
                        <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>${(goal - start).toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Projected Growth:</span>
                        <span style={{ color: 'var(--accent-success)', fontWeight: '600' }}>+${Math.max(0, goal - (monthlySavings * n + start)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Total Months:</span>
                        <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{n} months</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

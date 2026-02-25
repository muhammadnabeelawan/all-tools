'use client';
import { useState } from 'react';

export default function TipCalculator() {
    const [bill, setBill] = useState(50);
    const [tipPercent, setTipPercent] = useState(15);
    const [people, setPeople] = useState(1);

    const tipAmount = (bill * tipPercent) / 100;
    const totalBill = parseFloat(bill) + tipAmount;
    const perPerson = totalBill / people;

    return (
        <>
            <div className="grid-3" style={{ marginBottom: 24 }}>
                <div className="input-group">
                    <label>Bill Amount ($)</label>
                    <input className="input-field" type="number" value={bill} onChange={e => setBill(parseFloat(e.target.value) || 0)} />
                </div>
                <div className="input-group">
                    <label>Tip Percentage (%)</label>
                    <input className="input-field" type="number" value={tipPercent} onChange={e => setTipPercent(parseFloat(e.target.value) || 0)} />
                </div>
                <div className="input-group">
                    <label>Number of People</label>
                    <input className="input-field" type="number" value={people} min="1" onChange={e => setPeople(parseInt(e.target.value) || 1)} />
                </div>
            </div>

            <div className="grid-3" style={{ gap: 24 }}>
                <div className="metric-card">
                    <div className="metric-label">Tip Amount</div>
                    <div className="metric-value" style={{ color: 'var(--accent-primary)' }}>${tipAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                </div>
                <div className="metric-card">
                    <div className="metric-label">Total Bill</div>
                    <div className="metric-value">${totalBill.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                </div>
                <div className="metric-card" style={{ borderColor: 'var(--accent-success)' }}>
                    <div className="metric-label">Per Person</div>
                    <div className="metric-value" style={{ color: 'var(--accent-success)' }}>${perPerson.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                </div>
            </div>
        </>
    );
}

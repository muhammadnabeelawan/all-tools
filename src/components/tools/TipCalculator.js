'use client';
import { useState } from 'react';
import { currencies } from '@/lib/currencies';

export default function TipCalculator() {
    const [bill, setBill] = useState(50);
    const [tipPercent, setTipPercent] = useState(15);
    const [people, setPeople] = useState(1);
    const [currencyCode, setCurrencyCode] = useState('USD');

    const activeCurrency = currencies.find(c => c.code === currencyCode) || currencies[0];
    const currency = activeCurrency.symbol;

    const tipAmount = (bill * tipPercent) / 100;
    const totalBill = parseFloat(bill) + tipAmount;
    const perPerson = totalBill / people;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="input-group">
                <label>Currency</label>
                <select className="input-field" value={currencyCode} onChange={e => setCurrencyCode(e.target.value)}>
                    {currencies.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                </select>
            </div>

            <div className="grid-3">
                <div className="input-group">
                    <label>Bill Amount ({currency})</label>
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
                    <div className="metric-value" style={{ color: 'var(--accent-primary)' }}>
                        {currency}{tipAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                </div>
                <div className="metric-card">
                    <div className="metric-label">Total Bill</div>
                    <div className="metric-value">
                        {currency}{totalBill.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                </div>
                <div className="metric-card" style={{ borderColor: 'var(--accent-success)' }}>
                    <div className="metric-label">Per Person</div>
                    <div className="metric-value" style={{ color: 'var(--accent-success)' }}>
                        {currency}{perPerson.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                </div>
            </div>
        </div>
    );
}

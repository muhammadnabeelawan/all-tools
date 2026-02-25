'use client';
import { useState, useEffect } from 'react';

export default function CurrencyConverter() {
    const [amount, setAmount] = useState(1);
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('EUR');
    const [rate, setRate] = useState(0.92); // Base static rate (to be replaced with API in production)

    const commonCurrencies = [
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'GBP', name: 'British Pound', symbol: '£' },
        { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
        { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' },
        { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
        { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
        { code: 'CNY', name: 'Chinese Yuan', symbol: 'CN¥' },
    ];

    // Static rates for demonstration (In a real app, fetch from an API)
    const rates = {
        USD: 1, EUR: 0.92, GBP: 0.79, JPY: 150.23, CAD: 1.35, AUD: 1.52, INR: 82.85, CNY: 7.19
    };

    const convert = (val, f, t) => {
        const usdVal = val / rates[f];
        return usdVal * rates[t];
    };

    const result = convert(amount, from, to);

    return (
        <>
            <div className="input-group">
                <label>Amount</label>
                <input className="input-field" type="number" value={amount} onChange={e => setAmount(parseFloat(e.target.value) || 0)} />
            </div>

            <div className="grid-2" style={{ marginTop: 16 }}>
                <div className="input-group">
                    <label>From</label>
                    <select className="input-field" value={from} onChange={e => setFrom(e.target.value)}>
                        {commonCurrencies.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
                    </select>
                </div>
                <div className="input-group">
                    <label>To</label>
                    <select className="input-field" value={to} onChange={e => setTo(e.target.value)}>
                        {commonCurrencies.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
                    </select>
                </div>
            </div>

            <div className="result-container" style={{ marginTop: 24, textAlign: 'center' }}>
                <div className="result-label" style={{ fontSize: '1rem' }}>{amount} {from} equals</div>
                <div className="result-value" style={{ fontSize: '2.5rem', color: 'var(--accent-success)', margin: '10px 0' }}>
                    {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {to}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    1 {from} = {(rates[to] / rates[from]).toFixed(4)} {to}
                </div>
            </div>
        </>
    );
}

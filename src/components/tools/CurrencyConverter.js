'use client';
import { useState } from 'react';
import { currencies } from '@/lib/currencies';

export default function CurrencyConverter() {
    const [amount, setAmount] = useState(1);
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('EUR');

    // Simple mock rates relative to USD
    // In a production app, these should be fetched from an API like exchange-rate-api.com
    const mockRates = {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 150.23,
        CAD: 1.35,
        AUD: 1.52,
        INR: 82.85,
        CNY: 7.19,
        PKR: 278.50,
        AED: 3.67,
        SAR: 3.75,
        TRY: 31.25,
        // Add default scale for others
    };

    const getRate = (code) => mockRates[code] || 1.0;

    const convert = (val, f, t) => {
        const usdVal = val / getRate(f);
        return usdVal * getRate(t);
    };

    const result = convert(amount, from, to);
    const fromSymbol = (currencies.find(c => c.code === from) || {}).symbol || '';
    const toSymbol = (currencies.find(c => c.code === to) || {}).symbol || '';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="input-group">
                <label>Amount</label>
                <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>{fromSymbol}</span>
                    <input className="input-field" type="number" value={amount} onChange={e => setAmount(parseFloat(e.target.value) || 0)} style={{ paddingLeft: '35px' }} />
                </div>
            </div>

            <div className="grid-2">
                <div className="input-group">
                    <label>From</label>
                    <select className="input-field" value={from} onChange={e => setFrom(e.target.value)}>
                        {currencies.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                    </select>
                </div>
                <div className="input-group">
                    <label>To</label>
                    <select className="input-field" value={to} onChange={e => setTo(e.target.value)}>
                        {currencies.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                    </select>
                </div>
            </div>

            <div className="result-container" style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {from} {amount.toLocaleString()} =
                </div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent-success)' }}>
                    {toSymbol}{result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    {to} - {currencies.find(c => c.code === to)?.label.split(' - ')[1].split(' (')[0]}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', marginTop: '16px' }}>
                    Exchange Rate: 1 {from} = {(getRate(to) / getRate(from)).toFixed(4)} {to}
                </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                Note: Rates are indicative and based on market averages. For real-time transactions, check with your bank.
            </p>
        </div>
    );
}

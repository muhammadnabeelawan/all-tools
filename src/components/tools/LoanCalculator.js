'use client';
import { useState } from 'react';
import { currencies } from '@/lib/currencies';

export default function LoanCalculator() {
    const [amount, setAmount] = useState(100000);
    const [interest, setInterest] = useState(5.5);
    const [term, setTerm] = useState(15);
    const [type, setType] = useState('years');
    const [currencyCode, setCurrencyCode] = useState('USD');

    const activeCurrency = currencies.find(c => c.code === currencyCode) || currencies[0];
    const currency = activeCurrency.symbol;

    const monthlyRate = interest / 100 / 12;
    const numPayments = type === 'years' ? term * 12 : term;

    const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - amount;

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
                    <label>Loan Amount ({currency})</label>
                    <input className="input-field" type="number" value={amount} onChange={e => setAmount(parseFloat(e.target.value) || 0)} />
                </div>
                <div className="input-group">
                    <label>Interest Rate (%)</label>
                    <input className="input-field" type="number" value={interest} step="0.1" onChange={e => setInterest(parseFloat(e.target.value) || 0)} />
                </div>
                <div className="input-group">
                    <label>Term ({type})</label>
                    <input className="input-field" type="number" value={term} onChange={e => setTerm(parseInt(e.target.value) || 0)} />
                    <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
                        <button className={`btn btn-xs ${type === 'years' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setType('years')}>Years</button>
                        <button className={`btn btn-xs ${type === 'months' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setType('months')}>Months</button>
                    </div>
                </div>
            </div>

            <div className="grid-3" style={{ gap: 24 }}>
                <div className="metric-card" style={{ borderColor: 'var(--accent-primary)' }}>
                    <div className="metric-label">Monthly Payment</div>
                    <div className="metric-value">
                        {currency}{monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                </div>
                <div className="metric-card">
                    <div className="metric-label">Total Interest</div>
                    <div className="metric-value" style={{ color: 'var(--accent-red)' }}>
                        {currency}{totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                </div>
                <div className="metric-card">
                    <div className="metric-label">Total Payment</div>
                    <div className="metric-value">
                        {currency}{totalPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                </div>
            </div>
        </div>
    );
}

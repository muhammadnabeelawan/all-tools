'use client';
import { useState, useEffect } from 'react';
import { currencies } from '@/lib/currencies';

export default function ExpenseTracker() {
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState('');
    const [items, setItems] = useState([]);
    const [currencyCode, setCurrencyCode] = useState('USD');

    useEffect(() => {
        const saved = localStorage.getItem('all-tools-expenses');
        const savedCurrency = localStorage.getItem('all-tools-expense-currency');
        if (saved) setItems(JSON.parse(saved));
        if (savedCurrency) setCurrencyCode(savedCurrency);
    }, []);

    useEffect(() => {
        localStorage.setItem('all-tools-expenses', JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        localStorage.setItem('all-tools-expense-currency', currencyCode);
    }, [currencyCode]);

    const activeCurrency = currencies.find(c => c.code === currencyCode) || currencies[0];
    const currency = activeCurrency.symbol;

    const add = (e) => {
        e.preventDefault();
        if (!desc || !amount) return;
        setItems([{ id: Date.now(), desc, amount: parseFloat(amount) }, ...items]);
        setDesc('');
        setAmount('');
    };

    const remove = (id) => {
        setItems(items.filter(i => i.id !== id));
    };

    const total = items.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div className="metric-card" style={{ flex: 1, textAlign: 'center', background: 'var(--bg-secondary)', padding: '2rem' }}>
                    <div className="metric-label">Total Expenses</div>
                    <div className="metric-value" style={{ color: 'var(--accent-primary)', fontSize: '3.5rem' }}>
                        {currency}{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                </div>
                <div className="input-group" style={{ width: '200px' }}>
                    <label>Currency</label>
                    <select className="input-field" value={currencyCode} onChange={e => setCurrencyCode(e.target.value)}>
                        {currencies.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                    </select>
                </div>
            </div>

            <form onSubmit={add} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem' }}>
                <div className="input-group">
                    <label>Description</label>
                    <input className="input-field" value={desc} onChange={e => setDesc(e.target.value)} placeholder="e.g. Groceries" />
                </div>
                <div className="input-group">
                    <label>Amount ({currency})</label>
                    <input className="input-field" type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 45.50" />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '4px' }}>
                    <button type="submit" className="btn btn-primary" style={{ height: '44px', width: '100px' }}>Add</button>
                </div>
            </form>

            <div className="result-container">
                <div className="result-header">
                    <span>Recent Spending ({currency})</span>
                    <button className="btn btn-outline btn-xs" onClick={() => setItems([])}>Clear All</button>
                </div>
                <div className="result-content" style={{ maxHeight: '400px' }}>
                    {items.length === 0 ? (
                        <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No expenses added yet.</div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {items.map(item => (
                                <div key={item.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '12px 16px',
                                    background: 'var(--bg-card)',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--border-color)'
                                }}>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>{item.desc}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(item.id).toLocaleDateString()}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span style={{ fontWeight: '700', color: 'var(--accent-red)' }}>-{currency}{item.amount.toFixed(2)}</span>
                                        <button className="btn btn-xs btn-outline" style={{ color: 'var(--accent-red)', borderColor: 'var(--accent-red)' }} onClick={() => remove(item.id)}>✕</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

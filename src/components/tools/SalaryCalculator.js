'use client';
import { useState } from 'react';

export default function SalaryCalculator() {
    const [salary, setSalary] = useState(60000);
    const [hoursPerWeek, setHoursPerWeek] = useState(40);
    const [weeksPerYear, setWeeksPerYear] = useState(52);

    const [currency, setCurrency] = useState('$');
    const [taxRate, setTaxRate] = useState(20);

    const total = parseFloat(salary) || 0;
    const hours = parseFloat(hoursPerWeek) || 0;
    const weeks = parseFloat(weeksPerYear) || 0;
    const tax = total * (taxRate / 100);
    const netTotal = total - tax;

    const stats = [
        { label: 'Yearly Gross', value: total },
        { label: 'Yearly Net', value: netTotal, color: 'var(--accent-success)' },
        { label: 'Monthly Net', value: netTotal / 12 },
        { label: 'Weekly Net', value: netTotal / weeks },
        { label: 'Daily Net', value: (netTotal / weeks) / 5 },
        { label: 'Hourly Net', value: netTotal / (weeks * hours) },
    ];

    const currencies = [
        { label: 'USD ($)', symbol: '$' },
        { label: 'EUR (€)', symbol: '€' },
        { label: 'GBP (£)', symbol: '£' },
        { label: 'INR (₹)', symbol: '₹' },
        { label: 'JPY (¥)', symbol: '¥' },
        { label: 'CNY (¥)', symbol: '¥' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="input-group">
                    <label>Currency</label>
                    <select className="input-field" value={currency} onChange={e => setCurrency(e.target.value)}>
                        {currencies.map(c => <option key={c.label} value={c.symbol}>{c.label}</option>)}
                    </select>
                </div>
                <div className="input-group">
                    <label>Estimated Tax Rate (%)</label>
                    <input className="input-field" type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)} />
                </div>
            </div>

            <div className="grid-3" style={{ gap: '1rem' }}>
                <div className="input-group">
                    <label>Gross Yearly Salary ({currency})</label>
                    <input className="input-field" type="number" value={salary} onChange={e => setSalary(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Hours Per Week</label>
                    <input className="input-field" type="number" value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Weeks Per Year</label>
                    <input className="input-field" type="number" value={weeksPerYear} onChange={e => setWeeksPerYear(e.target.value)} />
                </div>
            </div>

            <div className="grid-3" style={{ gap: '1rem' }}>
                {stats.map(s => (
                    <div key={s.label} className="metric-card" style={{
                        borderColor: s.label.includes('Gross') ? 'var(--accent-primary)' : (s.label.includes('Net') ? 'var(--accent-success)' : 'var(--border-color)'),
                        background: s.label.includes('Yearly') ? 'rgba(139, 92, 246, 0.05)' : 'transparent'
                    }}>
                        <div className="metric-label">{s.label}</div>
                        <div className="metric-value" style={{ color: s.color }}>
                            {currency}{s.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <p>💡 This calculator provides gross estimates before taxes and deductions. Calculations are based on {weeks} working weeks per year and a standard 5-day work week for the daily rate.</p>
            </div>
        </div>
    );
}

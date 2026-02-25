'use client';
import { useState } from 'react';

export default function SalaryCalculator() {
    const [salary, setSalary] = useState(60000);
    const [hoursPerWeek, setHoursPerWeek] = useState(40);
    const [weeksPerYear, setWeeksPerYear] = useState(52);

    const total = parseFloat(salary) || 0;
    const hours = parseFloat(hoursPerWeek) || 0;
    const weeks = parseFloat(weeksPerYear) || 0;

    const monthly = total / 12;
    const weekly = total / weeks;
    const daily = weekly / 5;
    const hourly = total / (weeks * hours);

    const stats = [
        { label: 'Yearly', value: total },
        { label: 'Monthly', value: monthly },
        { label: 'Bi-Weekly', value: total / 26 },
        { label: 'Weekly', value: weekly },
        { label: 'Daily', value: daily },
        { label: 'Hourly', value: hourly },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="grid-3" style={{ gap: '1rem' }}>
                <div className="input-group">
                    <label>Gross Yearly Salary ($)</label>
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
                        borderColor: s.label === 'Yearly' ? 'var(--accent-primary)' : 'var(--border-color)',
                        background: s.label === 'Yearly' ? 'rgba(139, 92, 246, 0.05)' : 'transparent'
                    }}>
                        <div className="metric-label">{s.label}</div>
                        <div className="metric-value">
                            ${s.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

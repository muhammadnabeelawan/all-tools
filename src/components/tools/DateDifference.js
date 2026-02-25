'use client';
import { useState } from 'react';

export default function DateDifference() {
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');
    const [result, setResult] = useState(null);

    const calculate = () => {
        if (!date1 || !date2) return;
        const d1 = new Date(date1);
        const d2 = new Date(date2);

        // Absolute difference in milliseconds
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Detailed breakdown
        let years = d2.getFullYear() - d1.getFullYear();
        let months = d2.getMonth() - d1.getMonth();
        let days = d2.getDate() - d1.getDate();

        if (days < 0) {
            months -= 1;
            days += new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years -= 1;
            months += 12;
        }

        setResult({
            totalDays: diffDays,
            years: Math.abs(years),
            months: Math.abs(months),
            days: Math.abs(days),
            isFuture: d2 > d1
        });
    };

    return (
        <>
            <div className="grid-2" style={{ marginBottom: 24 }}>
                <div className="input-group">
                    <label>Start Date</label>
                    <input className="input-field" type="date" value={date1} onChange={e => setDate1(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>End Date</label>
                    <input className="input-field" type="date" value={date2} onChange={e => setDate2(e.target.value)} />
                </div>
            </div>
            <button className="btn btn-primary btn-block" onClick={calculate}>📆 Calculate Difference</button>

            {result && (
                <div style={{ marginTop: 24 }}>
                    <div className="metric-card" style={{ marginBottom: 16 }}>
                        <div className="metric-label">Total Difference (Days)</div>
                        <div className="metric-value" style={{ color: 'var(--accent-primary)' }}>{result.totalDays} Days</div>
                    </div>
                    <div className="grid-3">
                        <div className="metric-card">
                            <div className="metric-value">{result.years}</div>
                            <div className="metric-label">Years</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-value">{result.months}</div>
                            <div className="metric-label">Months</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-value">{result.days}</div>
                            <div className="metric-label">Days</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

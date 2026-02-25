'use client';
import { useState } from 'react';

export default function AgeCalculator() {
    const [dob, setDob] = useState('');
    const [result, setResult] = useState(null);

    const calculate = () => {
        if (!dob) return;
        const birthDate = new Date(dob);
        const today = new Date();

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            months -= 1;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years -= 1;
            months += 12;
        }

        setResult({ years, months, days });
    };

    return (
        <>
            <div className="input-group">
                <label>Select Date of Birth</label>
                <input className="input-field" type="date" value={dob} onChange={e => setDob(e.target.value)} />
            </div>
            <button className="btn btn-primary btn-block" onClick={calculate}>🎂 Calculate Age</button>

            {result && (
                <div className="result-container" style={{ marginTop: 24 }}>
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

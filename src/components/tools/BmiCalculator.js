'use client';
import { useState } from 'react';

export default function BmiCalculator() {
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(170);
    const [unit, setUnit] = useState('metric');

    const bmi = (unit === 'metric')
        ? (weight / Math.pow(height / 100, 2)).toFixed(1)
        : (703 * weight / Math.pow(height, 2)).toFixed(1);

    const getStatus = (val) => {
        if (val < 18.5) return { text: 'Underweight', color: '#3b82f6' };
        if (val < 25) return { text: 'Normal Weight', color: '#10b981' };
        if (val < 30) return { text: 'Overweight', color: '#f59e0b' };
        return { text: 'Obese', color: '#ef4444' };
    };

    const status = getStatus(bmi);

    return (
        <>
            <div className="input-group">
                <label>Unit System</label>
                <div className="grid-2">
                    <button className={`btn ${unit === 'metric' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setUnit('metric')}>Metric (kg/cm)</button>
                    <button className={`btn ${unit === 'imperial' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setUnit('imperial')}>Imperial (lb/in)</button>
                </div>
            </div>

            <div className="grid-2" style={{ marginTop: 16 }}>
                <div className="input-group">
                    <label>Weight ({unit === 'metric' ? 'kg' : 'lb'})</label>
                    <input className="input-field" type="number" value={weight} onChange={e => setWeight(parseFloat(e.target.value) || 0)} />
                </div>
                <div className="input-group">
                    <label>Height ({unit === 'metric' ? 'cm' : 'in'})</label>
                    <input className="input-field" type="number" value={height} onChange={e => setHeight(parseFloat(e.target.value) || 0)} />
                </div>
            </div>

            <div className="result-container" style={{ marginTop: 24 }}>
                <div className="result-value" style={{ fontSize: '3rem', color: status.color }}>{bmi}</div>
                <div className="result-label" style={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}>{status.text}</div>
                <div style={{ marginTop: 16, height: 8, background: 'var(--bg-secondary)', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
                    <div style={{
                        position: 'absolute',
                        height: '100%',
                        left: `${Math.min(Math.max((bmi - 10) / 30 * 100, 0), 100)}%`,
                        width: 4,
                        background: 'white',
                        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                        zIndex: 2
                    }} />
                    <div style={{ width: '18.5%', height: '100%', background: '#3b82f6', display: 'inline-block' }} />
                    <div style={{ width: '21.5%', height: '100%', background: '#10b981', display: 'inline-block' }} />
                    <div style={{ width: '20.0%', height: '100%', background: '#f59e0b', display: 'inline-block' }} />
                    <div style={{ width: '40.0%', height: '100%', background: '#ef4444', display: 'inline-block' }} />
                </div>
            </div>
        </>
    );
}

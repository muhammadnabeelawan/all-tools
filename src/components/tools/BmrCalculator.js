'use client';
import { useState } from 'react';

export default function BmrCalculator() {
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(175);
    const [age, setAge] = useState(25);
    const [gender, setGender] = useState('male');
    const [activity, setActivity] = useState(1.2);

    // Mifflin-St Jeor Equation
    const bmr = gender === 'male'
        ? (10 * weight) + (6.25 * height) - (5 * age) + 5
        : (10 * weight) + (6.25 * height) - (5 * age) - 161;

    const tdee = bmr * activity;

    const activities = [
        { label: 'Sedentary (little or no exercise)', value: 1.2 },
        { label: 'Lightly active (1-3 days/week)', value: 1.375 },
        { label: 'Moderately active (3-5 days/week)', value: 1.55 },
        { label: 'Very active (6-7 days/week)', value: 1.725 },
        { label: 'Extra active (very hard exercise/physical job)', value: 1.9 },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="grid-2">
                <div className="input-group">
                    <label>Gender</label>
                    <div className="grid-2" style={{ gap: '8px' }}>
                        <button className={`btn btn-sm ${gender === 'male' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setGender('male')}>Male</button>
                        <button className={`btn btn-sm ${gender === 'female' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setGender('female')}>Female</button>
                    </div>
                </div>
                <div className="input-group">
                    <label>Age (years)</label>
                    <input className="input-field" type="number" value={age} onChange={e => setAge(parseInt(e.target.value) || 0)} />
                </div>
            </div>

            <div className="grid-2">
                <div className="input-group">
                    <label>Weight (kg)</label>
                    <input className="input-field" type="number" value={weight} onChange={e => setWeight(parseFloat(e.target.value) || 0)} />
                </div>
                <div className="input-group">
                    <label>Height (cm)</label>
                    <input className="input-field" type="number" value={height} onChange={e => setHeight(parseFloat(e.target.value) || 0)} />
                </div>
            </div>

            <div className="input-group">
                <label>Activity Level</label>
                <select className="input-field" value={activity} onChange={e => setActivity(parseFloat(e.target.value))}>
                    {activities.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                </select>
            </div>

            <div className="grid-2" style={{ gap: '1.5rem' }}>
                <div className="metric-card" style={{ borderColor: 'var(--accent-primary)' }}>
                    <div className="metric-label">Basal Metabolic Rate (BMR)</div>
                    <div className="metric-value">{Math.round(bmr)} <small>kcal/day</small></div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>Calories burned at complete rest.</p>
                </div>
                <div className="metric-card" style={{ borderColor: 'var(--accent-success)' }}>
                    <div className="metric-label">Daily Calorie Need (TDEE)</div>
                    <div className="metric-value">{Math.round(tdee)} <small>kcal/day</small></div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>Total Daily Energy Expenditure for your activity.</p>
                </div>
            </div>
        </div>
    );
}

'use client';
import { useState, useEffect } from 'react';

const units = {
    length: {
        name: 'Length',
        base: 'meter',
        data: {
            'millimeter': 0.001,
            'centimeter': 0.01,
            'meter': 1,
            'kilometer': 1000,
            'inch': 0.0254,
            'foot': 0.3048,
            'yard': 0.9144,
            'mile': 1609.34
        }
    },
    weight: {
        name: 'Weight',
        base: 'kilogram',
        data: {
            'milligram': 0.000001,
            'gram': 0.001,
            'kilogram': 1,
            'ounce': 0.0283495,
            'pound': 0.453592,
            'metric-ton': 1000
        }
    },
    storage: {
        name: 'Digital Storage',
        base: 'byte',
        data: {
            'byte': 1,
            'kilobyte': 1024,
            'megabyte': 1048576,
            'gigabyte': 1073741824,
            'terabyte': 1099511627776
        }
    },
    temperature: {
        name: 'Temperature',
        base: 'celsius',
        data: {
            'celsius': 'c',
            'fahrenheit': 'f',
            'kelvin': 'k'
        }
    }
};

export default function UnitConverter() {
    const [category, setCategory] = useState('length');
    const [val1, setVal1] = useState(1);
    const [unit1, setUnit1] = useState('meter');
    const [unit2, setUnit2] = useState('kilometer');
    const [result, setResult] = useState(0);

    useEffect(() => {
        setUnit1(Object.keys(units[category].data)[0]);
        setUnit2(Object.keys(units[category].data)[1]);
    }, [category]);

    useEffect(() => {
        if (category === 'temperature') {
            const v = parseFloat(val1);
            if (isNaN(v)) {
                setResult(0);
                return;
            }
            let celsius;
            if (unit1 === 'celsius') celsius = v;
            else if (unit1 === 'fahrenheit') celsius = (v - 32) * 5 / 9;
            else if (unit1 === 'kelvin') celsius = v - 273.15;

            if (unit2 === 'celsius') setResult(celsius);
            else if (unit2 === 'fahrenheit') setResult(celsius * 9 / 5 + 32);
            else if (unit2 === 'kelvin') setResult(celsius + 273.15);
        } else {
            const v = parseFloat(val1);
            const data = units[category].data;
            const baseValue = v * data[unit1];
            setResult(baseValue / data[unit2]);
        }
    }, [val1, unit1, unit2, category]);

    return (
        <>
            <div className="input-group">
                <label>Category</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
                    {Object.keys(units).map(cat => (
                        <button
                            key={cat}
                            className={`btn ${category === cat ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setCategory(cat)}
                            style={{ fontSize: '0.85rem' }}
                        >
                            {units[cat].name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid-2" style={{ marginTop: 24, alignItems: 'end' }}>
                <div className="input-group">
                    <label>From ({unit1})</label>
                    <input className="input-field" type="number" value={val1} onChange={e => setVal1(e.target.value)} />
                    <select className="input-field" value={unit1} onChange={e => setUnit1(e.target.value)} style={{ marginTop: 8 }}>
                        {Object.keys(units[category].data).map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
                <div className="input-field" style={{
                    background: 'var(--bg-secondary)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '12px 16px',
                    border: '1px dashed var(--border-color)',
                    marginBottom: 0
                }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>To ({unit2})</div>
                    <div style={{ fontSize: '1.25rem', color: 'var(--accent-success)', fontWeight: 'bold', marginTop: 8 }}>
                        {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                    </div>
                    <select className="input-field" value={unit2} onChange={e => setUnit2(e.target.value)} style={{ marginTop: 8 }}>
                        {Object.keys(units[category].data).map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
            </div>
        </>
    );
}

'use client';
import { useState } from 'react';

const UNITS = [
    { name: 'Bit (b)', val: 1 / 8 },
    { name: 'Byte (B)', val: 1 },
    { name: 'Kilobyte (KB)', val: 1024 },
    { name: 'Megabyte (MB)', val: Math.pow(1024, 2) },
    { name: 'Gigabyte (GB)', val: Math.pow(1024, 3) },
    { name: 'Terabyte (TB)', val: Math.pow(1024, 4) },
    { name: 'Petabyte (PB)', val: Math.pow(1024, 5) },
];

export default function DataSizeConverter() {
    const [value, setValue] = useState(1);
    const [fromUnit, setFromUnit] = useState(1024 * 1024 * 1024); // GB

    const bytes = (parseFloat(value) || 0) * fromUnit;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="grid-2">
                <div className="input-group">
                    <label>Value</label>
                    <input className="input-field" type="number" value={value} onChange={e => setValue(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>From Unit</label>
                    <select className="input-field" value={fromUnit} onChange={e => setFromUnit(parseFloat(e.target.value))}>
                        {UNITS.map(u => <option key={u.name} value={u.val}>{u.name}</option>)}
                    </select>
                </div>
            </div>

            <div className="result-container">
                <div className="result-header">
                    <span>Converted Sizes</span>
                </div>
                <div className="result-content" style={{ padding: 0 }}>
                    {UNITS.map(u => {
                        const result = bytes / u.val;
                        return (
                            <div key={u.name} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '16px 20px',
                                borderBottom: '1px solid var(--border-color)'
                            }}>
                                <span style={{ color: 'var(--text-muted)' }}>{u.name}</span>
                                <span style={{ fontWeight: '700' }}>
                                    {result < 0.001 ? result.toExponential(3) : result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

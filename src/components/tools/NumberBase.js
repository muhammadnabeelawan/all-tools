'use client';
import { useState, useEffect } from 'react';

export default function NumberBase() {
    const [decimal, setDecimal] = useState('10');
    const [binary, setBinary] = useState('1010');
    const [hex, setHex] = useState('A');
    const [octal, setOctal] = useState('12');

    const update = (val, fromBase) => {
        if (val === '') {
            setDecimal(''); setBinary(''); setHex(''); setOctal('');
            return;
        }
        const num = parseInt(val, fromBase);
        if (!isNaN(num)) {
            setDecimal(num.toString(10));
            setBinary(num.toString(2));
            setHex(num.toString(16).toUpperCase());
            setOctal(num.toString(8));
        }
    };

    return (
        <>
            <div className="grid-2">
                <div className="input-group">
                    <label>Decimal (Base 10)</label>
                    <input className="input-field" type="number" value={decimal} onChange={e => { setDecimal(e.target.value); update(e.target.value, 10); }} />
                </div>
                <div className="input-group">
                    <label>Binary (Base 2)</label>
                    <input className="input-field" value={binary} onChange={e => { setBinary(e.target.value); update(e.target.value, 2); }} />
                </div>
            </div>
            <div className="grid-2" style={{ marginTop: 16 }}>
                <div className="input-group">
                    <label>Hexadecimal (Base 16)</label>
                    <input className="input-field" value={hex} onChange={e => { setHex(e.target.value); update(e.target.value, 16); }} />
                </div>
                <div className="input-group">
                    <label>Octal (Base 8)</label>
                    <input className="input-field" value={octal} onChange={e => { setOctal(e.target.value); update(e.target.value, 8); }} />
                </div>
            </div>

            <div className="result-container" style={{ marginTop: 32 }}>
                <div className="result-header">
                    <span className="result-title">Quick Overview</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Decimal</span>
                        <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{decimal}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Binary</span>
                        <span style={{ color: 'var(--accent-success)', fontWeight: 'bold' }}>{binary}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Hex</span>
                        <span style={{ color: 'var(--accent-warning)', fontWeight: 'bold' }}>{hex}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Octal</span>
                        <span style={{ color: 'var(--accent-info)', fontWeight: 'bold' }}>{octal}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

'use client';
import { useState, useEffect } from 'react';
import CopyButton from '@/components/CopyButton';

export default function ColorConverter() {
    const [hex, setHex] = useState('#8b5cf6');
    const [rgb, setRgb] = useState({ r: 139, g: 92, b: 246 });
    const [hsl, setHsl] = useState({ h: 258, s: 91, l: 66 });
    const [cmyk, setCmyk] = useState({ c: 43, m: 63, y: 0, k: 4 });

    const updateFromHex = (value) => {
        if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(value)) return;
        setHex(value);

        // RGB
        let r = parseInt(value.slice(1, 3), 16);
        let g = parseInt(value.slice(3, 5), 16);
        let b = parseInt(value.slice(5, 7), 16);
        setRgb({ r, g, b });

        // HSL
        let rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
        const max = Math.max(rNorm, gNorm, bNorm), min = Math.min(rNorm, gNorm, bNorm);
        let h, s, l = (max + min) / 2;
        if (max === min) h = s = 0; else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
                case gNorm: h = (bNorm - rNorm) / d + 2; break;
                case bNorm: h = (rNorm - gNorm) / d + 4; break;
            }
            h /= 6;
        }
        setHsl({ h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) });

        // CMYK
        let k = 1 - Math.max(rNorm, gNorm, bNorm);
        let c = (1 - rNorm - k) / (1 - k) || 0;
        let m = (1 - gNorm - k) / (1 - k) || 0;
        let y = (1 - bNorm - k) / (1 - k) || 0;
        setCmyk({ c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="input-group">
                <label>Pick Color</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input type="color" value={hex} onChange={(e) => updateFromHex(e.target.value)} style={{ width: '80px', height: '50px', border: 'none', background: 'transparent' }} />
                    <input className="input-field" value={hex} onChange={(e) => updateFromHex(e.target.value)} style={{ textTransform: 'uppercase' }} />
                </div>
            </div>

            <div className="grid-2" style={{ gap: '1.5rem' }}>
                <div className="result-container">
                    <div className="result-header">
                        <span>RGB</span>
                        <CopyButton text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
                    </div>
                    <div className="result-content" style={{ fontSize: '1.25rem' }}>{rgb.r}, {rgb.g}, {rgb.b}</div>
                </div>
                <div className="result-container">
                    <div className="result-header">
                        <span>HSL</span>
                        <CopyButton text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
                    </div>
                    <div className="result-content" style={{ fontSize: '1.25rem' }}>{hsl.h}°, {hsl.s}%, {hsl.l}%</div>
                </div>
                <div className="result-container">
                    <div className="result-header">
                        <span>CMYK</span>
                        <CopyButton text={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`} />
                    </div>
                    <div className="result-content" style={{ fontSize: '1.25rem' }}>{cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%</div>
                </div>
                <div className="result-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: hex, border: 'none' }}>
                    <span style={{ color: hsl.l > 50 ? 'black' : 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>PREVIEW</span>
                </div>
            </div>
        </div>
    );
}

'use client';
import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';

export default function QrGenerator() {
    const [text, setText] = useState('https://all-tools.vercel.app');
    const [size, setSize] = useState(256);
    const [color, setColor] = useState({ dark: '#000000', light: '#ffffff' });
    const canvasRef = useRef();

    useEffect(() => {
        if (canvasRef.current && text) {
            QRCode.toCanvas(canvasRef.current, text, {
                width: size,
                margin: 2,
                color: {
                    dark: color.dark,
                    light: color.light
                }
            }, (error) => {
                if (error) console.error(error);
            });
        }
    }, [text, size, color]);

    const download = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qrcode.png';
        a.click();
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
                <div style={{
                    background: color.light,
                    padding: 16,
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />
                </div>

                <button className="btn btn-success" onClick={download}>⬇️ Download QR Code</button>
            </div>

            <div style={{ marginTop: 32 }}>
                <div className="input-group">
                    <label>QR Content (URL or Text)</label>
                    <input
                        className="input-field"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="e.g. https://google.com"
                    />
                </div>

                <div className="grid-3" style={{ marginTop: 16 }}>
                    <div className="input-group">
                        <label>Size (px)</label>
                        <input
                            className="input-field"
                            type="number"
                            value={size}
                            onChange={(e) => setSize(parseInt(e.target.value) || 128)}
                            min="128"
                            max="1024"
                        />
                    </div>
                    <div className="input-group">
                        <label>Foreground Color</label>
                        <input
                            className="input-field"
                            type="color"
                            value={color.dark}
                            onChange={(e) => setColor({ ...color, dark: e.target.value })}
                            style={{ height: 42, padding: 4 }}
                        />
                    </div>
                    <div className="input-group">
                        <label>Background Color</label>
                        <input
                            className="input-field"
                            type="color"
                            value={color.light}
                            onChange={(e) => setColor({ ...color, light: e.target.value })}
                            style={{ height: 42, padding: 4 }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

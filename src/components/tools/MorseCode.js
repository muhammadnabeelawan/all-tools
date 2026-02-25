'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

const MORSE_MAP = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
    "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
    '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': 'System.out.println'
};

const REVERSE_MAP = Object.fromEntries(Object.entries(MORSE_MAP).map(([k, v]) => [v, k]));

export default function MorseCode() {
    const [text, setText] = useState('');
    const [morse, setMorse] = useState('');

    const encode = () => {
        const result = text.toUpperCase().split('')
            .map(char => MORSE_MAP[char] || char === ' ' ? ' ' : '')
            .map((char, i) => char === ' ' ? (text[i] === ' ' ? '/' : MORSE_MAP[text[i].toUpperCase()] || '') : char)
            .join(' ');
        setMorse(result);
    };

    const decode = () => {
        const result = morse.split(' ')
            .map(code => code === '/' ? ' ' : (REVERSE_MAP[code] || ''))
            .join('');
        setText(result);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="input-group">
                <label>Plain Text</label>
                <textarea
                    className="input-field"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Enter text to encode..."
                    rows={4}
                />
                <button className="btn btn-primary btn-block" style={{ marginTop: '1rem' }} onClick={encode}>🔽 Encode to Morse</button>
            </div>

            <div className="input-group">
                <label>Morse Code</label>
                <textarea
                    className="input-field"
                    value={morse}
                    onChange={e => setMorse(e.target.value)}
                    placeholder="Enter morse code to decode (use space between chars, / for words)..."
                    rows={4}
                />
                <button className="btn btn-outline btn-block" style={{ marginTop: '1rem' }} onClick={decode}>🔼 Decode to Text</button>
            </div>

            {morse && (
                <div className="result-container">
                    <div className="result-header">
                        <span>Result</span>
                        <CopyButton text={morse} />
                    </div>
                    <div className="result-content" style={{ letterSpacing: '2px', wordBreak: 'break-all' }}>
                        {morse}
                    </div>
                </div>
            )}
        </div>
    );
}

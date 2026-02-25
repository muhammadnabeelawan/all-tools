'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function JsonToCsv() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const convert = () => {
        try {
            const json = JSON.parse(input);
            const array = Array.isArray(json) ? json : [json];
            if (array.length === 0) throw new Error('Empty array');

            const headers = Object.keys(array[0]);
            const csv = [
                headers.join(','),
                ...array.map(row => headers.map(header => {
                    const val = row[header] ?? '';
                    return typeof val === 'string' && val.includes(',') ? `"${val}"` : val;
                }).join(','))
            ].join('\n');

            setOutput(csv);
            setError('');
        } catch (e) {
            setError('Invalid JSON format. Please provide a JSON array or object.');
            setOutput('');
        }
    };

    return (
        <>
            <div className="input-group">
                <label>JSON Array Input</label>
                <textarea className="input-field" value={input} onChange={e => setInput(e.target.value)} placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]' rows={8} />
            </div>
            {error && <p style={{ color: 'var(--accent-red)', fontSize: '0.85rem', marginBottom: 12 }}>❌ {error}</p>}
            <button className="btn btn-primary btn-block" onClick={convert}>📊 Convert to CSV</button>
            {output && (
                <div className="result-container" style={{ marginTop: 16 }}>
                    <div className="result-header"><span className="result-title">CSV Output</span><CopyButton text={output} /></div>
                    <div className="result-content">{output}</div>
                </div>
            )}
        </>
    );
}

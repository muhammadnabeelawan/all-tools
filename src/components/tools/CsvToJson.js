'use client';
import { useState } from 'react';
import Papa from 'papaparse';
import CopyButton from '@/components/CopyButton';

export default function CsvToJson() {
    const [csv, setCsv] = useState('');
    const [json, setJson] = useState('');

    const convert = () => {
        if (!csv) return;
        try {
            const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
            setJson(JSON.stringify(parsed.data, null, 2));
        } catch (err) {
            console.error(err);
            alert('Error parsing CSV');
        }
    };

    return (
        <>
            <div className="input-group">
                <label>Input CSV</label>
                <textarea className="input-field" value={csv} onChange={e => setCsv(e.target.value)} rows={8} placeholder="name,age,city\nJohn,30,New York\nJane,25,London" />
            </div>
            <button className="btn btn-primary btn-block" onClick={convert}>📋 Convert to JSON</button>

            {json && (
                <div className="result-container" style={{ marginTop: 24 }}>
                    <div className="result-header">
                        <span className="result-title">JSON Output</span>
                        <CopyButton text={json} />
                    </div>
                    <pre className="result-content" style={{ maxHeight: 600 }}>{json}</pre>
                </div>
            )}
        </>
    );
}

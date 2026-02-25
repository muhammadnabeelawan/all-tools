'use client';
import { useState } from 'react';
import yaml from 'js-yaml';
import CopyButton from '@/components/CopyButton';

export default function YamlToJson() {
    const [inp, setInp] = useState('');
    const [out, setOut] = useState('');

    const convert = () => {
        if (!inp) return;
        try {
            const obj = yaml.load(inp);
            setOut(JSON.stringify(obj, null, 2));
        } catch (err) {
            console.error(err);
            setOut('Invalid YAML data');
        }
    };

    const convertToYaml = () => {
        if (!inp) return;
        try {
            const obj = JSON.parse(inp);
            setOut(yaml.dump(obj));
        } catch (err) {
            console.error(err);
            setOut('Invalid JSON data');
        }
    };

    return (
        <>
            <div className="input-group">
                <label>Input (YAML or JSON)</label>
                <textarea className="input-field" value={inp} onChange={e => setInp(e.target.value)} rows={8} placeholder="name: John\nage: 30" />
            </div>
            <div className="grid-2">
                <button className="btn btn-primary btn-block" onClick={convert}>📋 YAML → JSON</button>
                <button className="btn btn-outline btn-block" onClick={convertToYaml}>📄 JSON → YAML</button>
            </div>

            {out && (
                <div className="result-container" style={{ marginTop: 24 }}>
                    <div className="result-header">
                        <span className="result-title">Output</span>
                        <CopyButton text={out} />
                    </div>
                    <pre className="result-content" style={{ maxHeight: 600 }}>{out}</pre>
                </div>
            )}
        </>
    );
}

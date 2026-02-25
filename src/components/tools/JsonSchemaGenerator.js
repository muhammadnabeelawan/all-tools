'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function JsonSchemaGenerator() {
    const [json, setJson] = useState('{\n  "id": 1,\n  "name": "Project X",\n  "active": true,\n  "tags": ["web", "tools"],\n  "metadata": {\n    "version": "1.0"\n  }\n}');
    const [schema, setSchema] = useState('');

    const generateSchema = (obj) => {
        const type = Array.isArray(obj) ? 'array' : typeof obj;

        if (type === 'object' && obj !== null) {
            if (Array.isArray(obj)) {
                return {
                    type: 'array',
                    items: obj.length > 0 ? generateSchema(obj[0]) : {}
                };
            } else {
                const properties = {};
                Object.keys(obj).forEach(key => {
                    properties[key] = generateSchema(obj[key]);
                });
                return { type: 'object', properties };
            }
        } else {
            return { type: type === 'number' ? (Number.isInteger(obj) ? 'integer' : 'number') : type };
        }
    };

    const handleGenerate = () => {
        try {
            const parsed = JSON.parse(json);
            const generated = {
                "$schema": "http://json-schema.org/draft-07/schema#",
                "title": "Generated Schema",
                ...generateSchema(parsed)
            };
            setSchema(JSON.stringify(generated, null, 2));
        } catch (err) {
            alert('Invalid JSON: ' + err.message);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="input-group">
                <label>Input JSON</label>
                <textarea
                    className="input-field"
                    value={json}
                    onChange={e => setJson(e.target.value)}
                    rows={10}
                    style={{ fontFamily: 'monospace' }}
                />
                <button className="btn btn-primary btn-block" style={{ marginTop: '1rem' }} onClick={handleGenerate}>📜 Generate Schema</button>
            </div>

            {schema && (
                <div className="result-container">
                    <div className="result-header">
                        <span>JSON Schema</span>
                        <CopyButton text={schema} />
                    </div>
                    <pre className="result-content" style={{ fontSize: '0.85rem' }}>{schema}</pre>
                </div>
            )}
        </div>
    );
}

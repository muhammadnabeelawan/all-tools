'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function XmlToJson() {
    const [xml, setXml] = useState('');
    const [json, setJson] = useState('');

    const convert = () => {
        if (!xml) return;
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, 'application/xml');

            const xmlToObj = (node) => {
                let obj = {};
                if (node.nodeType === 1) { // element
                    if (node.attributes.length > 0) {
                        obj["@attributes"] = {};
                        for (let j = 0; j < node.attributes.length; j++) {
                            let attribute = node.attributes.item(j);
                            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                        }
                    }
                } else if (node.nodeType === 3) { // text
                    obj = node.nodeValue;
                }

                if (node.hasChildNodes()) {
                    for (let i = 0; i < node.childNodes.length; i++) {
                        let item = node.childNodes.item(i);
                        let nodeName = item.nodeName;
                        if (typeof (obj[nodeName]) == "undefined") {
                            obj[nodeName] = xmlToObj(item);
                        } else {
                            if (typeof (obj[nodeName].push) == "undefined") {
                                let old = obj[nodeName];
                                obj[nodeName] = [];
                                obj[nodeName].push(old);
                            }
                            obj[nodeName].push(xmlToObj(item));
                        }
                    }
                }
                return obj;
            };

            setJson(JSON.stringify(xmlToObj(xmlDoc), null, 2));
        } catch (e) {
            alert('Invalid XML data');
        }
    };

    return (
        <>
            <div className="input-group">
                <label>Input XML</label>
                <textarea className="input-field" value={xml} onChange={e => setXml(e.target.value)} rows={8} placeholder="<users>\n  <user id='1'>John</user>\n</users>" />
            </div>
            <button className="btn btn-primary btn-block" onClick={convert}>⚡ Convert to JSON</button>

            {json && (
                <div className="result-container" style={{ marginTop: 24 }}>
                    <div className="result-header">
                        <span className="result-title">JSON Output</span>
                        <CopyButton text={json} />
                    </div>
                    <pre className="result-content" style={{ maxHeight: 600, fontSize: '0.85rem' }}>{json}</pre>
                </div>
            )}
        </>
    );
}

'use client';
import { useState, useEffect, useRef } from 'react';

const invoiceTemplates = {
    standard: {
        id: 'standard',
        name: 'Standard Invoice',
        theme: '#3b82f6',
    },
    modern: {
        id: 'modern',
        name: 'Modern Minimal',
        theme: '#10b981',
    },
    receipt: {
        id: 'receipt',
        name: 'Quick Receipt',
        theme: '#6366f1',
    },
    bill: {
        id: 'bill',
        name: 'Business Bill',
        theme: '#111827',
    }
};

const initialInvoiceData = {
    type: 'invoice', // invoice, receipt, bill
    number: 'INV-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: '$',
    status: 'Pending',

    sender: {
        name: 'Alpha Corp',
        address: '123 Business Avenue, Tech City, 54321',
        email: 'billing@alphacorp.com',
        phone: '+1 (555) 000-1111',
        vat: 'VAT123456789'
    },
    client: {
        name: 'John Smith',
        address: '456 Residential Road, Suburbia, 12345',
        email: 'john@example.com',
        phone: '+1 (555) 999-8888'
    },
    items: [
        { id: 1, desc: 'Web Design & Development', qty: 1, rate: 1200 },
        { id: 2, desc: 'SEO Optimization (Monthly)', qty: 1, rate: 350 },
    ],
    taxRate: 10,
    discount: 0,
    notes: 'Thank you for your business! Please pay within 15 days.',
    terms: 'Payment via Bank Transfer or Stripe.'
};

export default function InvoiceGenerator() {
    const [data, setData] = useState(initialInvoiceData);
    const [template, setTemplate] = useState('standard');
    const fileInputRef = useRef(null);
    const [logo, setLogo] = useState(null);

    // Persist to local storage
    useEffect(() => {
        const saved = localStorage.getItem('invoice_generator_v1_data');
        if (saved) {
            try {
                setData(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load invoice data");
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('invoice_generator_v1_data', JSON.stringify(data));
    }, [data]);

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setLogo(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    const addItem = () => {
        const newItem = { id: Date.now(), desc: 'New Item', qty: 1, rate: 0 };
        setData({ ...data, items: [...data.items, newItem] });
    };

    const updateItem = (id, key, val) => {
        const updated = data.items.map(item =>
            item.id === id ? { ...item, [key]: val } : item
        );
        setData({ ...data, items: updated });
    };

    const removeItem = (id) => {
        setData({ ...data, items: data.items.filter(i => i.id !== id) });
    };

    const subtotal = data.items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
    const taxAmount = (subtotal * data.taxRate) / 100;
    const total = subtotal + taxAmount - data.discount;

    const handlePrint = () => {
        window.print();
    };

    const renderInvoiceContent = () => {
        const t = invoiceTemplates[template];
        const isReceipt = template === 'receipt';

        return (
            <div className={`invoice-sheet ${template}`} id="invoice-sheet">
                <style>{`
                    .invoice-sheet {
                        background: white !important;
                        width: 210mm;
                        min-height: 296mm;
                        padding: 20mm;
                        line-height: 1.5;
                        font-family: 'Inter', system-ui, sans-serif;
                        font-size: 10pt;
                        box-sizing: border-box;
                        margin: 0 auto;
                        color: #111;
                        position: relative;
                        text-align: left;
                    }
                    .inv-header { display: flex; justify-content: space-between; margin-bottom: 40px; }
                    .inv-logo { max-width: 150px; max-height: 60px; object-fit: contain; }
                    .inv-title { font-size: 24pt; font-weight: 800; text-transform: uppercase; color: ${t.theme}; }
                    .inv-meta { text-align: right; }
                    .inv-meta-item { display: flex; justify-content: flex-end; gap: 10px; margin-bottom: 4px; }
                    .inv-label { color: #6b7280; font-weight: 500; }
                    
                    .inv-addresses { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
                    .addr-title { font-weight: 700; text-transform: uppercase; font-size: 9pt; color: #9ca3af; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
                    .addr-name { font-size: 12pt; font-weight: 700; margin-bottom: 5px; }
                    .addr-text { color: #4b5563; font-size: 9.5pt; white-space: pre-line; }

                    .inv-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                    .inv-table th { background: #f9fafb; padding: 12px; text-align: left; font-size: 9pt; border-bottom: 2px solid ${t.theme}; color: #374151; }
                    .inv-table td { padding: 12px; border-bottom: 1px solid #f3f4f6; vertical-align: top; }
                    .col-desc { width: 50%; }
                    .col-qty, .col-rate, .col-total { text-align: right; }
                    
                    .inv-summary { display: flex; justify-content: flex-end; }
                    .summary-box { width: 250px; }
                    .summary-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
                    .summary-total { font-size: 14pt; font-weight: 800; color: ${t.theme}; padding-top: 15px; border-bottom: none; }

                    .inv-footer { margin-top: 60px; border-top: 1px solid #e5e7eb; padding-top: 20px; color: #6b7280; font-size: 9pt; }
                    
                    /* Modern Template */
                    .modern .inv-header { flex-direction: column; align-items: flex-start; gap: 20px; }
                    .modern .inv-title { font-size: 32pt; opacity: 0.1; position: absolute; top: 20mm; right: 20mm; }
                    
                    /* Receipt Style */
                    .receipt { width: 80mm; min-height: auto; padding: 10mm; font-size: 9pt; }
                    .receipt .inv-header { flex-direction: column; align-items: center; text-align: center; margin-bottom: 20px; }
                    .receipt .inv-addresses { grid-template-columns: 1fr; gap: 20px; text-align: center; }
                    .receipt .inv-summary { justify-content: center; }
                    .receipt .summary-box { width: 100%; }
                    
                    /* Bill Style */
                    .bill .inv-header { background: ${t.theme}; color: white; margin: -20mm -20mm 40px -20mm; padding: 20mm; }
                    .bill .inv-title { color: white; }
                    .bill .inv-meta-item .inv-label { color: rgba(255,255,255,0.7); }
                `}</style>

                <div className="inv-header">
                    <div className="inv-brand">
                        {logo ? <img src={logo} alt="Logo" className="inv-logo" /> : <div style={{ fontSize: '20pt', fontWeight: 800 }}>{data.sender.name}</div>}
                        <div className="addr-text" style={{ marginTop: logo ? '15px' : '5px' }}>
                            {data.sender.address}<br />
                            {data.sender.email} | {data.sender.phone}<br />
                            {data.sender.vat && <span>VAT: {data.sender.vat}</span>}
                        </div>
                    </div>
                    <div className="inv-meta">
                        <h1 className="inv-title">{isReceipt ? 'Receipt' : data.type}</h1>
                        <div className="inv-meta-item">
                            <span className="inv-label">Number:</span>
                            <span style={{ fontWeight: 700 }}>{data.number}</span>
                        </div>
                        <div className="inv-meta-item">
                            <span className="inv-label">Date:</span>
                            <span>{data.date}</span>
                        </div>
                        {!isReceipt && (
                            <div className="inv-meta-item">
                                <span className="inv-label">Due Date:</span>
                                <span>{data.dueDate}</span>
                            </div>
                        )}
                        <div className="inv-meta-item">
                            <span className="inv-label">Status:</span>
                            <span style={{ color: data.status === 'Paid' ? '#10b981' : '#f59e0b', fontWeight: 700 }}>{data.status.toUpperCase()}</span>
                        </div>
                    </div>
                </div>

                <div className="inv-addresses">
                    <div className="inv-bill-to">
                        <div className="addr-title">Bill To</div>
                        <div className="addr-name">{data.client.name}</div>
                        <div className="addr-text">
                            {data.client.address}<br />
                            {data.client.email}<br />
                            {data.client.phone}
                        </div>
                    </div>
                    {!isReceipt && (
                        <div className="inv-payment-info">
                            <div className="addr-title">Payment Details</div>
                            <div className="addr-text">{data.terms}</div>
                        </div>
                    )}
                </div>

                <table className="inv-table">
                    <thead>
                        <tr>
                            <th className="col-desc">Description</th>
                            <th className="col-qty">Qty</th>
                            <th className="col-rate">Rate</th>
                            <th className="col-total">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((item) => (
                            <tr key={item.id}>
                                <td className="col-desc">{item.desc}</td>
                                <td className="col-qty">{item.qty}</td>
                                <td className="col-rate">{data.currency}{item.rate.toLocaleString()}</td>
                                <td className="col-total" style={{ fontWeight: 600 }}>{data.currency}{(item.qty * item.rate).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="inv-summary">
                    <div className="summary-box">
                        <div className="summary-row">
                            <span className="inv-label">Subtotal</span>
                            <span>{data.currency}{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                            <span className="inv-label">Tax ({data.taxRate}%)</span>
                            <span>{data.currency}{taxAmount.toLocaleString()}</span>
                        </div>
                        {data.discount > 0 && (
                            <div className="summary-row">
                                <span className="inv-label">Discount</span>
                                <span style={{ color: '#ef4444' }}>-{data.currency}{data.discount.toLocaleString()}</span>
                            </div>
                        )}
                        <div className="summary-row summary-total">
                            <span>Total</span>
                            <span>{data.currency}{total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="inv-footer">
                    <div className="addr-title" style={{ border: 'none' }}>Notes</div>
                    <p>{data.notes}</p>
                    <div style={{ marginTop: '30px', textAlign: 'center', opacity: 0.5, fontSize: '8pt' }}>
                        Generated via AllTools Invoice Maker
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="invoice-builder-wrapper">
            <style jsx>{`
                .invoice-builder-wrapper { width: 100%; }
                .inv-app {
                    display: grid;
                    grid-template-columns: 450px 1fr;
                    height: calc(100vh - 120px);
                    background: #0f172a;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.1);
                    overflow: hidden;
                }
                .inv-editor {
                    background: #1e293b;
                    padding: 30px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    scrollbar-width: thin;
                }
                .inv-preview {
                    background: #0f172a;
                    display: flex;
                    justify-content: center;
                    padding: 40px;
                    overflow-y: auto;
                }
                .inv-section {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 20px;
                }
                .inv-label-head { font-size: 0.75rem; font-weight: 800; color: #94a3b8; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
                .input-field {
                    background: #0f172a;
                    border: 1px solid #334155;
                    border-radius: 8px;
                    color: white;
                    padding: 12px;
                    width: 100%;
                    margin-bottom: 10px;
                    font-size: 0.9rem;
                }
                .input-field:focus { border-color: #3b82f6; outline: none; }
                
                .item-row { display: grid; grid-template-columns: 1fr 60px 100px 40px; gap: 10px; margin-bottom: 10px; align-items: start; }
                .remove-btn { background: #ef444422; color: #ef4444; border: 1px solid #ef444444; border-radius: 6px; height: 42px; cursor: pointer; }
                
                .temp-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
                .temp-btn { padding: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: #94a3b8; font-size: 0.8rem; cursor: pointer; }
                .temp-btn.active { background: #3b82f6; color: white; border: none; }

                .logo-drop {
                    border: 2px dashed #334155;
                    border-radius: 8px;
                    padding: 15px;
                    text-align: center;
                    cursor: pointer;
                    margin-bottom: 15px;
                    color: #94a3b8;
                    font-size: 0.85rem;
                }

                @media print {
                    .inv-app { display: block !important; border: none !important; height: auto !important; background: white !important; }
                    .inv-editor, .navbar, .footer, .tool-page-header, .tool-seo-content { display: none !important; }
                    .inv-preview { 
                        display: block !important; 
                        padding: 0 !important; 
                        margin: 0 !important; 
                        background: white !important; 
                        overflow: visible !important;
                    }
                    .preview-scale-wrapper { transform: none !important; }
                    body { background: white !important; }
                    @page { size: portrait; margin: 0; }
                }

                @media (max-width: 1000px) {
                    .inv-app { grid-template-columns: 1fr; height: auto; }
                    .inv-editor { height: auto; }
                }
            `}</style>

            <div className="inv-app">
                <div className="inv-editor scroll-custom">
                    <div className="inv-section">
                        <div className="inv-label-head">Template & Branding</div>
                        <div className="temp-grid" style={{ marginBottom: '15px' }}>
                            {Object.values(invoiceTemplates).map(t => (
                                <button key={t.id} className={`temp-btn ${template === t.id ? 'active' : ''}`} onClick={() => setTemplate(t.id)}>
                                    {t.name}
                                </button>
                            ))}
                        </div>
                        <div className="logo-drop" onClick={() => fileInputRef.current.click()}>
                            {logo ? 'Logo Uploaded ✓' : 'Click to Upload Logo'}
                            <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={handleLogoUpload} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <select className="input-field" value={data.type} onChange={e => setData({ ...data, type: e.target.value })}>
                                <option value="Invoice">Invoice</option>
                                <option value="Receipt">Receipt</option>
                                <option value="Bill">Bill</option>
                            </select>
                            <select className="input-field" value={data.status} onChange={e => setData({ ...data, status: e.target.value })}>
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                                <option value="Overdue">Overdue</option>
                            </select>
                        </div>
                    </div>

                    <div className="inv-section">
                        <div className="inv-label-head">Business Info (Seller)</div>
                        <input className="input-field" placeholder="Business Name" value={data.sender.name} onChange={e => setData({ ...data, sender: { ...data.sender, name: e.target.value } })} />
                        <textarea className="input-field" placeholder="Address" rows="2" value={data.sender.address} onChange={e => setData({ ...data, sender: { ...data.sender, address: e.target.value } })} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <input className="input-field" placeholder="Email" value={data.sender.email} onChange={e => setData({ ...data, sender: { ...data.sender, email: e.target.value } })} />
                            <input className="input-field" placeholder="Phone" value={data.sender.phone} onChange={e => setData({ ...data, sender: { ...data.sender, phone: e.target.value } })} />
                        </div>
                    </div>

                    <div className="inv-section">
                        <div className="inv-label-head">Client Info (Buyer)</div>
                        <input className="input-field" placeholder="Client Name" value={data.client.name} onChange={e => setData({ ...data, client: { ...data.client, name: e.target.value } })} />
                        <textarea className="input-field" placeholder="Client Address" rows="2" value={data.client.address} onChange={e => setData({ ...data, client: { ...data.client, address: e.target.value } })} />
                    </div>

                    <div className="inv-section">
                        <div className="inv-label-head">Items</div>
                        {data.items.map((item) => (
                            <div key={item.id} className="item-row">
                                <input className="input-field" placeholder="Description" value={item.desc} onChange={e => updateItem(item.id, 'desc', e.target.value)} />
                                <input className="input-field" type="number" placeholder="Qty" value={item.qty} onChange={e => updateItem(item.id, 'qty', parseFloat(e.target.value) || 0)} />
                                <input className="input-field" type="number" placeholder="Rate" value={item.rate} onChange={e => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)} />
                                <button className="remove-btn" onClick={() => removeItem(item.id)}>✕</button>
                            </div>
                        ))}
                        <button className="btn btn-xs btn-outline" style={{ width: '100%', marginTop: '5px' }} onClick={addItem}>+ Add Item</button>
                    </div>

                    <div className="inv-section">
                        <div className="inv-label-head">Settings & Totals</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div>
                                <label style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Currency</label>
                                <input className="input-field" value={data.currency} onChange={e => setData({ ...data, currency: e.target.value })} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Tax Rate (%)</label>
                                <input className="input-field" type="number" value={data.taxRate} onChange={e => setData({ ...data, taxRate: parseFloat(e.target.value) || 0 })} />
                            </div>
                        </div>
                        <label style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Discount Amount</label>
                        <input className="input-field" type="number" value={data.discount} onChange={e => setData({ ...data, discount: parseFloat(e.target.value) || 0 })} />
                    </div>

                    <div className="sticky-actions" style={{ position: 'sticky', bottom: '-30px', background: '#1e293b', padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.1)', zIndex: 10 }}>
                        <button className="btn btn-primary btn-block" onClick={handlePrint}>⚡ Download PDF Document</button>
                        <button className="btn btn-secondary btn-block" style={{ marginTop: '8px' }} onClick={() => setData(initialInvoiceData)}>🔄 Reset All Fields</button>
                    </div>
                </div>

                <div className="inv-preview scroll-custom">
                    <div className="preview-scale-wrapper" style={{ transform: template === 'receipt' ? 'scale(1)' : 'scale(0.7)', transformOrigin: 'top center' }}>
                        {renderInvoiceContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

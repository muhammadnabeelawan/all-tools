'use client';
import { useState, useEffect, useRef } from 'react';

const resumeTemplates = {
    standard: { id: 'standard', name: 'Standard ATS', description: 'Clean, professional, single-column.', theme: '#000' },
    modern: { id: 'modern', name: 'Modern Split', description: 'Sidebar for contact & skills.', theme: '#2563eb' },
    minimal: { id: 'minimal', name: 'Minimalist', description: 'Centered and airy design.', theme: '#333' },
    serif: { id: 'serif', name: 'Executive Serif', description: 'Classic corporate style.', theme: '#1e293b' },
    blueprint: { id: 'blueprint', name: 'Creative Tech', description: 'Bold and technical.', theme: '#0ea5e9' },
    indigo: { id: 'indigo', name: 'Indigo Professional', description: 'Soft and trustworthy.', theme: '#4f46e5' },
    emerald: { id: 'emerald', name: 'Emerald High-End', description: 'Luxurious green accents.', theme: '#059669' },
    slate: { id: 'slate', name: 'Slate Gray', description: 'Understated and sleek.', theme: '#475569' },
    bold: { id: 'bold', name: 'Bold Signature', description: 'Large header, strong links.', theme: '#dc2626' },
    compact: { id: 'compact', name: 'Single Page Pro', description: 'Tighter spacing for long text.', theme: '#111827' },
    academic: { id: 'academic', name: 'Academic CV', description: 'Traditional academic format.', theme: '#000' }
};

const initialData = {
    personal: {
        fullName: 'Johnathan Doe',
        email: 'john.doe@techverse.com',
        phone: '+1 (555) 001-2026',
        location: 'San Francisco, CA',
        website: 'johndoe.dev',
        linkedin: 'linkedin.com/in/johndoe'
    },
    summary: 'Strategic Senior Software Engineer with over 8 years of experience in architecting high-performance web applications. Proven track record in leading teams, optimizing CI/CD pipelines, and delivering scalable microservices. Passionate about clean code, mentoring, and staying at the cutting edge of cloud technology.',
    experience: [
        {
            company: 'Global Tech Solutions',
            role: 'Lead Full Stack Engineer',
            location: 'Remote',
            dates: 'Jan 2021 — Present',
            description: '• Architected a real-time data dashboard using Next.js and WebSockets, increasing user engagement by 45%.\n• Reduced server response times by 30% through implementing a multi-layer caching strategy.\n• Mentored a team of 10+ junior developers and established internal coding standards.'
        },
        {
            company: 'Innovation Labs',
            role: 'Senior Developer',
            location: 'Austin, TX',
            dates: 'June 2018 — Dec 2020',
            description: '• Developed and maintained 15+ client websites using React and Node.js.\n• Optimized SQL queries reducing database load by 50%.\n• Collaborated with UX/UI designers to ensure accessibility compliance (WCAG 2.1).'
        }
    ],
    education: [
        {
            school: 'Stanford University',
            degree: 'Master of Science in Computer Science',
            location: 'Stanford, CA',
            dates: '2016 — 2018'
        }
    ],
    skills: 'React, Next.js, Node.js, TypeScript, Python, PostgreSQL, AWS (S3, Lambda, EC2), Docker, Kubernetes, GraphQL, Jest, Git, Agile Development',
    projects: [
        {
            name: 'CloudSync Open Source',
            description: 'A distributed file synchronization tool with 2k+ GitHub stars.',
            link: 'github.com/johndoe/cloudsync'
        }
    ]
};

export default function ResumeBuilder() {
    const [data, setData] = useState(initialData);
    const [template, setTemplate] = useState('standard');
    const [printMode, setPrintMode] = useState(false);
    const printRef = useRef(null);

    useEffect(() => {
        // Use a new key for V3 to ensure fresh data for users
        const saved = localStorage.getItem('resume_builder_v3_data');
        const savedTemplate = localStorage.getItem('resume_builder_v3_template');

        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed && parsed.personal && parsed.personal.fullName) {
                    setData(parsed);
                }
            } catch (e) {
                console.error("Storage error", e);
            }
        }
        if (savedTemplate) setTemplate(savedTemplate);
    }, []);

    useEffect(() => {
        localStorage.setItem('resume_builder_v3_data', JSON.stringify(data));
        localStorage.setItem('resume_builder_v3_template', template);
    }, [data, template]);

    const handlePrint = () => {
        // Simple and robust: trigger native browser print
        window.print();
    };

    const parseResumeText = (text) => {
        const newData = { ...initialData };

        // Extract Email
        const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (emailMatch) newData.personal.email = emailMatch[0];

        // Extract Phone
        const phoneMatch = text.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/);
        if (phoneMatch) newData.personal.phone = phoneMatch[0];

        // Try to guess Name (often the first few lines)
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 5);
        if (lines.length > 0) {
            // Check if first line doesn't look like an email or header
            if (!lines[0].includes('@') && lines[0].length < 40) {
                newData.personal.fullName = lines[0];
            }
        }

        // Section splitting for Skills and Summary
        const skillsIndex = text.toLowerCase().indexOf('skills');
        if (skillsIndex !== -1) {
            const afterSkills = text.substring(skillsIndex + 6).split('\n').slice(0, 3).join(', ');
            newData.skills = afterSkills.trim().replace(/^[:\s\-]+/, '');
        }

        const summaryIndex = text.toLowerCase().search(/summary|profile|objective/);
        if (summaryIndex !== -1) {
            const afterSummary = text.substring(summaryIndex + 7).split('\n').slice(0, 5).join(' ');
            newData.summary = afterSummary.trim().replace(/^[:\s\-]+/, '');
        }

        return newData;
    };

    const handleImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type === 'application/pdf') {
            try {
                const pdfjs = await import('pdfjs-dist');
                const version = '5.4.624';
                pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;

                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
                let fullText = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    fullText += textContent.items.map(item => item.str).join(' ') + '\n';
                }

                const parsedData = parseResumeText(fullText);
                setData(parsedData);
                alert("Extracted basic info from PDF. Please review and refine the details.");
            } catch (err) {
                console.error(err);
                alert("Failed to parse PDF. Please try a JSON import or enter data manually.");
            }
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const imported = JSON.parse(event.target.result);
                if (imported && imported.personal) {
                    setData(imported);
                    alert("Resume data imported successfully!");
                }
            } catch (err) {
                alert("Invalid JSON file.");
            }
        };
        reader.readAsText(file);
    };

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const name = (data.personal.fullName || 'Resume').replace(/\s+/g, '_');
        a.download = `${name}_Resume.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const renderResumeContent = () => {
        const t = resumeTemplates[template] || resumeTemplates.standard;
        const isModern = template === 'modern';

        // Safety fallbacks for data
        const personal = data.personal || initialData.personal;
        const experience = data.experience || [];
        const education = data.education || [];
        const skills = data.skills || '';
        const summary = data.summary || '';

        return (
            <div className={`resume-sheet ${template}`} id="resume-sheet">
                <style>{`
                    .resume-sheet {
                        background: white !important;
                        width: 210mm;
                        min-height: 296mm;
                        padding: 25mm 20mm;
                        line-height: 1.5;
                        font-family: 'Inter', system-ui, sans-serif;
                        font-size: 10.5pt;
                        box-sizing: border-box;
                        margin: 0 auto;
                        color: #111;
                        text-align: left;
                        position: relative;
                    }
                    .res-name { font-size: 26pt; font-weight: 800; text-transform: uppercase; margin-bottom: 5px; color: ${t.theme}; line-height: 1.1; }
                    .res-contact { display: flex; flex-wrap: wrap; gap: 15px; font-size: 9pt; color: #4b5563; margin-bottom: 25px; border-bottom: 2px solid ${t.theme}; padding-bottom: 12px; }
                    .res-sec { margin-bottom: 25px; }
                    .res-sec-title { font-size: 13pt; font-weight: 700; text-transform: uppercase; margin-bottom: 10px; color: ${t.theme}; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; }
                    .res-item { margin-bottom: 18px; line-height: 1.4; }
                    .res-item-head { display: flex; justify-content: space-between; font-weight: 700; font-size: 11pt; color: #000; }
                    .res-item-sub { display: flex; justify-content: space-between; font-style: italic; color: #6b7280; font-size: 10pt; margin-bottom: 4px; }
                    .res-desc { white-space: pre-line; text-align: justify; font-size: 10pt; color: #374151; }

                    .modern { display: grid; grid-template-columns: 240px 1fr; padding: 0 !important; }
                    .modern-sidebar { background: #1e293b; color: white; padding: 25mm 15mm; height: 100%; }
                    .modern-main { padding: 25mm 15mm; }
                    .modern .res-name { color: white; font-size: 20pt; border: none; padding: 0; }
                    .modern .res-contact { flex-direction: column; border: none; color: #94a3b8; }
                    .modern .res-sec-title { color: #38bdf8; border-bottom: 1.5px solid rgba(255,255,255,0.1); }
                    .modern-sidebar .res-sec-title { color: white; }

                    .minimal { text-align: center; }
                    .minimal .res-contact { justify-content: center; border: none; }
                    .minimal .res-sec-title { border-bottom: none; }
                    .minimal .res-sec-title::after { content: ''; display: block; width: 40px; height: 2px; background: ${t.theme}; margin: 8px auto; }
                    
                    .serif { font-family: 'Merriweather', 'Georgia', serif; }
                    .bold .res-name { background: ${t.theme}; color: white; padding: 15px; text-align: center; width: calc(100% + 40mm); margin-left: -20mm; margin-top: -25mm; margin-bottom: 25px; }
                `}</style>

                {isModern ? (
                    <>
                        <div className="modern-sidebar">
                            <h1 className="res-name">{personal.fullName}</h1>
                            <div className="res-contact">
                                <span>✉ {personal.email}</span>
                                <span>📞 {personal.phone}</span>
                                <span>📍 {personal.location}</span>
                            </div>
                            <div className="res-sec">
                                <h2 className="res-sec-title">Expertise</h2>
                                <div className="res-desc" style={{ color: '#cbd5e1', fontSize: '9.5pt' }}>{skills}</div>
                            </div>
                            {education.length > 0 && (
                                <div className="res-sec">
                                    <h2 className="res-sec-title">Education</h2>
                                    {education.map((edu, i) => (
                                        <div key={i} className="res-item" style={{ marginBottom: '10px' }}>
                                            <div style={{ fontWeight: '700', fontSize: '10pt', color: 'white' }}>{edu.degree}</div>
                                            <div style={{ fontSize: '9pt', color: '#94a3b8' }}>{edu.school}</div>
                                            <div style={{ fontSize: '8pt', color: '#64748b' }}>{edu.dates}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="modern-main">
                            <div className="res-sec">
                                <h2 className="res-sec-title">Profile</h2>
                                <p className="res-desc">{summary}</p>
                            </div>
                            <div className="res-sec">
                                <h2 className="res-sec-title">Experience</h2>
                                {experience.map((exp, i) => (
                                    <div key={i} className="res-item">
                                        <div className="res-item-head"><span>{exp.role}</span><span>{exp.dates}</span></div>
                                        <div className="res-item-sub"><span>{exp.company}</span></div>
                                        <p className="res-desc">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="res-header">
                            <h1 className="res-name">{personal.fullName}</h1>
                            <div className="res-contact">
                                <span>{personal.email}</span>
                                <span style={{ opacity: 0.2 }}>|</span>
                                <span>{personal.phone}</span>
                                <span style={{ opacity: 0.2 }}>|</span>
                                <span>{personal.location}</span>
                            </div>
                        </div>
                        <div className="res-sec">
                            <h2 className="res-sec-title">Professional Summary</h2>
                            <p className="res-desc">{summary}</p>
                        </div>
                        <div className="res-sec">
                            <h2 className="res-sec-title">Work Experience</h2>
                            {experience.map((exp, i) => (
                                <div key={i} className="res-item">
                                    <div className="res-item-head"><span>{exp.role}</span><span>{exp.dates}</span></div>
                                    <div className="res-item-sub"><span>{exp.company} — {exp.location}</span></div>
                                    <p className="res-desc">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="res-sec">
                            <h2 className="res-sec-title">Education</h2>
                            {education.map((edu, i) => (
                                <div key={i} className="res-item">
                                    <div className="res-item-head"><span>{edu.degree}</span><span>{edu.dates}</span></div>
                                    <div className="res-item-sub"><span>{edu.school}, {edu.location}</span></div>
                                </div>
                            ))}
                        </div>
                        <div className="res-sec">
                            <h2 className="res-sec-title">Skills & Proficiencies</h2>
                            <p className="res-desc">{skills}</p>
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="rb-parent-wrapper">
            <style jsx>{`
                .rb-parent-wrapper { width: 100%; }
                .rb-app {
                    display: grid;
                    grid-template-columns: 450px 1fr;
                    height: calc(100vh - 120px);
                    background: #0f172a;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.1);
                    overflow: hidden;
                }
                .rb-editor {
                    background: #1e293b;
                    padding: 30px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    scrollbar-width: thin;
                    scrollbar-color: #334155 transparent;
                }
                .rb-preview {
                    background: #0f172a;
                    display: flex;
                    justify-content: center;
                    padding: 40px;
                    overflow-y: auto;
                }
                .rb-section {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 12px;
                    padding: 20px;
                }
                .rb-label { font-size: 0.75rem; font-weight: 800; color: #94a3b8; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
                .input-field {
                    background: #0f172a;
                    border: 1px solid #334155;
                    border-radius: 8px;
                    color: white;
                    padding: 12px;
                    width: 100%;
                    margin-bottom: 12px;
                    font-size: 0.9rem;
                }
                .input-field:focus { border-color: #3b82f6; outline: none; }
                .temp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
                .temp-btn { padding: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: #94a3b8; font-size: 0.8rem; cursor: pointer; transition: 0.2s; }
                .temp-btn.active { background: #3b82f6; color: white; border: none; }
                
                .sticky-actions {
                    position: sticky;
                    bottom: -30px;
                    background: #1e293b;
                    padding: 20px 0;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: auto;
                    z-index: 10;
                }

                @media print {
                    .rb-app, .navbar, .footer, .tool-page-header, .tool-seo-content { display: none !important; }
                    .print-container { display: block !important; position: absolute; top: 0; left: 0; width: 100%; background: white !important; }
                    body { background: white !important; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                    @page { size: portrait; margin: 0; }
                }
                @media (max-width: 1000px) {
                    .rb-app { grid-template-columns: 1fr; height: auto; }
                    .rb-editor { height: 600px; }
                }
            `}</style>

            <div className="rb-app">
                <div className="rb-editor scroll-custom">
                    <div className="rb-section">
                        <div className="rb-label">Design Template</div>
                        <div className="temp-grid">
                            {Object.values(resumeTemplates).map(t => (
                                <button key={t.id} className={`temp-btn ${template === t.id ? 'active' : ''}`} onClick={() => setTemplate(t.id)}>
                                    {t.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="rb-section">
                        <div className="rb-label">Contact Details</div>
                        <input className="input-field" placeholder="Full Name" value={data.personal.fullName} onChange={e => setData({ ...data, personal: { ...data.personal, fullName: e.target.value } })} title="fullName" />
                        <input className="input-field" placeholder="Email" value={data.personal.email} onChange={e => setData({ ...data, personal: { ...data.personal, email: e.target.value } })} title="email" />
                        <input className="input-field" placeholder="Phone" value={data.personal.phone} onChange={e => setData({ ...data, personal: { ...data.personal, phone: e.target.value } })} title="phone" />
                        <input className="input-field" placeholder="Location" value={data.personal.location} onChange={e => setData({ ...data, personal: { ...data.personal, location: e.target.value } })} title="location" />
                    </div>

                    <div className="rb-section">
                        <div className="rb-label">Profile Summary</div>
                        <textarea className="input-field" rows="4" value={data.summary} onChange={e => setData({ ...data, summary: e.target.value })} style={{ resize: 'none' }} title="summary" />
                    </div>

                    <div className="rb-section">
                        <div className="rb-label">Work Experience</div>
                        {data.experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: '15px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
                                <input className="input-field" placeholder="Role" value={exp.role} onChange={e => { const ex = [...data.experience]; ex[i].role = e.target.value; setData({ ...data, experience: ex }) }} title="role" />
                                <input className="input-field" placeholder="Company" value={exp.company} onChange={e => { const ex = [...data.experience]; ex[i].company = e.target.value; setData({ ...data, experience: ex }) }} title="company" />
                                <button style={{ color: '#ef4444', background: 'none', border: 'none', fontSize: '11px', cursor: 'pointer' }} onClick={() => { const ex = [...data.experience]; ex.splice(i, 1); setData({ ...data, experience: ex }) }}>Remove</button>
                            </div>
                        ))}
                        <button className="btn btn-xs btn-outline" style={{ width: '100%' }} onClick={() => setData({ ...data, experience: [...data.experience, { company: '', role: '', location: '', dates: '', description: '' }] })}>+ Add Experience</button>
                    </div>

                    <div className="rb-section">
                        <div className="rb-label">Education</div>
                        {data.education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: '15px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
                                <input className="input-field" placeholder="Degree" value={edu.degree} onChange={e => { const ed = [...data.education]; ed[i].degree = e.target.value; setData({ ...data, education: ed }) }} title="degree" />
                                <input className="input-field" placeholder="School" value={edu.school} onChange={e => { const ed = [...data.education]; ed[i].school = e.target.value; setData({ ...data, education: ed }) }} title="school" />
                                <button style={{ color: '#ef4444', background: 'none', border: 'none', fontSize: '11px', cursor: 'pointer' }} onClick={() => { const ed = [...data.education]; ed.splice(i, 1); setData({ ...data, education: ed }) }}>Remove</button>
                            </div>
                        ))}
                        <button className="btn btn-xs btn-outline" style={{ width: '100%' }} onClick={() => setData({ ...data, education: [...data.education, { school: '', degree: '', location: '', dates: '' }] })}>+ Add Education</button>
                    </div>

                    <div className="rb-section">
                        <div className="rb-label">Skills & Proficiencies</div>
                        <textarea className="input-field" rows="3" value={data.skills} onChange={e => setData({ ...data, skills: e.target.value })} style={{ resize: 'none' }} title="skills" />
                    </div>

                    <div className="sticky-actions">
                        <button className="btn btn-primary btn-block" onClick={handlePrint}>⚡ Generate & Download PDF</button>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={handleExport}>📤 Export Data</button>
                            <label className="btn btn-secondary" style={{ flex: 1, cursor: 'pointer' }}>
                                📥 Import Data <input type="file" hidden accept=".json,application/pdf" onChange={handleImport} />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="rb-preview scroll-custom">
                    <div style={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}>
                        {renderResumeContent()}
                    </div>
                </div>
            </div>

            {/* Print Section (Only visible during window.print) */}
            <div className="print-container" style={{ display: 'none' }}>
                {renderResumeContent()}
            </div>
        </div>
    );
}

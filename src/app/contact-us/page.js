'use client';
import { useState } from 'react';

export default function ContactUs() {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    return (
        <div className="container py-20">
            <style jsx>{`
                .contact-layout {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 60px;
                    align-items: start;
                }
                .contact-info h1 {
                    font-size: 3rem;
                    margin-bottom: 1.5rem;
                }
                .contact-card {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: 20px;
                    padding: 40px;
                }
                .input-group {
                    margin-bottom: 20px;
                }
                .input-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 600;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                }
                .input-group input, .input-group textarea {
                    width: 100%;
                    padding: 14px;
                    background: var(--bg-primary);
                    border: 1px solid var(--border-color);
                    border-radius: 10px;
                    color: white;
                    font-size: 1rem;
                    transition: border-color 0.2s;
                }
                .input-group input:focus, .input-group textarea:focus {
                    border-color: var(--primary-color);
                    outline: none;
                }
                .submit-btn {
                    width: 100%;
                    padding: 16px;
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: opacity 0.2s;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                }
                .submit-btn:hover {
                    opacity: 0.9;
                }
                .info-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 25px;
                }
                .info-icon {
                    width: 50px;
                    height: 50px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                }
                .success-msg {
                    background: rgba(34, 197, 94, 0.1);
                    border: 1px solid rgb(34, 197, 94);
                    color: rgb(34, 197, 94);
                    padding: 20px;
                    border-radius: 10px;
                    text-align: center;
                    margin-top: 20px;
                }
                @media (max-width: 900px) {
                    .contact-layout {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

            <div className="contact-layout">
                <div className="contact-info animate-fade-in-up">
                    <div className="hero-badge">Get in Touch</div>
                    <h1>Have a suggestion or <span className="gradient-text">encountered a bug?</span></h1>
                    <p className="hero-p" style={{ marginBottom: '40px' }}>
                        We're always looking to improve our toolset. If you have an idea for a new tool or need help with an existing one,
                        drop us a message!
                    </p>

                    <div className="info-item">
                        <div className="info-icon">✉</div>
                        <div>
                            <div style={{ fontWeight: 600 }}>Email Us</div>
                            <div className="text-muted">support@alltools.com</div>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="info-icon">🐙</div>
                        <div>
                            <div style={{ fontWeight: 600 }}>GitHub</div>
                            <div className="text-muted">Open an issue on our repo</div>
                        </div>
                    </div>
                </div>

                <div className="contact-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {status === 'success' ? (
                        <div className="success-msg">
                            <h3 style={{ marginBottom: '10px' }}>Message Sent!</h3>
                            <p>Thank you for reaching out. We'll get back to you as soon as possible.</p>
                            <button
                                className="btn btn-sm btn-outline"
                                style={{ marginTop: '20px' }}
                                onClick={() => setStatus('')}
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Name</label>
                                <input type="text" placeholder="Your name" required />
                            </div>
                            <div className="input-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="name@example.com" required />
                            </div>
                            <div className="input-group">
                                <label>Subject</label>
                                <input type="text" placeholder="What is this about?" required />
                            </div>
                            <div className="input-group">
                                <label>Message</label>
                                <textarea rows="5" placeholder="Your message..." required></textarea>
                            </div>
                            <button className="submit-btn" type="submit" disabled={status === 'sending'}>
                                {status === 'sending' ? 'Sending...' : 'Send Message ⚡'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

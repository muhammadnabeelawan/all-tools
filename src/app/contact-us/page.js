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
                            <div className="contact-input-group">
                                <label>Name</label>
                                <input type="text" placeholder="Your name" required />
                            </div>
                            <div className="contact-input-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="name@example.com" required />
                            </div>
                            <div className="contact-input-group">
                                <label>Subject</label>
                                <input type="text" placeholder="What is this about?" required />
                            </div>
                            <div className="contact-input-group">
                                <label>Message</label>
                                <textarea rows="5" placeholder="Your message..." required></textarea>
                            </div>
                            <button className="contact-submit-btn" type="submit" disabled={status === 'sending'}>
                                {status === 'sending' ? 'Sending...' : 'Send Message ⚡'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

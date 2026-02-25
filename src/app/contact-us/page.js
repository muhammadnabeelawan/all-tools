export const metadata = {
    title: 'Contact Us - All Tools',
    description: 'Get in touch with the All Tools team for support or feedback.',
};

export default function ContactUs() {
    return (
        <div className="container py-20">
            <div className="static-page-container animate-fade-in-up">
                <div className="static-hero">
                    <div className="hero-badge">Get in Touch</div>
                    <h1>Contact <span className="gradient-text">Support</span></h1>
                    <p className="hero-p" style={{ marginBottom: '40px' }}>
                        We're always looking to improve our toolset. If you have an idea for a new tool or need help with an existing one,
                        reach out to us directly via email.
                    </p>
                </div>

                <div className="static-grid" style={{ gridTemplateColumns: '1fr' }}>
                    <div className="static-card" style={{ maxWidth: '400px', margin: '0 auto' }}>
                        <span className="static-card-icon">✉</span>
                        <h3>Email Us</h3>
                        <p className="text-muted" style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary-color)' }}>
                            support@alltools.com
                        </p>
                        <p className="text-muted" style={{ marginTop: '10px' }}>
                            We typically respond within 24-48 hours.
                        </p>
                    </div>
                </div>

                <div className="static-section" style={{ marginTop: '60px', textAlign: 'center' }}>
                    <div className="static-content">
                        <h2>Open Source Community</h2>
                        <p>
                            Prefer using GitHub? You can also report bugs or request features directly on our repository tracker.
                            We love contributions from the community!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

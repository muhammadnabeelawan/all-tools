export const metadata = {
    title: 'Privacy Policy - All Tools',
    description: 'Our commitment to your privacy. Learn how we handle (or rather, don\'t handle) your data.',
};

export default function PrivacyPolicy() {
    return (
        <div className="container static-page-container animate-fade-in-up">
            <h1 className="static-hero h1" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '2rem' }}>Privacy Policy</h1>
            <p className="update-date">Last Updated: October 2023</p>

            <div className="policy-section">
                <h2>1. Our Privacy Philosophy</h2>
                <p>
                    At All Tools, your privacy is not just a policy—it's our primary feature. We believe that
                    privacy is a fundamental right, and our architecture reflects that.
                </p>
            </div>

            <div className="policy-section">
                <h2>2. No Data Collection</h2>
                <p>
                    Our website is designed to be completely "static" from a data perspective. What this
                    means for you:
                </p>
                <ul>
                    <li>We do not store your files.</li>
                    <li>We do not log your input data.</li>
                    <li>We do not have a database of your results.</li>
                    <li>We do not use cookies for tracking or advertising.</li>
                </ul>
            </div>

            <div className="policy-section">
                <h2>3. Client-Side Execution</h2>
                <p>
                    99% of our tools run entirely within your web browser. When you use an image compressor
                    or a JSON formatter, the processing happens on your device using your CPU and RAM.
                    No data is transmitted to our servers for processing.
                </p>
            </div>

            <div className="policy-section">
                <h2>4. Third-Party Analytics</h2>
                <p>
                    We use minimal, privacy-focused analytics to understand general traffic patterns (like
                    how many people visited the site). These tools do not collect personally identifiable
                    information (PII) and are configured to respect "Do Not Track" headers.
                </p>
            </div>

            <div className="policy-section">
                <h2>5. Security</h2>
                <p>
                    Because we don't store your data, there is no risk of your processed data being leaked
                    from our servers. However, we ensure that our website is served over a secure, encrypted
                    HTTPS connection to protect your interactions with the site.
                </p>
            </div>

            <div className="policy-section">
                <h2>6. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at
                    privacy@alltools.com.
                </p>
            </div>
        </div>
    );
}

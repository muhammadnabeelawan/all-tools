import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'All Tools - 50+ Free Online Tools',
  description: 'Your all-in-one toolbox with 50+ free online tools including image compressor, JSON formatter, QR generator, password generator, unit converter, and more.',
  keywords: 'online tools, image compressor, json formatter, qr generator, password generator, unit converter, free tools',
  openGraph: {
    title: 'All Tools - 50+ Free Online Tools',
    description: 'Your all-in-one toolbox with 50+ free online tools.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

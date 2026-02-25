import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  metadataBase: new URL('https://all-tools-poth.vercel.app'),
  title: 'All Tools - 85+ Free Online Utilities & Productivity Tools',
  description: 'Your premium all-in-one toolbox with 85+ free online tools. Including image compressor, JSON formatter, QR generator, PDF tools, financial calculators, and unit converters. Privacy-first and zero-latency.',
  keywords: 'online tools, image compressor, json formatter, qr generator, password generator, unit converter, free tools, pdf tools, financial calculators, productivity tools, word counter, lorem ipsum',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'All Tools - 85+ Free Online Online Utilities',
    description: 'Access 85+ high-quality tools for text, images, development, finance, and more. All free and secure.',
    url: 'https://all-tools-poth.vercel.app',
    siteName: 'All Tools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Tools - 85+ Free Online Online Utilities',
    description: 'Instant, free, and secure online tools for everyone.',
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

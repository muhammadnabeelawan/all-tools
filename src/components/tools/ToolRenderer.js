'use client';
import dynamic from 'next/dynamic';
import ToolPageLayout from '@/components/ToolPageLayout';

// Using { ssr: false } for tools that depend on browser-only APIs (Canvas, PDF libraries, etc.)
const toolComponents = {
    'word-counter': dynamic(() => import('./WordCounter')),
    'case-converter': dynamic(() => import('./CaseConverter')),
    'lorem-ipsum': dynamic(() => import('./LoremIpsum')),
    'text-reverser': dynamic(() => import('./TextReverser')),
    'remove-duplicates': dynamic(() => import('./RemoveDuplicates')),
    'text-to-slug': dynamic(() => import('./TextToSlug')),
    'find-replace': dynamic(() => import('./FindReplace')),
    'text-diff': dynamic(() => import('./TextDiff')),
    'string-encoder': dynamic(() => import('./StringEncoder')),
    'markdown-preview': dynamic(() => import('./MarkdownPreview')),
    'image-compressor': dynamic(() => import('./ImageCompressor'), { ssr: false }),
    'image-resizer': dynamic(() => import('./ImageResizer'), { ssr: false }),
    'image-converter': dynamic(() => import('./ImageConverter'), { ssr: false }),
    'image-cropper': dynamic(() => import('./ImageCropper'), { ssr: false }),
    'image-to-base64': dynamic(() => import('./ImageToBase64'), { ssr: false }),
    'svg-to-png': dynamic(() => import('./SvgToPng'), { ssr: false }),
    'image-filters': dynamic(() => import('./ImageFilters'), { ssr: false }),
    'screenshot-mockup': dynamic(() => import('./ScreenshotMockup'), { ssr: false }),
    'json-formatter': dynamic(() => import('./JsonFormatter')),
    'json-to-csv': dynamic(() => import('./JsonToCsv')),
    'html-minifier': dynamic(() => import('./HtmlMinifier')),
    'css-minifier': dynamic(() => import('./CssMinifier')),
    'js-minifier': dynamic(() => import('./JsMinifier')),
    'regex-tester': dynamic(() => import('./RegexTester')),
    'percentage-calculator': dynamic(() => import('./PercentageCalculator')),
    'age-calculator': dynamic(() => import('./AgeCalculator')),
    'merge-pdf': dynamic(() => import('./MergePdf'), { ssr: false }),
    'image-to-pdf': dynamic(() => import('./ImageToPdf'), { ssr: false }),
    'pdf-to-image': dynamic(() => import('./PdfToImage'), { ssr: false }),
    'pdf-to-text': dynamic(() => import('./PdfToText'), { ssr: false }),
    'pdf-metadata': dynamic(() => import('./PdfMetadata'), { ssr: false }),
    'password-generator': dynamic(() => import('./PasswordGenerator')),
    'qr-generator': dynamic(() => import('./QrGenerator')),
    'unit-converter': dynamic(() => import('./UnitConverter')),
    'hash-generator': dynamic(() => import('./HashGenerator')),
    'bmi-calculator': dynamic(() => import('./BmiCalculator')),
    'loan-calculator': dynamic(() => import('./LoanCalculator')),
    'tip-calculator': dynamic(() => import('./TipCalculator')),
    'date-difference': dynamic(() => import('./DateDifference')),
    'password-strength': dynamic(() => import('./PasswordStrength')),
    'uuid-generator': dynamic(() => import('./UuidGenerator')),
};

export default function ToolRenderer({ tool }) {
    const Component = toolComponents[tool.id];
    if (!Component) {
        return (
            <ToolPageLayout title={tool.name} description={tool.desc}>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>
                    This tool is coming soon!
                </p>
            </ToolPageLayout>
        );
    }
    return (
        <ToolPageLayout title={tool.name} description={tool.desc}>
            <Component />
        </ToolPageLayout>
    );
}

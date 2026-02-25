'use client';
import dynamic from 'next/dynamic';
import ToolPageLayout from '@/components/ToolPageLayout';

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
    'image-compressor': dynamic(() => import('./ImageCompressor')),
    'image-resizer': dynamic(() => import('./ImageResizer')),
    'image-converter': dynamic(() => import('./ImageConverter')),
    'image-cropper': dynamic(() => import('./ImageCropper')),
    'image-to-base64': dynamic(() => import('./ImageToBase64')),
    'svg-to-png': dynamic(() => import('./SvgToPng')),
    'image-filters': dynamic(() => import('./ImageFilters')),
    'screenshot-mockup': dynamic(() => import('./ScreenshotMockup')),
    'json-formatter': dynamic(() => import('./JsonFormatter')),
    'json-to-csv': dynamic(() => import('./JsonToCsv')),
    'html-minifier': dynamic(() => import('./HtmlMinifier')),
    'css-minifier': dynamic(() => import('./CssMinifier')),
    'js-minifier': dynamic(() => import('./JsMinifier')),
    'regex-tester': dynamic(() => import('./RegexTester')),
    'code-beautifier': dynamic(() => import('./CodeBeautifier')),
    'jwt-decoder': dynamic(() => import('./JwtDecoder')),
    'cron-parser': dynamic(() => import('./CronParser')),
    'sql-formatter': dynamic(() => import('./SqlFormatter')),
    'unit-converter': dynamic(() => import('./UnitConverter')),
    'color-converter': dynamic(() => import('./ColorConverter')),
    'number-base': dynamic(() => import('./NumberBase')),
    'timestamp-converter': dynamic(() => import('./TimestampConverter')),
    'csv-to-json': dynamic(() => import('./CsvToJson')),
    'xml-to-json': dynamic(() => import('./XmlToJson')),
    'yaml-to-json': dynamic(() => import('./YamlToJson')),
    'currency-converter': dynamic(() => import('./CurrencyConverter')),
    'password-generator': dynamic(() => import('./PasswordGenerator')),
    'qr-generator': dynamic(() => import('./QrGenerator')),
    'uuid-generator': dynamic(() => import('./UuidGenerator')),
    'hash-generator': dynamic(() => import('./HashGenerator')),
    'gradient-generator': dynamic(() => import('./GradientGenerator')),
    'meta-tag-generator': dynamic(() => import('./MetaTagGenerator')),
    'favicon-generator': dynamic(() => import('./FaviconGenerator')),
    'placeholder-image': dynamic(() => import('./PlaceholderImage')),
    'age-calculator': dynamic(() => import('./AgeCalculator')),
    'bmi-calculator': dynamic(() => import('./BmiCalculator')),
    'percentage-calculator': dynamic(() => import('./PercentageCalculator')),
    'loan-calculator': dynamic(() => import('./LoanCalculator')),
    'tip-calculator': dynamic(() => import('./TipCalculator')),
    'date-difference': dynamic(() => import('./DateDifference')),
    'password-strength': dynamic(() => import('./PasswordStrength')),
    'ip-lookup': dynamic(() => import('./IpLookup')),
    'url-parser': dynamic(() => import('./UrlParser')),
    'color-picker': dynamic(() => import('./ColorPicker')),
    'palette-generator': dynamic(() => import('./PaletteGenerator')),
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

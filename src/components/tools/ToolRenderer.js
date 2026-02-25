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

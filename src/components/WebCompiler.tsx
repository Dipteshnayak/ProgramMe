import React, { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import './WebCompiler.css';

const WebCompiler: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
    const [html, setHtml] = useState('<h1>Hello Web</h1>\n<p>Start editing to see some magic happen!</p>');
    const [css, setCss] = useState('body {\n  font-family: sans-serif;\n  padding: 1rem;\n}\nh1 {\n  color: #3b82f6;\n}');
    const [js, setJs] = useState('console.log("Hello from JavaScript!");');
    const [srcDoc, setSrcDoc] = useState('');
    const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <!DOCTYPE html>
                <html>
                <head>
                    <style>${css}</style>
                </head>
                <body>
                    ${html}
                    <script>${js}</script>
                </body>
                </html>
            `);
        }, 500);

        return () => clearTimeout(timeout);
    }, [html, css, js]);

    return (
        <div className="web-compiler-container">
            <div className="web-editors-pane">
                <div className="web-editors-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'html' ? 'active' : ''}`}
                        onClick={() => setActiveTab('html')}
                    >
                        HTML
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'css' ? 'active' : ''}`}
                        onClick={() => setActiveTab('css')}
                    >
                        CSS
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'js' ? 'active' : ''}`}
                        onClick={() => setActiveTab('js')}
                    >
                        JS
                    </button>
                </div>
                <div className="web-editor-content">
                    {activeTab === 'html' && (
                        <CodeEditor code={html} language="html" theme={theme} onChange={(val) => setHtml(val || '')} />
                    )}
                    {activeTab === 'css' && (
                        <CodeEditor code={css} language="css" theme={theme} onChange={(val) => setCss(val || '')} />
                    )}
                    {activeTab === 'js' && (
                        <CodeEditor code={js} language="javascript" theme={theme} onChange={(val) => setJs(val || '')} />
                    )}
                </div>
            </div>
            <div className="web-preview-pane">
                <div className="preview-header">Preview</div>
                <div className="preview-content">
                    <iframe
                        srcDoc={srcDoc}
                        title="output"
                        sandbox="allow-scripts"
                        frameBorder="0"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
        </div>
    );
};

export default WebCompiler;

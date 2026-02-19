import React, { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import './ReactCompiler.css';

const ReactCompiler: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
    const [code, setCode] = useState(`import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Hello React</h1>
      <p>Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 20px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Increment
      </button>
    </div>
  );
}`);

    const [srcDoc, setSrcDoc] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            let processedCode = code
                .replace(/import\s+.*?from\s+['"]react['"];?/g, '') // Remove react imports specifically
                .replace(/import\s+.*?from\s+['"].*?['"];?/g, '') // Remove other imports (naive)
                .replace(/export\s+default\s+function\s+(\w+)/, 'function $1')
                .replace(/export\s+default\s+(\w+);?/, '');

            const match = code.match(/export\s+default\s+function\s+(\w+)/) || code.match(/export\s+default\s+(\w+)/);
            const componentName = match ? match[1] : 'App';

            processedCode += `\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(<${componentName} />);`;

            setSrcDoc(`
                <!DOCTYPE html>
                <html>
                <head>
                    <script crossorigin src="https://unpkg.com/react@18.2.0/umd/react.development.js"></script>
                    <script crossorigin src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"></script>
                    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
                    <style>
                        body { margin: 0; padding: 0; background: white; font-family: sans-serif; }
                        #error-overlay {
                            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                            background: rgba(255, 0, 0, 0.1); color: red; padding: 20px;
                            display: none; white-space: pre-wrap; font-family: monospace;
                        }
                    </style>
                </head>
                <body>
                    <div id="root"></div>
                    <div id="error-overlay"></div>
                    <script>
                        window.onerror = function(message, source, lineno, colno, error) {
                            const overlay = document.getElementById('error-overlay');
                            overlay.style.display = 'block';
                            overlay.innerText = 'Error: ' + message + '\\nLine: ' + lineno;
                        };
                        
                        // Make React hooks available globally
                        if (window.React) {
                            Object.keys(window.React).forEach(key => {
                                window[key] = window.React[key];
                            });
                        }
                    </script>
                    <script type="text/babel">
                        try {
                            ${processedCode}
                        } catch (err) {
                            const overlay = document.getElementById('error-overlay');
                            overlay.style.display = 'block';
                            overlay.innerText = 'Runtime Error: ' + err.message;
                        }
                    </script>
                </body>
                </html>
            `);
        }, 500);

        return () => clearTimeout(timeout);
    }, [code]);

    return (
        <div className="react-compiler-container">
            <div className="react-editor-pane">
                <div className="react-toolbar">
                    <span className="toolbar-title">React Component</span>
                </div>
                <div className="react-editor-wrapper">
                    <CodeEditor code={code} language="javascript" theme={theme} onChange={(val) => setCode(val || '')} />
                </div>
            </div>
            <div className="react-preview-pane">
                <div className="preview-header">Live Preview</div>
                <div className="preview-content">
                    <iframe
                        srcDoc={srcDoc}
                        title="react-preview"
                        sandbox="allow-scripts allow-same-origin"
                        frameBorder="0"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
        </div>
    );
};

export default ReactCompiler;

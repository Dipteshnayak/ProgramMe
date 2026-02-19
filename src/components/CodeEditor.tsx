import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    code: string;
    language: string;
    theme?: 'light' | 'dark';
    onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language, theme = 'dark', onChange }) => {
    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <Editor
                height="100%"
                language={language}
                value={code}
                onChange={onChange}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 10 },
                    fontFamily: 'JetBrains Mono, monospace',
                }}
            />
        </div>
    );
};

export default CodeEditor;

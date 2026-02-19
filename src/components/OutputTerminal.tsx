import React, { useRef, useEffect } from 'react';
import './OutputTerminal.css';

export interface OutputLine {
    type: 'stdout' | 'stderr' | 'info';
    content: string;
}

interface OutputTerminalProps {
    output: OutputLine[];
    onClear: () => void;
}

const OutputTerminal: React.FC<OutputTerminalProps> = ({ output, onClear }) => {
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [output]);

    return (
        <div className="terminal-container">
            <div className="terminal-header">
                <span className="terminal-title">Output</span>
                <button className="clear-btn" onClick={onClear}>Clear</button>
            </div>
            <div className="terminal-content">
                {output.length === 0 ? (
                    <div className="empty-state">
                        Run your code to see output here
                    </div>
                ) : (
                    output.map((line, index) => (
                        <div key={index} className={`terminal-line ${line.type}`}>
                            {line.content}
                        </div>
                    ))
                )}
                <div ref={endRef} />
            </div>
        </div>
    );
};

export default OutputTerminal;

import React, { useState } from 'react';
import { Box } from 'lucide-react';
import logoImg from '../assets/logo.png';
import './Sidebar.css';

export type TabId = 'python' | 'web' | 'sql' | 'java' | 'c' | 'cpp' | 'react' | 'csharp' | 'php' | 'kotlin' | 'rust' | 'r' | 'typescript' | 'oracle' | 'pypy' | 'go' | 'swift' | 'dart' | 'ruby' | 'other';

interface SidebarProps {
    activeTab: TabId;
    onTabChange: (tab: TabId) => void;
}

const PythonIcon = ({ size = 24 }: { size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
    >
        <path d="M126.916 0.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.134 71.295.134 118.46c0 47.166 25.926 45.143 25.926 45.143h15.52v-21.787s-.675-26.096 26.084-26.096h40.408s24.402.663 24.402-23.905V24.047S134.339.072 126.916.072zM98.66 20.32a9.663 9.663 0 1 1 0 19.327 9.663 9.663 0 0 1 0-19.327z" fill="#3776AB" />
        <path d="M128.36 255.926c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.204v-8.745h86.441s41.498-5.235 41.498-52.4c0-47.166-25.926-45.143-25.926-45.143h-15.52v21.787s.675 26.096-26.084 26.096h-40.408s-24.402-.663-24.402 23.905v67.653s-1.864 24.09 5.558 24.09zM156.616 235.678a9.663 9.663 0 1 1 0-19.326 9.663 9.663 0 0 1 0 19.326z" fill="#FFD43B" />
    </svg>
);

const WebIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.725 241.22L16.275 0h223.45l-25.45 241.22L127.988 256l-86.263-14.78z" fill="#E34F26" />
        <path d="M128 235.638l75.613-12.95 22.3-211.45H128v224.4z" fill="#EF652A" />
        <path d="M128 108.763v34.1h56.863l-5.325 59.7-51.538 10.937v-34.1l21.137-4.487 2.1-23.775H94.7l-3.05-34.1H128zm-36.413-42.375L94.7 66.387H128V32.287H57.75l7.375 76.476h26.462z" fill="#FFFFFF" />
        <path d="M127.989 171.748l-21.138-4.487-1.787-19.887H78.6l3.05 34.1 46.338 9.938V171.75z" fill="#EBEBEB" />
    </svg>
);

const ReactIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <circle cx="128" cy="128" r="24" fill="#61DAFB" />
        <path d="M128 58c-32 0-66 12-66 40s34 40 66 40 66-12 66-40-34-40-66-40zm0 88c-32 0-66 12-66 40s34 40 66 40 66-12 66-40-34-40-66-40z" fill="none" stroke="#61DAFB" strokeWidth="12" transform="rotate(60, 128, 128)" />
        <path d="M128 58c-32 0-66 12-66 40s34 40 66 40 66-12 66-40-34-40-66-40zm0 88c-32 0-66 12-66 40s34 40 66 40 66-12 66-40-34-40-66-40z" fill="none" stroke="#61DAFB" strokeWidth="12" transform="rotate(120, 128, 128)" />
        <path d="M128 58c-32 0-66 12-66 40s34 40 66 40 66-12 66-40-34-40-66-40zm0 88c-32 0-66 12-66 40s34 40 66 40 66-12 66-40-34-40-66-40z" fill="none" stroke="#61DAFB" strokeWidth="12" />
    </svg>
);

const SqlIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 24C60 24 24 48 24 64s36 40 104 40 104-24 104-40-36-40-104-40zm0 180c-68 0-104-24-104-40v-16c14.2 12.8 48 24 104 24s89.8-11.2 104-24v16c0 16-36 40-104 40zm0-72c-68 0-104-24-104-40v-16c14.2 12.8 48 24 104 24s89.8-11.2 104-24v16c0 16-36 40-104 40z" fill="#00758F" />
        <text x="128" y="160" fontSize="72" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="sans-serif">SQL</text>
    </svg>
);

const JavaIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M109 23c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8s8-3.6 8-8V31c0-4.4-3.6-8-8-8zm36 0c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8s8-3.6 8-8V31c0-4.4-3.6-8-8-8zm-72 0c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8s8-3.6 8-8V31c0-4.4-3.6-8-8-8zm94.5 140.2c-1.3-19.1-8.3-30.2-18.4-30.2h-36.2v8.9h30.8c5.4 0 7.6 8.3 8.3 16.9H82.2v8.9h68c.3 4.2.3 8.3 0 11.8H73.3v8.9h75.5c-3.1 9.4-9.3 14.8-16.1 14.8h-51v8.9h47.3c16.2 0 27.6-14.8 30.5-49zM53.8 132H202c11 0 20 9 20 20v60c0 11-9 20-20 20H53.8c-11 0-20-9-20-20v-60c0-11 9-20 20-20z" fill="#5382A1" />
        <path d="M194 232H61c-11 0-20-9-20-20v-4c0 11 9 20 20 20h133c11 0 20-9 20-20v4c0 11-9 20-20 20z" fill="#F89820" />
    </svg>
);

const CIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 24c57.4 0 104 46.6 104 104s-46.6 104-104 104S24 185.4 24 128 70.6 24 128 24z" fill="#00599C" />
        <text x="128" y="170" fontSize="140" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="sans-serif">C</text>
    </svg>
);

const CppIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 24c57.4 0 104 46.6 104 104s-46.6 104-104 104S24 185.4 24 128 70.6 24 128 24z" fill="#00599C" />
        <text x="100" y="170" fontSize="120" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="sans-serif">C</text>
        <text x="175" y="100" fontSize="60" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="sans-serif">++</text>
    </svg>
);

const CSharpIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 24C70.6 24 24 70.6 24 128s46.6 104 104 104 104-46.6 104-104S185.4 24 128 24zm0 192c-48.5 0-88-39.5-88-88s39.5-88 88-88 88 39.5 88 88-39.5 88-88 88z" fill="#68217A" />
        <text x="128" y="170" fontSize="100" fontWeight="bold" textAnchor="middle" fill="#68217A" fontFamily="sans-serif">C#</text>
    </svg>
);

const PhpIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="128" cy="128" rx="110" ry="64" fill="#777BB3" />
        <text x="128" y="150" fontSize="80" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="sans-serif">PHP</text>
    </svg>
);

const KotlinIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 24h208L24 232V24z" fill="#7F52FF" />
        <path d="M232 24H128L24 128v104h104L232 24z" fill="#C711E1" />
    </svg>
);

const RustIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <circle cx="128" cy="128" r="110" fill="#000000" />
        <path d="M128 48c44.2 0 80 35.8 80 80s-35.8 80-80 80-80-35.8-80-80 35.8-80 80-80zm0 20c-33.1 0-60 26.9-60 60s26.9 60 60 60 60-26.9 60-60-26.9-60-60-60z" fill="white" />
        <path d="M128 178c-27.6 0-50-22.4-50-50s22.4-50 50-50 50 22.4 50 50-22.4 50-50 50z" fill="#000000" />
    </svg>
);

const RIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 24c57.4 0 104 46.6 104 104s-46.6 104-104 104S24 185.4 24 128 70.6 24 128 24z" fill="#276DC3" />
        <text x="128" y="180" fontSize="160" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="serif">R</text>
    </svg>
);

const TypescriptIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <rect x="24" y="24" width="208" height="208" rx="20" fill="#3178C6" />
        <text x="170" y="190" fontSize="140" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="sans-serif">TS</text>
    </svg>
);

const OracleIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <rect x="24" y="64" width="208" height="128" rx="20" fill="#F80000" />
        <text x="128" y="155" fontSize="60" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="sans-serif">Oracle</text>
    </svg>
);

const PypyIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M126.916 0.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.134 71.295.134 118.46c0 47.166 25.926 45.143 25.926 45.143h15.52v-21.787s-.675-26.096 26.084-26.096h40.408s24.402.663 24.402-23.905V24.047S134.339.072 126.916.072zM98.66 20.32a9.663 9.663 0 1 1 0 19.327 9.663 9.663 0 0 1 0-19.327z" fill="#3776AB" />
        <path d="M128.36 255.926c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.204v-8.745h86.441s41.498-5.235 41.498-52.4c0-47.166-25.926-45.143-25.926-45.143h-15.52v21.787s.675 26.096-26.084 26.096h-40.408s-24.402-.663-24.402 23.905v67.653s-1.864 24.09 5.558 24.09zM156.616 235.678a9.663 9.663 0 1 1 0-19.326 9.663 9.663 0 0 1 0 19.326z" fill="#FFD43B" />
        <text x="180" y="200" fontSize="60" fontWeight="bold" fill="black">Py</text>
    </svg>
);

const GoIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 128c0-48.6 39.4-88 88-88s88 39.4 88 88-39.4 88-88 88-88-39.4-88-88z" fill="#00ADD8" />
        <text x="128" y="160" fontSize="100" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="sans-serif">GO</text>
    </svg>
);

const SwiftIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M211.9 44.1C189.5 21.7 159.4 9 128 9s-61.5 12.7-83.9 35.1S9 96.6 9 128s12.7 61.5 35.1 83.9S96.6 247 128 247s61.5-12.7 83.9-35.1S247 159.4 247 128s-12.7-61.5-35.1-83.9z" fill="#F05138" />
        <path d="M165.5 82.5c-48 7-80 50-80 100 25-15 50-20 65-20 10 0 15 5 15 5s-12-18-5-40c2-6 8-15 20-30-20 5-30 10-35 20-2-12 10-25 20-35z" fill="white" />
    </svg>
);

const DartIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 220l90-90 60 60-90 90H30v-60zm0-180h60l130 130-60 60L30 100V40zM128 30l30-30h60l-90 90-60-60 60-60z" fill="#0175C2" />
    </svg>
);

const RubyIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M48 96l80 128 80-128-40-64H88L48 96z" fill="#CC342D" />
        <path d="M88 32l-40 64h160l-40-64H88z" fill="#A81D18" />
    </svg>
);

const SIDEBAR_ITEMS: { id: TabId; icon: React.ReactNode; label: string }[] = [
    { id: 'python', icon: <PythonIcon size={32} />, label: 'Python' },
    { id: 'web', icon: <WebIcon size={32} />, label: 'Web' },
    { id: 'react', icon: <ReactIcon size={32} />, label: 'React' },
    { id: 'sql', icon: <SqlIcon size={32} />, label: 'SQL' },
    { id: 'java', icon: <JavaIcon size={32} />, label: 'Java' },
    { id: 'c', icon: <CIcon size={32} />, label: 'C' },
    { id: 'cpp', icon: <CppIcon size={32} />, label: 'C++' },
    { id: 'csharp', icon: <CSharpIcon size={32} />, label: 'C#' },
    { id: 'php', icon: <PhpIcon size={32} />, label: 'PHP' },
    { id: 'kotlin', icon: <KotlinIcon size={32} />, label: 'Kotlin' },
    { id: 'rust', icon: <RustIcon size={32} />, label: 'Rust' },
    { id: 'r', icon: <RIcon size={32} />, label: 'R' },
    { id: 'typescript', icon: <TypescriptIcon size={32} />, label: 'TS' },
    { id: 'oracle', icon: <OracleIcon size={32} />, label: 'Oracle' },
    { id: 'pypy', icon: <PypyIcon size={32} />, label: 'PyPy3' },
    { id: 'go', icon: <GoIcon size={32} />, label: 'Go' },
    { id: 'swift', icon: <SwiftIcon size={32} />, label: 'Swift' },
    { id: 'dart', icon: <DartIcon size={32} />, label: 'Dart' },
    { id: 'ruby', icon: <RubyIcon size={32} />, label: 'Ruby' },
    { id: 'other', icon: <Box size={32} />, label: 'Other' },
];

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => {
    return (
        <div
            className={`sidebar-item ${active ? 'active' : ''}`}
            title={label}
            onClick={onClick}
        >
            {icon}
            <span className="sidebar-item-label">{label}</span>
        </div>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
            <div className="sidebar-logo">
                <div className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
                    <img src={logoImg} alt="ProgramMe" className="sidebar-logo-img" />
                </div>
            </div>

            <div className={`sidebar-menu ${isOpen ? 'show' : 'hide'}`}>
                {SIDEBAR_ITEMS.map((item) => (
                    <SidebarItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        active={activeTab === item.id}
                        onClick={() => onTabChange(item.id)}
                    />
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;

import React from 'react';
import { Activity, Cpu, Radio, Terminal, Github } from 'lucide-react';

const Sidebar = ({ currentSection, onNavigate }) => {
    const navItems = [
        { id: 'overview', label: 'About', icon: Activity },
        { id: 'projects', label: 'Projects', icon: Cpu },
        { id: 'hardware', label: 'Hardware', icon: Terminal },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h1 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>GALIB RAID</h1>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          // System Engineer<br />
          // Embedded
                </div>
            </div>

            <nav style={{ marginTop: '3rem', flex: 1 }}>
                <ul style={{ listStyle: 'none' }}>
                    {navItems.map((item) => (
                        <li key={item.id} style={{ marginBottom: '1rem' }}>
                            <button
                                onClick={() => onNavigate(item.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.9rem',
                                    color: currentSection === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '0.5rem 0',
                                    borderBottom: currentSection === item.id ? '2px solid var(--accent-main)' : '2px solid transparent',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <item.icon size={18} strokeWidth={currentSection === item.id ? 2.5 : 2} />
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer" style={{ borderTop: '1px solid var(--border-lines)', paddingTop: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <a href="https://github.com/Galib2003" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>
                        <Github size={16} /> github.com/Galib2003
                    </a>
                    <div>© 2025</div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

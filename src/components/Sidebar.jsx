import React from 'react';

const Sidebar = ({ currentSection, onNavigate }) => {
    const navItems = [
        { id: 'overview', label: 'Overview', number: '01' },
        { id: 'research', label: 'Research', number: '02' },
        { id: 'projects', label: 'Hardware Projects', number: '03' },
        { id: 'playground', label: 'Playground', number: '04' },
        { id: 'art_design', label: 'Art & Design', number: '05' },
        { id: 'studio', label: 'Gallery', number: '06' },
        { id: 'contact', label: 'Contact', number: '07' },
    ];

    return (
        <aside className="sidebar">
            <div style={{ marginBottom: '4rem', color: 'white' }}>
                <h1 style={{
                    fontSize: '3rem',
                    lineHeight: '1',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.02em',
                    color: 'white'
                }}>
                    GALIB<br />RAID
                </h1>

            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            textAlign: 'left',
                            fontSize: '1.25rem',
                            padding: '0.5rem 0',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            transition: 'opacity 0.2s'
                        }}
                    >
                        <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.9rem',
                            fontWeight: 700
                        }}>
                            {item.number}
                        </span>
                        <span style={{ fontWeight: 700 }}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </nav>

            <div style={{ marginTop: 'auto', color: 'white' }}>
                <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem'
                }}>
                    +1 682 376 9169<br />
                    gar5128@mavs.uta.edu
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;

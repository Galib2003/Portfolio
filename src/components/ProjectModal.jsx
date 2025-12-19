import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const ProjectModal = ({ isOpen, onClose, project }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !project) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close modal">
                    <X size={24} />
                </button>

                <header style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-lines)', paddingBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <span>{project.date}</span>
                        <span>Status: {project.status}</span>
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0' }}>{project.title}</h2>
                </header>

                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>Goal</strong>
                        <p style={{ color: 'var(--text-secondary)' }}>{project.goal}</p>
                    </div>
                    <div>
                        <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>Technologies</strong>
                        <p style={{ color: 'var(--text-secondary)' }}>{project.stack.join(', ')}</p>
                    </div>
                </div>

                <div className="modal-body" style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                    {project.fullDescription || project.children}

                    {/* Placeholder for images if provided later */}
                    {/* Images display: Prefer modalImages if available, else fallback to images */}
                    {(project.modalImages || project.images) && (project.modalImages || project.images).length > 0 && (
                        <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                            {(project.modalImages || project.images).map((img, idx) => (
                                <img key={idx} src={img} alt={`Project detail ${idx}`} style={{ width: '100%', borderRadius: '4px', border: '1px solid var(--border-lines)' }} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;

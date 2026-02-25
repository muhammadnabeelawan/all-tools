'use client';
import { useState } from 'react';
import ToolCard from '@/components/ToolCard';
import { categories, getToolsByCategory } from '@/lib/tools-data';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredTools = getToolsByCategory(activeCategory);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    // Smooth scroll to tools grid
    const toolsSection = document.getElementById('tools-grid-start');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderTools = () => {
    if (activeCategory !== 'all') {
      return (
        <div className="tools-grid">
          {filteredTools.map((tool, i) => (
            <div key={tool.id} style={{ animationDelay: `${i * 0.03}s` }} className="animate-fade-in-up">
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      );
    }

    // Grouped layout for 'All' category
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {categories.filter(c => c.id !== 'all').map(cat => {
          const catTools = filteredTools.filter(t => t.category === cat.id);
          if (catTools.length === 0) return null;

          return (
            <div key={cat.id}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '1.5rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '12px'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{cat.name}</h2>
                <span style={{
                  marginLeft: 'auto',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  background: 'var(--bg-secondary)',
                  padding: '4px 12px',
                  borderRadius: '20px'
                }}>{catTools.length} Tools</span>
              </div>
              <div className="tools-grid">
                {catTools.map((tool, i) => (
                  <div key={tool.id} className="animate-fade-in-up">
                    <ToolCard tool={tool} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">🚀 Free & Open Source</div>
        <h1>
          75+ Professional <span className="gradient-text">Online Tools</span><br />
          For Every Task
        </h1>
        <p>
          The most comprehensive collection of 75+ free online tools for developers, designers, and daily tasks.
          Everything runs 100% in your browser—no uploads, no sign-ups, and complete privacy guaranteed.
        </p>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">75+</div>
            <div className="hero-stat-label">Free Tools</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">100%</div>
            <div className="hero-stat-label">Client-Side</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">0</div>
            <div className="hero-stat-label">Sign-ups Required</div>
          </div>
        </div>
      </section>

      {/* Category Filters & Tools Grid */}
      <section className="category-section" id="tools">
        <div id="categories" className="category-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-tab${activeCategory === cat.id ? ' active' : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="container" id="tools-grid-start" style={{ scrollMarginTop: '100px' }}>
          {renderTools()}
        </div>
      </section>
    </>
  );
}

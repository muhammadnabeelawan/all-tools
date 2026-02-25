'use client';
import { useState } from 'react';
import ToolCard from '@/components/ToolCard';
import { categories, getToolsByCategory } from '@/lib/tools-data';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredTools = getToolsByCategory(activeCategory);

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
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="container">
          <div className="tools-grid">
            {filteredTools.map((tool, i) => (
              <div key={tool.id} style={{ animationDelay: `${i * 0.03}s` }} className="animate-fade-in-up">
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

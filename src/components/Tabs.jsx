import React from 'react';

const Tabs = ({ tabs, activeTab, setActiveTab }) => (
  <div className="tabs">
    {tabs.map(tab => (
      <button
        key={tab}
        className={tab === activeTab ? 'active' : ''}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default Tabs;

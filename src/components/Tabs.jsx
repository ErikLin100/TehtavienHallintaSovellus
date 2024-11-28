import { useState } from "react";
import PropTypes from 'prop-types';

const VALID_TABS = ["Today", "Pending", "Overdue"];

const Tabs = ({ onTabChange, initialTab = "Today" }) => {
  // Validate initial tab
  const validInitialTab = VALID_TABS.includes(initialTab) ? initialTab : "Today";
  const [activeTab, setActiveTab] = useState(validInitialTab);

  const handleTabClick = (tab) => {
    if (!VALID_TABS.includes(tab)) {
      console.error(`Invalid tab: ${tab}`);
      return;
    }
    
    try {
      setActiveTab(tab);
      if (typeof onTabChange === 'function') {
        onTabChange(tab);
      }
    } catch (error) {
      console.error('Error changing tab:', error);
    }
  };

  return (
    <nav className="flex justify-center space-x-4 mb-4" role="tablist">
      {VALID_TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 ${
            activeTab === tab 
              ? "bg-green-500 text-white hover:bg-green-600" 
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          role="tab"
          aria-selected={activeTab === tab}
          aria-controls={`${tab.toLowerCase()}-panel`}
          id={`${tab.toLowerCase()}-tab`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

Tabs.propTypes = {
  onTabChange: PropTypes.func.isRequired,
  initialTab: PropTypes.oneOf(VALID_TABS)
};

Tabs.defaultProps = {
  initialTab: "Today"
};

export default Tabs;
import React from 'react';
import SearchBox from './SearchBox.jsx';
import TopAuthors from './TopAuthors.jsx';
import Categories from './Categories.jsx';
import NewsletterSubscription from './NewsletterSubscription.jsx';

const Sidebar = ({ darkMode }) => (
  <div className="space-y-8">
    <SearchBox darkMode={darkMode} />
    <TopAuthors darkMode={darkMode} />
    <Categories darkMode={darkMode} />
    <NewsletterSubscription darkMode={darkMode} />
  </div>
);

export default Sidebar;
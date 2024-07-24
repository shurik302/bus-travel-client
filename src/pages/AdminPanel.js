import React, { useContext, useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import "../components/Sidebar.css";
import MainContent from '../components/MainContent';

function AdminPanel() {
  const [section, setSection] = useState('');
  const onSelectSection = (sectionName) => {
    setSection(sectionName);
  };

  return (
    <div className='AdminPanel'>
      <MainContent section={section}/>
      <Sidebar onSelectSection={onSelectSection}/>
    </div>
  )
}

export default AdminPanel
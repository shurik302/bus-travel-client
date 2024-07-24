import React from 'react';
import './Sidebar.css';

const Sidebar = ({ onSelectSection }) => {
  return (
    <div className="sidebar">
      <h2>Адмін панель</h2>
      <ul>
        <li onClick={() => onSelectSection('home')}>🏠 Головна</li>
        <li onClick={() => onSelectSection('requests')}>📊 Заявки</li>
        <li onClick={() => onSelectSection('routes')}>🎟️ Маршрути</li>
        <li onClick={() => onSelectSection('users')}>👤 Користувачі</li>
        <li onClick={() => onSelectSection('content')}>📋 Контент</li>
      </ul>
      <div className="language-switch">
        <span>АНГЛ</span> | <span>УКР</span>
      </div>
    </div>
  );
};

export default Sidebar;

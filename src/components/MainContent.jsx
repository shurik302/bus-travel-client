import React from 'react';
import Users from './Users';
import TicketForm from './FlightForm';
import TicketManagement from './TicketManagement';

const MainContent = ({ section }) => {
  const renderContent = () => {
    switch (section) {
      case 'home':
        return <div>Головна</div>;
      case 'requests':
        return <div><TicketManagement/></div>;
      case 'routes':
        return <TicketForm/>;
      case 'users':
        return <Users/>;
      case 'content':
        return <div>Контент</div>;
      default:
        return <div>Виберіть розділ</div>;
    }
  };

  return (
    <div className="main-content">
      {renderContent()}
    </div>
  );
};

export default MainContent;

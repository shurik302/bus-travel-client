import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import "../components/Sidebar.css";
import MainContent from '../components/MainContent';

function AdminPanel() {
  const [section, setSection] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUserRole = () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        console.log('User from localStorage:', user);

        if (user.email === 'balabuha1988@gmail.com' || user.email === 'terehovvlad29@gmail.com' || user.email === 'bus_travel_admin1@gmail.com') { // Замініть на фактичну адресу адміністратора
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setError('Failed to fetch user role.');
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, []);

  const onSelectSection = (sectionName) => {
    setSection(sectionName);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!isAdmin) {
    return <div>Access denied. Admins only.</div>;
  }

  return (
    <div className='AdminPanel'>
      <MainContent section={section} />
      <Sidebar onSelectSection={onSelectSection} />
    </div>
  );
}

export default AdminPanel;
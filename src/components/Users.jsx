import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {

      const apiUrl = `${process.env.REACT_APP_API_URL}/api/users`;
      console.log('Fetching users from:', apiUrl);

      const response = await axios.get(apiUrl);
      setUsers(response.data);
    } catch (e) {
      console.error('Error fetching users:', e);
      setError('Failed to fetch users');
    }
  };

  const filteredUsers = users.filter(user => {
    return (
      user.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
      (statusFilter === '' || (statusFilter === 'active' && user.isActivated) || (statusFilter === 'inactive' && !user.isActivated))
    );
  });

  return (
    <div className="users">
      <h2>Користувачі</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="search-bar">
        <input
          type="text"
          placeholder="example@gmail.com"
          value={searchEmail}
          onChange={e => setSearchEmail(e.target.value)}
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Статус</option>
          <option value="active">Активен</option>
          <option value="inactive">Не активен</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td className={user.isActivated ? 'active' : 'inactive'}>
                {user.isActivated ? 'Активен' : 'Не активен'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

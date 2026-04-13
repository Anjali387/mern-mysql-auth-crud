import { useEffect, useState } from 'react';
import API from '../api/axios';

function Dashboard() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    API.get('/items', {
      headers: { Authorization: token }
    }).then(res => setItems(res.data));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {items.map(item => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}

export default Dashboard;

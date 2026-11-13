import React, { useState, useEffect } from 'react';

const API_URL = 'https://onrender.com';

export default function App() {
  const [fees, setFees] = useState([]);
  const [form, setForm] = useState({ name: '', feeType: '', amount: '' });

  const fetchFees = () => fetch(API_URL).then(r => r.json()).then(setFees);
  useEffect(() => { fetchFees(); }, []);

  const handleSubmit = e => {
    e.preventDefault();
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => { fetchFees(); setForm({ name: '', feeType: '', amount: '' }); });
  };

  const handleDelete = id => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' }).then(fetchFees);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px', margin: 'auto' }}>
      <h2>Campus Fee Portal</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input placeholder="Student Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{display:'block', marginBottom: '8px', width: '100%', padding: '6px'}} />
        <input placeholder="Fee Type (Exam/Uni)" value={form.feeType} onChange={e => setForm({...form, feeType: e.target.value})} required style={{display:'block', marginBottom: '8px', width: '100%', padding: '6px'}} />
        <input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required style={{display:'block', marginBottom: '8px', width: '100%', padding: '6px'}} />
        <button type="submit" style={{width: '100%', padding: '8px', background: '#007bff', color: '#fff', border: 'none'}}>Pay Fee</button>
      </form>
      <h3>Payment Records</h3>
      {fees.map(f => (
        <div key={f._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><b>{f.name}</b><br/>{f.feeType}: ₹{f.amount}</div>
          <button onClick={() => handleDelete(f._id)} style={{ background: 'red', color: 'white', border: 'none', padding: '4px 8px' }}>Delete</button>
        </div>
      ))}
    </div>
  );
}

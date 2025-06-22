import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const initialData = [
  { year: '2018', cases: 33000 },
  { year: '2019', cases: 34000 },
  { year: '2020', cases: 32000 },
  { year: '2021', cases: 35000 },
  { year: '2022', cases: 36000 },
];

export default function RapeStatsChart() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastYear = parseInt(data[data.length - 1].year);
      const newYear = (lastYear + 1).toString();
      const newCases = Math.floor(Math.random() * (38000 - 30000) + 30000);

      setData(prev => [...prev.slice(1), { year: newYear, cases: newCases }]);
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div style={{ width: '100%', height: '400px', marginTop: '30px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Rape Case Statistics in India (Live Simulated)
      </h2>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cases" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

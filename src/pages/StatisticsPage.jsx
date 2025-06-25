import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

export default function StatisticsPage() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const generateYearlyCases = () => {
    const years = [];
    for (let year = 2019; year <= currentYear; year++) {
      let months = year === currentYear ? currentMonth + 1 : 12;
      const monthlyCases = Array.from({ length: months }, () =>
        Math.floor(Math.random() * (3200 - 2500) + 2500)
      );
      const total = monthlyCases.reduce((a, b) => a + b, 0);
      years.push({ year: year.toString(), cases: total });
    }
    return years;
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(generateYearlyCases());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-purple-800">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6 text-center">
          Rape Case Statistics in India
        </h1>

        <p className="text-lg text-purple-700 mb-6 text-justify">
          The numbers you see are not just data they represent lives, trauma, and a cry for justice.
          This section provides a visual representation of rape case statistics in India from 2019 to {currentYear}.
          By understanding the reality through data, we aim to raise awareness and inspire meaningful action.
        </p>

        <h2 className="text-xl font-semibold mb-2">Why This Matters</h2>
        <p className="mb-6 text-justify">
          Sexual violence remains one of the most underreported crimes in India. Thousands of cases go
          unreported every year due to stigma, fear, and lack of support. Tracking and visualizing
          reported data is a step toward confronting the crisis and encouraging change in social and
          legal systems.
        </p>

        {/* Graph Section */}
        <div className="w-full h-96 bg-white rounded-lg shadow-md p-4 mt-8">
          <h3 className="text-center font-semibold mb-4 text-lg text-purple-700">
            Reported Rape Cases by Year (2019 - {currentYear})
          </h3>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cases" fill="#e11d48" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="mt-9 text-sm text-purple-700 text-center italic">
          Data is simulated for visual representation. {currentYear} includes only data till the current month.
        </p>

        {/* Key Facts */}
        <h2 className="text-xl font-semibold mt-10 mb-2">Key Facts from National Reports</h2>
        <ul className="list-disc pl-6 text-purple-700 space-y-2">
          <li>Over 30,000 rape cases are reported in India every year (NCRB).</li>
          <li>85% of victims know the accused.</li>
          <li>Conviction rate for rape is just around 35%.</li>
        </ul>

        {/* Laws Section */}
        <h2 className="text-xl font-semibold mt-10 mb-2">Laws That Protect Survivors</h2>
        <ul className="list-disc pl-6 text-purple-700 space-y-2">
          <li><strong>Section 375 & 376 IPC</strong> – Defines and penalizes rape.</li>
          <li><strong>POCSO Act</strong> – Protects children from sexual offenses.</li>
          <li><strong>Section 354 IPC</strong> – Criminal assault against modesty of a woman.</li>
          <li><strong>Section 228A IPC</strong> – Protects identity of survivors.</li>
        </ul>

        {/* Helplines */}
        <h2 className="text-xl font-semibold mt-10 mb-2">Helpline Numbers & Support</h2>
        <ul className="list-disc pl-6 text-purple-700 space-y-2">
          <li><strong>181</strong> – National Women Helpline (24x7)</li>
          <li><strong>1091</strong> – Women Police Helpline</li>
          <li><strong>112</strong> – Emergency Services</li>
          <li><a href="https://ncw.nic.in" className="text-purple-700 underline">National Commission for Women (NCW)</a></li>
        </ul>

        {/* Quote */}
        <div className="mt-10 bg-purple-100 p-4 rounded-lg shadow">
          <p className="text-lg italic text-center text-purple-800">
            “You are not alone. You are not to blame. Healing is possible.”
          </p>
        </div>

        {/* Awareness Tips */}
        <h2 className="text-xl font-semibold mt-10 mb-2">Awareness and Safety Tips</h2>
        <ul className="list-disc pl-6 text-purple-700 space-y-2">
          <li>Be aware of your surroundings, especially in unfamiliar places.</li>
          <li>Report harassment or abuse — don’t stay silent.</li>
          <li>Support others if they share their experience. Believe them.</li>
          <li>Understand and respect the concept of consent.</li>
        </ul>

        {/* Closing Message */}
        <p className="mt-10 text-center text-xl font-bold text-purple-700">
          Together, we can turn awareness into action.
        </p>

      </div>
    </div>
  );
}

"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Visitors',
        data: [50, 40, 60, 70, 50, 30, 60, 40, 30, 20, 40, 60],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const patientData = [
    { name: 'Annette Black', dob: 'Dec 18, 1982', diagnosis: 'Brain Injury', status: 'Recovering', view: '⬆️' },
    { name: 'Savannah Nguyen', dob: 'Dec 18, 1982', diagnosis: 'Pneumonia (Typical)', status: 'Confirmed', view: '⬆️' },
    { name: 'Naomi Richards', dob: 'Dec 18, 1982', diagnosis: 'Osteoarthritis', status: 'Stable', view: '⬆️' },
    { name: 'Bessie Cooper', dob: 'Dec 18, 1982', diagnosis: 'Gallstones', status: 'Confirmed', view: '⬆️' },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-lg font-bold">New Patients</h2>
          <p className="text-3xl font-bold">25</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-lg font-bold">Total Patients</h2>
          <p className="text-3xl font-bold">1023</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Visitors Graph</h2>
        <Line data={data} />
      </div>
      <div className="bg-white p-4 rounded-lg mt-4">
        <h2 className="text-lg font-bold mb-2">Patient Data</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2">Patient Name</th>
              <th className="py-2">DOB</th>
              <th className="py-2">Diagnosis</th>
              <th className="py-2">Status</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {patientData.map((patient, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{patient.name}</td>
                <td className="py-2">{patient.dob}</td>
                <td className="py-2">{patient.diagnosis}</td>
                <td className="py-2">{patient.status}</td>
                <td className="py-2">{patient.view}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
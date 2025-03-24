"use client";
import { useState } from "react";

interface Loan {
  id: number;
  amount: number;
  status: string;
  date: string;
}

export default function LoanHistory() {
  // Sample Loan History Data
  const [loanHistory] = useState<Loan[]>([
    { id: 1, amount: 500000, status: "Approved", date: "2025-01-12" },
    { id: 2, amount: 200000, status: "Rejected", date: "2025-02-15" },
    { id: 3, amount: 350000, status: "Pending", date: "2025-03-01" },
  ]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">📜 Loan History</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Loan ID</th>
            <th className="border border-gray-300 p-2">Amount (₹)</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {loanHistory.map((loan) => (
            <tr key={loan.id} className="text-center">
              <td className="border border-gray-300 p-2">{loan.id}</td>
              <td className="border border-gray-300 p-2">₹ {loan.amount}</td>
              <td
                className={`border border-gray-300 p-2 font-semibold ${
                  loan.status === "Approved"
                    ? "text-green-600"
                    : loan.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {loan.status}
              </td>
              <td className="border border-gray-300 p-2">{loan.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

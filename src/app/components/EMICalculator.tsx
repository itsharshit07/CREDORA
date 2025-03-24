"use client";
import { useState } from "react";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState<string | null>(null);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12; // Monthly Interest Rate
    const n = parseInt(tenure) * 12; // Loan tenure in months

    if (P && r && n) {
      const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(`₹ ${emiValue.toFixed(2)} per month`);
    } else {
      setEmi("❌ Please enter valid values.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">💰 EMI Calculator</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Enter Loan Amount (₹)"
          className="w-full p-2 border rounded"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Interest Rate (%)"
          className="w-full p-2 border rounded"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Tenure (years)"
          className="w-full p-2 border rounded"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" onClick={calculateEMI}>
          Calculate EMI
        </button>
        {emi && <p className="text-lg font-semibold">{emi}</p>}
      </div>
    </div>
  );
}

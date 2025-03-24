"use client";
import { useState } from "react";

export default function LoanEligibility() {
  const [income, setIncome] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [existingLoan, setExistingLoan] = useState("");
  const [eligibility, setEligibility] = useState<string | null>(null);

  const checkEligibility = () => {
    const minIncome = 20000; // ₹20,000 minimum monthly income
    const minCreditScore = 650; // Minimum credit score for eligibility
    const maxExistingLoan = 500000; // Maximum existing loan allowed

    if (parseInt(income) >= minIncome && parseInt(creditScore) >= minCreditScore && parseInt(existingLoan) <= maxExistingLoan) {
      setEligibility("✅ Congratulations! You are eligible for a loan.");
    } else {
      setEligibility("❌ Sorry! You are not eligible for a loan.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">✅ Loan Eligibility Calculator</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Enter Monthly Income (₹)"
          className="w-full p-2 border rounded"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Credit Score"
          className="w-full p-2 border rounded"
          value={creditScore}
          onChange={(e) => setCreditScore(e.target.value)}
        />
        <input
          type="number"
          placeholder="Existing Loan Amount (₹)"
          className="w-full p-2 border rounded"
          value={existingLoan}
          onChange={(e) => setExistingLoan(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" onClick={checkEligibility}>
          Check Eligibility
        </button>
        {eligibility && <p className="text-lg font-semibold">{eligibility}</p>}
      </div>
    </div>
  );
}

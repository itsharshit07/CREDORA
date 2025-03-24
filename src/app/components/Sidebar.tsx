"use client"; // Ensure this is a Client Component

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname(); // Get current route

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white shadow-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6 text-center">💹Loan Advisor</h2>

      <ul className="space-y-4">
        <li
          className={`p-3 rounded-md transition duration-300 ${
            pathname === "/dashboard" ? "bg-blue-700 shadow-lg" : "hover:bg-blue-800"
          }`}
        >
          <Link href="/dashboard" className="block text-white font-semibold">
            Dashboard
          </Link>
        </li>
        <li
          className={`p-3 rounded-md transition duration-300 ${
            pathname === "/emi-calculator" ? "bg-blue-700 shadow-lg" : "hover:bg-blue-800"
          }`}
        >
          <Link href="/emi-calculator" className="block text-white font-semibold">
            EMI Calculator
          </Link>
        </li>
        <li
          className={`p-3 rounded-md transition duration-300 ${
            pathname === "/loan-eligibility" ? "bg-blue-700 shadow-lg" : "hover:bg-blue-800"
          }`}
        >
          <Link href="/loan-eligibility" className="block text-white font-semibold">
            Loan Eligibility
          </Link>
        </li>
        <li
          className={`p-3 rounded-md transition duration-300 ${
            pathname === "/loan-history" ? "bg-blue-700 shadow-lg" : "hover:bg-blue-800"
          }`}
        >
          <Link href="/loan-history" className="block text-white font-semibold">
            Contact Us
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

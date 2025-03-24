import Sidebar from "../components/Sidebar";
import ChatWidget from "../components/ChatWidget";
import Header from "../components/header"; // Import Header for login/logout button

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Include the Header at the top */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Dashboard Header */}
          <div className="bg-blue-700 text-white p-4 rounded-md shadow-md">
            <h1 className="text-3xl font-semibold">USER DASHBOARD</h1>
          </div>

          {/* Loan Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-700">Total Loan Amount</h2>
              <p className="text-2xl font-bold text-blue-700 mt-2">₹ 5,00,000</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-700">Interest Rate</h2>
              <p className="text-2xl font-bold text-green-600 mt-2">7.5% p.a.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-700">EMI</h2>
              <p className="text-2xl font-bold text-red-600 mt-2">₹ 10,567/month</p>
            </div>
          </div>

          {/* Loan History Table */}
          <div className="mt-8 bg-white p-6 shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Loan History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-blue-700 text-white">
                    <th className="py-3 px-4 border">Loan ID</th>
                    <th className="py-3 px-4 border">Amount (₹)</th>
                    <th className="py-3 px-4 border">Interest Rate</th>
                    <th className="py-3 px-4 border">Tenure</th>
                    <th className="py-3 px-4 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-gray-700 text-center">
                    <td className="py-3 px-4 border">#L1001</td>
                    <td className="py-3 px-4 border">₹ 2,50,000</td>
                    <td className="py-3 px-4 border">7.5%</td>
                    <td className="py-3 px-4 border">5 Years</td>
                    <td className="py-3 px-4 border text-green-600 font-semibold">Approved</td>
                  </tr>
                  <tr className="text-gray-700 text-center bg-gray-100">
                    <td className="py-3 px-4 border">#L1002</td>
                    <td className="py-3 px-4 border">₹ 1,50,000</td>
                    <td className="py-3 px-4 border">6.8%</td>
                    <td className="py-3 px-4 border">3 Years</td>
                    <td className="py-3 px-4 border text-yellow-500 font-semibold">Pending</td>
                  </tr>
                  <tr className="text-gray-700 text-center">
                    <td className="py-3 px-4 border">#L1003</td>
                    <td className="py-3 px-4 border">₹ 1,00,000</td>
                    <td className="py-3 px-4 border">8.2%</td>
                    <td className="py-3 px-4 border">2 Years</td>
                    <td className="py-3 px-4 border text-red-500 font-semibold">Rejected</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chatbot Widget */}
      <ChatWidget />
    </div>
  );
}
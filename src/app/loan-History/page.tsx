import Sidebar from "../components/Sidebar";
import LoanHistory from "../components/loanHistory";

export default function LoanHistoryPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <LoanHistory />
      </div>
    </div>
  );
}
import Sidebar from "../components/Sidebar";
import LoanEligibility from "../components/loanEligibility";

export default function LoanEligibilityPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <LoanEligibility />
      </div>
    </div>
  );
}
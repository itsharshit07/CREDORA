import Sidebar from "../components/Sidebar";
import EMICalculator from "../components/EMICalculator";

export default function EMICalculatorPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <EMICalculator />
      </div>
    </div>
  );
}
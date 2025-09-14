
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';

interface StatusCardProps {
  title: string;
  status: string;
  icon: React.ReactNode;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, status, icon }) => (
    <div className="bg-black text-white p-6 rounded-lg shadow-md w-full border border-[#1A1A1A] hover:border-[#333] transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium mb-1">{title}</h3>
          <p className="text-[#CCCCCC] font-mono text-sm">{status}</p>
        </div>
        <div className="bg-[#111] p-2 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );

const OverviewCards = () => {
  // In a real app, this data would come from an API
  const statusData = [
    { 
      title: "Tax Filing", 
      status: "Year 2023 – Submitted ✅", 
      icon: <div className="text-white">🧾</div> 
    },
    { 
      title: "Monthly Accounts", 
      status: "March – In Progress", 
      icon: <div className="text-white">📊</div> 
    },
    { 
      title: "Payroll", 
      status: "Payslips uploaded – Ready to download", 
      icon: <div className="text-white">📁</div> 
    }
  ];

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">Overview</h2>
        <Link to="/dashboard/status" className="flex items-center text-sm font-mono text-[#CCCCCC] hover:text-white transition-colors">
          View All <ArrowDown className="h-4 w-4 ml-1 transform rotate-[-90deg]" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statusData.map((item, index) => (
          <StatusCard 
            key={index} 
            title={item.title} 
            status={item.status} 
            icon={item.icon} 
          />
        ))}
      </div>
    </section>
  );
};

export default OverviewCards;

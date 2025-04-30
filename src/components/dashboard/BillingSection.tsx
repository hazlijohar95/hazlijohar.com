
import React from 'react';
import { Eye, CreditCard, Calendar } from 'lucide-react';
import { styles } from '@/styles/common-styles';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Unpaid';
}

const BillingSection: React.FC = () => {
  // In a real app, this data would come from an API
  const invoices: Invoice[] = [
    { id: 'INV-2023-001', date: '2023-03-15', amount: 1250.00, status: 'Paid' },
    { id: 'INV-2023-002', date: '2023-04-15', amount: 1250.00, status: 'Paid' },
    { id: 'INV-2023-003', date: '2023-05-15', amount: 1500.00, status: 'Unpaid' },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'MYR'
    }).format(amount);
  };

  return (
    <section>
      <h2 className="text-2xl font-medium mb-6">Billing & Payments</h2>
      
      <div className="bg-[#111111] rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-[#1A1A1A]">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left text-xs font-mono text-[#CCCCCC] uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-6 py-4 text-left text-xs font-mono text-[#CCCCCC] uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-mono text-[#CCCCCC] uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-mono text-[#CCCCCC] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-mono text-[#CCCCCC] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]">
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-[#CCCCCC] mr-2" />
                    <div className="text-sm font-medium">{invoice.id}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-[#CCCCCC] mr-2" />
                    <div className="text-sm text-[#CCCCCC]">{formatDate(invoice.date)}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-mono">{formatAmount(invoice.amount)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-mono rounded-full ${
                    invoice.status === 'Paid' 
                      ? 'bg-green-900 text-green-100' 
                      : 'bg-yellow-900 text-yellow-100'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-mono">
                  <button className="text-white hover:text-[#CCCCCC] mr-3 flex items-center">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </button>
                  {invoice.status === 'Unpaid' && (
                    <button className="text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded inline-flex items-center">
                      Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BillingSection;

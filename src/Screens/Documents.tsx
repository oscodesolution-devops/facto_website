import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '@/Components/Navbar';

const UploadPage: React.FC = () => {
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  const navigate = useNavigate();

  const handleFileChange = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleFinish = () => {
    navigate('/');
  };

  const fields = [
    { label: 'Form 16', key: 'form16' },
    { label: 'Salary Slip', key: 'salarySlip' },
    { label: 'Investment Proof', key: 'investmentProof' },
    { label: 'Other Income Proof', key: 'otherIncomeProof' },
    { label: 'Other', key: 'other' },
    { label: 'Sales Invoice', key: 'salesInvoice' },
    { label: 'Purchase Invoices', key: 'purchaseInvoices' },
    { label: 'Bank Statement', key: 'bankStatement' },
    { label: 'Statement Excel', key: 'statementExcel' },
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-green-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-[20px] max-w-4xl w-full">
          <h1 className="text-2xl font-[poppins] font-[600] mb-6 text-start">GSTR-1 & 3B</h1>
          <p className="text-start font-[poppins] font-[500] mb-10">Upload your required Documents</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-[20px]">
            {fields.map((field) => (
              <div key={field.key} className="flex items-start space-x-3">
                {/* Bullet Point */}
                <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0"></div>
                {/* Label and Input */}
                <div className="flex flex-col">
                  <label className="font-medium font-[poppins] mb-2">{field.label}</label>
                  <input
                    type="file"
                    className="block w-full px-4 py-2 text-sm font-[poppins] font-[300] border rounded-lg shadow-sm bg-gray-50"
                    onChange={(e) => handleFileChange(field.key, e)}
                  />
                  {files[field.key] && (
                    <p className="text-sm mt-2 text-green-500">
                      File uploaded: {files[field.key]?.name}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-5 mt-[60px]">
            <button className="px-6 py-2 bg-primary font-[poppins] w-[312px] font-[300] text-white rounded-lg hover:shadow-xl">
              Contact Us
            </button>
            <button
              className="px-6 py-2 bg-secondary font-[poppins] font-[300] w-[312px] text-white rounded-lg hover:shadow-xl"
              onClick={handleFinish}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;

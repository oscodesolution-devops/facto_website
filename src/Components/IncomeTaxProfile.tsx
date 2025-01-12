import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { toast } from "sonner";

interface IncomeTaxProfileStepProps {
  onSubmit: (info: any) => void;
  onSkip: () => void;
  existingProfile?: any;
}

export default function IncomeTaxProfileStep({
  onSubmit,
  onSkip,
  existingProfile,
}: IncomeTaxProfileStepProps) {
  const [info, setInfo] = useState({
    loginPassword: existingProfile?.loginPassword || "",
    itrType: existingProfile?.itrType || "",
    bankDetails: {
      accountNumber: existingProfile?.bankDetails?.accountNumber || "",
      ifscCode: existingProfile?.bankDetails?.ifscCode || "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("bank.")) {
      const bankField = name.split(".")[1];
      setInfo((prev) => ({
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          [bankField]: value,
        },
      }));
    } else {
      setInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    
    if (!info.bankDetails.accountNumber) {
      toast.error("Please enter your bank account number");
      return false;
    }
    if (!info.bankDetails.ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(info.bankDetails.ifscCode)) {
      toast.error("Please enter a valid IFSC code");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(info);
    }
  };

  return (
    <Card className="w-full max-w-xl h-full overflow-auto bg-white/90 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-t-lg p-8">
        <CardTitle className="text-3xl font-bold text-center">
          {existingProfile ? "Edit Income Tax Profile" : "Create Income Tax Profile"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-8">
          <div className="space-y-3">
            <Label
              htmlFor="loginPassword"
              className="text-gray-700 text-lg font-semibold block"
            >
              Login Password
            </Label>
            <Input
              id="loginPassword"
              name="loginPassword"
              type="password"
              value={info.loginPassword}
              onChange={handleChange}
              placeholder="Enter your login password"
              className="w-full px-4 py-3 text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              required
            />
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="itrType"
              className="text-gray-700 text-lg font-semibold block"
            >
              ITR Type
            </Label>
            <select
              id="itrType"
              name="itrType"
              value={info.itrType}
              onChange={handleChange}
              className="w-full px-4 py-3 text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              required
            >
              <option value="" disabled>Select ITR type</option>
              <option value="ITR-1">ITR-1</option>
              <option value="ITR-2">ITR-2</option>
              <option value="ITR-3">ITR-3</option>
              <option value="ITR-4">ITR-4</option>
              <option value="ITR-5">ITR-5</option>
              <option value="ITR-6">ITR-6</option>
            </select>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700">Refund Bank Details</h3>
            
            <div className="space-y-3">
              <Label
                htmlFor="accountNumber"
                className="text-gray-700 text-lg font-semibold block"
              >
                Account Number
              </Label>
              <Input
                id="accountNumber"
                name="bank.accountNumber"
                value={info.bankDetails.accountNumber}
                onChange={handleChange}
                placeholder="Enter your bank account number"
                className="w-full px-4 py-3 text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
                required
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="ifscCode"
                className="text-gray-700 text-lg font-semibold block"
              >
                IFSC Code
              </Label>
              <Input
                id="ifscCode"
                name="bank.ifscCode"
                value={info.bankDetails.ifscCode}
                onChange={handleChange}
                placeholder="Enter bank IFSC code"
                className="w-full px-4 py-3 text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 text-lg font-semibold rounded-md hover:opacity-90 transition-opacity"
            >
              {existingProfile ? "Update Profile" : "Next"}
            </Button>
            <Button
              type="button"
              onClick={onSkip}
              variant="outline"
              className="flex-1 border-2 border-teal-500 text-teal-700 py-3 text-lg font-semibold rounded-md hover:bg-teal-50 transition-colors"
            >
              Skip for now
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
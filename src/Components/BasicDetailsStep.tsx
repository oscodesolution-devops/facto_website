import { useState } from "react";

interface BasicDetailsStepProps {
  onSubmit: (details: {
    email: string;
    panNumber: string;
    aadharNumber: string;
    dob: string;
    state: string;
    address: string;
  }) => void;
  onSkip: () => void;
}
import { Card, CardHeader, CardContent, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { toast } from "sonner";

export default function BasicDetailsStep({
  onSubmit,
  onSkip,
}: BasicDetailsStepProps) {
  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    fathersName:"",
    alternativePhone:'',
    panNumber: "",
    aadharNumber: "",
    dob: "",
    state: "",
    address: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email, panNumber, aadharNumber, dob, state, address, fullName } =
      details;
    if (!fullName) {
      toast.error("Please Enter Your Full Name");
      return false;
    }
    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      toast.error("Please enter a valid email.");
      return false;
    }
    if (!panNumber || panNumber.length !== 10) {
      toast.error("PAN number must be 10 characters.");
      return false;
    }
    if (!aadharNumber || aadharNumber.length !== 12) {
      toast.error("Aadhar number must be 12 digits.");
      return false;
    }
    if (!dob) {
      toast.error("Please select your date of birth.");
      return false;
    }
    if (!state) {
      toast.error("Please select your state.");
      return false;
    }
    if (!address || address.length < 5) {
      toast.error("Address must be at least 5 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(details);
    }
  };

  return (
    <Card className="w-full max-w-xl bg-white/90 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-t-lg p-4">
        <CardTitle className="text-xl font-bold text-center">
          Basic Details
        </CardTitle>
      </CardHeader>
      <CardContent className="md:p-4 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div className="md:space-y-1">
            <Label
              htmlFor="fullName"
              className="test-gray-700 md:text-lg font-semibold"
            >
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={details.fullName}
              onChange={handleChange}
              placeholder="Enter Your Full Name"
              className="w-full px-4 py-3 md:text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              required
            />
          </div>
          <div className="md:space-y-1">
            <Label
              htmlFor="email"
              className="text-gray-700 md:text-lg font-semibold"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={details.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 md:text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              required
            />
          </div>
          <div className="md:space-y-1">
            <Label
              htmlFor="fullName"
              className="test-gray-700 md:text-lg font-semibold"
            >
              Father's Name
            </Label>
            <Input
              id="fathersName"
              name="fathersName"
              type="text"
              value={details.fathersName}
              onChange={handleChange}
              placeholder="Enter Your Father's Name"
              className="w-full px-4 py-3 md:text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              required
            />
          </div>
          <div className="md:space-y-1">
            <Label
              htmlFor="alternativePhone"
              className="test-gray-700 md:text-lg font-semibold"
            >
              Alternative Phone Number
            </Label>
            <Input
              id="alternativePhone"
              name="alternativePhone"
              type="text"
              value={details.alternativePhone}
              onChange={(e:any)=>{if(isNaN(Number(e.target.value))){
                toast.error("Fill appropriate number")
              }else if(e.target.value.length>10){
                toast.error("Number cant exceed 10 digits")
                
              }else{
                handleChange(e)}}}
              placeholder="Enter Your Alternative Phone Number"
              className="w-full px-4 py-3 md:text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              required
            />
          </div>

          <div className="md:space-y-1">
            <Label
              htmlFor="panNumber"
              className="text-gray-700 md:text-lg font-semibold"
            >
              PAN Number
            </Label>
            <Input
              id="panNumber"
              name="panNumber"
              value={details.panNumber}
              onChange={handleChange}
              placeholder="Enter your PAN number"
              className="w-full px-4 py-3 md:text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              required
            />
          </div>

          <div className="md:space-y-1">
            <Label
              htmlFor="aadharNumber"
              className="text-gray-700 md:text-lg font-semibold"
            >
              Aadhar Number
            </Label>
            <Input
              id="aadharNumber"
              name="aadharNumber"
              value={details.aadharNumber}
              onChange={handleChange}
              placeholder="Enter your Aadhar number"
              className="w-full px-4 py-3 md:text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              required
            />
          </div>

          <div className="md:space-y-1">
            <Label
              htmlFor="dob"
              className="text-gray-700 md:text-lg font-semibold"
            >
              Date of Birth
            </Label>
            <Input
              id="dob"
              name="dob"
              type="date"
              value={details.dob}
              onChange={handleChange}
              className="w-full px-4 py-3 md:text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              required
            />
          </div>

          <div className="md:space-y-1">
            <Label
              htmlFor="state"
              className="text-gray-700 md:text-lg font-semibold"
            >
              State
            </Label>
            <select
              name="state"
              value={details.state}
              onChange={(e) =>
                handleChange({
                  target: { name: "state", value: e.target.value },
                })
              }
              className="w-full px-4 py-3 md:text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80 z-[140]"
            >
              <option value="" disabled>
                Select your state
              </option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">
                Dadra and Nagar Haveli and Daman and Diu
              </option>
              <option value="Delhi">Delhi</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
            </select>
          </div>

          <div className="md:space-y-1">
            <Label
              htmlFor="address"
              className="text-gray-700 md:text-lg font-semibold"
            >
              Address
            </Label>
            <Input
              id="address"
              name="address"
              value={details.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full px-4 py-3 md:text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              required
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 md:text-lg font-semibold rounded-md hover:opacity-90 transition-opacity"
            >
              Next
            </Button>
            <Button
              type="button"
              onClick={onSkip}
              variant="outline"
              className="flex-1 border-2 border-teal-500 text-teal-700 py-3 md:text-lg font-semibold rounded-md hover:bg-teal-50 transition-colors"
            >
              Skip for now
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

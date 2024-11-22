import { useState } from "react";
import { CalendarIcon, Check } from 'lucide-react';

import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Calendar } from "@/Components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const dummyData = {
  name: "Somesh Patel",
  email: "Somesh2732@gmail.com",
  phone: "9123456789",  
  aadhar: "123456789012",
  pan: "ABCDE1234F",
  dob: new Date("1990-01-01"), 
  gender: "male",
  address: {
    houseNumber: "123",
    street: "Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
  },
  gst: "22AAAAA0000A1Z5",
  avatar: "/assets/user.png",
};

const states = [
  "Andhra Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu",
];

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState(dummyData);

  const [errors, setErrors] = useState({
    phone: "",
    aadhar: "",
    pan: "",
    gst: "",
  });

  const validateField = (name: string, value: string) => {
    let error = "";
    if (value.length > 0) {
      switch (name) {
        case "phone":
          error = value.length !== 10 ? "Phone number must be exactly 10 digits" : "";
          break;
        case "aadhar":
          error = value.length !== 12 ? "Aadhar number must be exactly 12 digits" : "";
          break;
        case "pan":
          error = value.length !== 10 ? "PAN number must be exactly 10 characters" : "";
          break;
        case "gst":
          error = value.length !== 15 ? "GST number must be exactly 15 characters" : "";
          break;
      }
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
      if (["phone", "aadhar", "pan", "gst"].includes(name)) {
        validateField(name, value);
      }
    }
  };

  const handleSubmit = () => {
    const isValid = ["phone", "aadhar", "pan", "gst"].every(field => 
      validateField(field, formData[field as keyof typeof formData] as string)
    );
    if (isValid) {
      console.log("Saving data:", formData);
      setIsEditing(false);
    } else {
      console.log("Form has errors, please correct them before submitting");
    }
  };

  return (
    <Card className="w-[1282px] h-auto mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div className="flex items-center space-x-4">
          <img
            alt="Profile picture"
            className="rounded-full"
            height="100"
            src={formData.avatar}
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
            width="100"
          />
          <div>
            <h2 className="text-2xl font-bold">{formData.name}</h2>
            <p className="text-muted-foreground">{formData.email}</p>
          </div>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <Button onClick={handleSubmit}>
            <Check className="mr-2 h-4 w-4" />
            Done
          </Button>
        )}
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Your Full Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="91 xxxxx xxxxx"
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="pan">Pan Number</Label>
              <Input
                id="pan"
                name="pan"
                value={formData.pan}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="PAN XXX XXXX"
              />
              {errors.pan && <p className="text-sm text-red-500">{errors.pan}</p>}
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                disabled={!isEditing}
                value={formData.gender}
                onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gst">GST Number (If Any)</Label>
              <Input
                id="gst"
                name="gst"
                value={formData.gst}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="22AAAAA0000A1Z5"
              />
              {errors.gst && <p className="text-sm text-red-500">{errors.gst}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="example@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aadhar">Aadhar Number</Label>
              <Input
                id="aadhar"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="XXXX XXXX XXXX"
              />
              {errors.aadhar && <p className="text-sm text-red-500">{errors.aadhar}</p>}
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dob && "text-muted-foreground"
                    )}
                    disabled={!isEditing}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dob ? format(formData.dob, "dd MMMM yyyy") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dob}
                    onSelect={(date) => {
                      if (date) {
                        setFormData(prev => ({ ...prev, dob: date }));
                      }
                    }}
                    disabled={!isEditing}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Address Fields in a horizontal row */}
            <div className="space-y-2">
              <Label htmlFor="address.houseNumber">House Number</Label>
              <Input
                id="address.houseNumber"
                name="address.houseNumber"
                value={formData.address.houseNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="House Number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address.street">Street</Label>
              <Input
                id="address.street"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Street Name"
              />
            </div>
            
            {/* Pincode, State, City in a single row */}
            <div className="flex space-x-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="address.city">City</Label>
                <Input
                  id="address.city"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="address.state">State</Label>
                <Select
                  disabled={!isEditing}
                  value={formData.address.state}
                  onValueChange={(value) =>
                    setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, state: value }
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="address.pincode">Pincode</Label>
                <Input
                  id="address.pincode"
                  name="address.pincode"
                  value={formData.address.pincode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Pincode"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

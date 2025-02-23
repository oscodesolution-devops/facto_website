import React, { useEffect, useState } from "react";
import { CalendarIcon, Check } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Calendar } from "@/Components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useGlobalContext } from "@/context/GlobalContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
// import { UserProfile, FormErrors } from "./types/user";
import { Documents, User } from "@/api";
import axios from "axios";
import DocumentCard from "@/Components/ui/documentCard";
import { toast } from "sonner";
import { BASE_URL } from "@/utils/apiConstants";
export interface BankDetails {
  accountNumber: string;
  ifscCode: string;
}

type FormErrors = {
  [key: string]: string; // Allow any string key with a string value
};

export interface GSTProfile {
  gstNumber: string;
  gstPortalLoginId: string;
  gstPassword: string;
  tradeName: string;
  additionalTradeName: string;
  returnType: string;
  gstrType: string;
}

export interface ITRProfile {
  bankDetails: BankDetails;
  itrType: string;
  password: string;
}

export interface UserProfile {
  fullName: string;
  phoneNumber: string;
  aadharNumber: string;
  panNumber: string;
  email: string;
  alternativePhone: string;
  state: string;
  profilePictureUrl: string;
  dateOfBirth: string;
  address: string;
  fathersName: string;
  gstProfile: GSTProfile;
  incomeTaxProfile: ITRProfile;
}

// export interface FormErrors {
//   fullName?: string;
//   phoneNumber?: string;
//   aadharNumber?: string;
//   panNumber?: string;
//   gstNumber?: string;
// }

// const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlr06pwd7/image/upload";
// const CLOUDINARY_UPLOAD_PRESET = "your-upload-preset";
// const states = ["Andhra Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu"];

export default function ProfileCard() {
  const { logout } = useGlobalContext();
  const [documents, setDocuments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>({
    fullName: "",
    phoneNumber: "",
    aadharNumber: "",
    panNumber: "",
    email: "",
    alternativePhone: "",
    state: "",
    profilePictureUrl: "",
    dateOfBirth: "",
    address: "",
    fathersName: "",
    gstProfile: {
      gstNumber: "",
      gstPortalLoginId: "",
      gstPassword: "",
      tradeName: "",
      additionalTradeName: "",
      returnType: "",
      gstrType: "",
    },
    incomeTaxProfile: {
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
      },
      itrType: "",
      password: "",
    },
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev: UserProfile) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGSTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: UserProfile) => ({
      ...prev,
      gstProfile: {
        ...prev.gstProfile,
        [name]: value,
      },
    }));
  };

  const handleITRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: UserProfile) => ({
      ...prev,
      itrProfile: {
        ...prev.incomeTaxProfile,
        [name]: value,
      },
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!/^\d{10}$/.test(formData?.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }
    if (!/^\d{12}$/.test(formData?.aadharNumber)) {
      newErrors.aadharNumber = "Aadhar number must be 12 digits";
    }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData?.panNumber)) {
      newErrors.panNumber = "Invalid PAN number format";
    }
    if (!/^\d{15}$/.test(formData?.gstProfile?.gstNumber)) {
      newErrors.gstNumber = "GST number must be 15 digits";
    }
    setErrors(newErrors);
    const errorKeys = Object.keys(newErrors);
    if (errorKeys.length > 0) {
      toast.error(newErrors[errorKeys[0]]); // Get the first error message
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    console.log("hello");
    if (!validateForm()) return;
    try {
      await User.addDetails(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await User.getDetails();
      const user = response.data?.user;
      console.log(user);
      if (user) {
        setFormData(user);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]; // Get the first file
    if (!file) return;

    console.log("hello");
    // setLoading(true);

    const formData = new FormData();
    formData?.append("icon", file);
    // formData?.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      // Upload image to Cloudinary
      const response = await axios.post(`${BASE_URL}/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // console.log(response);

      // Update the profile picture URL in the state
      const newProfilePictureUrl = response.data.imageUrl; // Cloudinary returns the URL
      setFormData((prev: any) => ({
        ...prev,
        profilePictureUrl: newProfilePictureUrl,
      }));
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };
  const fetchDocuments = async () => {
    try {
      const response = await Documents.getAllDocuments();
      console.log(response);
      setDocuments(response.data.userDocuments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProfile();

    fetchDocuments();
  }, []);

  return (
    <Card className="w-full max-w-[1282px] mx-auto">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between pb-7">
        <div className="flex items-center space-x-4">
          <img
            alt="Profile picture"
            className="rounded-full"
            height="100"
            src={formData?.profilePictureUrl || "/assets/user.png"}
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
            width="100"
          />
          {isEditing && (
            <div className="mt-2">
              <label
                htmlFor="profilePicture"
                className="cursor-pointer text-blue-600 underline"
              >
                Change Picture
              </label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold">{formData?.fullName}</h2>
          </div>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <Button onClick={handleSubmit}>
            <Check className="mr-2 h-4 w-4" /> Done
          </Button>
        )}
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="overflow-x-auto w-full">
            <TabsTrigger value="basic">Basic Details</TabsTrigger>
            <TabsTrigger value="gst">GST Profile</TabsTrigger>
            <TabsTrigger value="itr">ITR Profile</TabsTrigger>
            <TabsTrigger value="documents">Uploaded Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                name="fullName"
                value={formData?.fullName}
                onChange={handleInputChange}
                disabled={!isEditing}
                error={errors.fullName}
              />
              <InputField
                label="Phone Number"
                name="phoneNumber"
                value={formData?.phoneNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
                error={errors.phoneNumber}
              />
              <InputField
                label="Email"
                name="email"
                value={formData?.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <InputField
                label="Father's Name"
                name="fathersName"
                value={formData?.fathersName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <InputField
                label="Aadhar Number"
                name="aadharNumber"
                value={formData?.aadharNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
                error={errors.aadharNumber}
              />
              <InputField
                label="PAN Number"
                name="panNumber"
                value={formData?.panNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
                error={errors.panNumber}
              />
              {isEditing ? (
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={new Date(formData?.dateOfBirth).getTime()}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 md:text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
                    required
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData?.dateOfBirth && "text-muted-foreground"
                        )}
                        disabled={!isEditing}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData?.dateOfBirth
                          ? format(new Date(formData?.dateOfBirth), "PPP")
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start">
                      <Calendar
                        selected={
                          formData?.dateOfBirth
                            ? new Date(formData?.dateOfBirth)
                            : undefined
                        }
                        onSelect={(date: any) =>
                          setFormData((prev) => ({
                            ...prev,
                            dateOfBirth: date ? date.toISOString() : "",
                          }))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              <InputField
                label="Address"
                name="address"
                value={formData?.address}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <div className="md:space-y-1">
                <Label
                  htmlFor="state"
                  className="text-gray-700 md:text-lg font-semibold"
                >
                  State
                </Label>
                <select
                  name="state"
                  value={formData?.state}
                  disabled={!isEditing}
                  onChange={(e) =>
                    handleInputChange({
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
            </div>
          </TabsContent>

          <TabsContent value="gst">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                label="GST Number"
                name="gstNumber"
                value={formData?.gstProfile?.gstNumber}
                onChange={handleGSTChange}
                disabled={!isEditing}
                error={errors.gstNumber}
              />
              <InputField
                label="GST Portal Login ID"
                name="gstPortalLoginId"
                value={formData?.gstProfile?.gstPortalLoginId}
                onChange={handleGSTChange}
                disabled={!isEditing}
              />
              <InputField
                label="GST Password"
                name="gstPassword"
                value={formData?.gstProfile?.gstPassword}
                onChange={handleGSTChange}
                disabled={!isEditing}
                type="password"
              />
              <InputField
                label="Trade Name"
                name="tradeName"
                value={formData?.gstProfile?.tradeName}
                onChange={handleGSTChange}
                disabled={!isEditing}
              />
              <InputField
                label="Additional Trade Name"
                name="additionalTradeName"
                value={formData?.gstProfile?.additionalTradeName}
                onChange={handleGSTChange}
                disabled={!isEditing}
              />
              <InputField
                label="Return Type"
                name="returnType"
                value={formData?.gstProfile?.returnType}
                onChange={handleGSTChange}
                disabled={!isEditing}
              />
              <InputField
                label="GSTR Type"
                name="gstrType"
                value={formData?.gstProfile?.gstrType}
                onChange={handleGSTChange}
                disabled={!isEditing}
              />
            </div>
          </TabsContent>

          <TabsContent value="itr">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                label="Bank Account Number"
                name="accountNumber"
                value={formData?.incomeTaxProfile?.bankDetails?.accountNumber}
                onChange={(e) =>
                  handleITRChange({
                    target: {
                      name: "bankDetails.accountNumber",
                      value: e.target.value,
                    },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                disabled={!isEditing}
              />
              <InputField
                label="IFSC Code"
                name="ifscCode"
                value={formData?.incomeTaxProfile?.bankDetails?.ifscCode}
                onChange={(e) =>
                  handleITRChange({
                    target: {
                      name: "bankDetails.ifscCode",
                      value: e.target.value,
                    },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                disabled={!isEditing}
              />
              <InputField
                label="ITR Type"
                name="itrType"
                value={formData?.incomeTaxProfile?.itrType}
                onChange={handleITRChange}
                disabled={!isEditing}
              />
            </div>
          </TabsContent>

          <TabsContent value="documents">
            {documents.length ? (
              documents.map((document) => {
                return <DocumentCard document={document} />;
              })
            ) : (
              <p>No documents uploaded yet.</p>
            )}
          </TabsContent>
        </Tabs>

        <Button variant="destructive" className="mt-4 w-full" onClick={logout}>
          Log Out
        </Button>
      </CardContent>
    </Card>
  );
}

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  error?: string;
  type?: string;
}

function InputField({
  label,
  name,
  value,
  onChange,
  disabled,
  error,
  type = "text",
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

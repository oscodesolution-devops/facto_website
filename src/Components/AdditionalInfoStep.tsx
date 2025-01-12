import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";

interface GSTProfileStepProps {
  onSubmit: (info: any) => void;
  onSkip: () => void;
  existingProfile?: any;
}

export default function GSTProfileStep({
  onSubmit,
  onSkip,
  existingProfile,
}: GSTProfileStepProps) {
  const [info, setInfo] = useState({
    gstPortalLoginId: existingProfile?.gstPortalLoginId || "",
    gstPassword: existingProfile?.gstPassword || "",
    gstNumber: existingProfile?.gstNumber || "",
    tradeName: existingProfile?.tradeName || "",
    additionalTradeName: existingProfile?.additionalTradeName || "",
    gstrType: existingProfile?.gstrType || "",
    returnType: existingProfile?.returnType || "",
  });

  useEffect(() => {
    if (existingProfile) {
      setInfo({
        gstPortalLoginId: existingProfile.gstPortalLoginId,
        gstPassword: existingProfile.gstPassword,
        gstNumber: existingProfile.gstNumber,
        tradeName: existingProfile.tradeName,
        additionalTradeName: existingProfile.additionalTradeName,
        gstrType: existingProfile.gstrType,
        returnType: existingProfile.returnType,
      });
    }
  }, [existingProfile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(info);
  };

  return (
    <Card className="w-full max-w-xl h-full overflow-auto bg-white/90 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-t-lg p-8">
        <CardTitle className="text-3xl font-bold text-center">
          {existingProfile ? "Edit GST Profile" : "Create GST Profile"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-8">
          <div className="space-y-3">
            <Label
              htmlFor="gstPortalLoginId"
              className="text-gray-700 text-lg font-semibold block"
            >
              GST Portal Login ID
            </Label>
            <Input
              id="gstPortalLoginId"
              name="gstPortalLoginId"
              value={info.gstPortalLoginId}
              onChange={handleChange}
              placeholder="Enter your GST portal login ID"
              className="w-full px-4 py-3 text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              required
            />
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="gstPassword"
              className="text-gray-700 text-lg font-semibold block"
            >
              GST Password
            </Label>
            <Input
              id="gstPassword"
              name="gstPassword"
              value={info.gstPassword}
              onChange={handleChange}
              placeholder="Enter your GST password"
              type="password"
              className="w-full px-4 py-3 text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              required
            />
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="gstNumber"
              className="text-gray-700 text-lg font-semibold block"
            >
              GST Number
            </Label>
            <Input
              id="gstNumber"
              name="gstNumber"
              value={info.gstNumber}
              onChange={handleChange}
              placeholder="Enter your GST number"
              className="w-full px-4 py-3 text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              required
            />
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="tradeName"
              className="text-gray-700 text-lg font-semibold block"
            >
              Trade Name
            </Label>
            <Input
              id="tradeName"
              name="tradeName"
              value={info.tradeName}
              onChange={handleChange}
              placeholder="Enter trade name"
              className="w-full px-4 py-3 text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              required
            />
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="additionalTradeName"
              className="text-gray-700 text-lg font-semibold block"
            >
              Additional Trade Name (if any)
            </Label>
            <Input
              id="additionalTradeName"
              name="additionalTradeName"
              value={info.additionalTradeName}
              onChange={handleChange}
              placeholder="Enter additional trade name"
              className="w-full px-4 py-3 text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
            />
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="gstrType"
              className="text-gray-700 text-lg font-semibold block"
            >
              GSTR Type
            </Label>
            <select
              id="gstrType"
              name="gstrType"
              value={info.gstrType}
              onChange={handleChange}
              className="w-full px-4 py-3 text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              required
            >
              <option value="" disabled>Select GSTR type</option>
              <option value="regular">Regular</option>
              <option value="composition">Composition</option>
              <option value="unregistered">Un-registered</option>
            </select>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="returnType"
              className="text-gray-700 text-lg font-semibold block"
            >
              Return Type
            </Label>
            <select
              id="returnType"
              name="returnType"
              value={info.returnType}
              onChange={handleChange}
              className="w-full px-4 py-3 text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              required
            >
              <option value="" disabled>Select return type</option>
              <option value="GSTR-1">GSTR-1</option>
              <option value="GSTR-IFF">GSTR-IFF</option>
              <option value="GSTR-3B">GSTR-3B</option>
              <option value="other">Other</option>
            </select>
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
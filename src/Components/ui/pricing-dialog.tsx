import * as React from "react";
import { FileText } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/context/GlobalContext";
import { Quotation } from "@/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { snakeToHumanReadable } from "@/utils/manipulators";

interface Option {
  name: string;
  priceModifier: number;
  needsQuotation: boolean;
}

interface Request {
  name: string;
  needsQuotation: boolean;
  priceModifier: number;
  inputType: "dropdown" | "checkbox";
  isMultipleSelect?: boolean;
  options?: Option[];
}

interface PricingDialogProps {
  title: string;
  basePrice: number;
  currency: string;
  requests: Request[];
  subServiceId: string;
  isOpen: boolean;
  onClose: () => void;
  pricingStructure: { price: number; period: string }[];
}

type BillingPeriod =
  | "monthly"
  | "quarterly"
  | "half_yearly"
  | "yearly"
  | "one_time";

export default function PricingDialog({
  title,
  basePrice,
  currency,
  requests,
  subServiceId,
  isOpen,
  onClose,
  pricingStructure,
}: PricingDialogProps) {
  const [selectedOptions, setSelectedOptions] = React.useState<{
    [key: string]: string | boolean;
  }>({});
  const [totalPrice, setTotalPrice] = React.useState(basePrice);
  const [hasQuotationRequest, setHasQuotationRequest] = React.useState(false);
  const [billingPeriod, setBillingPeriod] = React.useState<string>("monthly");

  console.log("billing period", billingPeriod);

  React.useEffect(() => {
    setBillingPeriod(pricingStructure[0].period);
  }, [pricingStructure]);

  const handleCheckboxChange = (
    requestName: string,
    checked: boolean,
    needsQuotation: boolean,
    priceModifier: number
  ) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [requestName]: checked,
    }));
    updateTotalPrice(requestName, checked ? priceModifier : -priceModifier);
    if (needsQuotation) {
      setHasQuotationRequest(checked);
    }
  };

  const handleDropdownChange = (
    requestName: string,
    value: string,
    options: Option[]
  ) => {
    const selectedOption = options.find((option) => option.name === value);
    console.log("first", selectedOption);
    if (selectedOption) {
      setSelectedOptions((prev) => ({
        ...prev,
        [requestName]: value,
      }));
      updateTotalPrice(requestName, selectedOption.priceModifier);
      if (selectedOption.needsQuotation) {
        setHasQuotationRequest(true);
      } else {
        setHasQuotationRequest(false);
      }
    }
  };

  const handleBillingPeriodChange = (period: BillingPeriod) => {
    console.log("billing period", period, billingPeriod);
    const priceToShow = pricingStructure.find(
      (p) => p.period === period
    )?.price;
    setTotalPrice(priceToShow ?? 0);
    setBillingPeriod(period);
  };

  const updateTotalPrice = (requestName: string, priceModifier: number) => {
    console.log("requestName", requestName, totalPrice, priceModifier);
    setTotalPrice((prev) => prev + priceModifier);
  };

  const renderInput = (request: Request) => {
    if (request.inputType === "checkbox") {
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={request.name}
            checked={!!selectedOptions[request.name]}
            onCheckedChange={(checked) =>
              handleCheckboxChange(
                request.name,
                checked === true,
                request.needsQuotation,
                request.priceModifier
              )
            }
            className="h-4 w-4 border-[#3b4ba7] text-green-500"
          />
          <Label htmlFor={request.name}>
            {request.name}
            {request.needsQuotation && (
              <span className="ml-2 text-red-500">(Quotation Needed)</span>
            )}
          </Label>
        </div>
      );
    }
    if (request.inputType === "dropdown" && request.options) {
      return (
        <div className="space-y-2">
          <Label htmlFor={request.name}>{request.name}</Label>
          <Select
            onValueChange={(value) =>
              handleDropdownChange(request.name, value, request.options || [])
            }
            value={selectedOptions[request.name] as string}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {request.options.map((option) => (
                <SelectItem key={option.name} value={option.name}>
                  {option.name}
                  {option.needsQuotation && " (Quotation Needed)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }
    return null;
  };

  const { user, isAuthenticated, setIsVisibleForm } = useGlobalContext();
  const navigate = useNavigate();

  const handleActivatePlan = () => {
    console.log(
      "go",
      title,
      subServiceId,
      totalPrice,
      selectedOptions,
      // itemType: "service",
      billingPeriod
    );
    try {
      if (!isAuthenticated) {
        console.log("first: login");
        setIsVisibleForm(true);
        return;
      }

      if (!user) {
        console.log("second user details chahiye na");
        setIsVisibleForm(true);
        return;
      }

      const isProfileComplete =
        (user as any)?.user?.aadharNumber && (user as any)?.user?.panNumber;
      console.log(
        "user",
        user,
        (user as any)?.aadharNumber,
        (user as any)?.panNumber
      );

      if (!isProfileComplete) {
        console.log("profile complete kr");
        navigate("/profile", {
          state: {
            message: "Please complete your profile to proceed",
          },
        });
      } else {
        const selectedFeatures = Object.entries(selectedOptions)
          .filter(([_, value]) => value)
          .map(([key, _]) => key);

        navigate("/payment", {
          state: {
            title,
            subServiceId,
            finalPrice: totalPrice,
            selectedFeatures,
            itemType: "service",
            billingPeriod,
          },
        });
      }
    } catch (error) {
      console.error("Error checking user status:", error);
    }
  };

  const handleGetQuotation = async () => {
    try {
      const selectedFeatures = Object.entries(selectedOptions)
        .filter(([_, value]) => value)
        .map(([key, value]) => (typeof value === "boolean" ? key : value));

      const response = await Quotation.postQuotation({
        subServiceId,
        selectedFeatures,
        billingPeriod,
      });
      if (response.success) {
        navigate("/");
      } else {
        console.log("error", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-4">
            <div className="flex gap-4 items-center">
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-[#3b4ba7]" />
                <CardTitle>{title}</CardTitle>
              </div>
              <Select
                value={billingPeriod}
                onValueChange={(value: BillingPeriod) => {
                  console.log("on valuee change");
                  handleBillingPeriodChange(value);
                }}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select billing period" />
                </SelectTrigger>
                <SelectContent>
                  {pricingStructure.map(
                    (p: { price: number; period: string }, i: number) => (
                      <SelectItem key={i} value={p.period}>
                        {snakeToHumanReadable(p.period)}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
                {/* <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="half_yearly">Half-Yearly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="one_time">One-Time</SelectItem>
                </SelectContent> */}
              </Select>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <form className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.name}
                  className="p-2 rounded hover:bg-gray-50"
                >
                  {renderInput(request)}
                </div>
              ))}
            </form>
          </CardContent>
          <CardFooter className="flex items-center justify-between pt-6">
            {!hasQuotationRequest ? (
              <Button
                className="bg-[#3b4ba7] hover:bg-[#2d3a8c]"
                onClick={handleActivatePlan}
              >
                Activate Plan
              </Button>
            ) : (
              <Button
                className="bg-[#3b4ba7] hover:bg-[#2d3a8c]"
                onClick={handleGetQuotation}
              >
                Request Quotation
              </Button>
            )}

            <div>
              {!hasQuotationRequest && (
                <>
                  <span className="ml-1 text-2xl text-[red] font-bold">
                    {currency}
                    {totalPrice}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    /
                    {billingPeriod === "one_time"
                      ? "One-Time"
                      : billingPeriod.charAt(0).toUpperCase() +
                        billingPeriod.slice(1)}
                  </span>
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Separator } from "@/Components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { cn } from "@/lib/utils";

export default function Component({ className }: { amount?: number; className?: string }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handleExpiryChange = (value: string) => {
    const formatted = value.replace(/[^\d]/g, "").replace(/^(\d{2})/, "$1/").slice(0, 5);
    setExpiry(formatted);
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 19) || "";
    setCardNumber(formatted);
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCardSubmit = () => {
    setShowOtp(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
  };

  const handleNext = () => {
    navigate("/upload-page");
  };

  return (
    <Card className={cn("w-[579px]", className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Payment</CardTitle>
        <Separator className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base font-semibold mb-2 block">Pay With:</Label>
          <RadioGroup
            value={paymentMethod}
            onValueChange={(value) => {
              setPaymentMethod(value);
              setShowOtp(false);
            }}
            className="flex flex-wrap gap-4"
          >
            {["Card", "Bank", "UPI", "Pay later"].map((method) => (
              <div key={method.toLowerCase()} className="flex items-center space-x-2">
                <RadioGroupItem value={method.toLowerCase()} id={method.toLowerCase()} />
                <Label htmlFor={method.toLowerCase()}>{method}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {showOtp ? (
          <div className="space-y-6">
            <p className="text-center font-medium">Enter your 4-digit card pin to confirm this payment</p>
            <div className="flex justify-center space-x-4">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-2xl"
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardName" className="text-sm font-medium">Name on card</Label>
                  <Input
                    id="cardName"
                    placeholder="Name on card"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber" className="text-sm font-medium">Card number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 1234 1234 1234"
                    value={cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    maxLength={19}
                    className="mt-1"
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="expiry" className="text-sm font-medium">Expiry</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                      maxLength={5}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="cvv" className="text-sm font-medium">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      maxLength={3}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "bank" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bank" className="text-sm font-medium">Choose your bank</Label>
                  <Select value={bank} onValueChange={setBank}>
                    <SelectTrigger id="bank" className="mt-1">
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="union">Union Bank of India</SelectItem>
                      <SelectItem value="sbi">State Bank of India</SelectItem>
                      <SelectItem value="icici">ICICI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="accountNumber" className="text-sm font-medium">Enter Your Bank Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter 9-18 digit account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                    maxLength={18}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "upi" && (
              <div>
                <Label htmlFor="upiId" className="text-sm font-medium">Enter UPI ID</Label>
                <Input
                  id="upiId"
                  placeholder="example@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter>
        {!showOtp ? (
          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            onClick={handleCardSubmit}
          >
            Confirm Payment
          </Button>
        ) : (
          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            onClick={handlePaymentSuccess}
          >
            Complete Payment
          </Button>
        )}
      </CardFooter>

      {paymentSuccess && (
        <Dialog open={paymentSuccess} onOpenChange={setPaymentSuccess}>
          <DialogContent className="text-center">
            <DialogHeader>
              <DialogTitle>Done</DialogTitle>
            </DialogHeader>
            <p>You have successfully completed your payment. Now upload your required documents.</p>
            <Button
              className="mt-4 bg-green-500 hover:bg-green-600 text-white"
              onClick={handleNext}
            >
              Next
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}

import { useState, useRef, KeyboardEvent } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { toast } from 'sonner';
import { useGlobalContext } from '@/context/GlobalContext';
import { AUTH } from '@/api';

export default function PhoneAuthStep({ onSubmit }:{onSubmit:(phoneNumber:string,otp:string)=>void;}) {
  const {isVisibleForm} = useGlobalContext()
  const [phoneNumber, setPhoneNumber] = useState(typeof(isVisibleForm)=="boolean"?'':isVisibleForm);
  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer,setTimer]= useState(false);

  const handleSendOTP = async () => {
    setIsLoading(true);
    try {
      const response = await AUTH.sendOtp({phoneNo:phoneNumber});
      console.log(response);
      if(response.success){
        setTimeout(()=>{
          setTimer(true);
        },300);
        setOtpSent(true);
        toast.success('OTP sent successfully');
      }
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtpArray = [...otpArray];
    newOtpArray[index] = value;
    setOtpArray(newOtpArray);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = async (otp: string) => {
    try {
      onSubmit(phoneNumber, otp);
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otp = otpArray.join('');
    if (otp.length === 6) {
      verifyOtp(otp);
    }
  };

  return (
    
      <Card className="w-full max-w-xl bg-white/90 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-t-lg p-8">
          <CardTitle className="text-3xl font-bold text-center">
            Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-gray-700 text-lg font-semibold block">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e:any)=>{if(isNaN(Number(e.target.value))){
                  toast.error("Fill appropriate number")
                }else if(e.target.value.length>10){
                  toast.error("Number cant exceed 10 digits")
                  
                }else{
                  setPhoneNumber(e.target.value)}}
                }
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 text-lg border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
                required
              />
            </div>
                {timer&&<button onClick={handleSendOTP} className='text-red-500'>Resend OTP</button>}
            {!otpSent ? (
              <Button
                type="button"
                onClick={handleSendOTP}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 text-lg font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            ) : (
              <div className="space-y-6">
                <Label className="text-gray-700 text-lg font-semibold block">
                  Enter OTP
                </Label>
                <div className="flex gap-2 md:gap-4 justify-between">
                  {otpArray.map((digit, index) => (
                    <Input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      ref={el => inputRefs.current[index] = el}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-1/6 md:size-14 text-center text-2xl font-bold border-2 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
                    />
                  ))}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 text-lg font-semibold rounded-md hover:opacity-90 transition-opacity"
                  disabled={otpArray.some(digit => !digit)}
                >
                  Verify OTP
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
  );
}
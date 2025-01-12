import { useState } from 'react'
import { toast } from 'sonner'
import PhoneAuthStep from '@/Components/PhoneAuthStep'
import BasicDetailsStep from '@/Components/BasicDetailsStep'
// import { AUTH } from '@/lib/api'
import GSTProfileStep from '@/Components/AdditionalInfoStep'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { useGlobalContext } from '@/context/GlobalContext'
import { AUTH, User } from '@/api'
import IncomeTaxProfileStep from '@/Components/IncomeTaxProfile'

export default function Login() {
  const {setIsVisibleForm,setIsAuthenticated,saveUser} = useGlobalContext()
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    fullName:"",
    fathersName:"",
    alternativePhone:"",
    phoneNumber: '',
    email: '',
    panNumber: '',
    aadharNumber: '',
    dob: '',
    state: '',
    address: '',
  })
  const navigate = useNavigate();

  const handlePhoneAuth = async (phoneNo: string, otp: string) => {
    try {
      const response = await AUTH.verifyOtp({ phoneNo, otp })
      // console.log(response)
      if (response.success) {
        // console.log(response.data);
        setIsAuthenticated(true);
        console.log(response.data);
        localStorage.setItem("token",response.data.token);
        sessionStorage.setItem("token",response.data.token);
        setUserData(prev => ({ ...prev, phoneNo }))
        toast.success('Phone number verified successfully')
        saveUser(response.data.user);
        const registeredDate = new Date(response.data.user.registrationDate).getTime();
        if(Date.now()-registeredDate<=20000){
          setStep(2)
        }else{
          completeSignUp();
        }
      }
    } catch (error) {
      toast.error('Failed to verify OTP. Please try again.')
    }
  }

  const handleBasicDetails = async(details: Partial<typeof userData>) => {
    try {
      // Update basic details by calling the API
      const response = await User.addDetails({
        fullName: details.fullName,
        email: details.email,
        fathersName: details.fathersName,
        alternativePhone: details.alternativePhone,
        panNumber: details.panNumber,
        aadharNumber: details.aadharNumber,
        dateOfBirth: details.dob,  // Ensure correct key names for the API
        state: details.state,
        address: details.address,
      });
  
      // If the response is successful, update the user data and move to the next step
      if (response.success) {
        setUserData((prev) => ({ ...prev, ...details }));
        setStep(3);  // Update step if necessary
      } else {
        // Handle failure case, if necessary
        toast.error("Failed to update details. Please try again.");
      }
    } catch (error) {
      // Handle error case, e.g., network error or server issue
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  }

  const handleGSTInfo = async (info: any) => {
    console.log(info);
    try {
        // Prepare the data to match your form structure
        const gstDetails = {
            gstPortalLoginId: info.gstPortalLoginId,
            gstPassword: info.gstPassword,
            gstNumber: info.gstNumber,
            tradeName: info.tradeName,
            additionalTradeName: info.additionalTradeName || null, // Making it optional
            gstrType: info.gstrType,
            returnType: info.returnType
        };

        // Update GST details by calling the API
        const response = await User.addDetails({gstProfile:gstDetails});

        if (response.success) {
            // If successful, update the userData state with the GST details
            setUserData(prev => ({
                ...prev,
                gstPortalLoginId: info.gstPortalLoginId,
                gstNumber: info.gstNumber,
                tradeName: info.tradeName,
                additionalTradeName: info.additionalTradeName,
                gstrType: info.gstrType,
                returnType: info.returnType
                // Not including password in userData state for security
            }));
            
            setStep(4);
            toast.success("GST details updated successfully");
        } else {
            toast.error("Failed to update GST details. Please try again.");
        }
    } catch (error) {
        console.error("Error updating GST details:", error);
        toast.error("Something went wrong while updating GST details. Please try again.");
    }
};
  const completeSignUp = ()=>{
    setIsVisibleForm(false);
    navigate("/");
  }
  const handleITRInfo = async (info:any) => {
    try {
      // Prepare the income tax profile data
      const incomeTaxDetails = {
        password: info.loginPassword,
        itrType: info.itrType,
        bankDetails:{
          accountNumber: info.bankDetails.accountNumber,
          ifscCode: info.bankDetails.ifscCode,
        }
      };
      // Update ITR details by calling the API
      const response = await User.addDetails({ incomeTaxProfile: incomeTaxDetails });

      if (response.success) {
        // Update the userData state with the ITR details (excluding sensitive info)
        setUserData(prev => ({
          ...prev,
          incomeTaxProfile: {
            pan: info.pan,
            aadharRegisteredMobileNumber: info.aadharRegisteredMobileNumber,
            bankAccountNumber: info.bankAccountNumber,
            bankIfscCode: info.bankIfscCode,
            bankName: info.bankName
            // Not including password in userData state for security
          }
        }));

        toast.success("Income Tax details updated successfully");
        completeSignUp();
      } else {
        toast.error("Failed to update Income Tax details. Please try again.");
      }
    } catch (error) {
      console.error("Error updating Income Tax details:", error);
      toast.error("Something went wrong while updating ITR details. Please try again.");
    }
  }
  const handleSkip = () => {
    if (step < 4) {
      setStep(prev => prev + 1)
    } else {
      completeSignUp()
    }
  }

  // const completeSignup = async () => {
  //   try {
  //     // const response = await AUTH.completeSignup(userData)
  //     if (1) {
  //       toast.success('Signup completed successfully')
  //       setIsVisibleForm(false);
  //       // navigate('/')
  //     }
  //   } catch (error) {
  //     toast.error('Failed to complete signup. Please try again.')
  //   }
  // }

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-gradient-to-br from-teal-500/30 to-blue-500/30 backdrop-blur-md">
      {/* <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"> */}
      <button 
        onClick={()=>{
          navigate("/");
          setIsVisibleForm(false)
        }}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
      >
        <X className="h-6 w-6 text-gray-700" />
      </button>
        {step === 1 && <PhoneAuthStep onSubmit={handlePhoneAuth} />}
        {step === 2 && (
          <BasicDetailsStep onSubmit={handleBasicDetails} onSkip={handleSkip} />
        )}
        {step === 3 && (
          <GSTProfileStep onSubmit={handleGSTInfo} onSkip={handleSkip} />
        )}
        {step === 4 && (
          <IncomeTaxProfileStep onSubmit={handleITRInfo} onSkip={completeSignUp}/>
        )}
      {/* </div> */}
    </div>
  )
}


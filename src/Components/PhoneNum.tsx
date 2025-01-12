import { toast } from 'sonner';
import { Input } from './ui/input';
import { useState } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';

const PhoneNum = () => {
  const [phoneNo,setPhoneNo] = useState("")
  const {setIsVisibleForm} = useGlobalContext();
  const handleSumbit = async(e:any)=>{
    // console.log(phoneNo)
    e.preventDefault()
    setIsVisibleForm(phoneNo)
    // try{
    //   const response = await axios.post("http://localhost:3000/api/v1/request",{
    //     phoneNo
    //   })
    //   if(response.data.success){
    //     toast.success('Request submitted successfully!');
    //   }
    //   setPhoneNo("")
    // }catch(err){
    //   toast.error("Error occured please try again later")
    // }
  }
  return (
    <div className="mt-[32px] flex flex-col md:flex-row items-center gap-[24px] md:gap-[40px]">
      <Input
        type="text"
        placeholder="Enter your Phone number"
        value={phoneNo}
        onChange={(e:any)=>{if(isNaN(Number(e.target.value))){
          toast.error("Fill appropriate number")
        }else if(e.target.value.length>10){
          toast.error("Number cant exceed 10 digits")
          
        }else{
          setPhoneNo(e.target.value)}}
        }
        className="w-full md:w-[321px] h-[49px] text-black"
        style={{ padding: "0 16px", boxShadow: "0px 0.94px 6.57px 0px #00000040" }}
      />
      <button
        onClick={handleSumbit}
        className="bg-secondary text-white font-[poppins] font-medium text-[16px] rounded-[7.17px] w-full md:w-[188.25px] h-[48.51px] flex items-center justify-center"
      >
        Start Filling
      </button>
    </div>
  );
};

export default PhoneNum;

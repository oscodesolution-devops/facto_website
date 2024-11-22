import { Input } from './ui/input';

const PhoneNum = () => {
  return (
    <div className="mt-[32px] flex flex-col md:flex-row items-center gap-[24px] md:gap-[40px]">
      <Input
        type="text"
        placeholder="Enter your Phone number"
        className="w-full md:w-[321px] h-[49px] text-black"
        style={{ padding: "0 16px", boxShadow: "0px 0.94px 6.57px 0px #00000040" }}
      />
      <button
        className="bg-secondary text-white font-[poppins] font-medium text-[16px] rounded-[7.17px] w-full md:w-[188.25px] h-[48.51px] flex items-center justify-center"
      >
        Start Filling
      </button>
    </div>
  );
};

export default PhoneNum;

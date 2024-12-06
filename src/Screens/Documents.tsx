import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/Components/Navbar';
import { Upload } from '@/api';
import { FaArrowRight } from 'react-icons/fa'; // Import arrow icon

type UploadDetails = {
  _id: string;
  subServiceId: string;
  title: string;
  description: string;
  isMandatory: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const UploadPage: React.FC = () => {
  const navigate = useNavigate();

  // State management
  const [serviceId, setServiceId] = useState<string>('');
  const location = useLocation();
  const [uploadDetails, setUploadDetails] = useState<any>(null);
  const [localFiles, setLocalFiles] = useState<{ [key: string]: File | null }>({});
  const [uploadFilesData, setUploadFilesData] = useState<{ [key: string]: boolean }>({});
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({}); // Track uploading state

  // Get Sub Service Id from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const serviceId = searchParams.get('serviceId');
    if (serviceId) {
      setServiceId(serviceId);
    }
  }, [location.search]);

  // Fetch upload details
  useEffect(() => {
    Upload.getUpload(serviceId).then((res) => {
      setUploadDetails(res.data.subServiceRequirements);
    });
  }, [serviceId]);

  // Initialize file states
  useEffect(() => {
    if (uploadDetails) {
      const initialFiles: { [key: string]: File | null } = {};
      uploadDetails.forEach((item: UploadDetails) => {
        initialFiles[item._id] = null;
      });
      setLocalFiles(initialFiles);
    }
  }, [uploadDetails]);

  // Function to upload file
  async function uploadFile(documentType: string, id: string, description: string, title: string) {
    if (localFiles[id]) {
      setUploading((prev) => ({ ...prev, [id]: true })); // Set loading state
      const formData = new FormData();
      formData.append('documentType', documentType);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('document', localFiles[id], '[PROXY]');
      try {
        const res = await Upload.uploadFile(formData, serviceId);
        if (res.status.code === 200) {
          setUploadFilesData((prev) => ({ ...prev, [id]: true }));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setUploading((prev) => ({ ...prev, [id]: false })); // Reset loading state
      }
    }
  }

  const handleFinish = () => {
    if (!uploadDetails) return;

    const mandatoryFiles = uploadDetails.filter((item: UploadDetails) => item.isMandatory);
    const missingFiles = mandatoryFiles.filter((file: UploadDetails) => !uploadFilesData[file._id]);

    if (missingFiles.length > 0) {
      const missingFileNames = missingFiles.map((file: UploadDetails) => file.title);
      alert(`Please upload the following mandatory documents before finishing:\n- ${missingFileNames.join('\n- ')}`);
      return;
    }

    navigate('/');
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-green-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-[20px] max-w-4xl w-full">
          <h1 className="text-2xl font-[poppins] font-[600] mb-6 text-start">GSTR-1 & 3B</h1>
          <p className="text-start font-[poppins] font-[500] mb-10">Upload your required Documents</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-[20px]">
            {uploadDetails?.map((item: UploadDetails) => (
              <div key={item._id} className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0"></div>
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium font-[poppins]">{item.title}</label>
                    {/* Upload button with loading spinner and arrow */}
                    <button
                      disabled={localFiles[item._id] == null || uploading[item._id] || uploadFilesData[item._id]}
                      onClick={() =>
                        uploadFile(item.isMandatory ? 'required' : 'optional', item._id, item.description, item.title,)
                      }
                      className={`text-sm font-[poppins] font-[500] px-3 py-1 rounded-lg hover:shadow-xl ${localFiles[item._id] == null || uploading[item._id]
                          ? 'bg-red-500 cursor-not-allowed disabled:opacity-50'
                          : 'bg-primary text-white'
                        }`}
                    >
                      {uploading[item._id] ? (
                        <div className="animate-spin w-4 h-4 border-2 border-t-transparent border-white rounded-full"></div>
                      ) : uploadFilesData[item._id] ? (
                        <FaArrowRight />
                      ) : (
                        'Upload'
                      )}
                    </button>
                  </div>
                  <input
                    type="file"
                    className="block w-full px-4 py-2 text-sm font-[poppins] font-[300] border rounded-lg shadow-sm bg-gray-50"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setLocalFiles((prev) => ({ ...prev, [item._id]: file }));
                      if (file) {
                        setUploadFilesData((prev) => ({ ...prev, [item._id]: false }));
                      }
                    }}
                  />
                  {uploadFilesData[item._id] && (
                    <p className="text-sm mt-2 text-green-500">File uploaded: {localFiles[item._id]?.name}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-5 mt-[60px]">
            <button className="px-6 py-2 bg-primary font-[poppins] w-[312px] font-[300] text-white rounded-lg hover:shadow-xl">
              Contact Us
            </button>
            <button
              className="px-6 py-2 bg-secondary font-[poppins] font-[300] w-[312px] text-white rounded-lg hover:shadow-xl"
              onClick={handleFinish}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;

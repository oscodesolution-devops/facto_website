import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/Components/Navbar";
import { Upload } from "@/api";
import { FaArrowRight, FaPlus } from "react-icons/fa"; // Import arrow icon

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

type OtherUploads = {
  title: string;
  description: string;
  localFile: File | null;
  uploading: boolean;
  uploadFilesData: boolean;
};

const temp: OtherUploads = {
  title: "",
  description: "",
  localFile: null,
  uploading: false,
  uploadFilesData: false,
};

const UploadPage: React.FC = () => {
  const navigate = useNavigate();

  // State management
  const [serviceId, setServiceId] = useState<string>("");
  const location = useLocation();
  const [uploadDetails, setUploadDetails] = useState<any>(null);
  const [localFiles, setLocalFiles] = useState<{ [key: string]: File | null }>(
    {}
  );
  const [uploadFilesData, setUploadFilesData] = useState<{
    [key: string]: boolean;
  }>({});
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({}); // Track uploading state
  const [otherUploads, setOtherUploads] = useState<OtherUploads[]>([
    { ...temp },
  ]);


  useEffect(() => {
    console.log(otherUploads);
  }, [otherUploads]);

  // Get Sub Service Id from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const serviceId = searchParams.get("serviceId");
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
  async function uploadFile(
    documentType: string,
    id: string,
    description: string,
    title: string
  ) {
    if (localFiles[id]) {
      setUploading((prev) => ({ ...prev, [id]: true })); // Set loading state
      const formData = new FormData();
      formData.append("documentType", documentType);
      formData.append("title", title);
      formData.append("description", description);

      formData.append("document", localFiles[id], "[PROXY]");
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

  function validateOtherUploads(index: number) {
    const item = otherUploads[index];
    if (item.localFile == null || item.uploading || item.uploadFilesData) {
      return false;
    }
    return true;
  }

  async function uploadOtherFile(
    documentType: string,
    index: number,
    description: string,
    title: string,
    localFile: File | null
  ) {
    if (validateOtherUploads(index)) {
      setOtherUploads((prev: OtherUploads[]) =>
        prev.map((item, idx) =>
          idx === index ? { ...item, uploading: true } : item
        )
      );
      const formData = new FormData();
      formData.append("documentType", "required");
      formData.append("title", title);
      formData.append("description", description);
      if (localFile) {
        formData.append("document", localFile, "[PROXY]");
      }

      try {
        const res = await Upload.uploadFile(formData, serviceId);
        if (res.status.code === 200) {
          setOtherUploads((prev: OtherUploads[]) =>
            prev.map((item, idx) =>
              idx === index ? { ...item, uploadFilesData: true } : item
            )
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setOtherUploads((prev: OtherUploads[]) =>
          prev.map((item, idx) =>
            idx === index ? { ...item, uploading: false } : item
          )
        );
      }
    }
  }

  const handleFinish = () => {
    if (!uploadFilesData) return;

    const mandatoryFiles = uploadDetails.filter(
      (item: UploadDetails) => item.isMandatory
    );
    console.log(mandatoryFiles);
    const missingFiles = mandatoryFiles.filter(
      (file: UploadDetails) => !uploadFilesData[file._id]
    );
    console.log(missingFiles);
    if (missingFiles.length > 0) {
      const missingFileNames = missingFiles.map(
        (file: UploadDetails) => file.title
      );
      alert(
        `Please upload the following mandatory documents before finishing:\n- ${missingFileNames.join(
          "\n- "
        )}`
      );
      return;
    }

    navigate("/");
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-green-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-[20px] max-w-4xl w-full">
          <h1 className="text-2xl font-[poppins] font-[600] mb-6 text-start">
            GSTR-1 & 3B
          </h1>
          <p className="text-start font-[poppins] font-[500] mb-10">
            Upload your required Documents
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-[20px]">
            {uploadDetails?.map((item: UploadDetails) => (
              <div key={item._id} className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0"></div>
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium font-[poppins]">
                      {item.title}
                    </label>
                    {/* Upload button with loading spinner and arrow */}
                    <button
                      disabled={
                        localFiles[item._id] == null ||
                        uploading[item._id] ||
                        uploadFilesData[item._id]
                      }
                      onClick={() =>
                        uploadFile(
                          item.isMandatory ? "required" : "optional",
                          item._id,
                          item.description,
                          item.title
                        )
                      }
                      className={`text-sm font-[poppins] font-[500] px-3 py-1 rounded-lg hover:shadow-xl ${
                        localFiles[item._id] == null ||
                        uploading[item._id] ||
                        uploadFilesData[item._id]
                          ? "bg-red-500 cursor-not-allowed disabled:opacity-50"
                          : "bg-primary text-white"
                      }`}
                    >
                      {uploading[item._id] ? (
                        <div className="animate-spin w-4 h-4 border-2 border-t-transparent border-white rounded-full"></div>
                      ) : uploadFilesData[item._id] ? (
                        <FaArrowRight />
                      ) : (
                        "Upload"
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
                        // making an entry in uploadedFilesData as false for the current file
                        setUploadFilesData((prev) => ({
                          ...prev,
                          [item._id]: false,
                        }));
                      }
                    }}
                  />
                  {uploadFilesData[item._id] && (
                    <p className="text-sm mt-2 text-green-500">
                      File uploaded: {localFiles[item._id]?.name}
                    </p>
                  )}
                </div>
              </div>
            ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-[20px]">
            {otherUploads?.map((item: OtherUploads, index: number) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0"></div>
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-medium font-[poppins]">
                      Other Document
                    </label>
                    {/* Upload button with loading spinner and arrow */}
                    <button
                      disabled={
                        item.localFile == null ||
                        item.uploading ||
                        item.uploadFilesData ||
                        item.title.length == 0 ||
                        item.description.length == 0
                      }
                      onClick={() =>
                        uploadOtherFile(
                          "optional",
                          index,
                          item.description,
                          item.title,
                          item.localFile
                        )
                      }
                      className={`text-sm font-[poppins] font-[500] px-3 py-1 rounded-lg hover:shadow-xl ${
                        item.localFile == null ||
                        item.uploading ||
                        item.uploadFilesData ||
                        item.title.length == 0 ||
                        item.description.length == 0
                          ? "bg-red-500 cursor-not-allowed disabled:opacity-50"
                          : "bg-primary text-white"
                      }`}
                    >
                      {item.uploading ? (
                        <div className="animate-spin w-4 h-4 border-2 border-t-transparent border-white rounded-full"></div>
                      ) : item.uploadFilesData ? (
                        <FaArrowRight />
                      ) : (
                        "Upload"
                      )}
                    </button>
                  </div>
                  <input
                    type="file"
                    className="block w-full px-4 py-2 text-sm font-[poppins] font-[300] border rounded-lg shadow-sm bg-gray-50"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setOtherUploads((prev) =>
                        prev.map((item, idx) =>
                          idx === index ? { ...item, localFile: file } : item
                        )
                      );
                    }}
                  />
                  <input
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-sm font-[poppins] font-[300] border rounded-lg shadow-sm bg-gray-50"
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setOtherUploads((prev) =>
                        prev.map((item, idx) =>
                          idx === index ? { ...item, title: title } : item
                        )
                      );
                    }}
                  />
                  <textarea
                    className="block w-full px-4 py-2 mt-2 text-sm font-[poppins] font-[300] border rounded-lg shadow-sm bg-gray-50 resize-none"
                    placeholder="Description" 
                    value={item.description}
                    onChange={(e) => {
                      const description = e.target.value;
                      setOtherUploads((prev) =>
                        prev.map((item, idx) =>
                          idx === index
                            ? { ...item, description: description }
                            : item
                        )
                      );
                    }}
                    rows={4}
                  />

                  {item.uploadFilesData && (
                    <p className="text-sm mt-2 text-green-500">
                      File uploaded: {item.localFile?.name}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Add Other Uploads */}
            <div className="flex flex-col justify-center gap-2 cursor-pointer h-[250px] w-full items-center border rounded-lg p-2" onClick={() => setOtherUploads([...otherUploads, { ...temp }])}>
              <div className="font-[poppins] font-[500]">Add Other Uploads</div>
              <div className="flex justify-center items-center border-dotted border-2 border-primary rounded-lg p-4 ">
                <FaPlus />
              </div>
            </div>
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

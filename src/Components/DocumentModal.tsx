export const DocumentModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    documents: any[];
  }> = ({ isOpen, onClose, documents }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Submitted Documents</h2>
            <button 
              onClick={onClose} 
              className="text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
          </div>
          {documents.length === 0 ? (
            <p className="text-center text-gray-500">No documents submitted</p>
          ) : (
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <div 
                  key={doc._id || index} 
                  className="border p-4 rounded-md"
                >
                  <h3 className="font-medium">{doc.title}</h3>
                  <p className="text-sm text-gray-600">Type: {doc.documentType}</p>
                  <a 
                    href={doc.documentUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Document
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
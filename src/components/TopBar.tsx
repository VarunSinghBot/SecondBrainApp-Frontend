import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface userProps {
  username: string;
}

export default function TopBar({ username }: userProps) {
  const navigate = useNavigate();

  // Share dropdown state
  const [shareDropdown, setShareDropdown] = useState(false);
  const [isSharable, setIsSharable] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [loadingShare, setLoadingShare] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  // Toggle sharable status and fetch or remove share link
  const handleToggleShare = async () => {
    setLoadingShare(true);
    setShareError(null);
    const token = localStorage.getItem("token");
    try {
      if (!isSharable) {
        // Turn ON sharing: request backend to generate a share link
        const res = await axios.post(
          "http://localhost:5000/api/v1/links",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setShareLink(res.data.shareLink);
        setIsSharable(true);
      } else {
        // Turn OFF sharing: request backend to delete the share link
        if (shareLink) {
          // Extract hash from shareLink
          const hash = shareLink.split("/").pop();
          await axios.delete(
            `http://localhost:5000/api/v1/links/${hash}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
        setShareLink(null);
        setIsSharable(false);
      }
    } catch (err: any) {
      setShareError(err.response?.data?.error || "Failed to update share status");
    }
    setLoadingShare(false);
  };

  const copyToClipboard = async ({ shareLink }: { shareLink: string }) => {
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success("Text copied to clipboard!",{
        style: {
        border: '1px solid #ffffff',
        padding: '16px',
        color: '#000000',
      },
      iconTheme: {
        primary: '#000000',
        secondary: '#FFFAEE',
      }
    });
    } catch (err) {
      toast.error("Couldn't copy text");
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className='h-full w-full flex justify-between items-center text-black/75 border border-b-[#1e1e1e40]'>
      <Toaster position="bottom-right" reverseOrder={true}/>
      {/* Profile  */}
      <div className='flex flex-[.20] items-center '>
        <img src="/profile.svg" alt="Logo" className='h-10 w-10 rounded-[100%] m-4 object-cover border border-[#2b2b2b0f]' />
        <span className="pl-2">
          <h1 className='text-md '>{username}</h1>
          <p className="text-sm text-[#00000080]">Hello, Welcome Back!</p>
        </span>
      </div>
      <div className='flex-[.75] flex gap-4 h-fit items-center justify-end pr-4'>
        <button 
          className='h-[38px] hover:bg-green-500/25 border border-green-500 text-green-500 px-4 py-2 rounded'
          onClick={(e) => {
            e.preventDefault();
            navigate('/addItem');
          }}
        >Add Item
        </button>
        <input 
          type="text" 
          className='h-10 w-64 rounded-md p-2 border bg-white text-black/65 focus:w-[50%] transition-all duration-300 ease-in-out' 
          placeholder='Search...'
        />
        {/* Share Dropdown Button */}
        <div className="relative">
          <button
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2'
            onClick={() => setShareDropdown((prev) => !prev)}
            type="button"
          >
            <span>Share</span>
            {/* Arrow Down SVG, rotates up when open */}
            <svg
              className={`transition-transform duration-200 ${shareDropdown ? "rotate-180" : ""}`}
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {shareDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded shadow-lg z-50 p-4 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-medium text-[#e1434b]">Sharable:</span>
                <button
                  className={`relative w-12 h-6 flex items-center rounded-full border transition-colors duration-200 ${isSharable ? "bg-[#e1434b]" : "bg-gray-300"}`}
                  onClick={handleToggleShare}
                  disabled={loadingShare}
                >
                  <span
                    className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${isSharable ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
                <span className="text-xs text-gray-500">{isSharable ? "On" : "Off"}</span>
              </div>
              {loadingShare && <span className="text-xs text-gray-400">Updating...</span>}
              {shareError && <span className="text-xs text-red-500">{shareError}</span>}
              {isSharable && shareLink && (
                <div className="mt-2 w-full">
                  <span className="text-xs text-gray-700">Share this link:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      readOnly
                      value={shareLink}
                      className="w-full p-1 border rounded text-xs bg-gray-100"
                      onFocus={e => e.target.select()}
                    />
                    <button
                      className="px-2 py-1 bg-[#e1434b] text-white rounded text-xs"
                      onClick={() => {
                        copyToClipboard({shareLink});
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

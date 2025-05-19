import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

interface Tag {
  id: string;
  tagName: string;
}

interface ContentItem {
  id: string;
  title: string;
  body: string;
  type: string;
  mediaUrl?: string;
  tags?: Tag[];
}

interface ContentProps {
  filterType: string | null;
}

export default function Content({ filterType }: ContentProps) {
  const [contentData, setContentData] = useState<ContentItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteWarningId, setDeleteWarningId] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      if (!token) {
        setError("Unauthorized: No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/v1/content", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        setContentData(response.data); // Set the fetched data to state
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Delete content handler
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized: No token found");
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/v1/content/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContentData((prev) => prev.filter((item) => item.id !== id));
      setDeleteWarningId(null);

      toast.success("Item deleted successfully!", {
        style: {
          border: "1px solid #ffffff",
          padding: "16px",
          color: "#000000",
        },
        iconTheme: {
          primary: "#ff0000",
          secondary: "#ffffff",
        },
      });
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to delete content");
    }
  };

  // Filter content based on filterType
  const filteredContent = filterType
    ? contentData.filter((item) => item.type === filterType)
    : contentData;

  return (
    <div className="w-[90%] flex flex-col justify-start items-center pb-4">
      <Toaster position="bottom-right" reverseOrder={true}/>
      {/* <h1 className="text-black text-3xl">Main Page</h1> */}
      {loading ? (
        <div className="flex flex-col items-center justify-center w-full h-[600px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#e1434b] border-opacity-70 mb-4"/>
          <span className="text-[#e1434b] text-xl font-semibold">Loading...</span>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-3 gap-4 w-full h-full mt-4">
          {
            filteredContent.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500 text-lg mt-8">
                No {filterType} available
              </div>
            ) : (
            filteredContent.map((item) => (
              <main
                key={item.id}
                className="relative border border-[#1e1e1e40] bg-transparent h-[300px] w-full rounded-md flex flex-col justify-start items-start overflow-hidden"
              >
                <span className="w-full h-fit p-2 bg-[#e1434b] border-[#1e1e1e40]">
                  <p className=" text-gray-300 text-xs">{item.type}</p>
                </span>

                {/* Render title and body */}
                <section className="px-4 flex gap-2 flex-col mt-2">
                  <h1 className="text-black text-2xl">{item.title}</h1>
                  <p className="text-black text-sm">{item.body}</p>

                  {/* Render mediaUrl if available */}
                  {item.mediaUrl && (
                    <a
                      href={item.mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 text-blue-200 underline hover:text-blue-400"
                    >
                      Open Media
                    </a>
                  )}
                  {/* Render tags if available */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="bg-white text-[#e1434b] border px-2 py-1 rounded text-xs"
                        >
                          #{tag.tagName}
                        </span>
                      ))}
                    </div>
                  )}
                </section>


                {/* Delete button and warning */}
                {deleteWarningId === item.id ? (
                  <div className="absolute bottom-2 right-2 bg-white p-2 rounded shadow flex flex-col items-center">
                    <span className="text-red-600 text-xs mb-2">
                      Are you sure you want to delete?
                    </span>
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={() => handleDelete(item.id)}
                      >
                        Yes
                      </button>
                      <button
                        className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                        onClick={() => setDeleteWarningId(null)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="absolute h-[34px] w-[34px] bottom-2 right-2 mt-4 p-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => setDeleteWarningId(item.id)}
                  >
                    <img src="/bin-icon.svg" alt="Delete" className="h-full w-full"/>
                  </button>
                )}
              </main>
            )
          ))}
        </div>
      )}
    </div>
  );
}
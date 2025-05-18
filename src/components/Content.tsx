import { useEffect, useState } from "react";
import axios from "axios";

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

  // Filter content based on filterType
  const filteredContent = filterType
    ? contentData.filter((item) => item.type === filterType)
    : contentData;

  return (
    <div className="max-h-[700px] w-[90%] flex flex-col justify-start items-center ">
      <h1 className="text-white text-3xl">Main Page</h1>
      {loading ? (
        <div className="text-white text-xl mt-8">Loading...</div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-3 gap-4 w-full h-full mt-4">
          {filteredContent.map((item) => (
            <div
              key={item.id}
              className="bg-blue-500 h-[300px] w-full rounded-md flex flex-col justify-center items-center"
            >
              <h1 className="text-white text-2xl">{item.title}</h1>
              <p className="text-white text-sm">{item.body}</p>
              <span className="text-gray-300 text-xs">{item.type}</span>
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
                      className="bg-white text-blue-700 px-2 py-1 rounded text-xs"
                    >
                      #{tag.tagName}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import { useEffect, useState } from "react";
import axios from "axios";

interface ContentItem {
  id: string;
  title: string;
  body: string;
  type: string;
}

export default function Content() {
  const [contentData, setContentData] = useState<ContentItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      if (!token) {
        setError("Unauthorized: No token found");
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
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="max-h-[700px] w-[90%] flex flex-col justify-start items-center border">
      <h1 className="text-white text-3xl">Main Page</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-3 gap-4 w-full h-full border border-red-400 mt-4">
          {contentData.map((item) => (
            <div
              key={item.id}
              className="bg-blue-500 h-[300px] w-full rounded-md flex flex-col justify-center items-center"
            >
              <h1 className="text-white text-2xl">{item.title}</h1>
              <p className="text-white text-sm">{item.body}</p>
              <span className="text-gray-300 text-xs">{item.type}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
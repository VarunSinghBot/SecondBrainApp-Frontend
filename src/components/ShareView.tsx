import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShareView() {
  const { hash } = useParams();
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hash) return;
    setLoading(true);
    axios.get(`http://localhost:5000/api/v1/links/${hash}`)
      .then(res => setContent(res.data))
      .catch(() => setError("Invalid or expired link"))
      .finally(() => setLoading(false));
  }, [hash]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!content || content.length === 0) return <div className="text-center mt-10">No shared content found.</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Shared Content</h1>
      {content.map(item => (
        <div key={item.id} className="mb-6 p-4 border rounded">
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p>{item.body}</p>
          {/* Add more fields as needed */}
        </div>
      ))}
    </div>
  );
}
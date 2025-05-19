import { useState, useEffect } from "react";

const useGetSdrcAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Dummy SDRC admins data
        const dummyAdmins = [
          { id: 1, name: "John Smith" },
          { id: 2, name: "Sarah Johnson" },
          { id: 3, name: "Michael Davis" },
          { id: 4, name: "Emily Wilson" },
          { id: 5, name: "Robert Brown" },
          { id: 6, name: "Jessica Garcia" },
          { id: 7, name: "David Martinez" },
          { id: 8, name: "Amanda Rodriguez" },
        ];

        setAdmins(dummyAdmins);
        setError(null);
      } catch (err) {
        setError("Failed to fetch SDRC admins");
        setAdmins([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  return { admins, loading, error };
};

export default useGetSdrcAdmins;

import { useEffect, useState } from "react";
import { url } from "src/config/APIConfig";

const useGetSubAdminData = (userId) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only fetch if userId is provided and not null/undefined
    if (!userId) {
      return;
    }

    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        const apiUrl = `${url}/subadmin/user/${userId}`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        console.log(`Response status: ${response.status}`);

        if (!response.ok) {
          // Try to get error details from response
          let errorMessage;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || `HTTP error ${response.status}`;
          } catch (e) {
            errorMessage = `Failed to fetch user data: ${response.status}`;
          }
          throw new Error(errorMessage);
        }

        const userData = await response.json();
        console.log("User data received:", userData);
        setData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message || "Failed to fetch user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    return () => {
      // Cleanup function
    };
  }, [userId]);

  return { data, error, isLoading };
};

export default useGetSubAdminData;

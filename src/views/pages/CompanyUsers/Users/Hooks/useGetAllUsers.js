import { useState,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";


const useGetAllUsers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
  
    useEffect(() => {
      const fetchUsers = async () => {
        setLoading(true);
        setError(null);
  
        try {
          const res = await axios({
            method: "GET",
            url: ApiConfig.getAllUsers,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
  
          if (res?.status === 200) {
            setData(res?.data);
            toast.success("Data fetched successfully!");
          } else if (res?.status === 205) {
            toast.error("No User Found");
          }
        } catch (err) {
          console.error("Error fetching users:", err);
          setError(err);
          toast.error("An error occurred while fetching users.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers(); 
    }, []);
  
    return { loading, error, data };
  };
  
  export default useGetAllUsers;
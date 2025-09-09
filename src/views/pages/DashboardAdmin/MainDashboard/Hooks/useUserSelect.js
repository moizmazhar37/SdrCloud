import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import useViewAsUser from "src/layouts/DashboardLayout/TopBar/useViewAsUser";

const useUserSelect = ({ setIsViewingAs, setViewingUser, isViewingAs }) => {
  const history = useHistory();
  const { getTemporaryToken } = useViewAsUser(); // Hook call goes here

  const handleUserSelect = async (selectedUser) => {
    console.log("Selected user:", selectedUser);
    toast.info(`Switching to ${selectedUser.first_name}...`);

    const token = await getTemporaryToken(selectedUser.id); // User ID
    if (!token) return;

    if (!isViewingAs) {
      sessionStorage.setItem("masterUser", JSON.stringify({
        email: localStorage.getItem("email"),
        userType: localStorage.getItem("userType"),
        token: localStorage.getItem("token"),
        _id: localStorage.getItem("_id"),
      }));
    }

    localStorage.setItem("email", selectedUser.email);
    localStorage.setItem("userType", "USER");
    localStorage.setItem("_id", selectedUser.id);
    localStorage.setItem("token", token);

    sessionStorage.setItem("slaveUser", JSON.stringify(selectedUser));
    sessionStorage.setItem("isViewingAs", "true");

    setIsViewingAs(true);
    setViewingUser(selectedUser);

    toast.success(`Now viewing as ${selectedUser.name}`);
    history.push("/createtemplate");
  };

  return handleUserSelect;
};

export default useUserSelect;

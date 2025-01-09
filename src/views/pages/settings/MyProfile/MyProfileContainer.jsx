import React, { useState } from "react";
import MyProfile from "./Profile/MyProfile";
import useUserProfile from "./Profile/Hooks/useUserProfile";

const ProfileContainer = () => {
  const [edit, setEdit] = useState(false);
  const { data, loading, error } = useUserProfile();

  const data2 = {
    profileImage: data?.logo || "",
    firstName: data?.first_name || "John",
    lastName: data?.last_name || "Doe",
    email: data?.email || "john@example.com",
    phoneNo: "1234567890",
  };

  const headers = {
    title: "Personal Details",
  };

  return (
    <div>
      <MyProfile data={data2} headers={headers} edit={edit} setEdit={setEdit} />
    </div>
  );
};

export default ProfileContainer;

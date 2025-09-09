import React, { useState } from "react";
import MyProfile from "./Profile/MyProfile";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import useUserProfile from "./Profile/Hooks/useUserProfile";

const ProfileContainer = () => {
  const [edit, setEdit] = useState(false);
  const { data, loading, error, refetch } = useUserProfile();

  const data2 = {
    profileImage: data?.profile_picture || "",
    firstName: data?.first_name || "Not Available",
    lastName: data?.last_name || "Not Available",
    email: data?.email || "Not Available",
    phoneNo: data?.phone_no || "Not Available",
  };
  const navigationItems = [
    { text: "Settings", route: "/settings" },
    { text: "My Profile", route: "/myprofile" },
  ];
  const headers = {
    title: "Personal Details",
  };

  return (
    <div>
      <DynamicNavigator items={navigationItems} />

      <MyProfile
        data={data2}
        headers={headers}
        edit={edit}
        setEdit={setEdit}
        onUpdateSuccess={refetch}
      />
    </div>
  );
};

export default ProfileContainer;

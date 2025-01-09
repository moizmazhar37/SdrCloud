import React, {useState} from 'react';
import MyProfile from './Profile/MyProfile';
const ProfileContainer = () => {
    const [edit, setEdit] = useState(false);
const data = {
  profileImage: '',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phoneNo: '1234567890'
};
const headers = {
  title: 'Personal Details'
};



  return <div>
    <MyProfile 
  data={data}
  headers={headers}
  edit={edit}
  setEdit={setEdit}
/>
  </div>
    
};

export default ProfileContainer;
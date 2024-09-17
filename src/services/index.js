import ApiConfig from "../config/APIConfig";
import axios from "axios";

export const loginHandler = async (endPoint, dataToSend) => {
  try {
    const res = await axios({
      method: "POST",
      url: ApiConfig[endPoint],
      data: dataToSend,
    });
    if (res.data.status === 200) {
      return res;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const signupHandler = async (endPoint, dataToSend, role) => {
  try {
    const res = await axios({
      method: "POST",
      url: ApiConfig[endPoint],
      data: { dataToSend, role: role },
    });
    console.log("signup response");
    if (res.data.responseCode === 200) {
      return res;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

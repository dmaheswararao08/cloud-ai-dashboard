/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_BASE_URL } from "./config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginAPI = async (
  loginDetails: any,
  useMockAPI?: boolean
): Promise<any> => {
  if (useMockAPI) {
    let data={
      status:200,
      body:{
        userId:loginDetails.userId,
        type:'admin'
      }
    }
    return data;
  } else {
    const actualURL: string = `${API_BASE_URL}/auth/login`;
    const response = await axios.post(actualURL, loginDetails);
    if (response.status !== 200) {
      throw new Error(response.data.body.message);
    } else {
      return response.data;
    }
  }
};

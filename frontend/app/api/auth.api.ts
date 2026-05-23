import myAxios from "@/lib/axios.config";
import { REGISTER_URL } from "@/lib/apiEndPoints";

export const registerUserAPI = async (payload: any) => {
  const response = await myAxios.post(REGISTER_URL, payload);
  return response;
};

import axiosInstance from "../../config/axios.config";
import { AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";

export interface ILoginUserPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {}

const login = async (
  data: ILoginUserPayload
): Promise<AxiosResponse<ILoginResponse>["data"]> => {
  try {
    const request = await axiosInstance.post<
      ILoginUserPayload,
      AxiosResponse<ILoginResponse>
    >("/auth/login", data);
    const response = request;
    return response?.data;
  } catch (error: unknown | any) {
    const otherErrors = {
      data: {
        message: error.message,
        success: false,
      },
    };
    return error?.response?.data ?? otherErrors.data;
  }
};

const useLoginMutation = () => {
  const mutation = useMutation({ mutationFn: login });

  return mutation;
};

export default useLoginMutation;

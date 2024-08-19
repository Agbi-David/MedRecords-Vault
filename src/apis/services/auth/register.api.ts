import axiosInstance from "../../config/axios.config";
import { AxiosResponse } from "axios";
import { IApiResponse, UserTypes } from "@types";
import { useMutation } from "@tanstack/react-query";
export interface IEmployeeNumber {
  "": number;
  "1-10": number;
  "11-25": number;
  "26-50": number;
  "40-above": number;
}

export interface IRegisterUserPayload {
  confirmPassword: string;
  email: string;
  employeeLocation: string;
  fullName: string;
  industry: string;
  noOfEmployee: number;
  organizationName: string;
  password: string;
  phoneNumber: string;
  userType: UserTypes;
}

export interface IRegisterUserResponse extends IApiResponse {
  data?: {
    id: string;
    name: string;
    refreshToken: string;
    accessToken: string;
    email: string;
  };
}

const register = async (
  data: IRegisterUserPayload
): Promise<AxiosResponse<IRegisterUserResponse>["data"]> => {
  try {
    const request = await axiosInstance.post<
      IRegisterUserPayload,
      AxiosResponse<IRegisterUserResponse>
    >("/auth/register", data);
    const response = request;
    return response?.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const useRegisterMutation = () => {
  const mutation = useMutation({ mutationFn: register });

  return mutation;
};

export default useRegisterMutation;

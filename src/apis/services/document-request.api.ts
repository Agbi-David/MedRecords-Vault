import { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";

export interface UserType {
  email: string;
  employeeLocation: string;
  fullName: string;
  industry: string;
  noOfEmployees: number;
  organizationName: string;
  password: string;
  phoneNumber: string;
  userType: string;
  memberId: number;
}

export interface IGetDocumentRequestsResponse {}

const getDocumentRequests = async (): Promise<
  AxiosResponse<IGetDocumentRequestsResponse>["data"]
> => {
  try {
    const request = await axiosInstance.get<
      void,
      AxiosResponse<IGetDocumentRequestsResponse>
    >("/api/requests");
    const response = request;
    return response?.data;
  } catch (error: unknown | any) {
    // const otherErrors = {
    //   data: {
    //     message: error.message,
    //     success: false,
    //   },
    // };
    return error?.response?.data;
  }
};

const useGetDocumentRequestsQuery = () => {
  const query = useQuery({
    queryFn: getDocumentRequests,
    queryKey: ["GET_DOCUMENT_REQUESTS"],
  });

  return query;
};

export default useGetDocumentRequestsQuery;

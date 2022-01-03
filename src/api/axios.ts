import axios, { AxiosError, AxiosRequestHeaders } from "axios";
import {
  accessDeniedError,
  ApiErrorException,
  generalError,
  loginRequiredError,
  networkError,
} from "@/api/errors";
import { generateUUID } from "@/utils/uuidUtils";

export const NAV_CALL_ID_HEADER = "Nav-Call-Id";
export const NAV_CONSUMER_ID_HEADER = "Nav-Consumer-Id";
export const NAV_CONSUMER_ID = "finnfastlege";

export const defaultRequestHeaders = (): AxiosRequestHeaders => {
  return {
    "Content-Type": "application/json",
    [NAV_CONSUMER_ID_HEADER]: NAV_CONSUMER_ID,
    [NAV_CALL_ID_HEADER]: `${NAV_CONSUMER_ID}-${generateUUID()}`,
  };
};

function handleAxiosError(error: AxiosError) {
  if (error.response) {
    switch (error.response.status) {
      case 401: {
        window.location.href = `/login?redirectTo=${window.location.pathname}`;
        throw new ApiErrorException(
          loginRequiredError(error.message),
          error.response.status
        );
      }
      case 403: {
        const message =
          error.response.data.begrunnelse || error.response.data.message;
        throw new ApiErrorException(
          accessDeniedError(message),
          error.response.status
        );
      }
      default:
        throw new ApiErrorException(
          generalError(error.message),
          error.response.status
        );
    }
  } else if (error.request) {
    throw new ApiErrorException(networkError(error.message));
  } else {
    throw new ApiErrorException(generalError(error.message));
  }
}

export const get = <ResponseData>(url: string): Promise<ResponseData> => {
  return axios
    .get(url, {
      headers: defaultRequestHeaders(),
    })
    .then((response) => response.data)
    .catch(function (error) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(error);
      } else {
        throw new ApiErrorException(generalError(error.message), error.code);
      }
    });
};

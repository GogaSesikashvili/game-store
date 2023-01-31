import axios from "axios";
import useAuth from "./useAuth";
import { BASE_URL, ENDPOINTS } from "../api";

const useRefreshToken = () => {
  const { auth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      BASE_URL + ENDPOINTS.REFRESH_TOKEN,
      JSON.stringify({
        token: auth.token,
        refreshToken: auth.refreshToken,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (JSON.parse(window.localStorage.getItem("persist"))) {
      window.localStorage.setItem("token", response.data.token);
    } else {
      auth.token = response.data.token;
    }

    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;

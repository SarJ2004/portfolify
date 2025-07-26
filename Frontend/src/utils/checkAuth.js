import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  try {
    // First try cookies
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (cookieToken) {
      const token = cookieToken.split("=")[1];
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken;
      }
    }

    // Fallback to localStorage
    const localToken = localStorage.getItem("token");
    if (localToken && localToken !== "null" && localToken !== "") {
      const decodedToken = jwtDecode(localToken);
      return decodedToken;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
  return null;
};

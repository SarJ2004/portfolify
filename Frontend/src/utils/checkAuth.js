import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      .split("=")[1];
    if (token) {
      //   console.log(token);
      const decodedToken = jwtDecode(token);
      //   console.log(decodedToken.id);
      return decodedToken; // Adjust based on your token's payload structure
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
  return null;
};

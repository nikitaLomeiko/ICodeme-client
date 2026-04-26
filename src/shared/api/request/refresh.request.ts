import { BASE_URL } from "../consts";

export const refreshTokens = async (refreshToken: string) => {
  const response = await fetch(`${BASE_URL}auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Refresh failed");
  }

  return response.json();
};

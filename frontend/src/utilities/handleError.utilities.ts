import axios from "axios";

export const handleError = (
  error: unknown
): { ok: boolean; message: string } => {
  let message = "An unknown error occurred";

  if (axios.isAxiosError(error)) {
    if (error.response) {
      message = error.response.data.message;
    } else {
      message = error.message;
    }
  }
  return { ok: false, message };
};

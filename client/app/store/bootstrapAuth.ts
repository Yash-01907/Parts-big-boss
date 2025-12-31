import axios from "axios";
import { hydrate } from "./useAuthStore";

export async function bootstrapAuth() {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/users/me",
      { withCredentials: true }
    );
    hydrate(res.data);
  } catch (err) {
    hydrate(null);
  }
}

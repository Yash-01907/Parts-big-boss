import { api } from "../axios/axiosConfig";
import { hydrate } from "./useAuthStore";

export async function bootstrapAuth() {
  try {
    // 1. Fetch User
    const userRes = await api.get("/api/users/me");

    // 2. If user exists, fetch their garage
    let garage = [];
    if (userRes.data) {
      try {
        const vehicleRes = await api.get("/api/user/vehicles");
        garage = vehicleRes.data;
      } catch (vErr) {
        console.warn("Failed to fetch garage:", vErr);
        // Don't fail auth just because garage failed
      }
    }

    // 3. Hydrate everything at once
    hydrate(userRes.data, garage);
  } catch (err) {
    // Auth failed completely
    hydrate(null, []);
  }
}

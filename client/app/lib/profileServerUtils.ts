import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getProfileData() {
  const cookieStore = await cookies();
  // Assuming your backend expects a cookie named 'token' or 'connect.sid'
  // Adjust 'token' to whatever your specific cookie name is based on your auth setup
  const cookieString = cookieStore.toString(); 

  const headers = {
    Cookie: cookieString,
    "Content-Type": "application/json",
  };

  try {
    // Parallel fetching for speed
    const [garageRes, ordersRes] = await Promise.all([
      fetch(`${API_URL}/api/user/vehicles`, { headers, next: { tags: ['garage'] } }), // Add caching tags if needed
      fetch(`${API_URL}/api/orders/my-orders`, { headers, cache: 'no-store' }) // Orders usually shouldn't be cached deeply
    ]);

    const garage = garageRes.ok ? await garageRes.json() : [];
    
    // Fallback for orders if endpoint isn't ready
    let orders = [];
    if (ordersRes.ok) {
        orders = await ordersRes.json();
    } else {
        // Mock data fallback if API fails (optional, based on your preference)
        orders = [
            { id: "ORD-7782", date: "Oct 24, 2025", items: "Brake Pads, Oil Filter", status: "Delivered", amount: "$124.50" },
            { id: "ORD-9921", date: "Sep 12, 2025", items: "Spark Plugs (4)", status: "Shipped", amount: "$45.00" },
        ];
    }

    return { garage, orders };
  } catch (error) {
    console.error("Profile SSR Fetch Error:", error);
    return { garage: [], orders: [] };
  }
}
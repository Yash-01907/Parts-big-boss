import { api } from "../axios/axiosConfig";

type AddressRow = {
  id: number;
  address_line1: string;
  address_line2?: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
};

type AddressFormValues = {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
};

// Returns addresses already mapped to the form shape used by AddressManager
export const fetchAddresses = async (): Promise<AddressFormValues[]> => {
  const res = await api.get("/api/users/me/addresses");
  const rows: AddressRow[] = res.data?.data || [];
  return rows.map((r) => ({
    id: String(r.id),
    label: "",
    fullName: "",
    phone: "",
    streetAddress:
      r.address_line1 + (r.address_line2 ? ", " + r.address_line2 : ""),
    city: r.city || "",
    state: r.state || "",
    zipCode: r.postal_code || "",
    country: r.country || "",
    isDefault: !!r.is_default,
  }));
};

export const addAddress = async (payload: Partial<AddressRow>) => {
  const res = await api.post("/api/users/me/address", payload);
  return res.data?.data;
};

export const updateAddress = async (
  id: string | number,
  payload: Partial<AddressRow>,
) => {
  const res = await api.put(`/api/users/me/address/${id}`, payload);
  return res.data?.data;
};

export const deleteAddress = async (id: string | number) => {
  const res = await api.delete(`/api/users/me/address/${id}`);
  return res.data;
};

export default {
  fetchAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
};

export interface Address {
  id?: string;
  fullName: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  type: "Home" | "Work" | "Other";
  isDefault?: boolean;
}

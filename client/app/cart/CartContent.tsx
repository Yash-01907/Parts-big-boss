"use client";

import { useState, useEffect } from "react";

import { useAuthStore } from "../store/useAuthStore";
import Breadcrumbs from "../components/product-components/Breadcrumbs";
import CartItemsList from "./CartItemsList";
import CartOrderSummary from "./CartOrderSummary";
import RelatedProducts from "./RelatedProducts";
import CheckoutSection from "./components/CheckoutSection";
import * as addressApi from "../Data/addresses";
import { Address } from "../types/address";
import { toast } from "sonner";
import { AddressData } from "./components/AddressForm";

export default function CartContent() {
  const { isAuthenticated } = useAuthStore();

  // ---------------------------------------------------------------------------
  // Checkout State Logic (Lifted from CheckoutSection)
  // ---------------------------------------------------------------------------
  // Steps: 'auth' -> 'address' -> 'payment'
  const [step, setStep] = useState<"auth" | "address" | "payment">("auth");

  // Custom auth state for guest checkout flow
  const [isGuestVerified, setIsGuestVerified] = useState(false);
  const [guestPhone, setGuestPhone] = useState("");

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [showAddAddress, setShowAddAddress] = useState(false);

  // Initialize
  useEffect(() => {
    if (isAuthenticated) {
      setStep("address");
      // Fetch user's saved addresses
      (async () => {
        try {
          // type 'userId' might be needed if the API requires it, but fetchAddresses usually handles it via token/session
          const rows = await addressApi.fetchAddresses();
          // Map to cart Address shape
          const mapped: Address[] = rows.map((r: any) => ({
            id: r.id,
            fullName: r.fullName || "",
            phone: r.phone || "",
            streetAddress: r.streetAddress,
            city: r.city || "",
            state: r.state || "",
            zipCode: r.zipCode || "",
            type: "Home",
            isDefault: r.isDefault,
          }));
          setAddresses(mapped);
          if (mapped.length > 0) {
            setSelectedAddressId(mapped[0].id!);
            setShowAddAddress(false);
          } else {
            setShowAddAddress(true);
          }
        } catch (err) {
          setAddresses([]);
          setShowAddAddress(true);
        }
      })();
    } else {
      setStep("auth");
    }
  }, [isAuthenticated]);

  const handleGuestVerified = (phone: string) => {
    setGuestPhone(phone);
    setIsGuestVerified(true);
    setStep("address");
    toast.success("Login verified!");
  };

  const handleAddressSubmit = (data: AddressData) => {
    // If user is authenticated, persist address via API
    (async () => {
      try {
        if (isAuthenticated) {
          const payload = {
            address_line1: data.addressLine1,
            address_line2: data.addressLine2 || "",
            city: data.city,
            state: data.state,
            postal_code: data.pincode,
            country: "India",
            is_default: false,
          };
          const res = await addressApi.addAddress(payload);
          const newAddress: Address = {
            id: String(res.id),
            fullName: data.fullName,
            phone: data.phone,
            streetAddress:
              res.address_line1 +
              (res.address_line2 ? ", " + res.address_line2 : ""),
            city: res.city || data.city,
            state: res.state || data.state,
            zipCode: res.postal_code || data.pincode,
            type: data.type,
            isDefault: !!res.is_default,
          };
          setAddresses((prev) => [...prev, newAddress]);
          setSelectedAddressId(newAddress.id!);
          setShowAddAddress(false);
          toast.success("Address saved successfully");
        } else {
          // Guest: keep address locally
          const newAddress: Address = {
            id: Math.random().toString(36).substr(2, 9),
            fullName: data.fullName,
            phone: data.phone,
            streetAddress: `${data.addressLine1} ${data.addressLine2 || ""}`,
            city: data.city,
            state: data.state,
            zipCode: data.pincode,
            type: data.type,
          };
          setAddresses([...addresses, newAddress]);
          setSelectedAddressId(newAddress.id!);
          setShowAddAddress(false);
          toast.success("Address saved successfully");
        }
      } catch (err) {
        toast.error("Failed to save address");
      }
    })();
  };

  // Determine if checkout is allowed
  const canCheckout =
    (step === "address" || step === "payment") &&
    !showAddAddress &&
    !!selectedAddressId;

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div className="mb-3">
        <Breadcrumbs items={[{ label: "Cart" }]} />
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Main Cart Area */}
        <div className="lg:col-span-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-8 font-display">
            Shopping Cart
          </h1>
          <CartItemsList />

          <div className="mt-8 pt-8">
            <CheckoutSection
              step={step}
              isGuestVerified={isGuestVerified}
              onGuestVerified={handleGuestVerified}
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              onSelectAddress={setSelectedAddressId}
              showAddAddress={showAddAddress}
              setShowAddAddress={setShowAddAddress}
              onAddressSubmit={handleAddressSubmit}
            />
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <CartOrderSummary
            selectedAddressId={selectedAddressId}
            canCheckout={canCheckout}
          />
        </div>
      </div>

      {/* Related Products Area */}
      <div className="mt-16">
        <RelatedProducts />
      </div>
    </main>
  );
}

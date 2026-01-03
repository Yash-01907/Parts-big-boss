"use client";

import { useEffect, useRef } from "react";
import { authStore } from "../../store/useAuthStore";
import { UserVehicle } from "../../types/vehicle";

export default function ProfileStoreInitializer({
  garage,
}: {
  garage: UserVehicle[];
}) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      authStore.setGarage(garage);
      initialized.current = true;
    }
  }, [garage]);

  return null;
}

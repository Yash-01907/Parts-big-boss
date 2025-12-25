import { useState, useEffect, useCallback } from "react";

interface UseSearchDialogReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function useSearchDialog(): UseSearchDialogReturn {
  const [isOpen, setIsOpen] = useState(false);

  // Open dialog
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Close dialog
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Toggle dialog
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Handle keyboard shortcuts and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close
      if (e.key === "Escape" && isOpen) {
        close();
      }

      // Cmd+K (Mac) or Ctrl+K (Windows/Linux) to open
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        open();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, open, close]);

  // Lock body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}

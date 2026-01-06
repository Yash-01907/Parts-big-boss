import { Check, X } from "lucide-react";

interface FitmentBadgeProps {
  isCompatible?: boolean;
  vehicleName?: string;
  compact?: boolean;
}

export default function FitmentBadge({
  isCompatible,
  vehicleName,
  compact = false,
}: FitmentBadgeProps) {
  if (isCompatible === undefined) {
    return null;
  }

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
          isCompatible
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {isCompatible ? <Check size={16} /> : <X size={16} />}
        <span>{isCompatible ? "Fits" : "Not Compatible"}</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border-2 ${
        isCompatible
          ? "bg-green-50 border-green-200"
          : "bg-red-50 border-red-200"
      }`}
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isCompatible ? "bg-green-100" : "bg-red-100"
        }`}
      >
        {isCompatible ? (
          <Check className="text-green-600" size={20} />
        ) : (
          <X className="text-red-600" size={20} />
        )}
      </div>
      <div className="flex-1">
        <p
          className={`font-semibold mb-1 ${
            isCompatible ? "text-green-900" : "text-red-900"
          }`}
        >
          {isCompatible ? "✓ Compatible" : "✗ Not Compatible"}
        </p>
        {vehicleName && (
          <p
            className={`text-sm ${
              isCompatible ? "text-green-700" : "text-red-700"
            }`}
          >
            {isCompatible
              ? `This part fits your ${vehicleName}`
              : `This part does not fit your ${vehicleName}`}
          </p>
        )}
      </div>
    </div>
  );
}

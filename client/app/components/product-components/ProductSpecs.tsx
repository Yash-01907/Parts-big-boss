import { Package } from "lucide-react";
import { Globe, Factory, Tag, Hash, Cpu } from "lucide-react";
interface ProductSpecsProps {
  attributes: Record<string, any>;
  partNumber?: string;
  categoryName?: string;
}

export default function ProductSpecs({
  attributes,
  partNumber,
  categoryName,
}: ProductSpecsProps) {
  const specs = Object.entries(attributes || {});

  if (specs.length === 0 && !partNumber && !categoryName) {
    return null;
  }

  return (
    <section className="bg-surface rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between p-6 md:p-8 bg-white border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-100 rounded-lg text-zinc-700">
            <Cpu size={20} />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Technical Details
          </h2>
        </div>
        {/* Placeholder for Dynamic Diagram Trigger */}
        <div className="hidden md:block">{categoryName && ``}</div>
      </div>

      {/* Primary Info Bar - Highlighted */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-zinc-50 border-b border-zinc-200">
        {categoryName && (
          <div className="flex items-center p-4 md:px-8 border-b md:border-b-0 md:border-r border-zinc-200">
            <Tag size={16} className="text-zinc-400 mr-3 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Category
              </span>
              <span className="text-sm font-bold text-zinc-900">
                {categoryName}
              </span>
            </div>
          </div>
        )}

        {partNumber && (
          <div className="flex items-center p-4 md:px-8">
            <Hash size={16} className="text-zinc-400 mr-3 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Part Number
              </span>
              <span className="font-mono text-sm font-bold text-zinc-900">
                {partNumber}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Technical Specs Grid - The "Gap-1px" trick for perfect borders */}
      <div className="bg-zinc-200 gap-[1px] grid grid-cols-1 md:grid-cols-2">
        {specs.map(([key, value]) => {
          if (value === null || value === undefined) return null;

          const formattedKey = key
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          let formattedValue = String(value);
          if (typeof value === "boolean") formattedValue = value ? "Yes" : "No";
          if (Array.isArray(value)) formattedValue = value.join(", ");

          return (
            <div
              key={key}
              className="bg-white p-4 md:px-8 md:py-5 flex flex-col justify-center"
            >
              <dt className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
                {formattedKey}
              </dt>
              <dd className="text-sm font-semibold text-zinc-900 break-words">
                {formattedValue}
              </dd>
            </div>
          );
        })}
      </div>

      {/* Footer: Manufacturing Info */}
      {(attributes?.country_of_origin || attributes?.manufacturer) && (
        <div className="bg-zinc-50/50 p-6 md:p-8 border-t border-zinc-200 flex flex-wrap gap-8">
          {attributes?.country_of_origin && (
            <div className="flex items-center gap-3 group">
              <Globe
                size={16}
                className="text-zinc-400 group-hover:text-zinc-600 transition-colors"
              />
              <p className="text-xs font-medium text-zinc-500">
                Origin:{" "}
                <span className="text-zinc-900 font-bold ml-1">
                  {attributes.country_of_origin}
                </span>
              </p>
            </div>
          )}

          {attributes?.manufacturer && (
            <div className="flex items-center gap-3 group">
              <Factory
                size={16}
                className="text-zinc-400 group-hover:text-zinc-600 transition-colors"
              />
              <p className="text-xs font-medium text-zinc-500">
                Manufacturer:{" "}
                <span className="text-zinc-900 font-bold ml-1">
                  {attributes.manufacturer}
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

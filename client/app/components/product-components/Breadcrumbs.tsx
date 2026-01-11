import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({
  items,
  className = "",
}: BreadcrumbsProps) {
  return (
    <nav
      className={`flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 ${className}`}
      aria-label="Breadcrumb"
    >
      <Link
        href="/"
        className="hover:text-gray-900 transition-colors text-[14px]"
      >
        Home
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2.5">
          <ChevronRight size={18} className="opacity-30" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-gray-900 transition-colors text-[12px]"
            >
              {item.label}
            </Link>
          ) : (
            <span className="truncate text-[12px] md:max-w-none text-[var(--brand-red)]">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

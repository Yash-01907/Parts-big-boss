import Link from "next/link";

export default function NavLinks() {
  const links = [
    { label: "Parts", href: "/parts" },
    { label: "Vehicles", href: "/vehicles" },
    { label: "Brands", href: "/brands" },
    { label: "About", href: "/about" },
  ];

  return (
    <div className="hidden md:flex items-center gap-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-gray-700 text-sm font-medium relative group transition-colors duration-200 hover:text-gray-900"
        >
          {link.label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 rounded-full group-hover:w-full transition-all duration-300" />
        </Link>
      ))}
    </div>
  );
}

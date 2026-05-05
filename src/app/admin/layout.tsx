"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin/productos", label: "Productos" },
  { href: "/admin/productos/nuevo", label: "+ Agregar" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Topbar */}
      <header className="bg-white border-b border-[#e5e5e5] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-[#FB531F] text-white text-xs font-bold px-2 py-1 rounded">EYK</span>
              <span className="text-xs text-[#666] font-medium">Admin</span>
            </Link>
            <nav className="flex gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "px-3 py-1.5 rounded text-sm font-medium transition",
                    pathname === item.href
                      ? "bg-[#FB531F] text-white"
                      : "text-[#444] hover:bg-[#f1f1f1]",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-[#666] hover:text-[#FB531F] transition"
            >
              Ver sitio →
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs text-[#999] hover:text-red-600 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

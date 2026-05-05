"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/admin/productos";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al iniciar sesión");
        return;
      }
      router.push(redirect);
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-block bg-[#FB531F] text-white font-bold text-xl px-4 py-2 rounded mb-4">
            EYK
          </div>
          <h1 className="text-2xl font-bold text-[#111]">Panel Admin</h1>
          <p className="text-sm text-[#666] mt-1">Ingresa la contraseña para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#e5e5e5] p-8 shadow-sm">
          <label className="block text-sm font-semibold text-[#333] mb-2">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-[#e5e5e5] rounded-lg px-4 py-3 text-[#111] text-sm focus:outline-none focus:border-[#FB531F] focus:ring-2 focus:ring-[#FB531F]/20 transition"
            placeholder="••••••••"
            autoFocus
            required
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 bg-[#FB531F] hover:bg-[#d43e0a] text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

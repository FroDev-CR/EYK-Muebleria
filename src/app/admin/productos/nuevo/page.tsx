import { AdminProductForm } from "@/components/admin-product-form";

export default function NuevoProductoPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#111] mb-6">Agregar producto</h1>
      <AdminProductForm mode="create" />
    </div>
  );
}

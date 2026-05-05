import { notFound } from "next/navigation";
import { AdminProductForm } from "@/components/admin-product-form";
import { getLocalProducts } from "@/lib/products";

export default async function EditProductoPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const products = getLocalProducts();
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#111] mb-1">Editar producto</h1>
      <p className="text-sm text-[#666] mb-6">{product.name}</p>
      <AdminProductForm mode="edit" product={product} />
    </div>
  );
}

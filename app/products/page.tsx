import {
  getImagesWithCaption,
  TypeImageWithTitle,
} from "@/dal/menu/products/get/images-with-caption";
import EfProductCard from "./product-card";

export default async function EfAllProducts() {
  const imagesWithTitle: TypeImageWithTitle[] = await getImagesWithCaption();

  return (
    <div className="p-16">
      <section>
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="font-heading text-2xl font-bold text-cocoa-800">
            All products{" "}
            <span className="text-cocoa-600">(browse for reference)</span>
          </h2>
          <span className="font-accent text-sm font-medium text-blossom-600">
            {imagesWithTitle.length}{" "}
            {imagesWithTitle.length === 1 ? "item" : "items"}
          </span>
        </div>

        {imagesWithTitle.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-blossom-200 bg-blossom-50/50 px-6 py-16 text-center">
            <p className="font-heading text-lg font-semibold text-cocoa-800">
              No products found
            </p>
            <p className="mt-2 text-sm text-cocoa-600">
              Maybe there's no product yet, or... i don't know. XD
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {imagesWithTitle.map((imageWithTitle: TypeImageWithTitle) => (
              <EfProductCard
                key={imageWithTitle.id}
                imageWithTitle={imageWithTitle}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

import {
  getImagesWithCaption,
  TypeImageWithTitle,
} from "@/dal/menu/products/get/images-with-caption";
import EfMenuProductsClient from "./client-page";

export default async function EfMenuProducts() {
  const imagesWithCaption: TypeImageWithTitle[] = await getImagesWithCaption();

  return <EfMenuProductsClient imagesWithCaption={imagesWithCaption} />;
}

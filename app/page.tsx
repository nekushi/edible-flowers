export const dynamic = "force-dynamic";

import { getLatest3Products } from "@/dal/landing-page/get/latest-3-products";
import EfLandingPage from "./z-landing-page-contents/landing-page";
import { TypeLatest3Products } from "./z-landing-page-contents/types";

export default async function EfSsrLandingPage() {
  const latest3Products: TypeLatest3Products[] = await getLatest3Products();
  // console.log(latest3Products);

  return <EfLandingPage latest3Products={latest3Products} />;
}

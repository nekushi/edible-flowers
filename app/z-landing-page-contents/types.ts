export type ApiResponse = {
  type: "success" | "error";
  message: string;
};

export type TypeClientFormRequest = {
  name: string;
  email: string;
  message: string;
};

export type TypeLatest3Products = {
  id: string;
  product_title: string;
  caption: string;
  img_url: string;
  price: number;
};

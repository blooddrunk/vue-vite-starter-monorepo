export type Product = {
  id?: string | number;
  name?: string | null;
  price?: number | null;
  inventory?: number | null;
  terms?: boolean;
  tags?: string[];
  location?: string;
  location2?: string;
};

export type ProductMedia = {
  url: string;
  isVideo?: false;
  externalLink?: string;
};

export type ProductItem = {
  id: string;
  title: string;
  body: string;
  price: number;
  thumbnail: string;
  bannerImageList?: ProductMedia[];
  detailImage?: string;
};

export type StagedOrderInfo = {
  remarks?: string;
  isServiceAgreementChecked: boolean;
};

export type CartItem = ProductItem & {
  quantity: number;
  checked?: boolean;
};

export type OrderInfo = {
  items: CartItem[];
  remarks?: string;
  serviceCharge?: number;
  isServiceAgreementChecked?: boolean;
  contactPerson: string;
  servicePhone: string;
  address: string;
};

export type OrderItem = OrderInfo & {
  orderNumber: string;
  orderStatus: string;
  orderTime: number;
  crmNumber?: string;
  serviceTime?: number;
  cancelReason?: string;
  quantity: number;
  totalPrice: number;
};

export type CustomizationInfo = {
  bannerImageList?: ProductMedia[];
  detailImage?: string;
};

export type CustomizationRequest = {
  contactPerson: string;
  servicePhone: string;
  address: string;
  serviceTime?: number;
};

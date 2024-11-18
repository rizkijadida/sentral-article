import { Asset } from "@/types/contentfultypes";

export const findAssetEvent = (id: string, assets: Asset[]): Asset | undefined => {
  return assets.find((asset) => asset.sys.id === id);
};

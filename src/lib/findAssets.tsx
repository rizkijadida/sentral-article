import { Asset } from "@/types/contentfultypes";

export const findAsset = (id: string, assets: Asset[]) => {
  return assets.find((asset) => asset.sys.id === id);
};

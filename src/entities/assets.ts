import { Address } from "./utils";
export interface Asset {
    owner: Address;
    data: AssetData
}
export type AssetData = [
  [boolean, boolean, boolean],
  [boolean, boolean, boolean],
  [boolean, boolean, boolean]
];
export type Assets = Record<string, Asset>;

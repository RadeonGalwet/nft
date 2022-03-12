import { Address } from "./utils";

export interface TransferInput {
  asset: string;
  address: Address;
}
export interface GetOwnerInput {
  asset: string;
}
export type ContractData = TransferInput | GetOwnerInput | null;
export interface ContractInput {
  action: ContractActionType;
  data: ContractData;
}
export interface ContractAction {
    input: ContractInput,
    caller: Address;
}
export type ContractActionType = "transfer" | "getOwner" | "name";

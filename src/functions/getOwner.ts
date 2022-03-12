import { ContractAction, GetOwnerInput } from "../entities/input";
import { ReadResult } from "../entities/result";
import { State } from "../entities/state";
declare const ContractError;

export async function getOwner(
  state: State,
  action: ContractAction
): Promise<ReadResult> {
  const getOwnerInput = action.input.data as GetOwnerInput;
  const asset = state.assets[getOwnerInput.asset];
  if (!asset) {
    throw new ContractError("Asset does not exist");
  }
  return { result: asset.owner };
}

import { ContractAction, TransferInput } from "../entities/input";
import { WriteResult } from "../entities/result";
import { State } from "../entities/state";
declare const ContractError;

export async function transfer(
  state: State,
  action: ContractAction
): Promise<WriteResult> {
  const transferInput = action.input.data as TransferInput;
  const asset = state.assets[transferInput.asset];
  if (!asset) {
    throw new ContractError("Unable to transfer non-existent asset");
  }
  if (asset.owner != action.caller) {
    throw new ContractError("You do not have this asset");
  }
  state.assets[transferInput.asset].owner = action.caller;
  return { state };
}

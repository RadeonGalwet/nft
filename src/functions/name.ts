import { ContractAction } from "../entities/input";
import { ReadResult } from "../entities/result";
import { State } from "../entities/state";

export async function name(
  state: State,
  _: ContractAction
): Promise<ReadResult> {
  return { result: state.name };
}

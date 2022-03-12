import { ContractAction } from "./entities/input";
import { ContractResult } from "./entities/result";
import { State } from "./entities/state";
import { getOwner } from "./functions/getOwner";
import { name } from "./functions/name";
import { transfer } from "./functions/transfer";
declare const ContractError;

export async function handle(state: State, action: ContractAction) : Promise<ContractResult> {
    switch (action.input.action) {
        case "transfer":
            return await transfer(state, action)
        case "getOwner":
            return await getOwner(state, action)
        case "name":
            return await name(state, action)
        default:
            throw new ContractError("Unknown function")
    }
} 
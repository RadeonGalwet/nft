import { State } from "./state";
export type WriteResult = { state: State };
export type ReadResult = { result: string }
export type ContractResult = WriteResult | ReadResult;

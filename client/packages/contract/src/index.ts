import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CANQZAWS75BWTMN4STHZT36QYWRTW3OXIXARCXZYGCO55AGCR6AITTK4",
  }
} as const


export interface NFT {
  collection_id: u32;
  minted_at: u64;
  owner: string;
}

export type DataKey = {tag: "Collection", values: readonly [u32]} | {tag: "NFT", values: readonly [u32]} | {tag: "CollectionCount", values: void} | {tag: "NFTCount", values: void} | {tag: "UserNFTs", values: readonly [string]};


export interface Collection {
  creator: string;
  expiry: Option<u64>;
  max_supply: Option<u32>;
  metadata_uri: string;
  minted: u32;
  price: i128;
}

export interface Client {
  /**
   * Construct and simulate a mint transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  mint: ({user, collection_id}: {user: string, collection_id: u32}, options?: MethodOptions) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a get_nft transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_nft: ({token_id}: {token_id: u32}, options?: MethodOptions) => Promise<AssembledTransaction<NFT>>

  /**
   * Construct and simulate a transfer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  transfer: ({from, to, token_id}: {from: string, to: string, token_id: u32}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a is_member transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  is_member: ({user, collection_id}: {user: string, collection_id: u32}, options?: MethodOptions) => Promise<AssembledTransaction<boolean>>

  /**
   * Construct and simulate a get_user_nfts transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_user_nfts: ({user}: {user: string}, options?: MethodOptions) => Promise<AssembledTransaction<Array<u32>>>

  /**
   * Construct and simulate a get_collection transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_collection: ({collection_id}: {collection_id: u32}, options?: MethodOptions) => Promise<AssembledTransaction<Collection>>

  /**
   * Construct and simulate a create_collection transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_collection: ({creator, metadata_uri, price, max_supply, expiry}: {creator: string, metadata_uri: string, price: i128, max_supply: Option<u32>, expiry: Option<u64>}, options?: MethodOptions) => Promise<AssembledTransaction<u32>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAAA05GVAAAAAADAAAAAAAAAA1jb2xsZWN0aW9uX2lkAAAAAAAABAAAAAAAAAAJbWludGVkX2F0AAAAAAAABgAAAAAAAAAFb3duZXIAAAAAAAAT",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABQAAAAEAAAAAAAAACkNvbGxlY3Rpb24AAAAAAAEAAAAEAAAAAQAAAAAAAAADTkZUAAAAAAEAAAAEAAAAAAAAAAAAAAAPQ29sbGVjdGlvbkNvdW50AAAAAAAAAAAAAAAACE5GVENvdW50AAAAAQAAAAAAAAAIVXNlck5GVHMAAAABAAAAEw==",
        "AAAAAQAAAAAAAAAAAAAACkNvbGxlY3Rpb24AAAAAAAYAAAAAAAAAB2NyZWF0b3IAAAAAEwAAAAAAAAAGZXhwaXJ5AAAAAAPoAAAABgAAAAAAAAAKbWF4X3N1cHBseQAAAAAD6AAAAAQAAAAAAAAADG1ldGFkYXRhX3VyaQAAABEAAAAAAAAABm1pbnRlZAAAAAAABAAAAAAAAAAFcHJpY2UAAAAAAAAL",
        "AAAAAAAAAAAAAAAEbWludAAAAAIAAAAAAAAABHVzZXIAAAATAAAAAAAAAA1jb2xsZWN0aW9uX2lkAAAAAAAABAAAAAEAAAAE",
        "AAAAAAAAAAAAAAAHZ2V0X25mdAAAAAABAAAAAAAAAAh0b2tlbl9pZAAAAAQAAAABAAAH0AAAAANORlQA",
        "AAAAAAAAAAAAAAAIdHJhbnNmZXIAAAADAAAAAAAAAARmcm9tAAAAEwAAAAAAAAACdG8AAAAAABMAAAAAAAAACHRva2VuX2lkAAAABAAAAAA=",
        "AAAAAAAAAAAAAAAJaXNfbWVtYmVyAAAAAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAADWNvbGxlY3Rpb25faWQAAAAAAAAEAAAAAQAAAAE=",
        "AAAAAAAAAAAAAAANZ2V0X3VzZXJfbmZ0cwAAAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+oAAAAE",
        "AAAAAAAAAAAAAAAOZ2V0X2NvbGxlY3Rpb24AAAAAAAEAAAAAAAAADWNvbGxlY3Rpb25faWQAAAAAAAAEAAAAAQAAB9AAAAAKQ29sbGVjdGlvbgAA",
        "AAAAAAAAAAAAAAARY3JlYXRlX2NvbGxlY3Rpb24AAAAAAAAFAAAAAAAAAAdjcmVhdG9yAAAAABMAAAAAAAAADG1ldGFkYXRhX3VyaQAAABEAAAAAAAAABXByaWNlAAAAAAAACwAAAAAAAAAKbWF4X3N1cHBseQAAAAAD6AAAAAQAAAAAAAAABmV4cGlyeQAAAAAD6AAAAAYAAAABAAAABA==" ]),
      options
    )
  }
  public readonly fromJSON = {
    mint: this.txFromJSON<u32>,
        get_nft: this.txFromJSON<NFT>,
        transfer: this.txFromJSON<null>,
        is_member: this.txFromJSON<boolean>,
        get_user_nfts: this.txFromJSON<Array<u32>>,
        get_collection: this.txFromJSON<Collection>,
        create_collection: this.txFromJSON<u32>
  }
}
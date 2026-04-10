import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from "@stellar/stellar-sdk/contract";
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
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAQAAAAAAAAAAAAAAA05GVAAAAAADAAAAAAAAAA1jb2xsZWN0aW9uX2lkAAAAAAAABAAAAAAAAAAJbWludGVkX2F0AAAAAAAABgAAAAAAAAAFb3duZXIAAAAAAAAT",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABQAAAAEAAAAAAAAACkNvbGxlY3Rpb24AAAAAAAEAAAAEAAAAAQAAAAAAAAADTkZUAAAAAAEAAAAEAAAAAAAAAAAAAAAPQ29sbGVjdGlvbkNvdW50AAAAAAAAAAAAAAAACE5GVENvdW50AAAAAQAAAAAAAAAIVXNlck5GVHMAAAABAAAAEw==",
            "AAAAAQAAAAAAAAAAAAAACkNvbGxlY3Rpb24AAAAAAAYAAAAAAAAAB2NyZWF0b3IAAAAAEwAAAAAAAAAGZXhwaXJ5AAAAAAPoAAAABgAAAAAAAAAKbWF4X3N1cHBseQAAAAAD6AAAAAQAAAAAAAAADG1ldGFkYXRhX3VyaQAAABEAAAAAAAAABm1pbnRlZAAAAAAABAAAAAAAAAAFcHJpY2UAAAAAAAAL",
            "AAAAAAAAAAAAAAAEbWludAAAAAIAAAAAAAAABHVzZXIAAAATAAAAAAAAAA1jb2xsZWN0aW9uX2lkAAAAAAAABAAAAAEAAAAE",
            "AAAAAAAAAAAAAAAHZ2V0X25mdAAAAAABAAAAAAAAAAh0b2tlbl9pZAAAAAQAAAABAAAH0AAAAANORlQA",
            "AAAAAAAAAAAAAAAIdHJhbnNmZXIAAAADAAAAAAAAAARmcm9tAAAAEwAAAAAAAAACdG8AAAAAABMAAAAAAAAACHRva2VuX2lkAAAABAAAAAA=",
            "AAAAAAAAAAAAAAAJaXNfbWVtYmVyAAAAAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAADWNvbGxlY3Rpb25faWQAAAAAAAAEAAAAAQAAAAE=",
            "AAAAAAAAAAAAAAANZ2V0X3VzZXJfbmZ0cwAAAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+oAAAAE",
            "AAAAAAAAAAAAAAAOZ2V0X2NvbGxlY3Rpb24AAAAAAAEAAAAAAAAADWNvbGxlY3Rpb25faWQAAAAAAAAEAAAAAQAAB9AAAAAKQ29sbGVjdGlvbgAA",
            "AAAAAAAAAAAAAAARY3JlYXRlX2NvbGxlY3Rpb24AAAAAAAAFAAAAAAAAAAdjcmVhdG9yAAAAABMAAAAAAAAADG1ldGFkYXRhX3VyaQAAABEAAAAAAAAABXByaWNlAAAAAAAACwAAAAAAAAAKbWF4X3N1cHBseQAAAAAD6AAAAAQAAAAAAAAABmV4cGlyeQAAAAAD6AAAAAYAAAABAAAABA=="]), options);
        this.options = options;
    }
    fromJSON = {
        mint: (this.txFromJSON),
        get_nft: (this.txFromJSON),
        transfer: (this.txFromJSON),
        is_member: (this.txFromJSON),
        get_user_nfts: (this.txFromJSON),
        get_collection: (this.txFromJSON),
        create_collection: (this.txFromJSON)
    };
}

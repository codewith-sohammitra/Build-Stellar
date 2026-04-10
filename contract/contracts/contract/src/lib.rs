#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, Address, Env, Symbol, Vec, Map
};

#[contracttype]
#[derive(Clone)]
pub struct Collection {
    pub creator: Address,
    pub metadata_uri: Symbol,
    pub price: i128,
    pub max_supply: Option<u32>,
    pub expiry: Option<u64>,
    pub minted: u32,
}

#[contracttype]
#[derive(Clone)]
pub struct NFT {
    pub owner: Address,
    pub collection_id: u32,
    pub minted_at: u64,
}

#[contracttype]
pub enum DataKey {
    Collection(u32),
    NFT(u32),
    CollectionCount,
    NFTCount,
    UserNFTs(Address),
}

#[contract]
pub struct MembershipNFT;

#[contractimpl]
impl MembershipNFT {

    // 🔹 Create a new membership collection (permissionless)
    pub fn create_collection(
        env: Env,
        creator: Address,
        metadata_uri: Symbol,
        price: i128,
        max_supply: Option<u32>,
        expiry: Option<u64>,
    ) -> u32 {
        creator.require_auth();

        let mut count: u32 = env.storage().instance()
            .get(&DataKey::CollectionCount)
            .unwrap_or(0);

        let collection = Collection {
            creator: creator.clone(),
            metadata_uri,
            price,
            max_supply,
            expiry,
            minted: 0,
        };

        env.storage().instance().set(&DataKey::Collection(count), &collection);

        count += 1;
        env.storage().instance().set(&DataKey::CollectionCount, &count);

        count - 1
    }

    // 🔹 Mint membership NFT (permissionless)
    pub fn mint(env: Env, user: Address, collection_id: u32) -> u32 {
        user.require_auth();

        let mut collection: Collection = env.storage().instance()
            .get(&DataKey::Collection(collection_id))
            .expect("Collection not found");

        // Check expiry
        if let Some(expiry) = collection.expiry {
            let now = env.ledger().timestamp();
            if now > expiry {
                panic!("Collection expired");
            }
        }

        // Check max supply
        if let Some(max) = collection.max_supply {
            if collection.minted >= max {
                panic!("Max supply reached");
            }
        }

        // NOTE: Payment logic intentionally minimal (can integrate Stellar token transfer)

        let mut nft_count: u32 = env.storage().instance()
            .get(&DataKey::NFTCount)
            .unwrap_or(0);

        let nft = NFT {
            owner: user.clone(),
            collection_id,
            minted_at: env.ledger().timestamp(),
        };

        env.storage().instance().set(&DataKey::NFT(nft_count), &nft);

        // Update collection minted count
        collection.minted += 1;
        env.storage().instance().set(&DataKey::Collection(collection_id), &collection);

        // Track user NFTs
        let mut user_nfts: Vec<u32> = env.storage().instance()
            .get(&DataKey::UserNFTs(user.clone()))
            .unwrap_or(Vec::new(&env));

        user_nfts.push_back(nft_count);
        env.storage().instance().set(&DataKey::UserNFTs(user), &user_nfts);

        nft_count += 1;
        env.storage().instance().set(&DataKey::NFTCount, &nft_count);

        nft_count - 1
    }

    // 🔹 Transfer NFT
    pub fn transfer(env: Env, from: Address, to: Address, token_id: u32) {
        from.require_auth();

        let mut nft: NFT = env.storage().instance()
            .get(&DataKey::NFT(token_id))
            .expect("NFT not found");

        if nft.owner != from {
            panic!("Not owner");
        }

        nft.owner = to.clone();
        env.storage().instance().set(&DataKey::NFT(token_id), &nft);

        // Remove from sender
        let mut from_list: Vec<u32> = env.storage().instance()
            .get(&DataKey::UserNFTs(from.clone()))
            .unwrap_or(Vec::new(&env));

        let mut new_from_list = Vec::new(&env);
        for id in from_list.iter() {
            if id != token_id {
                new_from_list.push_back(id);
            }
        }
        env.storage().instance().set(&DataKey::UserNFTs(from), &new_from_list);

        // Add to receiver
        let mut to_list: Vec<u32> = env.storage().instance()
            .get(&DataKey::UserNFTs(to.clone()))
            .unwrap_or(Vec::new(&env));

        to_list.push_back(token_id);
        env.storage().instance().set(&DataKey::UserNFTs(to), &to_list);
    }

    // 🔹 Check membership
    pub fn is_member(env: Env, user: Address, collection_id: u32) -> bool {
        let user_nfts: Vec<u32> = env.storage().instance()
            .get(&DataKey::UserNFTs(user))
            .unwrap_or(Vec::new(&env));

        for token_id in user_nfts.iter() {
            let nft: NFT = env.storage().instance()
                .get(&DataKey::NFT(token_id))
                .unwrap();

            if nft.collection_id == collection_id {
                return true;
            }
        }

        false
    }

    // 🔹 Get collection
    pub fn get_collection(env: Env, collection_id: u32) -> Collection {
        env.storage().instance()
            .get(&DataKey::Collection(collection_id))
            .expect("Not found")
    }

    // 🔹 Get NFT
    pub fn get_nft(env: Env, token_id: u32) -> NFT {
        env.storage().instance()
            .get(&DataKey::NFT(token_id))
            .expect("Not found")
    }

    // 🔹 Get user NFTs
    pub fn get_user_nfts(env: Env, user: Address) -> Vec<u32> {
        env.storage().instance()
            .get(&DataKey::UserNFTs(user))
            .unwrap_or(Vec::new(&env))
    }
}
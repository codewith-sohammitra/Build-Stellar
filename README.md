# 🚀 NFT Membership Protocol — Permissionless Access on Stellar

> **Own Your Access. Join Any Community. No Gatekeepers.**

A fully **permissionless NFT Membership DApp** built using **Soroban smart contracts**, enabling open and decentralized community access without any centralized control.

---

## 📍 Contract Details

* **Network:** Stellar (Soroban)
* **Contract Address:**
  `CCDCVFL5GM6HNBQRQ7XJKKFSQBO77HUDO46CPKQVHIJDNVOZT2GZR3KC`

---

## 🌐 Overview

This protocol introduces a new way to manage memberships:

* No admins
* No approvals
* No restrictions

Anyone can:

* Create a membership collection
* Mint a membership NFT
* Participate in communities

---

## 🧠 Core Concept

The system is built around **NFT-based memberships**:

* 🏗️ **Collection** → A community or membership group
* 🎟️ **NFT** → A user’s membership pass
* 👤 **Wallet Ownership** → Proof of access

---

## ⚙️ Features

### 🔓 Permissionless by Default

* No privileged roles
* No `onlyOwner` logic
* No centralized governance

---

### 🏗️ Create Membership Collections

Users can define:

* Metadata URI (IPFS recommended)
* Price (optional)
* Maximum supply (optional)
* Expiry timestamp (optional)

---

### 🎟️ Mint Membership NFTs

* Open minting for everyone
* Enforces supply and expiry constraints

---

### 🔁 Transferable Memberships

* NFTs can be freely transferred between users

---

### ✅ On-Chain Membership Verification

* Verify membership status using smart contract logic

---

## 🧩 Smart Contract Interface

### `create_collection`

Create a new membership collection.

**Parameters:**

* `metadata_uri`
* `price`
* `max_supply`
* `expiry`

---

### `mint`

Mint a membership NFT.

**Parameters:**

* `collection_id`

---

### `transfer`

Transfer ownership of a membership NFT.

**Parameters:**

* `to`
* `token_id`

---

### `is_member`

Check if a user is a valid member.

**Parameters:**

* `user`
* `collection_id`

---

### `get_collection`

Retrieve collection details.

---

### `get_nft`

Retrieve NFT details.

---

### `get_user_nfts`

Fetch all NFTs owned by a user.

---

## 🖥️ Client Integration

This contract is designed to integrate seamlessly with frontend applications.

### 🔌 Wallet Support

* Compatible with Stellar wallets (e.g., Freighter)

---

### 🔄 Interaction Flow

1. **Connect Wallet**
2. **Create or Explore Memberships**
3. **Mint Membership NFT**
4. **Use NFT for Access Verification**

---

### 💻 Example Interaction (Pseudo Code)

```javascript id="y3pn0s"
const contract = new Contract(CONTRACT_ADDRESS);

// Create a membership
await contract.call("create_collection", {
  metadata_uri: "ipfs://your-metadata",
  price: 0,
  max_supply: null,
  expiry: null
});

// Mint membership NFT
await contract.call("mint", {
  collection_id: 0
});

// Verify membership
const isMember = await contract.call("is_member", {
  user: walletAddress,
  collection_id: 0
});
```

---

## 🧱 Tech Stack

* **Blockchain:** Stellar
* **Smart Contracts:** Soroban (Rust)
* **Frontend:** React / Next.js
* **Wallet Integration:** Freighter

---

## 💡 Use Cases

* DAO memberships
* Event ticketing
* Token-gated content
* Creator communities
* On-chain identity systems

---

## 🔐 Design Philosophy

This protocol follows a strict **permissionless-first approach**:

* No central authority
* No hidden controls
* Users define their own rules

Optional constraints like pricing, supply, and expiry are:
👉 Defined at the **collection level**, not enforced globally

---

## ⚠️ Notes

* Use IPFS or decentralized storage for metadata
* Payment logic depends on token integration
* Membership validity may depend on expiry settings

---

## 🚀 Future Improvements

* Multi-token payment support
* Soulbound (non-transferable) memberships
* Enhanced indexing for scalability
* Advanced UI/UX improvements

---

## 🤝 Contributing

This is an open, permissionless protocol.

Fork it, build on it, and improve it.

---

## 📜 License

MIT License

---

## 🌟 Vision

> "Membership should be owned, not granted."

---
![WhatsApp Image 2026-04-10 at 02 43 44](https://github.com/user-attachments/assets/5233edf0-3c96-4d8c-89f2-2f418af21ba5)
![WhatsApp Image 2026-04-10 at 02 49 51](https://github.com/user-attachments/assets/fff6961e-7391-498e-a4a8-0b4af59c5047)

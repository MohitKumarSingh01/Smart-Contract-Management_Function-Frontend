# Digital Decentralized Currency Exchange

Digital Decentralized Currency Exchange is a decentralized application (dApp) built on Ethereum, enabling users to deposit and withdraw Ether through a smart contract. The project consists of a Solidity smart contract for managing funds and a React front-end for interacting with the contract.

## Overview

This project aims to provide a decentralized solution for currency exchange using blockchain technology. Users can securely deposit and withdraw Ether via a smart contract deployed on the Ethereum blockchain. The front-end interface allows seamless interaction with the contract, leveraging MetaMask for wallet integration and user authentication.

## Features

- **Secure Transactions:** Deposits and withdrawals are executed securely using Ethereum smart contracts.
- **MetaMask Integration:** Connect your MetaMask wallet to interact with the dApp.
- **Human Verification:** Verify user identity with a simple human verification process.
- **Event Logging:** Events are logged for deposit and withdrawal actions for transparency.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- [MetaMask](https://metamask.io/) browser extension

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

## Smart Contract Deployment

1. **Deploy the smart contract:**

    Ensure you have configured your Ethereum network and MetaMask. Deploy using Hardhat:

    ```bash
    npx hardhat run scripts/deploy.js --network <network_name>
    ```

    Replace `<network_name>` with your preferred Ethereum network (e.g., `localhost`, `rinkeby`).

## Front-End Interface

1. **Start the development server:**

    ```bash
    npm start
    ```

2. **Connect MetaMask:**

   - Install MetaMask and set up for your chosen Ethereum network.
   - Connect your MetaMask wallet to the dApp.

3. **Usage:**

   - **View Account Details:** See your account address and current balance.
   - **Human Verification:** Complete the verification process to access deposit and withdrawal features.
   - **Deposit and Withdraw Ether:** Use the interface to securely deposit or withdraw Ether from the smart contract.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

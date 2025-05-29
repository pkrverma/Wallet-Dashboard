# Wallet Dashboard Project

This project is a React-based Wallet Dashboard designed to connect to MetaMask, display essential wallet information, and offer additional features for an enhanced user experience.

---

## Objective

The primary goal was to build a clean, minimal, and responsive React application that interacts with Web3 (MetaMask) to show a user's ETH balance and other relevant wallet details.

---

## Approach

1.  **React Functional Components & Hooks:** The entire application is built using modern React practices, leveraging `useState`, `useEffect`, `useCallback`, and `useContext` for efficient state management and side effects.
2.  **`ethers.js` for Web3 Interaction:** `ethers.js` (v6) is used for all blockchain interactions, including connecting to MetaMask, fetching balances, resolving ENS names, and sending transactions.
3.  **Context API for State Management:** A `WalletContext` and `WalletProvider` are implemented to centralize and share wallet-related state (account, network, balances, loading, errors) across components, avoiding prop drilling.
4.  **Modular Component Structure:** The application is broken down into several smaller, focused components (`ConnectWalletSection`, `WalletInfoCard`, `BalancesCard`, `SendEthSection`, `RecentTransactionsSection`, `ThemeToggle`, `Icons`, `utils`, `constants`) for better organization, readability, and maintainability.
5.  **Tailwind CSS for Styling:** Tailwind CSS is utilized for all styling, providing a utility-first approach to create a responsive, modern, and customizable UI.
6.  **MetaMask Event Handling:** Event listeners for `accountsChanged` and `chainChanged` are set up to ensure the dashboard dynamically reacts to user actions within MetaMask (e.g., switching accounts or networks).

---

## Features

### Core Features:

* **Connect Wallet:** A clear "Connect Wallet" button initiates the MetaMask connection.
* **Display Wallet Info:** Shows the connected wallet address and network name/chain ID.
* **Display ETH Balance:** Fetches and displays the user's ETH balance.

### Bonus Features Implemented:

* **DAI Token Balance:** Fetches and displays the user's DAI token balance using the ERC-20 contract.
* **ENS Name Resolution:** Displays the user's ENS name if available for the connected address.
* **Dark/Light Mode Toggle:** A persistent theme toggle allows users to switch between dark and light modes, saving the preference in `localStorage`.
* **Send ETH Functionality:** A dedicated section allows users to input a recipient address and an amount to send ETH, including basic client-side validation and transaction feedback.
* **Recent Transactions:** Fetches and displays a list of the last 5 transactions for the connected address using the Etherscan API (Sepolia testnet).
* **Copy Address to Clipboard:** A convenient button to copy the wallet address.

---

## Assumptions

* **MetaMask Availability:** It is assumed that the user has MetaMask installed and enabled in their browser. The application provides a message if MetaMask is not detected.
* **Etherscan API Key:** For fetching transaction history, a placeholder for `ETHERSCAN_API_KEY` is provided. For production use, a valid API key from Etherscan would be required to avoid rate limits.
* **Network:** The Etherscan API calls are currently configured for the Sepolia testnet. For other networks (e.g., Ethereum Mainnet), the `ETHERSCAN_API_BASE` constant would need to be adjusted, and a corresponding DAI contract address for that network would be required if DAI balance is to be shown.

---

## Extra Features / UX Considerations

* **Loading States:** Visual loading indicators are shown during asynchronous operations (connecting, fetching data, sending transactions) to improve user feedback.
* **Error Handling:** Basic error messages are displayed for connection failures, transaction issues, and data loading problems.
* **Responsive Design:** Tailwind CSS is used to ensure the UI adapts gracefully across different screen sizes (mobile, tablet, desktop).
* **SVG Icons:** Simple SVG icons are used for visual appeal and to enhance clarity without relying on external image assets.

---

## Live Deployment

[Live Webiste Link](https://wallet-dashboard-blush.vercel.app/)

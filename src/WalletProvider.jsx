import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { WalletContext } from './WalletContext';
import { ETHERSCAN_API_BASE, ETHERSCAN_API_KEY } from './constants'; // Import constants

// DAI Token Contract Address (Mainnet) and ABI
const DAI_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const DAI_ABI = [
    {
        "constant": true,
        "inputs": [{ "name": "_owner", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "balance", "type": "uint256" }],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{ "name": "symbol", "type": "string" }],
        "type": "function"
    }
];

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [network, setNetwork] = useState(null);
    const [ethBalance, setEthBalance] = useState(null);
    const [daiBalance, setDaiBalance] = useState(null);
    const [ensName, setEnsName] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [transactions, setTransactions] = useState([]);

    // Function to load wallet data (ETH, DAI, ENS, Transactions)
    const loadWalletData = useCallback(async (currentProvider, currentSigner, currentAccount) => {
        if (!currentProvider || !currentSigner || !currentAccount) return;

        setLoading(true);
        setError(null);
        setEthBalance(null);
        setDaiBalance(null);
        setEnsName(null);
        setTransactions([]);

        try {
            // FIX: Use currentProvider.getBalance(currentAccount) for robustness
            const ethBal = await currentProvider.getBalance(currentAccount);
            setEthBalance(ethers.formatEther(ethBal));

            const daiContract = new ethers.Contract(DAI_ADDRESS, DAI_ABI, currentProvider);
            const daiBal = await daiContract.balanceOf(currentAccount);
            setDaiBalance(ethers.formatEther(daiBal));

            const resolvedEnsName = await currentProvider.lookupAddress(currentAccount);
            setEnsName(resolvedEnsName);

            const txsUrl = `${ETHERSCAN_API_BASE}?module=account&action=txlist&address=${currentAccount}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
            const txsResponse = await fetch(txsUrl);
            const txsData = await txsResponse.json();

            if (txsData.status === "1" && Array.isArray(txsData.result)) {
                setTransactions(txsData.result.slice(0, 5));
            } else {
                console.warn("Etherscan API error or no transactions:", txsData.message);
            }

        } catch (err) {
            console.error("Error loading wallet data:", err);
            setError(err.message || "Failed to load wallet data. Please try again.");
            setEthBalance(null);
            setDaiBalance(null);
            setEnsName(null);
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Function to connect to MetaMask
    const connectWallet = useCallback(async () => {
        if (window.ethereum) {
            setLoading(true);
            setError(null);
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const selectedAccount = accounts[0];

                const ethProvider = new ethers.BrowserProvider(window.ethereum);
                const ethSigner = await ethProvider.getSigner();
                const ethNetwork = await ethProvider.getNetwork();

                setProvider(ethProvider);
                setSigner(ethSigner);
                setAccount(selectedAccount);
                setNetwork(ethNetwork);
                setIsConnected(true);

                await loadWalletData(ethProvider, ethSigner, selectedAccount);

            } catch (err) {
                console.error("Error connecting to MetaMask:", err);
                setError(err.message || "Failed to connect to MetaMask. Please ensure it's installed and unlocked.");
                setIsConnected(false);
                setAccount(null);
                setNetwork(null);
                setEthBalance(null);
                setDaiBalance(null);
                setEnsName(null);
                setTransactions([]);
            } finally {
                setLoading(false);
            }
        } else {
            setError("MetaMask is not installed. Please install it to use this dashboard.");
            setIsConnected(false);
        }
    }, [loadWalletData]);

    // Function to send ETH
    const sendEth = useCallback(async (toAddress, amountEth) => {
        if (!signer || !ethers.isAddress(toAddress)) {
            setError("Invalid recipient address or wallet not connected.");
            return;
        }
        if (isNaN(amountEth) || parseFloat(amountEth) <= 0) {
            setError("Invalid amount. Please enter a positive number.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const amountWei = ethers.parseEther(amountEth.toString());
            const tx = {
                to: toAddress,
                value: amountWei,
            };

            const transactionResponse = await signer.sendTransaction(tx);
            console.log('Transaction sent:', transactionResponse.hash);
            alert(`Transaction sent! Hash: ${transactionResponse.hash}`);
            await transactionResponse.wait();
            alert('Transaction confirmed!');
            await loadWalletData(provider, signer, account);

        } catch (err) {
            console.error("Error sending ETH:", err);
            setError(err.message || "Failed to send ETH. Please check amount and gas fees.");
        } finally {
            setLoading(false);
        }
    }, [signer, loadWalletData, provider, account]);

    // Function to disconnect (clear state)
    const disconnectWallet = useCallback(() => {
        setAccount(null);
        setNetwork(null);
        setEthBalance(null);
        setDaiBalance(null);
        setEnsName(null);
        setIsConnected(false);
        setProvider(null);
        setSigner(null);
        setLoading(false);
        setError(null);
        setTransactions([]);
    }, []);

    // Effect to handle MetaMask events (account/network changes)
    useEffect(() => {
        if (window.ethereum) {
            const handleAccountsChanged = (accounts) => {
                if (accounts.length === 0) {
                    disconnectWallet();
                } else {
                    const newAccount = accounts[0];
                    setAccount(newAccount);
                    if (window.ethereum) {
                        const ethProvider = new ethers.BrowserProvider(window.ethereum);
                        ethProvider.getSigner().then(ethSigner => {
                            setSigner(ethSigner);
                            loadWalletData(ethProvider, ethSigner, newAccount);
                        });
                        setProvider(ethProvider);
                    }
                }
            };

            const handleChainChanged = () => {
                if (isConnected) {
                    connectWallet();
                } else {
                    disconnectWallet();
                }
            };

            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);

            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            };
        }
    }, [connectWallet, disconnectWallet, isConnected, loadWalletData]);

    // Check for existing connection on initial load
    useEffect(() => {
        const checkConnection = async () => {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        const selectedAccount = accounts[0];
                        const ethProvider = new ethers.BrowserProvider(window.ethereum);
                        const ethSigner = await ethProvider.getSigner();
                        const ethNetwork = await ethProvider.getNetwork();

                        setProvider(ethProvider);
                        setSigner(ethSigner);
                        setAccount(selectedAccount);
                        setNetwork(ethNetwork);
                        setIsConnected(true);
                        await loadWalletData(ethProvider, ethSigner, selectedAccount);
                    }
                } catch (err) {
                    console.error("Error checking existing connection:", err);
                    setError("Failed to check existing connection.");
                }
            }
        };
        checkConnection();
    }, [loadWalletData]);

    return (
        <WalletContext.Provider value={{
            account,
            network,
            ethBalance,
            daiBalance,
            ensName,
            isConnected,
            loading,
            error,
            transactions,
            connectWallet,
            disconnectWallet,
            sendEth
        }}>
            {children}
        </WalletContext.Provider>
    );
};
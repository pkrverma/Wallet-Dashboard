import React, { useContext } from 'react';
import { WalletContext } from './WalletContext';
import { formatAddress } from './utils'; // Import helper function

const WalletInfoCard = () => {
    const { account, network, ensName } = useContext(WalletContext);

    const copyAddressToClipboard = () => {
        if (account) {
            const tempInput = document.createElement('textarea');
            tempInput.value = account;
            document.body.appendChild(tempInput);
            tempInput.select();
            try {
                document.execCommand('copy');
                alert('Address copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy address:', err);
                alert('Failed to copy address. Please copy manually.');
            } finally {
                document.body.removeChild(tempInput);
            }
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Wallet Details
            </h3>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm">Address:</p>
                <div className="flex items-center space-x-2">
                    <p className="text-gray-900 dark:text-white font-mono text-base break-all">
                        {ensName ? `${ensName} (${formatAddress(account)})` : formatAddress(account)}
                    </p>
                    <button onClick={copyAddressToClipboard} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200" title="Copy address">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                    </button>
                </div>
            </div>
            <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Network:</p>
                <p className="text-gray-900 dark:text-white font-semibold text-base">
                    {network?.name} (Chain ID: {network?.chainId})
                </p>
            </div>
        </div>
    );
};

export default WalletInfoCard;

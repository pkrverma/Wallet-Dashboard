import React, { useContext } from 'react';
import { WalletContext } from './WalletContext';

const ConnectWalletSection = () => {
    const { connectWallet, loading, error } = useContext(WalletContext);

    return (
        <div className="flex flex-col items-center space-y-6 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-900 rounded-lg shadow-inner">
            <p className="text-gray-700 dark:text-gray-300 text-xl font-medium text-center">
                Connect your MetaMask wallet to unlock the dashboard.
            </p>
            <button
                onClick={connectWallet}
                disabled={loading}
                className="w-full sm:w-2/3 lg:w-1/2 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
                {loading ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Connecting...</span>
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-.758l3.65-3.65m-2.72-2.72a4 4 0 015.656 0l4 4a4 4 0 11-5.656 5.656l-1.102-1.101M1.885 1.885c.343-.343.69-.679 1.04-.975L13.828 10.172zm-.758-.758l3.65 3.65m-2.72-2.72a4 4 0 015.656 0l4 4a4 4 0 11-5.656 5.656l-1.102-1.101" />
                        </svg>
                        <span>Connect Wallet</span>
                    </>
                )}
            </button>
            {error && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-4 text-center font-semibold">{error}</p>
            )}
        </div>
    );
};

export default ConnectWalletSection;
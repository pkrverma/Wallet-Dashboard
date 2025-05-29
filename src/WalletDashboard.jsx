import React, { useContext } from 'react';
import { WalletContext } from './WalletContext';
import ConnectWalletSection from './ConnectWalletSection';
import WalletInfoCard from './WalletInfoCard';
import BalancesCard from './BalancesCard';
import SendEthSection from './SendEthSection';
import RecentTransactionsSection from './RecentTransactionsSection';

const WalletDashboard = () => {
    const {
        isConnected,
        loading,
        error,
        disconnectWallet
    } = useContext(WalletContext);

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl space-y-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6 animate-fade-in">
                Your Web3 Wallet
            </h2>

            {!isConnected ? (
                <ConnectWalletSection />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <WalletInfoCard />
                    <BalancesCard />
                    <SendEthSection />
                    <RecentTransactionsSection />

                    <div className="md:col-span-2 flex justify-center mt-6">
                        <button
                            onClick={disconnectWallet}
                            className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition transform hover:scale-105"
                        >
                            Disconnect Wallet
                        </button>
                    </div>
                </div>
            )}
            {error && isConnected && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-4 text-center font-semibold">{error}</p>
            )}
        </div>
    );
};

export default WalletDashboard;
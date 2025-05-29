import React, { useContext } from 'react';
import { WalletContext } from './WalletContext';
import { EthIcon, DaiIcon } from './Icons'; // Import icons

const BalancesCard = () => {
    const { ethBalance, daiBalance, loading } = useContext(WalletContext);

    return (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-700 dark:to-indigo-900 p-6 rounded-xl shadow-lg border border-purple-200 dark:border-purple-700 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2h-1a2 2 0 01-2-2V8a2 2 0 012-2h1z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 17v-1a2 2 0 012-2h2c1.657 0 3-.895 3-2s-1.343-2-3-2H9c-1.657 0-3 .895-3 2v1a2 2 0 002 2h2a2 2 0 012 2v2a2 2 0 002 2h-1a2 2 0 01-2-2v-1z" />
                </svg>
                Your Balances
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-purple-200 dark:border-purple-600 pt-4">
                <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <EthIcon />
                    <div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">ETH</p>
                        <p className="text-gray-900 dark:text-white text-lg font-bold">
                            {loading ? '...' : `${parseFloat(ethBalance || 0).toFixed(4)}`}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <DaiIcon />
                    <div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">DAI</p>
                        <p className="text-gray-900 dark:text-white text-lg font-bold">
                            {loading ? '...' : `${parseFloat(daiBalance || 0).toFixed(2)}`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalancesCard;
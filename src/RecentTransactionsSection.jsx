import React, { useContext } from 'react';
import { WalletContext } from './WalletContext';
import { formatAddress } from './utils'; // Import helper function
import { ethers } from 'ethers'; // Import ethers for formatting

const RecentTransactionsSection = () => {
    const { transactions, account, loading } = useContext(WalletContext);

    return (
        <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-700 dark:to-indigo-900 p-6 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Recent Transactions
            </h3>
            <div className="border-t border-blue-200 dark:border-blue-600 pt-4">
                {loading ? (
                    <div className="space-y-3">
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse delay-75"></div>
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse delay-150"></div>
                    </div>
                ) : transactions.length > 0 ? (
                    <ul className="space-y-3">
                        {transactions.map((tx, index) => (
                            <li key={tx.hash || index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                                        {tx.from.toLowerCase() === account.toLowerCase() ? 'Outgoing' : 'Incoming'}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400">
                                        {new Date(parseInt(tx.timeStamp) * 1000).toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono break-all mt-1">
                                    Hash: <a href={`https://sepolia.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{formatAddress(tx.hash)}</a>
                                </p>
                                <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                                    {parseFloat(ethers.formatEther(tx.value)).toFixed(4)} ETH
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400 text-center py-4">No recent transactions found.</p>
                )}
            </div>
        </div>
    );
};

export default RecentTransactionsSection;
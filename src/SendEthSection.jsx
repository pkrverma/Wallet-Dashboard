import React, { useState, useContext } from 'react';
import { WalletContext } from './WalletContext';

const SendEthSection = () => {
    const { sendEth, loading } = useContext(WalletContext);
    const [sendToAddress, setSendToAddress] = useState('');
    const [sendAmount, setSendAmount] = useState('');
    const [sendError, setSendError] = useState(null);
    const [sendLoading, setSendLoading] = useState(false);

    const handleSendSubmit = async (e) => {
        e.preventDefault();
        setSendError(null);
        setSendLoading(true);
        try {
            await sendEth(sendToAddress, sendAmount);
            setSendToAddress('');
            setSendAmount('');
        } catch (err) {
            setSendError(err.message || "Transaction failed.");
        } finally {
            setSendLoading(false);
        }
    };

    return (
        <div className="md:col-span-2 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-700 dark:to-teal-900 p-6 rounded-xl shadow-lg border border-green-200 dark:border-green-700 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Ethereum (ETH)
            </h3>
            <form onSubmit={handleSendSubmit} className="space-y-4 border-t border-green-200 dark:border-green-600 pt-4">
                <div>
                    <label htmlFor="toAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Recipient Address</label>
                    <input
                        type="text"
                        id="toAddress"
                        value={sendToAddress}
                        onChange={(e) => setSendToAddress(e.target.value)}
                        placeholder="0x..."
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="sendAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount (ETH)</label>
                    <input
                        type="number"
                        id="sendAmount"
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                        placeholder="0.0"
                        step="any"
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={sendLoading || loading}
                    className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                    {sendLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Sending...</span>
                        </>
                    ) : (
                        <span>Send ETH</span>
                    )}
                </button>
                {sendError && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-2 text-center">{sendError}</p>
                )}
            </form>
        </div>
    );
};

export default SendEthSection;
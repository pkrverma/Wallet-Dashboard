import { WalletProvider } from './WalletProvider';
import WalletDashboard from './WalletDashboard';
import ThemeToggle from './ThemeToggle';

export default function App() {
    return (
        <div className="font-sans min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center p-4">
            {/* Tailwind CSS CDN for styling */}
            <script src="https://cdn.tailwindcss.com"></script>
            {/* Inter font from Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            <style>
                {`
                body {
                    font-family: 'Inter', sans-serif;
                }
                .dark {
                    color-scheme: dark;
                }
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>
            <ThemeToggle />
            <WalletProvider>
                <WalletDashboard />
            </WalletProvider>
        </div>
    );
}
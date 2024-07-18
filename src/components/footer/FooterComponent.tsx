import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    &copy; {new Date().getFullYear()} MedRecords. All rights reserved.
                </div>
                <nav className="flex space-x-4">
                    <Link href="/privacy" className="hover:text-gray-300">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="hover:text-gray-300">
                        Terms of Service
                    </Link>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;

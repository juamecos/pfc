import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 pb-12" aria-labelledby="footerHeading">
            <h2 id="footerHeading" className="sr-only">Footer</h2>
            <div className="mx-auto w-full max-w-screen-xl">
                <nav aria-label="Footer navigation">
                    <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
                        <div>
                            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h3>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link href="/about" className="hover:underline">About Us</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/careers" className="hover:underline">Career Opportunities</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/brand" className="hover:underline">Brand Center</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/blog" className="hover:underline">Latest Blog Posts</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Help center</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link href="/discord" className="hover:underline">Discord Server</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/twitter" className="hover:underline">Twitter</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/facebook" className="hover:underline">Facebook</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/contact" className="hover:underline">Contact Us</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/licensing" className="hover:underline">Licensing</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/terms" className="hover:underline">Terms & Conditions</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Download</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link href="/download/ios" className="hover:underline">iOS</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/download/android" className="hover:underline">Android</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/download/windows" className="hover:underline">Windows</Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="/download/macos" className="hover:underline">MacOS</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </footer>
    );
}

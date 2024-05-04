import { Link } from "@inertiajs/react";

export default function Logo({ setActiveLink }) {
    return (
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse" onClick={() => setActiveLink('Home')}>
            <img src="/images/logo.png" className="h-8" alt="Lapisgame Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">LapisGame</span>
        </Link>
    );
}
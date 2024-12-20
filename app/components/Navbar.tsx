// "use client";

// import Link from "next/link";
// import { useAuth } from "../context/AuthContext";
// import { useRouter } from "next/navigation";

// const Navbar = () => {
//     const { isLoggedIn, logout } = useAuth();
//     const router = useRouter();

//     const handleLogout = () => {
//         logout();
//         router.push("/login");
//     };

//     return (
//         <nav className="bg-black-900 text-white p-4 shadow-md fixed top-0 left-0 w-full z-10">
//             <div className="container mx-auto flex justify-between items-center">
//                 <Link href="/" className="flex items-center space-x-2 text-lg font-bold">
//                     <img
//                         src="/logo.png" // Replace with your logo path
//                         alt="Logo"
//                         className="h-8 w-8 rounded-full border border-gray-300"
//                     />
//                     <span>Data Analyst</span>
//                 </Link>
//                 <div className="flex space-x-4">
//                     <Link href="/">Home</Link>
//                     {isLoggedIn && (
//                         <>
//                             <Link href="/dashboard">App</Link>
//                             <Link href="/upload">Upload</Link>
//                             <button
//                                 onClick={handleLogout}
//                                 className="text-red-500 hover:text-red-400"
//                             >
//                                 Logout
//                             </button>
//                         </>
//                     )}
//                     {!isLoggedIn && <Link href="/login">Login</Link>}
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
//first

"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-black-900 text-amber-300 p-4 shadow-md fixed top-0 left-0 w-full z-10">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <Link href="/" className="flex items-center space-x-2 text-lg font-bold">
                    <img
                        src="/logo.webp" // Replace with your logo path
                        alt="Logo"
                        className="h-8 w-8 rounded-full border border-grey-300"
                    />
                    <span>Data Analyst</span>
                </Link>

                {/* Hamburger Icon */}
                <button
                    className="block md:hidden text-amber-300 focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        )}
                    </svg>
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-4">
                    <Link href="/" className="hover:text-amber-300">
                        Home
                    </Link>
                    {isLoggedIn && (
                        <>
                            <Link href="/dashboard" className="hover:text-amber-300">
                                App
                            </Link>
                            <Link href="/upload" className="hover:text-amber-300">
                                Upload
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-red-500 hover:text-red-300"
                            >
                                Logout
                            </button>
                        </>
                    )}
                    {!isLoggedIn && (
                        <Link href="/login" className="hover:text-amber-300">
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-7 bg-black-800 shadow-md rounded-lg">
                    <Link
                        href="/"
                        className="block px-4 py-2 text-sm hover:bg-black-700"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    {isLoggedIn && (
                        <>
                            <Link
                                href="/"
                                className="block px-4 py-2 text-sm hover:bg-black-700"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/dashboard"
                                className="block px-4 py-2 text-sm hover:bg-black-700"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                App
                            </Link>
                            <Link
                                href="/upload"
                                className="block px-4 py-2 text-sm hover:bg-black-700"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Upload
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:text-red-400"
                            >
                                Logout
                            </button>
                        </>
                    )}
                    {!isLoggedIn && (
                        <Link
                            href="/login"
                            className="block px-4 py-2 text-sm hover:bg-black-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;

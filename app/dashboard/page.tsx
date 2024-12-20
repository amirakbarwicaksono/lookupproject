// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import ProtectedRoute from "../components/ProtectedRoute";
// import { useAuth } from "../context/AuthContext";

// export default function DashboardPage() {
//     const [subpages, setSubpages] = useState<any[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const { access } = useAuth(); // Get access array from AuthContext

//     useEffect(() => {
//         const fetchSubpages = async () => {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subpages`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(access), // Send access array to backend
//                 });
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch subpages");
//                 }
//                 const data = await response.json();
//                 setSubpages(data);
//             } catch (err) {
//                 setError(err instanceof Error ? err.message : "An unknown error occurred");
//             }
//         };

//         if (access.length > 0) {
//             fetchSubpages();
//         }
//     }, [access]);

//     if (error) {
//         return (
//             <ProtectedRoute>
//                 <div className="min-h-screen bg-grey text-gray-200 p-6 flex items-center justify-center">
//                     <p className="text-red-500">Error: {error}</p>
//                 </div>
//             </ProtectedRoute>
//         );
//     }

//     if (subpages.length === 0) {
//         return (
//             <ProtectedRoute>
//                 <div className="min-h-screen bg-grey text-gray-200 p-6 flex items-center justify-center">
//                     <p className="text-lg text-gray-400">No subpages available.</p>
//                 </div>
//             </ProtectedRoute>
//         );
//     }

//     return (
//         <ProtectedRoute>
//             <div className="min-h-screen bg-grey text-white-100 p-6 justify-center">
//                 <h1 className="text-xl font-bold mb-1 text-center">Dashboard</h1>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {subpages.map((subpage) => {
//                         const hasAccess = access.includes(subpage.nick); // Check if user has access to this subpage
//                         return (
//                             <div
//                                 key={subpage.nick}
//                                 className={`flex flex-col items-center justify-center bg-gray-900 p-6 rounded-lg shadow ${
//                                     hasAccess ? "hover:bg-blue-700" : "bg-gray-800"
//                                 } transition duration-200`}
//                             >
//                                 {hasAccess ? (
//                                     <Link href={subpage.link}>
//                                         <h2 className="text-xl font-bold">{subpage.name}</h2>
//                                         <p className="text-1xl text-blue-700 text-center mt-1 font-bold uppercase">{subpage.nick}</p>
//                                     </Link>
//                                 ) : (
//                                     <div className="cursor-not-allowed">
//                                         <h2 className="text-xl font-bold">{subpage.name}</h2>
//                                         <p className="text-black-400">{subpage.nick}</p>
//                                         <p className="text-red-500 text-sm text-center mt-1 font-bold">Access Restricted</p>
//                                     </div>
//                                 )}
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </ProtectedRoute>
//     );
// }
//first code

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import ProtectedRoute from "../components/ProtectedRoute";
// import { useAuth } from "../context/AuthContext";

// export default function DashboardPage() {
//     const [subpages, setSubpages] = useState<any[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const { access } = useAuth(); // Get access array from AuthContext

//     useEffect(() => {
//         const fetchSubpages = async () => {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subpages`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(access), // Send access array to backend
//                 });
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch subpages");
//                 }
//                 const data = await response.json();
//                 setSubpages(data);
//             } catch (err) {
//                 setError(err instanceof Error ? err.message : "An unknown error occurred");
//             }
//         };

//         if (access.length > 0) {
//             fetchSubpages();
//         }
//     }, [access]);

//     if (error) {
//         return (
//             <ProtectedRoute>
//                 <div className="min-h-screen bg-grey text-gray-200 p-6 flex items-center justify-center">
//                     <p className="text-red-500">Error: {error}</p>
//                 </div>
//             </ProtectedRoute>
//         );
//     }

//     if (subpages.length === 0) {
//         return (
//             <ProtectedRoute>
//                 <div className="min-h-screen bg-grey text-gray-200 p-6 flex items-center justify-center">
//                     <p className="text-lg text-gray-400">No subpages available.</p>
//                 </div>
//             </ProtectedRoute>
//         );
//     }

//     return (
//         <ProtectedRoute>
//             <div className="min-h-screen bg-black text-gray-200 p-4">
//                 <h1 className="text-lg font-bold mb-2 text-center">Dashboard</h1>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {subpages.map((subpage) => {
//                         const hasAccess = access.includes(subpage.nick); // Check if user has access to this subpage
//                         return (
//                             <div
//                                 key={subpage.nick}
//                                 className={`p-2 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform ${
//                                     hasAccess ? "hover:scale-105" : "opacity-50 cursor-not-allowed"
//                                 }`}
//                             >
//                                 {hasAccess ? (
//                                     <Link href={subpage.link}>
//                                         <h4 className="text-sm font-medium mb-1">{subpage.name}</h4>
//                                         <p className="text-lg font-bold text-blue-700 uppercase">{subpage.nick}</p>
//                                     </Link>
//                                 ) : (
//                                     <div className="cursor-not-allowed">
//                                         <h4 className="text-sm font-medium mb-1">{subpage.name}</h4>
//                                         <p className="text-lg font-bold text-gray-500">{subpage.nick}</p>
//                                         <p className="text-red-500 text-xs font-bold mt-1">Access Restricted</p>
//                                     </div>
//                                 )}
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </ProtectedRoute>
//     );
// }
//iterasi 1
//iterasi 2

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import ProtectedRoute from "../components/ProtectedRoute";
// import { useAuth } from "../context/AuthContext";

// export default function DashboardPage() {
//     const [subpages, setSubpages] = useState<any[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const { access } = useAuth(); // Get access array from AuthContext

//     useEffect(() => {
//         const fetchSubpages = async () => {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subpages`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(access), // Send access array to backend
//                 });
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch subpages");
//                 }
//                 const data = await response.json();
//                 setSubpages(data);
//             } catch (err) {
//                 setError(err instanceof Error ? err.message : "An unknown error occurred");
//             }
//         };

//         if (access.length > 0) {
//             fetchSubpages();
//         }
//     }, [access]);

//     const renderSubpages = () => {
//         if (error) {
//             return <p className="text-red-500 text-center">{error}</p>;
//         }

//         if (subpages.length === 0) {
//             return <p className="text-lg text-gray-400 text-center">No subpages available.</p>;
//         }

//         return (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {subpages.map((subpage) => {
//                     const hasAccess = access.includes(subpage.nick); // Check if user has access to this subpage
//                     return (
//                         <div
//                             key={subpage.nick}
//                             className={`p-2 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform ${
//                                 hasAccess
//                                     ? "hover:scale-105 hover:bg-blue-700 cursor-pointer"
//                                     : "opacity-50 cursor-not-allowed"
//                             }`}
//                         >
//                             {hasAccess ? (
//                                 <Link href={subpage.link}>
//                                     <h4 className="text-sm font-medium mb-1 text-center">{subpage.name}</h4>
//                                     <p className="text-lg font-bold text-blue-700 uppercase text-center">{subpage.nick}</p>
//                                 </Link>
//                             ) : (
//                                 <div>
//                                     <h4 className="text-sm font-medium mb-1">{subpage.name}</h4>
//                                     <p className="text-lg font-bold text-gray-500">{subpage.nick}</p>
//                                     <p className="text-red-500 text-xs font-bold mt-1">Access Restricted</p>
//                                 </div>
//                             )}
//                         </div>
//                     );
//                 })}
//             </div>
//         );
//     };

//     return (
//         <ProtectedRoute>
//             <div className="min-h-screen bg-black text-gray-200 p-4">
//                 <h1 className="text-lg font-bold mb-2 text-center">Dashboard</h1>
//                 {renderSubpages()}
//             </div>
//         </ProtectedRoute>
//     );
// }
//iterasi 3

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
    const [subpages, setSubpages] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { access } = useAuth(); // Get access array from AuthContext

    useEffect(() => {
        const fetchSubpages = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subpages`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(access), // Send access array to backend
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch subpages");
                }
                const data = await response.json();
                setSubpages(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            }
        };

        if (access.length > 0) {
            fetchSubpages();
        }
    }, [access]);

    const renderSubpages = () => {
        if (error) {
            return <p className="text-red-500 text-center">{error}</p>;
        }

        if (subpages.length === 0) {
            return <p className="text-lg text-gray-400 text-center">No subpages available.</p>;
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subpages.map((subpage) => {
                    const hasAccess = access.includes(subpage.nick); // Check if user has access to this subpage
                    return (
                        <div
                            key={subpage.nick}
                            className={`p-2 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform ${
                                hasAccess
                                    ? "hover:scale-105 hover:bg-blue-resistance cursor-pointer"
                                    : "opacity-50 cursor-not-allowed"
                            }`}
                        >
                            {hasAccess ? (
                                <Link href={subpage.link}>
                                    <h4 className="text-lg font-medium mb-1 text-center">{subpage.name}</h4>
                                    <p className="text-xs font-bold text-amber-300 uppercase text-center">{subpage.nick}</p>
                                </Link>
                            ) : (
                                <div>
                                    <h4 className="text-sm font-medium mb-1">{subpage.name}</h4>
                                    <p className="text-lg font-bold text-gray-500">{subpage.nick}</p>
                                    <p className="text-red-500 text-xs font-bold mt-1">Access Restricted</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <ProtectedRoute>
        <div className="min-h-screen bg-black text-gray-200 p-4">
            {/* Teks Header */}
            <header className="mb-6">
                <h1 className="text-xl font-bold mb-1">Process Fee</h1>
                <p className="font-mono text-xs text-white-100">Choose Fee to the respective collections below.</p>
            </header>

                {/* Dashboard Content */}
                <h2 className="text-lg font-bold mb-2 text-center">Dashboard</h2>
                {renderSubpages()}
            </div>
        </ProtectedRoute>
    );
}

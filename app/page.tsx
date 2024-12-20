// "use client";

// import { useEffect, useState } from "react";

// type CollectionCount = {
//     collection: string;
//     count: number;
// };

// type UpdateLog = {
//     collection: string;
//     lastUpdated: string; // Assuming ISO 8601 date format
// };

// export default function HomePage() {
//     const collectionAliases: { [key: string]: string } = {
//         datakof: "Data Konsolidator Outbound Fee",
//         datakif: "Data Konsolidator Inbound Fee",
//         datasof: "Data Subkonsolidator Outbound Fee",
//         datasif: "Data Subkonsolidator Inbound Fee",
//         datapof: "Data Pickup Posactive Fee",
//         datafro: "Data Forward Rate Origin",
//         datafrd: "Data Forward Rate Destination",
//         mastermn_1: "Master Mitra Name",
//         masteric_2: "Master IC",
//         masterls_3: "Master Last Status",
//         mastertbs_4: "Master TBS",
//         masterbc_5: "Master Berat Corp",
//         masterrg_6: "Master Routing",
//         masterrf_7: "Master Rate Forward",
//         masterrt_8: "Master Rate Trucking",
//         masterdl_9: "Master DTPL",
//         mastermt_10: "Master MTUC",
//     };

//     const [collections, setCollections] = useState<CollectionCount[]>([]);
//     const [updateLogs, setUpdateLogs] = useState<UpdateLog[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [collectionsResponse, updateLogsResponse] = await Promise.all([
//                     fetch(`${process.env.NEXT_PUBLIC_API_URL}/countCollections`),
//                     fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUpdateLogs`),
//                 ]);

//                 if (!collectionsResponse.ok) {
//                     throw new Error(
//                         `Collections Error: ${collectionsResponse.status} ${collectionsResponse.statusText}`
//                     );
//                 }

//                 if (!updateLogsResponse.ok) {
//                     throw new Error(
//                         `Update Logs Error: ${updateLogsResponse.status} ${updateLogsResponse.statusText}`
//                     );
//                 }

//                 const collectionsResult = await collectionsResponse.json();
//                 const updateLogsResult = await updateLogsResponse.json();

//                 setCollections(collectionsResult);
//                 setUpdateLogs(updateLogsResult);
//                 setError(null);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setError("Failed to fetch data. Please try again later.");
//             }
//         };

//         fetchData();
//     }, []);

//     const getLastUpdated = (collectionName: string) => {
//         const log = updateLogs.find((log) => log.collection === collectionName);
//         return log ? new Date(log.lastUpdated).toLocaleString() : "No updates";
//     };

//     return (
//         <div className="min-h-screen bg-black text-gray-200 p-6">
//             <h1 className="text-2xl font-bold mb-0">Welcome to OurApp!</h1>
//             <p className="font-mono text-xs mb-1">Please ask Data Analyst Team for User and Access.</p>
//             <p className="text-xl font-bold mb-1 text-center">Informasi Database</p>
//             {error ? (
//                 <p className="text-red-500 text-center">{error}</p>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                     {Object.keys(collectionAliases).map((collectionName) => {
//                         const collectionData = collections.find((col) => col.collection === collectionName);
//                         return (
//                             <div
//                                 key={collectionName}
//                                 className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                             >
//                                 <h4 className="text-lg font-medium mb-2">{collectionAliases[collectionName]}</h4>
//                                 <p className="text-2xl font-bold text-blue-700">
//                                     {collectionData ? collectionData.count : "Loading..."}
//                                 </p>
//                                 <p className="text-sm text-gray-400">
//                                     Last updated: {getLastUpdated(collectionName)}
//                                 </p>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// }
// AWAL
//ITERASI

// "use client";

// import { useEffect, useState } from "react";

// type CollectionCount = {
//     collection: string;
//     count: number;
// };

// type UpdateLog = {
//     collection: string;
//     lastUpdated: string; // Assuming ISO 8601 date format
// };

// export default function HomePage() {
//     const dataCollections: { [key: string]: string } = {
//         datakof: "Data Konsolidator Outbound Fee",
//         datakif: "Data Konsolidator Inbound Fee",
//         datasof: "Data Subkonsolidator Outbound Fee",
//         datasif: "Data Subkonsolidator Inbound Fee",
//         datapof: "Data Pickup Posactive Fee",
//         datafro: "Data Forward Rate Origin",
//         datafrd: "Data Forward Rate Destination",
//     };

//     const masterCollections: { [key: string]: string } = {
//         mastermn_1: "Master Mitra Name",
//         masteric_2: "Master IC",
//         masterls_3: "Master Last Status",
//         mastertbs_4: "Master TBS",
//         masterbc_5: "Master Berat Corp",
//         masterrg_6: "Master Routing",
//         masterrf_7: "Master Rate Forward",
//         masterrt_8: "Master Rate Trucking",
//         masterdl_9: "Master DTPL",
//         mastermt_10: "Master MTUC",
//     };

//     const [collections, setCollections] = useState<CollectionCount[]>([]);
//     const [updateLogs, setUpdateLogs] = useState<UpdateLog[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [collectionsResponse, updateLogsResponse] = await Promise.all([
//                     fetch(`${process.env.NEXT_PUBLIC_API_URL}/countCollections`),
//                     fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUpdateLogs`),
//                 ]);

//                 if (!collectionsResponse.ok) {
//                     throw new Error(
//                         `Collections Error: ${collectionsResponse.status} ${collectionsResponse.statusText}`
//                     );
//                 }

//                 if (!updateLogsResponse.ok) {
//                     throw new Error(
//                         `Update Logs Error: ${updateLogsResponse.status} ${updateLogsResponse.statusText}`
//                     );
//                 }

//                 const collectionsResult = await collectionsResponse.json();
//                 const updateLogsResult = await updateLogsResponse.json();

//                 setCollections(collectionsResult);
//                 setUpdateLogs(updateLogsResult);
//                 setError(null);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setError("Failed to fetch data. Please try again later.");
//             }
//         };

//         fetchData();
//     }, []);

//     const getLastUpdated = (collectionName: string) => {
//         const log = updateLogs.find((log) => log.collection === collectionName);
//         return log ? new Date(log.lastUpdated).toLocaleString() : "No updates";
//     };

//     return (
//         <div className="min-h-screen bg-black text-gray-200 p-4">
//             <h1 className="text-lg font-bold mb-2">Welcome to OurApp!</h1>
//             <p className="text-sm mb-4">Please ask Data Analyst Team for User and Access.</p>

//             <section className="mb-8">
//                 <h2 className="text-xl font-bold mb-4 text-center">Informasi Data</h2>
//                 {error ? (
//                     <p className="text-red-500 text-center">{error}</p>
//                 ) : (
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                         {Object.keys(dataCollections).map((collectionName) => {
//                             const collectionData = collections.find((col) => col.collection === collectionName);
//                             return (
//                                 <div
//                                     key={collectionName}
//                                     className="p-2 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                 >
//                                     <h4 className="text-sm font-medium mb-1">{dataCollections[collectionName]}</h4>
//                                     <p className="text-lg font-bold text-blue-700">
//                                         {collectionData ? collectionData.count : "Loading..."}
//                                     </p>
//                                     <p className="text-xs text-gray-400">
//                                         Last updated: {getLastUpdated(collectionName)}
//                                     </p>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 )}
//             </section>

//             <section>
//                 <h2 className="text-xl font-bold mb-4 text-center">Informasi Master</h2>
//                 {error ? (
//                     <p className="text-red-500 text-center">{error}</p>
//                 ) : (
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                         {Object.keys(masterCollections).map((collectionName) => {
//                             const collectionData = collections.find((col) => col.collection === collectionName);
//                             return (
//                                 <div
//                                     key={collectionName}
//                                     className="p-2 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                 >
//                                     <h4 className="text-sm font-medium mb-1">{masterCollections[collectionName]}</h4>
//                                     <p className="text-lg font-bold text-blue-700">
//                                         {collectionData ? collectionData.count : "Loading..."}
//                                     </p>
//                                     <p className="text-xs text-gray-400">
//                                         Last updated: {getLastUpdated(collectionName)}
//                                     </p>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 )}
//             </section>
//         </div>
//     );
// }
//ITERASI 2

// "use client";

// import { useEffect, useState } from "react";

// type CollectionCount = {
//     collection: string;
//     count: number;
// };

// type UpdateLog = {
//     collection: string;
//     lastUpdated: string; // Assuming ISO 8601 date format
// };

// export default function HomePage() {
//     const dataCollections: { [key: string]: string } = {
//         datakof: "Data Konsolidator Outbound Fee",
//         datakif: "Data Konsolidator Inbound Fee",
//         datasof: "Data Subkonsolidator Outbound Fee",
//         datasif: "Data Subkonsolidator Inbound Fee",
//         datapof: "Data Pickup Posactive Fee",
//         datafro: "Data Forward Rate Origin",
//         datafrd: "Data Forward Rate Destination",
//     };

//     const masterCollections: { [key: string]: string } = {
//         mastermn_1: "Master Mitra Name",
//         masteric_2: "Master IC",
//         masterls_3: "Master Last Status",
//         mastertbs_4: "Master TBS",
//         masterbc_5: "Master Berat Corp",
//         masterrg_6: "Master Routing",
//         masterrf_7: "Master Rate Forward",
//         masterrt_8: "Master Rate Trucking",
//         masterdl_9: "Master DTPL",
//         mastermt_10: "Master MTUC",
//     };

//     const [collections, setCollections] = useState<CollectionCount[]>([]);
//     const [updateLogs, setUpdateLogs] = useState<UpdateLog[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [collectionsResponse, updateLogsResponse] = await Promise.all([
//                     fetch(`${process.env.NEXT_PUBLIC_API_URL}/countCollections`),
//                     fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUpdateLogs`),
//                 ]);

//                 if (!collectionsResponse.ok) {
//                     throw new Error(
//                         `Collections Error: ${collectionsResponse.status} ${collectionsResponse.statusText}`
//                     );
//                 }

//                 if (!updateLogsResponse.ok) {
//                     throw new Error(
//                         `Update Logs Error: ${updateLogsResponse.status} ${updateLogsResponse.statusText}`
//                     );
//                 }

//                 const collectionsResult = await collectionsResponse.json();
//                 const updateLogsResult = await updateLogsResponse.json();

//                 setCollections(collectionsResult);
//                 setUpdateLogs(updateLogsResult);
//                 setError(null);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setError("Failed to fetch data. Please try again later.");
//             }
//         };

//         fetchData();
//     }, []);

//     const getLastUpdated = (collectionName: string) => {
//         const log = updateLogs.find((log) => log.collection === collectionName);
//         return log ? new Date(log.lastUpdated).toLocaleString() : "No updates";
//     };

//     return (
//         <div className="min-h-screen bg-black text-gray-200 p-6 flex flex-col md:flex-row gap-6">
//             {/* Section Data */}
//             <section className="flex-1">
//                 <h2 className="text-xl font-bold mb-4 text-center">Informasi Data</h2>
//                 {error ? (
//                     <p className="text-red-500 text-center">{error}</p>
//                 ) : (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {Object.keys(dataCollections).map((collectionName) => {
//                             const collectionData = collections.find((col) => col.collection === collectionName);
//                             return (
//                                 <div
//                                     key={collectionName}
//                                     className="p-2 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                 >
//                                     <h4 className="text-sm font-medium mb-1">{dataCollections[collectionName]}</h4>
//                                     <p className="text-lg font-bold text-blue-700">
//                                         {collectionData ? collectionData.count : "Loading..."}
//                                     </p>
//                                     <p className="text-xs text-gray-400">
//                                         Last updated: {getLastUpdated(collectionName)}
//                                     </p>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 )}
//             </section>

//             {/* Section Master */}
//             <section className="flex-1">
//                 <h2 className="text-xl font-bold mb-4 text-center">Informasi Master</h2>
//                 {error ? (
//                     <p className="text-red-500 text-center">{error}</p>
//                 ) : (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {Object.keys(masterCollections).map((collectionName) => {
//                             const collectionData = collections.find((col) => col.collection === collectionName);
//                             return (
//                                 <div
//                                     key={collectionName}
//                                     className="p-2 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                 >
//                                     <h4 className="text-sm font-medium mb-1">{masterCollections[collectionName]}</h4>
//                                     <p className="text-lg font-bold text-blue-700">
//                                         {collectionData ? collectionData.count : "Loading..."}
//                                     </p>
//                                     <p className="text-xs text-gray-400">
//                                         Last updated: {getLastUpdated(collectionName)}
//                                     </p>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 )}
//             </section>
//         </div>
//     );
// }
// ITERASI 3

// "use client";

// import { useEffect, useState } from "react";

// type CollectionCount = {
//     collection: string;
//     count: number;
// };

// type UpdateLog = {
//     collection: string;
//     lastUpdated: string; // Assuming ISO 8601 date format
// };

// export default function HomePage() {
//     const dataCollections: { [key: string]: string } = {
//         datakof: "Data Konsolidator Outbound Fee (KOF)",
//         datakif: "Data Konsolidator Inbound Fee (KIF)",
//         datasof: "Data Subkonsolidator Outbound Fee (SOF)",
//         datasif: "Data Subkonsolidator Inbound Fee (SIF)",
//         datapof: "Data Pickup Posactive Fee (POF)",
//         datafro: "Data Forward Rate Origin (FRO)",
//         datafrd: "Data Forward Rate Destination (FRD)",
//     };

//     const masterCollections: { [key: string]: string } = {
//         mastermn_1: "Master Mitra Name",
//         masteric_2: "Master IC",
//         masterls_3: "Master Last Status",
//         mastertbs_4: "Master TBS Data KOF",
//         mastertbs_41: "Master TBS Data KIF",
//         mastertbs_42: "Master TBS Data SOF",
//         mastertbs_43: "Master TBS Data SIF",
//         mastertbs_44: "Master TBS Data POF",
//         mastertbs_45: "Master TBS Data FRO",
//         mastertbs_46: "Master TBS Data FRD",
//         masterbc_5: "Master Berat Corp",
//         masterrg_6: "Master Routing",
//         masterrf_7: "Master Rate Forward",
//         masterrt_8: "Master Rate Trucking",
//         masterdl_9: "Master DTPL",
//         mastermt_10: "Master MTUC",
//     };

//     const [collections, setCollections] = useState<CollectionCount[]>([]);
//     const [updateLogs, setUpdateLogs] = useState<UpdateLog[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [collectionsResponse, updateLogsResponse] = await Promise.all([
//                     fetch(`${process.env.NEXT_PUBLIC_API_URL}/countCollections`),
//                     fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUpdateLogs`),
//                 ]);

//                 if (!collectionsResponse.ok) {
//                     throw new Error(
//                         `Collections Error: ${collectionsResponse.status} ${collectionsResponse.statusText}`
//                     );
//                 }

//                 if (!updateLogsResponse.ok) {
//                     throw new Error(
//                         `Update Logs Error: ${updateLogsResponse.status} ${updateLogsResponse.statusText}`
//                     );
//                 }

//                 const collectionsResult = await collectionsResponse.json();
//                 const updateLogsResult = await updateLogsResponse.json();

//                 setCollections(collectionsResult);
//                 setUpdateLogs(updateLogsResult);
//                 setError(null);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setError("Failed to fetch data. Please try again later.");
//             }
//         };

//         fetchData();
//     }, []);

//     const getLastUpdated = (collectionName: string) => {
//         const log = updateLogs.find((log) => log.collection === collectionName);
//         return log ? new Date(log.lastUpdated).toLocaleString() : "No updates";
//     };

//     return (
//         <div className="min-h-screen bg-black text-gray-200 p-1">
//             {/* Teks Header */}
//             <header className="mb-6">
//                 <h1 className="text-xl font-bold mb-1">Fee App!</h1>
//                 <p className="font-mono text-xs text-white-100">Login for access menu function.</p>
//             </header>

//             {/* Layout Dua Kolom */}
//             <div className="flex flex-col md:flex-row gap-28">
//                 {/* Section Data */}
//                 <section className="flex-1">
//                     <h2 className="text-xl font-bold mb-2 text-center">Informasi Data</h2>
//                     {error ? (
//                         <p className="text-red-500 text-center">{error}</p>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
//                             {Object.keys(dataCollections).map((collectionName) => {
//                                 const collectionData = collections.find((col) => col.collection === collectionName);
//                                 return (
//                                     <div
//                                         key={collectionName}
//                                         className="p-2 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                     >
//                                         <h4 className="text-sm font-medium mb-0">{dataCollections[collectionName]}</h4>
//                                         <p className="text-sm font-bold text-amber-300">
//                                             {collectionData ? collectionData.count : "Loading..."}
//                                         </p>
//                                         <p className="text-xs text-gray-400">
//                                             Last updated: {getLastUpdated(collectionName)}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </section>

//                 {/* Section Master */}
//                 <section className="flex-1">
//                     <h2 className="text-xl font-bold mb-2 text-center">Informasi Master</h2>
//                     {error ? (
//                         <p className="text-red-500 text-center">{error}</p>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
//                             {Object.keys(masterCollections).map((collectionName) => {
//                                 const collectionData = collections.find((col) => col.collection === collectionName);
//                                 return (
//                                     <div
//                                         key={collectionName}
//                                         className="p-2 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                     >
//                                         <h4 className="text-sm font-medium mb-0">{masterCollections[collectionName]}</h4>
//                                         <p className="text-sm font-bold text-amber-300">
//                                             {collectionData ? collectionData.count : "Loading..."}
//                                         </p>
//                                         <p className="text-xs text-gray-400">
//                                             Last updated: {getLastUpdated(collectionName)}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </section>
//             </div>
//         </div>
//     );
// }
//ITERASI 4

// "use client";

// import { useEffect, useState } from "react";

// type CollectionCount = {
//     collection: string;
//     count: number;
// };

// type UpdateLog = {
//     collection: string;
//     lastUpdated: string; // Assuming ISO 8601 date format
// };

// export default function HomePage() {
//     const dataCollections: { [key: string]: string } = {
//         datakof: "Data Konsolidator Outbound Fee (KOF)",
//         datakif: "Data Konsolidator Inbound Fee (KIF)",
//         datasof: "Data Subkonsolidator Outbound Fee (SOF)",
//         datasif: "Data Subkonsolidator Inbound Fee (SIF)",
//         datapof: "Data Pickup Posactive Fee (POF)",
//         datafro: "Data Forward Rate Origin (FRO)",
//         datafrd: "Data Forward Rate Destination (FRD)",
//     };

//     const masterCollections: { [key: string]: string } = {
//         mastermn_1: "Master Mitra Name",
//         masteric_2: "Master IC",
//         masterls_3: "Master Last Status",
//         masterbc_5: "Master Berat Corp",
//         masterrg_6: "Master Routing",
//         masterrf_7: "Master Rate Forward",
//         masterrt_8: "Master Rate Trucking",
//         masterdl_9: "Master DTPL",
//         mastermt_10: "Master MTUC",
//     };

//     const tbsCollections: { [key: string]: string } = {
//         mastertbs_4: "Master TBS Data KOF",
//         mastertbs_41: "Master TBS Data KIF",
//         mastertbs_42: "Master TBS Data SOF",
//         mastertbs_43: "Master TBS Data SIF",
//         mastertbs_44: "Master TBS Data POF",
//         mastertbs_45: "Master TBS Data FRO",
//         mastertbs_46: "Master TBS Data FRD",
//     };

//     const [collections, setCollections] = useState<CollectionCount[]>([]);
//     const [updateLogs, setUpdateLogs] = useState<UpdateLog[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [collectionsResponse, updateLogsResponse] = await Promise.all([
//                     fetch(`${process.env.NEXT_PUBLIC_API_URL}/countCollections`),
//                     fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUpdateLogs`),
//                 ]);

//                 if (!collectionsResponse.ok) {
//                     throw new Error(
//                         `Collections Error: ${collectionsResponse.status} ${collectionsResponse.statusText}`
//                     );
//                 }

//                 if (!updateLogsResponse.ok) {
//                     throw new Error(
//                         `Update Logs Error: ${updateLogsResponse.status} ${updateLogsResponse.statusText}`
//                     );
//                 }

//                 const collectionsResult = await collectionsResponse.json();
//                 const updateLogsResult = await updateLogsResponse.json();

//                 setCollections(collectionsResult);
//                 setUpdateLogs(updateLogsResult);
//                 setError(null);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setError("Failed to fetch data. Please try again later.");
//             }
//         };

//         fetchData();
//     }, []);

//     const getLastUpdated = (collectionName: string) => {
//         const log = updateLogs.find((log) => log.collection === collectionName);
//         return log ? new Date(log.lastUpdated).toLocaleString() : "No updates";
//     };

//     return (
//         <div className="min-h-screen bg-black text-gray-200 p-1">
//             {/* Header */}
//             <header className="mb-6">
//                 <h1 className="text-xl font-bold mb-1">Fee App!</h1>
//                 <p className="font-mono text-xs text-white-100">Login for access menu function.</p>
//             </header>

//             {/* Layout for Data Master and Master TBS Data */}
//             <div className="flex flex-col md:flex-row gap-28">
//                 {/* Section Data */}
//                 <section className="flex-1">
//                     <h2 className="text-xl font-bold mb-2 text-center">Informasi Data</h2>
//                     {error ? (
//                         <p className="text-red-500 text-center">{error}</p>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
//                             {Object.keys(dataCollections).map((collectionName) => {
//                                 const collectionData = collections.find((col) => col.collection === collectionName);
//                                 return (
//                                     <div
//                                         key={collectionName}
//                                         className="p-2 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                     >
//                                         <h4 className="text-sm font-medium mb-0">{dataCollections[collectionName]}</h4>
//                                         <p className="text-sm font-bold text-amber-300">
//                                             {collectionData ? collectionData.count : "Loading..."}
//                                         </p>
//                                         <p className="text-xs text-gray-400">
//                                             Last updated: {getLastUpdated(collectionName)}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </section>

//                 {/* Section Master */}
//                 <section className="flex-1">
//                     <h2 className="text-xl font-bold mb-2 text-center">All Data Master</h2>
//                     {error ? (
//                         <p className="text-red-500 text-center">{error}</p>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
//                             {Object.keys(masterCollections).map((collectionName) => {
//                                 const collectionData = collections.find((col) => col.collection === collectionName);
//                                 return (
//                                     <div
//                                         key={collectionName}
//                                         className="p-2 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                     >
//                                         <h4 className="text-sm font-medium mb-0">{masterCollections[collectionName]}</h4>
//                                         <p className="text-sm font-bold text-amber-300">
//                                             {collectionData ? collectionData.count : "Loading..."}
//                                         </p>
//                                         <p className="text-xs text-gray-400">
//                                             Last updated: {getLastUpdated(collectionName)}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </section>

//                 {/* Section Master TBS */}
//                 <section className="flex-1">
//                     <h2 className="text-xl font-bold mb-2 text-center">All Master TBS Data</h2>
//                     {error ? (
//                         <p className="text-red-500 text-center">{error}</p>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
//                             {Object.keys(tbsCollections).map((collectionName) => {
//                                 const collectionData = collections.find((col) => col.collection === collectionName);
//                                 return (
//                                     <div
//                                         key={collectionName}
//                                         className="p-2 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                     >
//                                         <h4 className="text-sm font-medium mb-0">{tbsCollections[collectionName]}</h4>
//                                         <p className="text-sm font-bold text-amber-300">
//                                             {collectionData ? collectionData.count : "Loading..."}
//                                         </p>
//                                         <p className="text-xs text-gray-400">
//                                             Last updated: {getLastUpdated(collectionName)}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </section>
//             </div>
//         </div>
//     );
// }
//iterasi 5

// "use client";

// import { useEffect, useState } from "react";

// type CollectionCount = {
//     collection: string;
//     count: number;
// };

// type UpdateLog = {
//     collection: string;
//     lastUpdated: string; // Assuming ISO 8601 date format
// };

// export default function HomePage() {
//     const dataCollections: { [key: string]: string } = {
//         datakof: "Data Konsolidator Outbound Fee (KOF)",
//         datakif: "Data Konsolidator Inbound Fee (KIF)",
//         datasof: "Data Subkonsolidator Outbound Fee (SOF)",
//         datasif: "Data Subkonsolidator Inbound Fee (SIF)",
//         datapof: "Data Pickup Posactive Fee (POF)",
//         datafro: "Data Forward Rate Origin (FRO)",
//         datafrd: "Data Forward Rate Destination (FRD)",
//     };

//     const masterCollections: { [key: string]: string } = {
//         mastermn_1: "Master Mitra Name",
//         masteric_2: "Master IC",
//         masterls_3: "Master Last Status",
//         masterbc_5: "Master Berat Corp",
//         masterrg_6: "Master Routing",
//         masterrf_7: "Master Rate Forward",
//         masterrt_8: "Master Rate Trucking",
//         masterdl_9: "Master DTPL",
//         mastermt_10: "Master MTUC",
//     };

//     const tbsCollections: { [key: string]: string } = {
//         mastertbs_4: "Master TBS Data KOF",
//         mastertbs_41: "Master TBS Data KIF",
//         mastertbs_42: "Master TBS Data SOF",
//         mastertbs_43: "Master TBS Data SIF",
//         mastertbs_44: "Master TBS Data POF",
//         mastertbs_45: "Master TBS Data FRO",
//         mastertbs_46: "Master TBS Data FRD",
//     };

//     const [collections, setCollections] = useState<CollectionCount[]>([]);
//     const [updateLogs, setUpdateLogs] = useState<UpdateLog[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [collectionsResponse, updateLogsResponse] = await Promise.all([
//                     fetch(`${process.env.NEXT_PUBLIC_API_URL}/countCollections`),
//                     fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUpdateLogs`),
//                 ]);

//                 if (!collectionsResponse.ok) {
//                     throw new Error(
//                         `Collections Error: ${collectionsResponse.status} ${collectionsResponse.statusText}`
//                     );
//                 }

//                 if (!updateLogsResponse.ok) {
//                     throw new Error(
//                         `Update Logs Error: ${updateLogsResponse.status} ${updateLogsResponse.statusText}`
//                     );
//                 }

//                 const collectionsResult = await collectionsResponse.json();
//                 const updateLogsResult = await updateLogsResponse.json();

//                 setCollections(collectionsResult);
//                 setUpdateLogs(updateLogsResult);
//                 setError(null);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setError("Failed to fetch data. Please try again later.");
//             }
//         };

//         fetchData();
//     }, []);

//     const getLastUpdated = (collectionName: string) => {
//         const log = updateLogs.find((log) => log.collection === collectionName);
//         return log ? new Date(log.lastUpdated).toLocaleString() : "No updates";
//     };

//     return (
//         <div className="min-h-screen bg-black text-gray-200 p-1">
//             {/* Header */}
//             <header className="mb-6">
//                 <h1 className="text-xl font-bold mb-1">Fee App!</h1>
//                 <p className="font-mono text-xs text-white-100">Login for access menu function.</p>
//             </header>

//             {/* Layout for Data Master and Master TBS Data */}
//             <div className="flex flex-col md:flex-row gap-28">
//                 {/* Section Data */}
//                 <section className="flex-1">
//                     <h2 className="text-xl font-bold mb-2 text-center">Informasi Data</h2>
//                     {error ? (
//                         <p className="text-red-500 text-center">{error}</p>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
//                             {Object.keys(dataCollections).map((collectionName) => {
//                                 const collectionData = collections.find((col) => col.collection === collectionName);
//                                 return (
//                                     <div
//                                         key={collectionName}
//                                         className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                     >
//                                         <h4
//                                             className="text-sm font-medium mb-1 truncate"
//                                             title={dataCollections[collectionName]}
//                                         >
//                                             {dataCollections[collectionName]}
//                                         </h4>
//                                         <p className="text-sm font-bold text-amber-300">
//                                             {collectionData ? collectionData.count : "Loading..."}
//                                         </p>
//                                         <p className="text-xs text-gray-400">
//                                             Last updated: {getLastUpdated(collectionName)}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </section>

//                 {/* Section Master */}
//                 <section className="flex-1">
//                     <h2 className="text-xl font-bold mb-2 text-center">All Data Master</h2>
//                     {error ? (
//                         <p className="text-red-500 text-center">{error}</p>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
//                             {Object.keys(masterCollections).map((collectionName) => {
//                                 const collectionData = collections.find((col) => col.collection === collectionName);
//                                 return (
//                                     <div
//                                         key={collectionName}
//                                         className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                     >
//                                         <h4
//                                             className="text-sm font-medium mb-1 truncate"
//                                             title={masterCollections[collectionName]}
//                                         >
//                                             {masterCollections[collectionName]}
//                                         </h4>
//                                         <p className="text-sm font-bold text-amber-300">
//                                             {collectionData ? collectionData.count : "Loading..."}
//                                         </p>
//                                         <p className="text-xs text-gray-400">
//                                             Last updated: {getLastUpdated(collectionName)}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </section>

//                 {/* Section Master TBS */}
//                 <section className="flex-1">
//                     <h2 className="text-xl font-bold mb-2 text-center">All Master TBS Data</h2>
//                     {error ? (
//                         <p className="text-red-500 text-center">{error}</p>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
//                             {Object.keys(tbsCollections).map((collectionName) => {
//                                 const collectionData = collections.find((col) => col.collection === collectionName);
//                                 return (
//                                     <div
//                                         key={collectionName}
//                                         className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                     >
//                                         <h4
//                                             className="text-sm font-medium mb-1 truncate"
//                                             title={tbsCollections[collectionName]}
//                                         >
//                                             {tbsCollections[collectionName]}
//                                         </h4>
//                                         <p className="text-sm font-bold text-amber-300">
//                                             {collectionData ? collectionData.count : "Loading..."}
//                                         </p>
//                                         <p className="text-xs text-gray-400">
//                                             Last updated: {getLastUpdated(collectionName)}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </section>
//             </div>
//         </div>
//     );
// }
//iterasi 6 

// "use client";

// import { useEffect, useState } from "react";

// type CollectionCount = {
//     collection: string;
//     count: number;
// };

// type UpdateLog = {
//     collection: string;
//     lastUpdated: string; // Assuming ISO 8601 date format
// };

// export default function HomePage() {
//     const dataCollections: { [key: string]: string } = {
//         datakof: "Data Konsolidator Outbound Fee (KOF)",
//         datakif: "Data Konsolidator Inbound Fee (KIF)",
//         datasof: "Data Subkonsolidator Outbound Fee (SOF)",
//         datasif: "Data Subkonsolidator Inbound Fee (SIF)",
//         datapof: "Data Pickup Posactive Fee (POF)",
//         datafro: "Data Forward Rate Origin (FRO)",
//         datafrd: "Data Forward Rate Destination (FRD)",
//     };

//     const tbsCollections: { [key: string]: string } = {
//         mastertbs_4: "Master TBS Data KOF",
//         mastertbs_41: "Master TBS Data KIF",
//         mastertbs_42: "Master TBS Data SOF",
//         mastertbs_43: "Master TBS Data SIF",
//         mastertbs_44: "Master TBS Data POF",
//         mastertbs_45: "Master TBS Data FRO",
//         mastertbs_46: "Master TBS Data FRD",
//     };

//     const masterCollections: { [key: string]: string } = {
//         mastermn_1: "Master Mitra Name",
//         masteric_2: "Master IC",
//         masterls_3: "Master Last Status",
//         masterbc_5: "Master Berat Corp",
//         masterrg_6: "Master Routing",
//         masterrf_7: "Master Rate Forward",
//         masterrt_8: "Master Rate Trucking",
//         masterdl_9: "Master DTPL",
//         mastermt_10: "Master MTUC",
//     };

//     const [collections, setCollections] = useState<CollectionCount[]>([]);
//     const [updateLogs, setUpdateLogs] = useState<UpdateLog[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [collectionsResponse, updateLogsResponse] = await Promise.all([
//                     fetch(`${process.env.NEXT_PUBLIC_API_URL}/countCollections`),
//                     fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUpdateLogs`),
//                 ]);

//                 if (!collectionsResponse.ok) {
//                     throw new Error(
//                         `Collections Error: ${collectionsResponse.status} ${collectionsResponse.statusText}`
//                     );
//                 }

//                 if (!updateLogsResponse.ok) {
//                     throw new Error(
//                         `Update Logs Error: ${updateLogsResponse.status} ${updateLogsResponse.statusText}`
//                     );
//                 }

//                 const collectionsResult = await collectionsResponse.json();
//                 const updateLogsResult = await updateLogsResponse.json();

//                 setCollections(collectionsResult);
//                 setUpdateLogs(updateLogsResult);
//                 setError(null);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setError("Failed to fetch data. Please try again later.");
//             }
//         };

//         fetchData();
//     }, []);

//     const getLastUpdated = (collectionName: string) => {
//         const log = updateLogs.find((log) => log.collection === collectionName);
//         return log ? new Date(log.lastUpdated).toLocaleString() : "No updates";
//     };

//     return (
//         <div className="min-h-screen bg-black text-gray-200 p-1">
//             {/* Teks Header */}
//             <header className="mb-6">
//                 <h1 className="text-xl font-bold mb-1">Fee App!</h1>
//                 <p className="font-mono text-xs text-white-100">Login for access menu function.</p>
//             </header>

//             {/* Layout */}
//             <div className="flex flex-col gap-28">
//                 {/* Section Data */}
//                 <section className="flex-1">
//                     <h2 className="text-xl font-bold mb-2 text-center">Informasi Data</h2>
//                     {error ? (
//                         <p className="text-red-500 text-center">{error}</p>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center">
//                             {Object.keys(dataCollections).map((collectionName) => {
//                                 const collectionData = collections.find((col) => col.collection === collectionName);
//                                 return (
//                                     <div
//                                         key={collectionName}
//                                         className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                     >
//                                         <h4
//                                             className="text-sm font-medium mb-1 truncate"
//                                             title={dataCollections[collectionName]}
//                                         >
//                                             {dataCollections[collectionName]}
//                                         </h4>
//                                         <p className="text-sm font-bold text-amber-300">
//                                             {collectionData ? collectionData.count : "Loading..."}
//                                         </p>
//                                         <p className="text-xs text-gray-400">
//                                             Last updated: {getLastUpdated(collectionName)}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </section>

//                 {/* Section Master TBS */}
//                 <section className="flex-">
//                     <h2 className="text-xl font-bold mb-2 text-center">All Master TBS Data</h2>
//                     {error ? (
//                         <p className="text-red-500 text-center">{error}</p>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center">
//                             {Object.keys(tbsCollections).map((collectionName) => {
//                                 const collectionData = collections.find((col) => col.collection === collectionName);
//                                 return (
//                                     <div
//                                         key={collectionName}
//                                         className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                     >
//                                         <h4
//                                             className="text-sm font-medium mb-1 truncate"
//                                             title={tbsCollections[collectionName]}
//                                         >
//                                             {tbsCollections[collectionName]}
//                                         </h4>
//                                         <p className="text-sm font-bold text-amber-300">
//                                             {collectionData ? collectionData.count : "Loading..."}
//                                         </p>
//                                         <p className="text-xs text-gray-400">
//                                             Last updated: {getLastUpdated(collectionName)}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </section>

//                 {/* Section All Data Master */}
//                 <section className="flex-1">
//                     <h2 className="text-xl font-bold mb-2 text-center">All Data Master</h2>
//                     {error ? (
//                         <p className="text-red-500 text-center">{error}</p>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center">
//                             {Object.keys(masterCollections).map((collectionName) => {
//                                 const collectionData = collections.find((col) => col.collection === collectionName);
//                                 return (
//                                     <div
//                                         key={collectionName}
//                                         className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                     >
//                                         <h4
//                                             className="text-sm font-medium mb-1 truncate"
//                                             title={masterCollections[collectionName]}
//                                         >
//                                             {masterCollections[collectionName]}
//                                         </h4>
//                                         <p className="text-sm font-bold text-amber-300">
//                                             {collectionData ? collectionData.count : "Loading..."}
//                                         </p>
//                                         <p className="text-xs text-gray-400">
//                                             Last updated: {getLastUpdated(collectionName)}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </section>
//             </div>
//         </div>
//     );
// }
//iterasi 7 (ok)

// "use client";

// import { useEffect, useState } from "react";

// type CollectionCount = {
//     collection: string;
//     count: number;
// };

// type UpdateLog = {
//     collection: string;
//     lastUpdated: string; // Assuming ISO 8601 date format
// };

// export default function HomePage() {
//     const dataCollections: { [key: string]: string } = {
//         datakof: "Data Konsolidator Outbound Fee (KOF)",
//         datakif: "Data Konsolidator Inbound Fee (KIF)",
//         datasof: "Data Subkonsolidator Outbound Fee (SOF)",
//         datasif: "Data Subkonsolidator Inbound Fee (SIF)",
//         datapof: "Data Pickup Posactive Fee (POF)",
//         datafro: "Data Forward Rate Origin (FRO)",
//         datafrd: "Data Forward Rate Destination (FRD)",
//     };

//     const tbsCollections: { [key: string]: string } = {
//         mastertbs_4: "Master TBS Data KOF",
//         mastertbs_41: "Master TBS Data KIF",
//         mastertbs_42: "Master TBS Data SOF",
//         mastertbs_43: "Master TBS Data SIF",
//         mastertbs_44: "Master TBS Data POF",
//         mastertbs_45: "Master TBS Data FRO",
//         mastertbs_46: "Master TBS Data FRD",
//     };

//     const masterCollections: { [key: string]: string } = {
//         mastermn_1: "Master Mitra Name",
//         masteric_2: "Master IC",
//         masterls_3: "Master Last Status",
//         masterbc_5: "Master Berat Corp",
//         masterrg_6: "Master Routing",
//         masterrf_7: "Master Rate Forward",
//         masterrt_8: "Master Rate Trucking",
//         masterdl_9: "Master DTPL",
//         mastermt_10: "Master MTUC",
//     };

//     const [collections, setCollections] = useState<CollectionCount[]>([]);
//     const [updateLogs, setUpdateLogs] = useState<UpdateLog[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [collectionsResponse, updateLogsResponse] = await Promise.all([
//                     fetch(`${process.env.NEXT_PUBLIC_API_URL}/countCollections`),
//                     fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUpdateLogs`),
//                 ]);

//                 if (!collectionsResponse.ok) {
//                     throw new Error(
//                         `Collections Error: ${collectionsResponse.status} ${collectionsResponse.statusText}`
//                     );
//                 }

//                 if (!updateLogsResponse.ok) {
//                     throw new Error(
//                         `Update Logs Error: ${updateLogsResponse.status} ${updateLogsResponse.statusText}`
//                     );
//                 }

//                 const collectionsResult = await collectionsResponse.json();
//                 const updateLogsResult = await updateLogsResponse.json();

//                 setCollections(collectionsResult);
//                 setUpdateLogs(updateLogsResult);
//                 setError(null);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setError("Failed to fetch data. Please try again later.");
//             }
//         };

//         fetchData();
//     }, []);

//     const getLastUpdated = (collectionName: string) => {
//         const log = updateLogs.find((log) => log.collection === collectionName);
//         return log ? new Date(log.lastUpdated).toLocaleString() : "No updates";
//     };

//     return (
//         <div className="min-h-screen bg-black text-gray-200 p-4">
//             {/* Teks Header */}
//             <header className="mb-6">
//                 <h1 className="text-xl font-bold mb-1">Fee App!</h1>
//                 <p className="font-mono text-xs text-white-100">Login for access menu function.</p>
//             </header>

//             {/* Layout Dua Kolom */}
//             <div className="flex flex-col md:flex-row gap-8">
//                 {/* Sisi Kiri: Data */}
//                 <div className="flex-1">
//                     <h2 className="text-xl font-bold mb-2 text-center">Informasi Data</h2>
//                     {error ? (
//                         <p className="text-red-500 text-center">{error}</p>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center">
//                             {Object.keys(dataCollections).map((collectionName) => {
//                                 const collectionData = collections.find((col) => col.collection === collectionName);
//                                 return (
//                                     <div
//                                         key={collectionName}
//                                         className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                     >
//                                         <h4
//                                             className="text-sm font-medium mb-1 truncate"
//                                             title={dataCollections[collectionName]}
//                                         >
//                                             {dataCollections[collectionName]}
//                                         </h4>
//                                         <p className="text-sm font-bold text-amber-300">
//                                             {collectionData ? collectionData.count : "Loading..."}
//                                         </p>
//                                         <p className="text-xs text-gray-400">
//                                             Last updated: {getLastUpdated(collectionName)}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </div>

//                 {/* Sisi Kanan: Master TBS & Master */}
//                 <div className="flex-1 flex flex-col gap-8">
//                     {/* Section Master TBS */}
//                     <section>
//                         <h2 className="text-xl font-bold mb-2 text-center">All Master TBS Data</h2>
//                         {error ? (
//                             <p className="text-red-500 text-center">{error}</p>
//                         ) : (
//                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center">
//                                 {Object.keys(tbsCollections).map((collectionName) => {
//                                     const collectionData = collections.find((col) => col.collection === collectionName);
//                                     return (
//                                         <div
//                                             key={collectionName}
//                                             className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                         >
//                                             <h4
//                                                 className="text-sm font-medium mb-1 truncate"
//                                                 title={tbsCollections[collectionName]}
//                                             >
//                                                 {tbsCollections[collectionName]}
//                                             </h4>
//                                             <p className="text-sm font-bold text-amber-300">
//                                                 {collectionData ? collectionData.count : "Loading..."}
//                                             </p>
//                                             <p className="text-xs text-gray-400">
//                                                 Last updated: {getLastUpdated(collectionName)}
//                                             </p>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         )}
//                     </section>

//                     {/* Section All Master */}
//                     <section>
//                         <h2 className="text-xl font-bold mb-2 text-center">All Data Master</h2>
//                         {error ? (
//                             <p className="text-red-500 text-center">{error}</p>
//                         ) : (
//                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center">
//                                 {Object.keys(masterCollections).map((collectionName) => {
//                                     const collectionData = collections.find((col) => col.collection === collectionName);
//                                     return (
//                                         <div
//                                             key={collectionName}
//                                             className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
//                                         >
//                                             <h4
//                                                 className="text-sm font-medium mb-1 truncate"
//                                                 title={masterCollections[collectionName]}
//                                             >
//                                                 {masterCollections[collectionName]}
//                                             </h4>
//                                             <p className="text-sm font-bold text-amber-300">
//                                                 {collectionData ? collectionData.count : "Loading..."}
//                                             </p>
//                                             <p className="text-xs text-gray-400">
//                                                 Last updated: {getLastUpdated(collectionName)}
//                                             </p>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         )}
//                     </section>
//                 </div>
//             </div>
//         </div>
//     );
// }
//iterasi 8 (ok)

"use client";

import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";

type CollectionCount = {
    collection: string;
    count: number;
};

type UpdateLog = {
    collection: string;
    lastUpdated: string; // Assuming ISO 8601 date format
};

export default function HomePage() {
    const dataCollections: { [key: string]: string } = {
        datakof: "Data Konsolidator Outbound Fee",
        datakif: "Data Konsolidator Inbound Fee",
        datasof: "Data Subkonsolidator Outbound Fee",
        datasif: "Data Subkonsolidator Inbound Fee",
        datapof: "Data Pick Up Fee",
        datafro: "Data Forward Origin Fee",
        datafrd: "Data Forward Destination Fee",
    };

    const tbsCollections: { [key: string]: string } = {
        mastertbs_4: "Master TBS Data  Konsolidator Outbound Fee",
        mastertbs_41: "Master TBS Data Konsolidator Inbound Fee",
        mastertbs_42: "Master TBS Data Subkonsolidator Outbound Fee",
        mastertbs_43: "Master TBS Data Subkonsolidator Inbound Fee",
        mastertbs_44: "Master TBS Data Pick Up Fee",
        mastertbs_45: "Master TBS Data Forward Origin Fee",
        mastertbs_46: "Master TBS Data Forward Destination Fee",
    };

    const masterCollections: { [key: string]: string } = {
        mastermn_1: "Master Mitra Name",
        masteric_2: "Master IC",
        masterls_3: "Master Last Status",
        masterbc_5: "Master Berat Corp",
        masterrg_6: "Master Routing",
        masterrf_7: "Master Rate Forward",
        masterrt_8: "Master Rate Trucking",
        masterdl_9: "Master DTPL",
        mastermt_10: "Master MTUC",
    };

    const [collections, setCollections] = useState<CollectionCount[]>([]);
    const [updateLogs, setUpdateLogs] = useState<UpdateLog[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [collectionsResponse, updateLogsResponse] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/countCollections`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUpdateLogs`),
                ]);

                if (!collectionsResponse.ok) {
                    throw new Error(
                        `Collections Error: ${collectionsResponse.status} ${collectionsResponse.statusText}`
                    );
                }

                if (!updateLogsResponse.ok) {
                    throw new Error(
                        `Update Logs Error: ${updateLogsResponse.status} ${updateLogsResponse.statusText}`
                    );
                }

                const collectionsResult = await collectionsResponse.json();
                const updateLogsResult = await updateLogsResponse.json();

                setCollections(collectionsResult);
                setUpdateLogs(updateLogsResult);
                setError(null);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data. Please try again later.");
            }
        };

        fetchData();
    }, []);

    const getLastUpdated = (collectionName: string) => {
        const log = updateLogs.find((log) => log.collection === collectionName);
        return log ? new Date(log.lastUpdated).toLocaleString() : "No updates";
    };

    return (
        <div className="min-h-screen bg-black text-gray-200 p-4">
            {/* Teks Header */}
            <header className="mb-4">
            <h1 className="text-xl font-bold mb-1 flex justify-between items-center">
                Fee App!
            <Link className="px-3 py-1 bg-blue-resistance text-white font-mono rounded-md hover:bg-blue-600 transition" href="/log-history">
                    Log History
            </Link>
            </h1>
                <p className="font-mono text-xs text-white-100">Login for access menu function.</p>
            </header>

            {/* Layout Dua Kolom */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sisi Kiri: Data */}
                <div className="flex-1 border border-amber-300 rounded-lg p-4">
                    <h2 className="text-xl font-bold mb-4 text-center">Data Fee</h2>
                    {error ? (
                        <p className="text-red-500 text-center">{error}</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center">
                            {Object.keys(dataCollections).map((collectionName) => {
                                const collectionData = collections.find((col) => col.collection === collectionName);
                                return (
                                    <div
                                        key={collectionName}
                                        className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                                    >
                                        <h4
                                            className="text-sm font-medium mb-1 "//truncate"
                                            title={dataCollections[collectionName]}
                                        >
                                            {dataCollections[collectionName]}
                                        </h4>
                                        <p className="text-sm font-bold text-amber-300">
                                            {collectionData ? collectionData.count : "Loading..."}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            Last updated: {getLastUpdated(collectionName)}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Sisi Kanan: Master TBS & Master */}
                <div className="flex-1 flex flex-col gap-8">
                    {/* Section Master TBS */}
                    <section className="border border-amber-300 rounded-lg p-4">
                        <h2 className="text-xl font-bold mb-4 text-center">Master Data Total Bulan Sebelum (TBS)</h2>
                        {error ? (
                            <p className="text-red-500 text-center">{error}</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center">
                                {Object.keys(tbsCollections).map((collectionName) => {
                                    const collectionData = collections.find((col) => col.collection === collectionName);
                                    return (
                                        <div
                                            key={collectionName}
                                            className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                                        >
                                            <h4
                                                className="text-sm font-medium mb-1 "//truncate"
                                                title={tbsCollections[collectionName]}
                                            >
                                                {tbsCollections[collectionName]}
                                            </h4>
                                            <p className="text-sm font-bold text-amber-300">
                                                {collectionData ? collectionData.count : "Loading..."}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Last updated: {getLastUpdated(collectionName)}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    {/* Section All Master */}
                    <section className="border border-amber-300 rounded-lg p-4">
                        <h2 className="text-xl font-bold mb-4 text-center">Master Data Others</h2>
                        {error ? (
                            <p className="text-red-500 text-center">{error}</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center">
                                {Object.keys(masterCollections).map((collectionName) => {
                                    const collectionData = collections.find((col) => col.collection === collectionName);
                                    return (
                                        <div
                                            key={collectionName}
                                            className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                                        >
                                            <h4
                                                className="text-sm font-medium mb-1 "//truncate"
                                                title={masterCollections[collectionName]}
                                            >
                                                {masterCollections[collectionName]}
                                            </h4>
                                            <p className="text-sm font-bold text-amber-300">
                                                {collectionData ? collectionData.count : "Loading..."}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Last updated: {getLastUpdated(collectionName)}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}

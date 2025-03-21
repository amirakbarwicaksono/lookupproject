module.exports = {

"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[project]/app/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
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
/* __next_internal_action_entry_do_not_use__ {"001b8096f2481304a5866106158ae2bc61d39d3f60":"default"} */ __turbopack_esm__({
    "default": (()=>HomePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/router.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
function /*#__TURBOPACK_DISABLE_EXPORT_MERGING__*/ HomePage() {
    const dataCollections = {
        datakof: "Data Konsolidator Outbound Fee",
        datakif: "Data Konsolidator Inbound Fee",
        datasof: "Data Subkonsolidator Outbound Fee",
        datasif: "Data Subkonsolidator Inbound Fee",
        datapof: "Data Pick Up Fee",
        datafro: "Data Forward Origin Fee",
        datafrd: "Data Forward Destination Fee"
    };
    const tbsCollections = {
        mastertbs_4: "Master TBS Data  Konsolidator Outbound Fee",
        mastertbs_41: "Master TBS Data Konsolidator Inbound Fee",
        mastertbs_42: "Master TBS Data Subkonsolidator Outbound Fee",
        mastertbs_43: "Master TBS Data Subkonsolidator Inbound Fee",
        mastertbs_44: "Master TBS Data Pick Up Fee",
        mastertbs_45: "Master TBS Data Forward Origin Fee",
        mastertbs_46: "Master TBS Data Forward Destination Fee"
    };
    const masterCollections = {
        mastermn_1: "Master Mitra Name",
        masteric_2: "Master IC",
        masterls_3: "Master Last Status",
        masterbc_5: "Master Berat Corp",
        masterrg_6: "Master Routing",
        masterrf_7: "Master Rate Forward",
        masterrt_8: "Master Rate Trucking",
        masterdl_9: "Master DTPL",
        mastermt_10: "Master MTUC"
    };
    const [collections, setCollections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])([]);
    const [updateLogs, setUpdateLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchData = async ()=>{
            try {
                const [collectionsResponse, updateLogsResponse] = await Promise.all([
                    fetch(`${("TURBOPACK compile-time value", "http://192.168.198.209:8080/api")}/countCollections`),
                    fetch(`${("TURBOPACK compile-time value", "http://192.168.198.209:8080/api")}/getUpdateLogs`)
                ]);
                if (!collectionsResponse.ok) {
                    throw new Error(`Collections Error: ${collectionsResponse.status} ${collectionsResponse.statusText}`);
                }
                if (!updateLogsResponse.ok) {
                    throw new Error(`Update Logs Error: ${updateLogsResponse.status} ${updateLogsResponse.statusText}`);
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
    const getLastUpdated = (collectionName)=>{
        const log = updateLogs.find((log)=>log.collection === collectionName);
        return log ? new Date(log.lastUpdated).toLocaleString() : "No updates";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-black text-gray-200 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-bold mb-1 flex justify-between items-center",
                        children: [
                            "Fee App!",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition",
                                onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].push('/log-history'),
                                children: "Log History"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1468,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1466,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-xs text-white-100",
                        children: "Login for access menu function."
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1475,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 1465,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 border border-amber-300 rounded-lg p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold mb-4 text-center",
                                children: "Data Fee"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1482,
                                columnNumber: 21
                            }, this),
                            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-500 text-center",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1484,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center",
                                children: Object.keys(dataCollections).map((collectionName)=>{
                                    const collectionData = collections.find((col)=>col.collection === collectionName);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-sm font-medium mb-1 " //truncate"
                                                ,
                                                title: dataCollections[collectionName],
                                                children: dataCollections[collectionName]
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1494,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-bold text-amber-300",
                                                children: collectionData ? collectionData.count : "Loading..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1500,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-400",
                                                children: [
                                                    "Last updated: ",
                                                    getLastUpdated(collectionName)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1503,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, collectionName, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1490,
                                        columnNumber: 37
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1486,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1481,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "border border-amber-300 rounded-lg p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-bold mb-4 text-center",
                                        children: "Master Data Total Bulan Sebelum (TBS)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1517,
                                        columnNumber: 25
                                    }, this),
                                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-red-500 text-center",
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1519,
                                        columnNumber: 29
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center",
                                        children: Object.keys(tbsCollections).map((collectionName)=>{
                                            const collectionData = collections.find((col)=>col.collection === collectionName);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "text-sm font-medium mb-1 " //truncate"
                                                        ,
                                                        title: tbsCollections[collectionName],
                                                        children: tbsCollections[collectionName]
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1529,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-bold text-amber-300",
                                                        children: collectionData ? collectionData.count : "Loading..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1535,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-400",
                                                        children: [
                                                            "Last updated: ",
                                                            getLastUpdated(collectionName)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1538,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, collectionName, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1525,
                                                columnNumber: 41
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1521,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1516,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "border border-amber-300 rounded-lg p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-bold mb-4 text-center",
                                        children: "Master Data Others"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1550,
                                        columnNumber: 25
                                    }, this),
                                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-red-500 text-center",
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1552,
                                        columnNumber: 29
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center",
                                        children: Object.keys(masterCollections).map((collectionName)=>{
                                            const collectionData = collections.find((col)=>col.collection === collectionName);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "text-sm font-medium mb-1 " //truncate"
                                                        ,
                                                        title: masterCollections[collectionName],
                                                        children: masterCollections[collectionName]
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1562,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-bold text-amber-300",
                                                        children: collectionData ? collectionData.count : "Loading..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1568,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-400",
                                                        children: [
                                                            "Last updated: ",
                                                            getLastUpdated(collectionName)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1571,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, collectionName, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1558,
                                                columnNumber: 41
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1554,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1549,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1514,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 1479,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 1463,
        columnNumber: 9
    }, this);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    HomePage
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(HomePage, "001b8096f2481304a5866106158ae2bc61d39d3f60", null);
}}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_namespace__(__turbopack_import__("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/page.tsx [app-rsc] (ecmascript)\" } [app-rsc] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({});
;
}}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/page.tsx [app-rsc] (ecmascript)\" } [app-rsc] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/app/page.tsx [app-rsc] (ecmascript)" } [app-rsc] (ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/page.tsx [app-rsc] (ecmascript)\" } [app-rsc] (ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({
    "001b8096f2481304a5866106158ae2bc61d39d3f60": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/app/page.tsx [app-rsc] (ecmascript)" } [app-rsc] (ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/page.tsx [app-rsc] (ecmascript)\" } [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({
    "001b8096f2481304a5866106158ae2bc61d39d3f60": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["001b8096f2481304a5866106158ae2bc61d39d3f60"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/app/page.tsx [app-rsc] (ecmascript)" } [app-rsc] (ecmascript) <module evaluation>');
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_import__('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/app/page.tsx [app-rsc] (ecmascript)" } [app-rsc] (ecmascript) <exports>');
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__d81778._.js.map
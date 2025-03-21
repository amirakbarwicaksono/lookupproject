(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_upload_page_tsx_a4250d._.js", {

"[project]/app/upload/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// "use client";
// import { useState, useEffect } from "react";
// import ProtectedRoute from "../components/ProtectedRoute";
// import { useAuth } from "../context/AuthContext";
// // Collection mapping for frontend display and backend handling
// const collections = {
//     datakof: "Data Konsolidator Outbound Fee",
//     datakif: "Data Konsolidator Inbound Fee",
//     datasof: "Data Subkonsolidator Outbound Fee",
//     datasif: "Data Subkonsolidator Inbound Fee",
//     datapof: "Data Pickup Posactive Fee",
//     datafro: "Data Forward Rate Origin",
//     datafrd: "Data Forward Rate Destination",
//     mastermn_1: "Master Mitra Name",
//     masteric_2: "Master IC",
//     masterls_3: "Master Last Status",
//     mastertbs_4: "Master TBS",
//     masterbc_5: "Master Berat Corp",
//     masterrg_6: "Master Routing",
//     masterrf_7: "Master Rate Forward",
//     masterrt_8: "Master Rate Trucking",
//     masterdl_9: "Master DTPL",
//     mastermt_10: "Master MTUC",
// };
// // Component for uploading data to a specific collection
// function CollectionUploader({
//     collectionKey,
//     collectionName,
//     hasAccess,
// }: {
//     collectionKey: string;
//     collectionName: string;
//     hasAccess: boolean;
// }) {
//     const [files, setFiles] = useState<File[]>([]);
//     const [messages, setMessages] = useState<string[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             setFiles(Array.from(event.target.files));
//             setMessages([]);
//         }
//     };
//     const handleUpload = async () => {
//         if (!hasAccess) {
//             setMessages(["Access restricted for this collection."]);
//             return;
//         }
//         if (files.length === 0) {
//             setMessages(["Please select at least one CSV file first."]);
//             return;
//         }
//         if (!apiUrl) {
//             setMessages(["Configuration error: API URL is missing."]);
//             return;
//         }
//         setLoading(true);
//         const newMessages: string[] = [];
//         for (const file of files) {
//             const formData = new FormData();
//             formData.append("file", file);
//             try {
//                 const response = await fetch(
//                     `${apiUrl}/uploadData?collection=${encodeURIComponent(collectionKey)}`,
//                     { method: "POST", body: formData }
//                 );
//                 if (!response.ok) {
//                     const errorResponse = await response.json().catch(() => ({
//                         error: "Unknown error",
//                     }));
//                     newMessages.push(
//                         `Failed to upload ${file.name}: ${errorResponse.error || "Unknown error"}`
//                     );
//                 } else {
//                     const responseData = await response.json();
//                     newMessages.push(
//                         `${file.name} uploaded successfully to ${collectionName}: ${
//                             responseData.message || "Success"
//                         }`
//                     );
//                 }
//             } catch (error) {
//                 console.error(`Error uploading file ${file.name}:`, error);
//                 newMessages.push(`Error uploading ${file.name}. Please try again.`);
//             }
//         }
//         setMessages(newMessages);
//         setFiles([]);
//         setLoading(false);
//     };
//     return (
//         <div
//             className={`p-2 bg-gray-900 rounded-lg shadow-md text-center w-52 hover:shadow-lg transform ${
//                 hasAccess ? "hover:scale-105" : "opacity-50 cursor-not-allowed"
//             } transition-all`}
//         >
//             <h2 className="text-xs font-semibold text-white mb-2">{collectionName}</h2>
//             <input
//                 type="file"
//                 accept=".csv"
//                 multiple
//                 onChange={handleFileChange}
//                 className="w-full text-xs p-1 mb-2 border rounded text-gray-300 file:rounded file:bg-white file:text-black file:border-none"
//                 disabled={!hasAccess}
//             />
//             <button
//                 onClick={handleUpload}
//                 disabled={loading || !hasAccess}
//                 className={`w-full px-2 py-1 text-xs font-semibold text-white rounded transition-all ${
//                     loading
//                         ? "bg-gray-500 cursor-not-allowed"
//                         : hasAccess
//                         ? "bg-blue-600 hover:bg-blue-700"
//                         : "bg-gray-700"
//                 }`}
//             >
//                 {loading ? "Uploading..." : "Upload File"}
//             </button>
//             {messages.map((msg, index) => (
//                 <p key={index} className="mt-1 text-xs text-gray-400">
//                     {msg}
//                 </p>
//             ))}
//         </div>
//     );
// }
// // Main page for managing collections
// export default function UploadPage() {
//     const { access } = useAuth(); // User's access from AuthContext
//     const hasUploadAccess = access.includes("upload"); // Check if user has access to upload
//     if (!hasUploadAccess) {
//         return (
//             <ProtectedRoute>
//                 <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
//                     <p className="text-red-500">Access Restricted</p>
//                 </div>
//             </ProtectedRoute>
//         );
//     }
//     const dataCollections = Object.fromEntries(
//         Object.entries(collections).filter(([key]) => key.startsWith("data"))
//     );
//     const masterCollections = Object.fromEntries(
//         Object.entries(collections).filter(([key]) => key.startsWith("master"))
//     );
//     return (
//         <ProtectedRoute>
//             <div className="flex flex-col items-center min-h-screen bg-black p-4">
//                 <h1 className="ttext-xl font-bold mb-2 text-gray-200">Upload CSV Data</h1>
//                 <div className="grid grid-cols-3 gap-4 w-full max-w-7xl">
//                     {/* Data Collections */}
//                     <div className="col-span-1">
//                         <h1 className="text-xl font-bold mb-2 text-center text-grey-200">
//                             Data Untuk Di Proses
//                         </h1>
//                         <div className="flex flex-wrap gap-2 justify-center">
//                             {Object.entries(dataCollections).map(([key, name]) => (
//                                 <CollectionUploader
//                                     key={key}
//                                     collectionKey={key}
//                                     collectionName={name}
//                                     hasAccess={access.includes(key)}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                     {/* Master Collections */}
//                     <div className="col-span-2">
//                         <h1 className="text-xl font-bold mb-2 text-center text-grey-200">
//                             Data Master
//                         </h1>
//                         <div className="flex flex-wrap gap-2 justify-center">
//                             {Object.entries(masterCollections).map(([key, name]) => (
//                                 <CollectionUploader
//                                     key={key}
//                                     collectionKey={key}
//                                     collectionName={name}
//                                     hasAccess={access.includes(key)}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </ProtectedRoute>
//     );
// }
// first
// "use client";
// import { useState, useEffect } from "react";
// import ProtectedRoute from "../components/ProtectedRoute";
// import { useAuth } from "../context/AuthContext";
// // Collection mapping for frontend display and backend handling
// const collections = {
//     datakof: "Data Konsolidator Outbound Fee",
//     datakif: "Data Konsolidator Inbound Fee",
//     datasof: "Data Subkonsolidator Outbound Fee",
//     datasif: "Data Subkonsolidator Inbound Fee",
//     datapof: "Data Pickup Posactive Fee",
//     datafro: "Data Forward Rate Origin",
//     datafrd: "Data Forward Rate Destination",
//     mastermn_1: "Master Mitra Name",
//     masteric_2: "Master IC",
//     masterls_3: "Master Last Status",
//     mastertbs_4: "Master TBS",
//     masterbc_5: "Master Berat Corp",
//     masterrg_6: "Master Routing",
//     masterrf_7: "Master Rate Forward",
//     masterrt_8: "Master Rate Trucking",
//     masterdl_9: "Master DTPL",
//     mastermt_10: "Master MTUC",
// };
// // Component for uploading data to a specific collection
// function CollectionUploader({
//     collectionKey,
//     collectionName,
//     hasAccess,
// }: {
//     collectionKey: string;
//     collectionName: string;
//     hasAccess: boolean;
// }) {
//     const [files, setFiles] = useState<File[]>([]);
//     const [messages, setMessages] = useState<string[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             setFiles(Array.from(event.target.files));
//             setMessages([]);
//         }
//     };
//     const handleUpload = async () => {
//         if (!hasAccess) {
//             setMessages(["Access restricted for this collection."]);
//             return;
//         }
//         if (files.length === 0) {
//             setMessages(["Please select at least one CSV file first."]);
//             return;
//         }
//         if (!apiUrl) {
//             setMessages(["Configuration error: API URL is missing."]);
//             return;
//         }
//         setLoading(true);
//         const newMessages: string[] = [];
//         for (const file of files) {
//             const formData = new FormData();
//             formData.append("file", file);
//             try {
//                 const response = await fetch(
//                     `${apiUrl}/uploadData?collection=${encodeURIComponent(collectionKey)}`,
//                     { method: "POST", body: formData }
//                 );
//                 if (!response.ok) {
//                     const errorResponse = await response.json().catch(() => ({
//                         error: "Unknown error",
//                     }));
//                     newMessages.push(
//                         `Failed to upload ${file.name}: ${errorResponse.error || "Unknown error"}`
//                     );
//                 } else {
//                     const responseData = await response.json();
//                     newMessages.push(
//                         `${file.name} uploaded successfully to ${collectionName}: ${
//                             responseData.message || "Success"
//                         }`
//                     );
//                 }
//             } catch (error) {
//                 console.error(`Error uploading file ${file.name}:`, error);
//                 newMessages.push(`Error uploading ${file.name}. Please try again.`);
//             }
//         }
//         setMessages(newMessages);
//         setFiles([]);
//         setLoading(false);
//     };
//     return (
//         <div
//             className={`p-2 bg-gray-900 rounded-lg shadow-md text-center hover:shadow-lg transition-transform transform ${
//                 hasAccess ? "hover:scale-105" : "opacity-50 cursor-not-allowed"
//             }`}
//         >
//             <h4 className="text-sm font-medium mb-1 text-white">{collectionName}</h4>
//             <input
//                 type="file"
//                 accept=".csv"
//                 multiple
//                 onChange={handleFileChange}
//                 className="w-full text-xs p-1 mb-2 border rounded text-gray-300 file:rounded file:bg-white file:text-black file:border-none"
//                 disabled={!hasAccess}
//             />
//             <button
//                 onClick={handleUpload}
//                 disabled={loading || !hasAccess}
//                 className={`w-full px-2 py-1 text-xs font-semibold text-white rounded transition-all ${
//                     loading
//                         ? "bg-gray-500 cursor-not-allowed"
//                         : hasAccess
//                         ? "bg-blue-600 hover:bg-blue-700"
//                         : "bg-gray-700"
//                 }`}
//             >
//                 {loading ? "Uploading..." : "Upload File"}
//             </button>
//             {messages.map((msg, index) => (
//                 <p key={index} className="mt-1 text-xs text-gray-400">
//                     {msg}
//                 </p>
//             ))}
//         </div>
//     );
// }
// // Main page for managing collections
// export default function UploadPage() {
//     const { access } = useAuth(); // User's access from AuthContext
//     const hasUploadAccess = access.includes("upload"); // Check if user has access to upload
//     if (!hasUploadAccess) {
//         return (
//             <ProtectedRoute>
//                 <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
//                     <p className="text-red-500">Access Restricted</p>
//                 </div>
//             </ProtectedRoute>
//         );
//     }
//     const dataCollections = Object.fromEntries(
//         Object.entries(collections).filter(([key]) => key.startsWith("data"))
//     );
//     const masterCollections = Object.fromEntries(
//         Object.entries(collections).filter(([key]) => key.startsWith("master"))
//     );
//     return (
//         <ProtectedRoute>
//             <div className="min-h-screen bg-black text-gray-200 p-1">
//                 <header className="mb-6">
//                     <h1 className="text-xl font-bold mb-1">Upload CSV Data</h1>
//                     <p className="font-mono text-xs text-white-100">
//                         Upload files to the respective collections below.
//                     </p>
//                 </header>
//                 <div className="flex flex-col md:flex-row gap-28">
//                     {/* Data Collections Section */}
//                     <section className="flex-1">
//                         <h2 className="text-xl font-bold mb-2 text-center">Data Untuk Di Proses</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {Object.entries(dataCollections).map(([key, name]) => (
//                                 <CollectionUploader
//                                     key={key}
//                                     collectionKey={key}
//                                     collectionName={name}
//                                     hasAccess={access.includes(key)}
//                                 />
//                             ))}
//                         </div>
//                     </section>
//                     {/* Master Collections Section */}
//                     <section className="flex-1">
//                         <h2 className="text-xl font-bold mb-2 text-center">Data Master</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {Object.entries(masterCollections).map(([key, name]) => (
//                                 <CollectionUploader
//                                     key={key}
//                                     collectionKey={key}
//                                     collectionName={name}
//                                     hasAccess={access.includes(key)}
//                                 />
//                             ))}
//                         </div>
//                     </section>
//                 </div>
//             </div>
//         </ProtectedRoute>
//     );
// }
//iterasi 1
// "use client";
// import { useState, useEffect } from "react";
// import ProtectedRoute from "../components/ProtectedRoute";
// import { useAuth } from "../context/AuthContext";
// // Collection mapping for frontend display and backend handling
// const collections = {
//     datakof: "Data Konsolidator Outbound Fee",
//     datakif: "Data Konsolidator Inbound Fee",
//     datasof: "Data Subkonsolidator Outbound Fee",
//     datasif: "Data Subkonsolidator Inbound Fee",
//     datapof: "Data Pickup Posactive Fee",
//     datafro: "Data Forward Rate Origin",
//     datafrd: "Data Forward Rate Destination",
//     mastermn_1: "Master Mitra Name",
//     masteric_2: "Master IC",
//     masterls_3: "Master Last Status",
//     mastertbs_4: "Master TBS",
//     masterbc_5: "Master Berat Corp",
//     masterrg_6: "Master Routing",
//     masterrf_7: "Master Rate Forward",
//     masterrt_8: "Master Rate Trucking",
//     masterdl_9: "Master DTPL",
//     mastermt_10: "Master MTUC",
// };
// // Component for uploading data to a specific collection
// function CollectionUploader({
//     collectionKey,
//     collectionName,
//     hasAccess,
// }: {
//     collectionKey: string;
//     collectionName: string;
//     hasAccess: boolean;
// }) {
//     const [files, setFiles] = useState<File[]>([]);
//     const [messages, setMessages] = useState<string[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             setFiles(Array.from(event.target.files));
//             setMessages([]);
//         }
//     };
//     const handleUpload = async () => {
//         if (!hasAccess) {
//             setMessages(["Access restricted for this collection."]);
//             return;
//         }
//         if (files.length === 0) {
//             setMessages(["Please select at least one CSV file first."]);
//             return;
//         }
//         if (!apiUrl) {
//             setMessages(["Configuration error: API URL is missing."]);
//             return;
//         }
//         setLoading(true);
//         const newMessages: string[] = [];
//         for (const file of files) {
//             const formData = new FormData();
//             formData.append("file", file);
//             try {
//                 const response = await fetch(
//                     `${apiUrl}/uploadData?collection=${encodeURIComponent(collectionKey)}`,
//                     { method: "POST", body: formData }
//                 );
//                 if (!response.ok) {
//                     const errorResponse = await response.json().catch(() => ({
//                         error: "Unknown error",
//                     }));
//                     newMessages.push(
//                         `Failed to upload ${file.name}: ${errorResponse.error || "Unknown error"}`
//                     );
//                 } else {
//                     const responseData = await response.json();
//                     newMessages.push(
//                         `${file.name} uploaded successfully to ${collectionName}: ${
//                             responseData.message || "Success"
//                         }`
//                     );
//                 }
//             } catch (error) {
//                 console.error(`Error uploading file ${file.name}:`, error);
//                 newMessages.push(`Error uploading ${file.name}. Please try again.`);
//             }
//         }
//         setMessages(newMessages);
//         setFiles([]);
//         setLoading(false);
//     };
//     return (
//         <div
//             className={`p-2 bg-gray-900 rounded-lg shadow-md text-center hover:shadow-lg transition-transform transform ${
//                 hasAccess ? "hover:scale-105" : "opacity-50 cursor-not-allowed"
//             }`}
//         >
//             <h4 className="text-sm font-medium mb-1 text-white">{collectionName}</h4>
//             <input
//                 type="file"
//                 accept=".csv"
//                 multiple
//                 onChange={handleFileChange}
//                 className="w-full text-xs p-1 mb-2 border rounded text-gray-300 file:rounded file:bg-white file:text-black file:border-none"
//                 disabled={!hasAccess}
//             />
//             <button
//                 onClick={handleUpload}
//                 disabled={loading || !hasAccess}
//                 className={`w-full px-2 py-1 text-xs font-semibold text-white rounded transition-all ${
//                     loading
//                         ? "bg-gray-500 cursor-not-allowed"
//                         : hasAccess
//                         ? "bg-blue-600 hover:bg-blue-700"
//                         : "bg-gray-700"
//                 }`}
//             >
//                 {loading ? "Uploading..." : "Upload File"}
//             </button>
//             {messages.map((msg, index) => (
//                 <p key={index} className="mt-1 text-xs text-gray-400">
//                     {msg}
//                 </p>
//             ))}
//         </div>
//     );
// }
// // Main page for managing collections
// export default function UploadPage() {
//     const { access } = useAuth(); // User's access from AuthContext
//     const hasUploadAccess = access.includes("upload"); // Check if user has access to upload
//     if (!hasUploadAccess) {
//         return (
//             <ProtectedRoute>
//                 <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
//                     <p className="text-red-500">Access Restricted</p>
//                 </div>
//             </ProtectedRoute>
//         );
//     }
//     const dataCollections = Object.fromEntries(
//         Object.entries(collections).filter(([key]) => key.startsWith("data"))
//     );
//     const masterCollections = Object.fromEntries(
//         Object.entries(collections).filter(([key]) => key.startsWith("master"))
//     );
//     return (
//         <ProtectedRoute>
//             <div className="min-h-screen bg-black text-gray-200 p-1">
//                 <header className="mb-6">
//                     <h1 className="text-xl font-bold mb-1">Upload CSV File</h1>
//                     <p className="font-mono text-xs text-white-100">
//                         Upload files to the respective collections below.
//                     </p>
//                 </header>
//                 <div className="flex flex-col md:flex-row gap-28">
//                     {/* Data Collections Section */}
//                     <section className="flex-1">
//                         <h2 className="text-xl font-bold mb-2 text-center">Data Untuk Di Proses</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {Object.entries(dataCollections).map(([key, name]) => (
//                                 <CollectionUploader
//                                     key={key}
//                                     collectionKey={key}
//                                     collectionName={name}
//                                     hasAccess={access.includes(key)}
//                                 />
//                             ))}
//                         </div>
//                     </section>
//                     {/* Master Collections Section */}
//                     <section className="flex-1">
//                         <h2 className="text-xl font-bold mb-2 text-center">Data Master</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {Object.entries(masterCollections).map(([key, name]) => (
//                                 <CollectionUploader
//                                     key={key}
//                                     collectionKey={key}
//                                     collectionName={name}
//                                     hasAccess={access.includes(key)}
//                                 />
//                             ))}
//                         </div>
//                     </section>
//                 </div>
//             </div>
//         </ProtectedRoute>
//     );
// }
//iterasi 3
// "use client";
// import { useState, useEffect } from "react";
// import ProtectedRoute from "../components/ProtectedRoute";
// import { useAuth } from "../context/AuthContext";
// // Collection mapping for frontend display and backend handling
// const collections = {
//     datakof: "Data Konsolidator Outbound Fee",
//     datakif: "Data Konsolidator Inbound Fee",
//     datasof: "Data Subkonsolidator Outbound Fee",
//     datasif: "Data Subkonsolidator Inbound Fee",
//     datapof: "Data Pickup Posactive Fee",
//     datafro: "Data Forward Rate Origin",
//     datafrd: "Data Forward Rate Destination",
//     mastermn_1: "Master Mitra Name",
//     masteric_2: "Master IC",
//     masterls_3: "Master Last Status",
//     mastertbs_4: "Master TBS",
//     masterbc_5: "Master Berat Corp",
//     masterrg_6: "Master Routing",
//     masterrf_7: "Master Rate Forward",
//     masterrt_8: "Master Rate Trucking",
//     masterdl_9: "Master DTPL",
//     mastermt_10: "Master MTUC",
// };
// // Component for uploading data to a specific collection
// function CollectionUploader({
//     collectionKey,
//     collectionName,
//     hasAccess,
// }: {
//     collectionKey: string;
//     collectionName: string;
//     hasAccess: boolean;
// }) {
//     const [files, setFiles] = useState<File[]>([]);
//     const [messages, setMessages] = useState<string[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             setFiles(Array.from(event.target.files));
//             setMessages([]);
//         }
//     };
//     const handleUpload = async () => {
//         if (!hasAccess) {
//             setMessages(["Access restricted for this collection."]);
//             return;
//         }
//         if (files.length === 0) {
//             setMessages(["Please select at least one CSV file first."]);
//             return;
//         }
//         if (!apiUrl) {
//             setMessages(["Configuration error: API URL is missing."]);
//             return;
//         }
//         setLoading(true);
//         const newMessages: string[] = [];
//         for (const file of files) {
//             const formData = new FormData();
//             formData.append("file", file);
//             try {
//                 const response = await fetch(
//                     `${apiUrl}/uploadData?collection=${encodeURIComponent(collectionKey)}`,
//                     { method: "POST", body: formData }
//                 );
//                 if (!response.ok) {
//                     const errorResponse = await response.json().catch(() => ({
//                         error: "Unknown error",
//                     }));
//                     newMessages.push(
//                         `Failed to upload ${file.name}: ${errorResponse.error || "Unknown error"}`
//                     );
//                 } else {
//                     const responseData = await response.json();
//                     newMessages.push(
//                         `${file.name} uploaded successfully to ${collectionName}: ${
//                             responseData.message || "Success"
//                         }`
//                     );
//                 }
//             } catch (error) {
//                 console.error(`Error uploading file ${file.name}:`, error);
//                 newMessages.push(`Error uploading ${file.name}. Please try again.`);
//             }
//         }
//         setMessages(newMessages);
//         setFiles([]);
//         setLoading(false);
//     };
//     const downloadHeaders = async () => {
//         if (!apiUrl) {
//             setMessages(["Configuration error: API URL is missing."]);
//             return;
//         }
//         try {
//             const response = await fetch(
//                 `${apiUrl}/fetchHeadersAndExport?collection=${encodeURIComponent(collectionKey)}`
//             );
//             if (!response.ok) {
//                 setMessages(["Failed to download headers. Try again later."]);
//                 return;
//             }
//             const blob = await response.blob();
//             const downloadUrl = window.URL.createObjectURL(blob);
//             const a = document.createElement("a");
//             a.href = downloadUrl;
//             a.download = `${collectionKey}_headers.csv`;
//             document.body.appendChild(a);
//             a.click();
//             a.remove();
//             setMessages(["Headers downloaded successfully."]);
//         } catch (error) {
//             console.error("Error downloading headers:", error);
//             setMessages(["Error downloading headers."]);
//         }
//     };
//     return (
//         <div
//             className={`p-2 bg-gray-900 rounded-lg shadow-md text-center hover:shadow-lg transform ${
//                 hasAccess ? "hover:scale-105" : "opacity-50 cursor-not-allowed"
//             } transition-all`}
//         >
//             <h4 className="text-sm font-medium mb-1 text-white">{collectionName}</h4>
//             <button
//                 onClick={downloadHeaders}
//                 disabled={!hasAccess}
//                 className={`w-full px-2 py-1 text-xs font-semibold text-blue-900 bg-blue-700 rounded hover:bg-blue-800 transition-all mb-2 ${
//                     !hasAccess && "opacity-50 cursor-not-allowed"
//                 }`}
//             >
//                 Cek Header
//             </button>
//             <input
//                 type="file"
//                 accept=".csv"
//                 multiple
//                 onChange={handleFileChange}
//                 className="w-full text-xs p-1 mb-2 border rounded text-gray-300 file:rounded file:bg-white file:text-black file:border-none"
//                 disabled={!hasAccess}
//             />
//             <button
//                 onClick={handleUpload}
//                 disabled={loading || !hasAccess}
//                 className={`w-full px-2 py-1 text-xs font-semibold text-white rounded transition-all ${
//                     loading
//                         ? "bg-gray-500 cursor-not-allowed"
//                         : hasAccess
//                         ? "bg-blue-600 hover:bg-blue-700"
//                         : "bg-gray-700"
//                 }`}
//             >
//                 {loading ? "Uploading..." : "Upload File"}
//             </button>
//             {messages.map((msg, index) => (
//                 <p key={index} className="mt-1 text-xs text-gray-400">
//                     {msg}
//                 </p>
//             ))}
//         </div>
//     );
// }
// // Main page for managing collections
// export default function UploadPage() {
//     const { access } = useAuth(); // User's access from AuthContext
//     const hasUploadAccess = access.includes("upload"); // Check if user has access to upload
//     if (!hasUploadAccess) {
//         return (
//             <ProtectedRoute>
//                 <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
//                     <p className="text-red-500">Access Restricted</p>
//                 </div>
//             </ProtectedRoute>
//         );
//     }
//     const dataCollections = Object.fromEntries(
//         Object.entries(collections).filter(([key]) => key.startsWith("data"))
//     );
//     const masterCollections = Object.fromEntries(
//         Object.entries(collections).filter(([key]) => key.startsWith("master"))
//     );
//     return (
//         <ProtectedRoute>
//             <div className="min-h-screen bg-black text-gray-200 p-4">
//                 <header className="mb-6">
//                     <h1 className="text-xl font-bold mb-1">Upload CSV File</h1>
//                     <p className="font-mono text-xs text-white-100">
//                         Upload files to the respective collections below.
//                     </p>
//                 </header>
//                 <div className="flex flex-col md:flex-row gap-28">
//                     {/* Data Collections Section */}
//                     <section className="flex-1">
//                         <h2 className="text-xl font-bold mb-2 text-center">Data Untuk Di Proses</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {Object.entries(dataCollections).map(([key, name]) => (
//                                 <CollectionUploader
//                                     key={key}
//                                     collectionKey={key}
//                                     collectionName={name}
//                                     hasAccess={access.includes(key)}
//                                 />
//                             ))}
//                         </div>
//                     </section>
//                     {/* Master Collections Section */}
//                     <section className="flex-1">
//                         <h2 className="text-xl font-bold mb-2 text-center">Data Master</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {Object.entries(masterCollections).map(([key, name]) => (
//                                 <CollectionUploader
//                                     key={key}
//                                     collectionKey={key}
//                                     collectionName={name}
//                                     hasAccess={access.includes(key)}
//                                 />
//                             ))}
//                         </div>
//                     </section>
//                 </div>
//             </div>
//         </ProtectedRoute>
//     );
// }
//iterasi 4
__turbopack_esm__({});
"use client";
// Collection mapping for frontend display and backend handling
const collections = {
    datakof: "Data Konsolidator Outbound Fee",
    datakif: "Data Konsolidator Inbound Fee",
    datasof: "Data Subkonsolidator Outbound Fee",
    datasif: "Data Subkonsolidator Inbound Fee",
    datapof: "Data Pickup Posactive Fee",
    datafro: "Data Forward Rate Origin",
    datafrd: "Data Forward Rate Destination",
    mastermn_1: "Master Mitra Name",
    masteric_2: "Master IC",
    masterls_3: "Master Last Status",
    mastertbs_4: "Master TBS Data KOF",
    mastertbs_41: "Master TBS Data KIF",
    mastertbs_42: "Master TBS Data SOF",
    mastertbs_43: "Master TBS Data SIF",
    mastertbs_44: "Master TBS Data POF",
    mastertbs_45: "Master TBS Data FRO",
    mastertbs_46: "Master TBS Data FRD",
    masterbc_5: "Master Berat Corp",
    masterrg_6: "Master Routing",
    masterrf_7: "Master Rate Forward",
    masterrt_8: "Master Rate Trucking",
    masterdl_9: "Master DTPL",
    mastermt_10: "Master MTUC"
}; // // Component for uploading data to a specific collection
 // function CollectionUploader({
 //     collectionKey,
 //     collectionName,
 //     hasAccess,
 // }: {
 //     collectionKey: string;
 //     collectionName: string;
 //     hasAccess: boolean;
 // }) {
 //     const [files, setFiles] = useState<File[]>([]);
 //     const [messages, setMessages] = useState<string[]>([]);
 //     const [loading, setLoading] = useState<boolean>(false);
 //     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
 //     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 //         if (event.target.files) {
 //             setFiles(Array.from(event.target.files));
 //             setMessages([]);
 //         }
 //     };
 //     const handleUpload = async () => {
 //         if (!hasAccess) {
 //             setMessages(["Access restricted for this collection."]);
 //             return;
 //         }
 //         if (files.length === 0) {
 //             setMessages(["Please select at least one CSV file first."]);
 //             return;
 //         }
 //         if (!apiUrl) {
 //             setMessages(["Configuration error: API URL is missing."]);
 //             return;
 //         }
 //         setLoading(true);
 //         const newMessages: string[] = [];
 //         for (const file of files) {
 //             const formData = new FormData();
 //             formData.append("file", file);
 //             try {
 //                 const response = await fetch(
 //                     `${apiUrl}/uploadData?collection=${encodeURIComponent(collectionKey)}`,
 //                     { method: "POST", body: formData }
 //                 );
 //                 if (!response.ok) {
 //                     const errorResponse = await response.json().catch(() => ({
 //                         error: "Unknown error",
 //                     }));
 //                     newMessages.push(
 //                         `Failed to upload ${file.name}: ${errorResponse.error || "Unknown error"}`
 //                     );
 //                 } else {
 //                     const responseData = await response.json();
 //                     newMessages.push(
 //                         `${file.name} uploaded successfully to ${collectionName}: ${
 //                             responseData.message || "Success"
 //                         }`
 //                     );
 //                 }
 //             } catch (error) {
 //                 console.error(`Error uploading file ${file.name}:`, error);
 //                 newMessages.push(`Error uploading ${file.name}. Please try again.`);
 //             }
 //         }
 //         setMessages(newMessages);
 //         setFiles([]);
 //         setLoading(false);
 //     };
 //     const downloadHeaders = async () => {
 //         if (!apiUrl) {
 //             setMessages(["Configuration error: API URL is missing."]);
 //             return;
 //         }
 //         try {
 //             const response = await fetch(
 //                 `${apiUrl}/fetchHeadersAndExport?collection=${encodeURIComponent(collectionKey)}`
 //             );
 //             if (!response.ok) {
 //                 setMessages(["Failed to download headers. Try again later."]);
 //                 return;
 //             }
 //             const blob = await response.blob();
 //             const downloadUrl = window.URL.createObjectURL(blob);
 //             const a = document.createElement("a");
 //             a.href = downloadUrl;
 //             a.download = `${collectionKey}_headers.csv`;
 //             document.body.appendChild(a);
 //             a.click();
 //             a.remove();
 //             setMessages(["Headers downloaded successfully."]);
 //         } catch (error) {
 //             console.error("Error downloading headers:", error);
 //             setMessages(["Error downloading headers."]);
 //         }
 //     };
 //     return (
 //         <div
 //             className={`p-2 bg-gray-900 rounded-lg shadow-md text-center hover:shadow-lg transform ${
 //                 hasAccess ? "hover:scale-105" : "opacity-50 cursor-not-allowed"
 //             } transition-all`}
 //         >
 //             <h4 className="text-sm font-medium mb-1 text-white">{collectionName}</h4>
 //             <button
 //                 onClick={downloadHeaders}
 //                 disabled={!hasAccess}
 //                 className={`w-full px-2 py-1 text-xs font-semibold text-grey-300 bg-blue-resistance rounded hover:bg-blue-resistance transition-all mb-2 ${
 //                     !hasAccess && "opacity-50 cursor-not-allowed"
 //                 }`}
 //             >
 //                 Cek Header
 //             </button>
 //             <input
 //                 type="file"
 //                 accept=".csv"
 //                 multiple
 //                 onChange={handleFileChange}
 //                 className="w-full text-xs p-1 mb-2 border rounded text-gray-300 file:rounded file:bg-white file:text-black file:border-none"
 //                 disabled={!hasAccess}
 //             />
 //             <button
 //                 onClick={handleUpload}
 //                 disabled={loading || !hasAccess}
 //                 className={`w-full px-2 py-1 text-xs font-semibold text-white rounded transition-all ${
 //                     loading
 //                         ? "bg-gray-500 cursor-not-allowed"
 //                         : hasAccess
 //                         ? "bg-blue-resistance hover:bg-blue-resistance"
 //                         : "bg-gray-700"
 //                 }`}
 //             >
 //                 {loading ? "Uploading..." : "Upload File"}
 //             </button>
 //             {messages.map((msg, index) => (
 //                 <p key={index} className="mt-1 text-xs text-gray-400">
 //                     {msg}
 //                 </p>
 //             ))}
 //         </div>
 //     );
 // }
 // // Main page for managing collections
 // export default function UploadPage() {
 //     const { access } = useAuth(); // User's access from AuthContext
 //     const hasUploadAccess = access.includes("upload"); // Check if user has access to upload
 //     if (!hasUploadAccess) {
 //         return (
 //             <ProtectedRoute>
 //                 <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
 //                     <p className="text-red-500">Access Restricted</p>
 //                 </div>
 //             </ProtectedRoute>
 //         );
 //     }
 //     const dataCollections = Object.fromEntries(
 //         Object.entries(collections).filter(([key]) => key.startsWith("data"))
 //     );
 //     const masterCollections = Object.fromEntries(
 //         Object.entries(collections).filter(([key]) => key.startsWith("master"))
 //     );
 //     return (
 //         <ProtectedRoute>
 //         <div className="min-h-screen bg-black text-gray-200 p-1">
 //             {/* Teks Header */}
 //             <header className="mb-6">
 //                 <h1 className="text-xl font-bold mb-1">Upload CSV File</h1>
 //                 <p className="font-mono text-xs text-white-100">Upload File to the respectative collection bellow.</p>
 //             </header>
 //                 <div className="flex flex-col md:flex-row gap-28">
 //                     {/* Data Collections Section */}
 //                     <section className="flex-1">
 //                         <h2 className="text-xl font-bold mb-2 text-center">Data Untuk Di Proses</h2>
 //                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
 //                             {Object.entries(dataCollections).map(([key, name]) => (
 //                                 <CollectionUploader
 //                                     key={key}
 //                                     collectionKey={key}
 //                                     collectionName={name}
 //                                     hasAccess={access.includes(key)}
 //                                 />
 //                             ))}
 //                         </div>
 //                     </section>
 //                     {/* Master Collections Section */}
 //                     <section className="flex-1">
 //                         <h2 className="text-xl font-bold mb-2 text-center">Data Master</h2>
 //                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
 //                             {Object.entries(masterCollections).map(([key, name]) => (
 //                                 <CollectionUploader
 //                                     key={key}
 //                                     collectionKey={key}
 //                                     collectionName={name}
 //                                     hasAccess={access.includes(key)}
 //                                 />
 //                             ))}
 //                         </div>
 //                     </section>
 //                 </div>
 //             </div>
 //         </ProtectedRoute>
 //     );
 // }
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/upload/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_upload_page_tsx_a4250d._.js.map
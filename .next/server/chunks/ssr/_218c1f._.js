module.exports = {

"[project]/app/upload/page.tsx [app-rsc] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
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
// "use client";
// import { useState } from "react";
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
//     mastertbs_4: "Master TBS Data KOF",
//     mastertbs_41: "Master TBS Data KIF",
//     mastertbs_42: "Master TBS Data SOF",
//     mastertbs_43: "Master TBS Data SIF",
//     mastertbs_44: "Master TBS Data POF",
//     mastertbs_45: "Master TBS Data FRO",
//     mastertbs_46: "Master TBS Data FRD",
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
//iterasi 5 (ok)
// "use client";
// import { useState } from "react";
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
//     mastertbs_4: "Master TBS Data KOF",
//     mastertbs_41: "Master TBS Data KIF",
//     mastertbs_42: "Master TBS Data SOF",
//     mastertbs_43: "Master TBS Data SIF",
//     mastertbs_44: "Master TBS Data POF",
//     mastertbs_45: "Master TBS Data FRO",
//     mastertbs_46: "Master TBS Data FRD",
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
//     const tbsCollections = Object.fromEntries(
//         Object.entries(collections).filter(([key]) => key.startsWith("mastertbs"))
//     );
//     const masterCollections = Object.fromEntries(
//         Object.entries(collections).filter(([key]) => key.startsWith("master") && !key.startsWith("mastertbs"))
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
//                 <div className="flex flex-col md:flex-row gap-8">
//                     {/* Left: Data Collections */}
//                     <div className="flex-1">
//                         <h2 className="text-xl font-bold mb-2 text-center">Data Untuk Di Proses</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
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
//                     {/* Right: TBS and Master Collections */}
//                     <div className="flex-1 flex flex-col gap-8">
//                         {/* TBS Collections */}
//                         <section>
//                             <h2 className="text-xl font-bold mb-2 text-center">All Master TBS Data</h2>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
//                                 {Object.entries(tbsCollections).map(([key, name]) => (
//                                     <CollectionUploader
//                                         key={key}
//                                         collectionKey={key}
//                                         collectionName={name}
//                                         hasAccess={access.includes(key)}
//                                     />
//                                 ))}
//                             </div>
//                         </section>
//                         {/* Master Collections */}
//                         <section>
//                             <h2 className="text-xl font-bold mb-2 text-center">All Data Master</h2>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
//                                 {Object.entries(masterCollections).map(([key, name]) => (
//                                     <CollectionUploader
//                                         key={key}
//                                         collectionKey={key}
//                                         collectionName={name}
//                                         hasAccess={access.includes(key)}
//                                     />
//                                 ))}
//                             </div>
//                         </section>
//                     </div>
//                 </div>
//             </div>
//         </ProtectedRoute>
//     );
// }
//iterasi 6(ok)
// "use client";
// import { useState } from "react";
// import ProtectedRoute from "../components/ProtectedRoute";
// import { useAuth } from "../context/AuthContext";
// // Collection mapping for frontend display and backend handling
// const collections = {
//     datakof: "Data Konsolidator Outbound Fee",
//     datakif: "Data Konsolidator Inbound Fee",
//     datasof: "Data Subkonsolidator Outbound Fee",
//     datasif: "Data Subkonsolidator Inbound Fee",
//     datapof: "Data Pick Up Fee (PUF)",
//     datafro: "Data Forward Origin Fee",
//     datafrd: "Data Forward Destination Fee",
//     mastermn_1: "Master Mitra Name",
//     masteric_2: "Master IC",
//     masterls_3: "Master Last Status",
//     mastertbs_4: "TBS Konsolidator Outbound Fee",
//     mastertbs_41: "TBS Konsolidator Inbound Fee",
//     mastertbs_42: "TBS Subkonsolidator Outbound Fee",
//     mastertbs_43: "TBS Subkonsolidator Inbound Fee",
//     mastertbs_44: "TBS Pick Up Fee (PUF)",
//     mastertbs_45: "TBS Forward Origin Fee",
//     mastertbs_46: "TBS Forward Destination Fee",
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
//     const tbsCollections = Object.fromEntries(
//         Object.entries(collections).filter(([key]) => key.startsWith("mastertbs"))
//     );
//     const masterCollections = Object.fromEntries(
//         Object.entries(collections).filter(([key]) => key.startsWith("master") && !key.startsWith("mastertbs"))
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
//                 <div className="flex flex-col md:flex-row gap-8">
//                     {/* Left: Data Collections */}
//                     <div className="flex-1 border border-amber-300 rounded-lg p-4">
//                         <h2 className="text-xl font-bold mb-2 text-center">Upload Data Fee</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
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
//                     {/* Right: TBS and Master Collections */}
//                     <div className="flex-1 flex flex-col gap-8">
//                         {/* TBS Collections */}
//                         <section className="border border-amber-300 rounded-lg p-4">
//                             <h2 className="text-xl font-bold mb-2 text-center">Upload Master Data Total Bulan Sebelum (TBS)</h2>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
//                                 {Object.entries(tbsCollections).map(([key, name]) => (
//                                     <CollectionUploader
//                                         key={key}
//                                         collectionKey={key}
//                                         collectionName={name}
//                                         hasAccess={access.includes(key)}
//                                     />
//                                 ))}
//                             </div>
//                         </section>
//                         {/* Master Collections */}
//                         <section className="border border-amber-300 rounded-lg p-4">
//                             <h2 className="text-xl font-bold mb-2 text-center">Upload Data Master Others</h2>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
//                                 {Object.entries(masterCollections).map(([key, name]) => (
//                                     <CollectionUploader
//                                         key={key}
//                                         collectionKey={key}
//                                         collectionName={name}
//                                         hasAccess={access.includes(key)}
//                                     />
//                                 ))}
//                             </div>
//                         </section>
//                     </div>
//                 </div>
//             </div>
//         </ProtectedRoute>
//     );
// }
//iterasi 7 (ok 17/12)
// "use client";
// import { useState } from "react";
// import ProtectedRoute from "../components/ProtectedRoute";
// import { useAuth } from "../context/AuthContext";
// // Collection mapping for frontend display and backend handling
// const collections = {
//     datakof: "Data Konsolidator Outbound Fee",
//     datakif: "Data Konsolidator Inbound Fee",
//     datasof: "Data Subkonsolidator Outbound Fee",
//     datasif: "Data Subkonsolidator Inbound Fee",
//     datapof: "Data Pick Up Fee (PUF)",
//     datafro: "Data Forward Origin Fee",
//     datafrd: "Data Forward Destination Fee",
//     mastermn_1: "Master Mitra Name",
//     masteric_2: "Master IC",
//     masterls_3: "Master Last Status",
//     mastertbs_4: "TBS Konsolidator Outbound Fee",
//     mastertbs_41: "TBS Konsolidator Inbound Fee",
//     mastertbs_42: "TBS Subkonsolidator Outbound Fee",
//     mastertbs_43: "TBS Subkonsolidator Inbound Fee",
//     mastertbs_44: "TBS Pick Up Fee (PUF)",
//     mastertbs_45: "TBS Forward Origin Fee",
//     mastertbs_46: "TBS Forward Destination Fee",
//     masterbc_5: "Master Berat Corp",
//     masterrg_6: "Master Routing",
//     masterrf_7: "Master Rate Forward",
//     masterrt_8: "Master Rate Trucking",
//     masterdl_9: "Master DTPL",
//     mastermt_10: "Master MTUC",
// };
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
//     const { username } = useAuth(); // Retrieve username from AuthContext
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             setFiles(Array.from(event.target.files));
//             setMessages([]);
//         }
//     };
//     const handleUpload = async () => {
//         if (!hasAccess || !username) {
//             setMessages(["Access restricted or username missing."]);
//             return;
//         }
//         if (files.length === 0) {
//             setMessages(["Please select at least one CSV file first."]);
//             return;
//         }
//         setLoading(true);
//         const newMessages: string[] = [];
//         for (const file of files) {
//             const formData = new FormData();
//             formData.append("file", file);
//             try {
//                 const response = await fetch(
//                     `${apiUrl}/uploadData?collection=${encodeURIComponent(collectionKey)}&username=${encodeURIComponent(username)}`,
//                     { method: "POST", body: formData }
//                 );
//                 if (!response.ok) {
//                     const errorResponse = await response.json();
//                     newMessages.push(`Failed to upload ${file.name}: ${errorResponse.error || "Unknown error"}`);
//                 } else {
//                     const responseData = await response.json();
//                     newMessages.push(
//                         `${file.name} uploaded successfully to ${collectionName}: Records Added: ${responseData.recordsAdded}, Before Count: ${responseData.beforeCount}, After Count: ${responseData.afterCount}`
//                     );
//                 }
//             } catch (error) {
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
//             setMessages(["Error downloading headers."]);
//         }
//     };
//     return (
//         <div
//             className={`p-2 bg-gray-900 rounded-lg text-center ${
//                 hasAccess ? "hover:scale-105" : "opacity-50 cursor-not-allowed"
//             } transition-all`}
//         >
//             <h4 className="text-sm font-medium mb-1 text-white">{collectionName}</h4>
//             <button
//                 onClick={downloadHeaders}
//                 disabled={!hasAccess}
//                 className={`w-full px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 mb-2 ${
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
//                 className={`w-full px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded hover:bg-green-700 ${
//                     loading ? "bg-gray-500 cursor-not-allowed" : ""
//                 }`}
//             >
//                 {loading ? "Uploading..." : "Upload File"}
//             </button>
//             {messages.map((msg, index) => (
//                 <p key={index} className="text-xs text-gray-400 mt-1">
//                     {msg}
//                 </p>
//             ))}
//         </div>
//     );
// }
// export default function UploadPage() {
//     const { access } = useAuth();
//     const hasUploadAccess = access.includes("upload");
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
//     const tbsCollections = Object.fromEntries(
//         Object.entries(collections).filter(([key]) => key.startsWith("mastertbs"))
//     );
//     const masterCollections = Object.fromEntries(
//         Object.entries(collections).filter(([key]) => key.startsWith("master") && !key.startsWith("mastertbs"))
//     );
//     return (
//         <ProtectedRoute>
//             <div className="min-h-screen bg-black text-gray-200 p-4">
//                 <h1 className="text-xl font-bold mb-4">Upload CSV Files</h1>
//                 <section>
//                     <h2 className="text-lg font-semibold mb-2">Data Collections</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                         {Object.entries(dataCollections).map(([key, name]) => (
//                             <CollectionUploader key={key} collectionKey={key} collectionName={name} hasAccess={access.includes(key)} />
//                         ))}
//                     </div>
//                 </section>
//                 <section>
//                     <h2 className="text-lg font-semibold mt-6 mb-2">TBS Collections</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                         {Object.entries(tbsCollections).map(([key, name]) => (
//                             <CollectionUploader key={key} collectionKey={key} collectionName={name} hasAccess={access.includes(key)} />
//                         ))}
//                     </div>
//                 </section>
//                 <section>
//                     <h2 className="text-lg font-semibold mt-6 mb-2">Master Collections</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                         {Object.entries(masterCollections).map(([key, name]) => (
//                             <CollectionUploader key={key} collectionKey={key} collectionName={name} hasAccess={access.includes(key)} />
//                         ))}
//                     </div>
//                 </section>
//             </div>
//         </ProtectedRoute>
//     );
// }
//function before after count
// "use client";
// import { useState } from "react";
// import ProtectedRoute from "../components/ProtectedRoute";
// import { useAuth } from "../context/AuthContext";
// // Collection mapping
// const collections = {
//     datakof: "Data Konsolidator Outbound Fee",
//     datakif: "Data Konsolidator Inbound Fee",
//     datasof: "Data Subkonsolidator Outbound Fee",
//     datasif: "Data Subkonsolidator Inbound Fee",
//     datapof: "Data Pick Up Fee (PUF)",
//     datafro: "Data Forward Origin Fee",
//     datafrd: "Data Forward Destination Fee",
//     mastermn_1: "Master Mitra Name",
//     masteric_2: "Master IC",
//     masterls_3: "Master Last Status",
//     mastertbs_4: "TBS Konsolidator Outbound Fee",
//     mastertbs_41: "TBS Konsolidator Inbound Fee",
//     mastertbs_42: "TBS Subkonsolidator Outbound Fee",
//     mastertbs_43: "TBS Subkonsolidator Inbound Fee",
//     mastertbs_44: "TBS Pick Up Fee (PUF)",
//     mastertbs_45: "TBS Forward Origin Fee",
//     mastertbs_46: "TBS Forward Destination Fee",
//     masterbc_5: "Master Berat Corp",
//     masterrg_6: "Master Routing",
//     masterrf_7: "Master Rate Forward",
//     masterrt_8: "Master Rate Trucking",
//     masterdl_9: "Master DTPL",
//     mastermt_10: "Master MTUC",
// };
// // CollectionUploader component (Reused with improved functionality)
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
//     const { username } = useAuth();
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             setFiles(Array.from(event.target.files));
//             setMessages([]);
//         }
//     };
//     const handleUpload = async () => {
//         if (!hasAccess || !username) {
//             setMessages(["Access restricted or username missing."]);
//             return;
//         }
//         if (files.length === 0) {
//             setMessages(["Please select at least one CSV file first."]);
//             return;
//         }
//         setLoading(true);
//         const newMessages: string[] = [];
//         for (const file of files) {
//             const formData = new FormData();
//             formData.append("file", file);
//             try {
//                 const response = await fetch(
//                     `${apiUrl}/uploadData?collection=${encodeURIComponent(collectionKey)}&username=${encodeURIComponent(username)}`,
//                     { method: "POST", body: formData }
//                 );
//                 if (!response.ok) {
//                     const errorResponse = await response.json();
//                     newMessages.push(`Failed to upload ${file.name}: ${errorResponse.error || "Unknown error"}`);
//                 } else {
//                     const responseData = await response.json();
//                     newMessages.push(
//                         `${file.name} uploaded successfully: Records Added: ${responseData.recordsAdded}, Before Count: ${responseData.beforeCount}, After Count: ${responseData.afterCount}`
//                     );
//                 }
//             } catch (error) {
//                 newMessages.push(`Error uploading ${file.name}. Please try again.`);
//             }
//         }
//         setMessages(newMessages);
//         setFiles([]);
//         setLoading(false);
//     };
//     return (
//         <div className="p-2 bg-gray-800 rounded-lg text-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
//             <h4 className="text-sm font-medium text-white mb-2">{collectionName}</h4>
//             <input
//                 type="file"
//                 accept=".csv"
//                 multiple
//                 onChange={handleFileChange}
//                 disabled={!hasAccess}
//                 className="w-full mb-2 text-xs p-1 border rounded text-gray-200"
//             />
//             <button
//                 onClick={handleUpload}
//                 disabled={loading || !hasAccess}
//                 className={`w-full px-2 py-1 rounded text-white text-xs font-semibold ${
//                     loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
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
// // Main UploadPage component
// export default function UploadPage() {
//     const { access } = useAuth();
//     const hasUploadAccess = access.includes("upload");
//     if (!hasUploadAccess) {
//         return (
//             <ProtectedRoute>
//                 <div className="min-h-screen bg-black text-gray-200 flex items-center justify-center">
//                     <p className="text-red-500">Access Restricted</p>
//                 </div>
//             </ProtectedRoute>
//         );
//     }
//     return (
//         <ProtectedRoute>
//             <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
//                 <header className="mb-8 text-center">
//                     <h1 className="text-2xl font-bold">Upload CSV Files</h1>
//                     <p className="text-gray-400 text-sm">Manage and upload files for each data collection.</p>
//                 </header>
//                 <section className="mb-8">
//                     <h2 className="text-xl font-semibold mb-4 text-center">Data Collections</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                         {Object.entries(collections)
//                             .filter(([key]) => key.startsWith("data"))
//                             .map(([key, name]) => (
//                                 <CollectionUploader key={key} collectionKey={key} collectionName={name} hasAccess={access.includes(key)} />
//                             ))}
//                     </div>
//                 </section>
//                 <section className="mb-8">
//                     <h2 className="text-xl font-semibold mb-4 text-center">TBS Collections</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                         {Object.entries(collections)
//                             .filter(([key]) => key.startsWith("mastertbs"))
//                             .map(([key, name]) => (
//                                 <CollectionUploader key={key} collectionKey={key} collectionName={name} hasAccess={access.includes(key)} />
//                             ))}
//                     </div>
//                 </section>
//                 <section>
//                     <h2 className="text-xl font-semibold mb-4 text-center">Master Collections</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                         {Object.entries(collections)
//                             .filter(([key]) => key.startsWith("master") && !key.startsWith("mastertbs"))
//                             .map(([key, name]) => (
//                                 <CollectionUploader key={key} collectionKey={key} collectionName={name} hasAccess={access.includes(key)} />
//                             ))}
//                     </div>
//                 </section>
//             </div>
//         </ProtectedRoute>
//     );
// }
// "use client";
// import { useState } from "react";
// import ProtectedRoute from "../components/ProtectedRoute";
// import { useAuth } from "../context/AuthContext";
// // Collection Mapping
// const collections = {
//     datakof: "Data Konsolidator Outbound Fee",
//     datakif: "Data Konsolidator Inbound Fee",
//     datasof: "Data Subkonsolidator Outbound Fee",
//     datasif: "Data Subkonsolidator Inbound Fee",
//     datapof: "Data Pick Up Fee (PUF)",
//     datafro: "Data Forward Origin Fee",
//     datafrd: "Data Forward Destination Fee",
//     mastermn_1: "Master Mitra Name",
//     masteric_2: "Master IC",
//     masterls_3: "Master Last Status",
//     mastertbs_4: "TBS Konsolidator Outbound Fee",
//     mastertbs_41: "TBS Konsolidator Inbound Fee",
//     mastertbs_42: "TBS Subkonsolidator Outbound Fee",
//     mastertbs_43: "TBS Subkonsolidator Inbound Fee",
//     mastertbs_44: "TBS Pick Up Fee (PUF)",
//     mastertbs_45: "TBS Forward Origin Fee",
//     mastertbs_46: "TBS Forward Destination Fee",
//     masterbc_5: "Master Berat Corp",
//     masterrg_6: "Master Routing",
//     masterrf_7: "Master Rate Forward",
//     masterrt_8: "Master Rate Trucking",
//     masterdl_9: "Master DTPL",
//     mastermt_10: "Master MTUC",
// };
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
//     const { username } = useAuth();
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             setFiles(Array.from(event.target.files));
//             setMessages([]);
//         }
//     };
//     const handleUpload = async () => {
//         if (!hasAccess || !username) {
//             setMessages(["Access restricted or username missing."]);
//             return;
//         }
//         if (files.length === 0) {
//             setMessages(["Please select at least one CSV file first."]);
//             return;
//         }
//         setLoading(true);
//         const newMessages: string[] = [];
//         for (const file of files) {
//             const formData = new FormData();
//             formData.append("file", file);
//             try {
//                 const response = await fetch(
//                     `${apiUrl}/uploadData?collection=${encodeURIComponent(collectionKey)}&username=${encodeURIComponent(username)}`,
//                     { method: "POST", body: formData }
//                 );
//                 if (!response.ok) {
//                     const errorResponse = await response.json();
//                     newMessages.push(`Failed to upload ${file.name}: ${errorResponse.error || "Unknown error"}`);
//                 } else {
//                     const responseData = await response.json();
//                     newMessages.push(
//                         `${file.name} uploaded successfully to ${collectionName}: Records Added: ${responseData.recordsAdded}, Before Count: ${responseData.beforeCount}, After Count: ${responseData.afterCount}`
//                     );
//                 }
//             } catch (error) {
//                 newMessages.push(`Error uploading ${file.name}. Please try again.`);
//             }
//         }
//         setMessages(newMessages);
//         setFiles([]);
//         setLoading(false);
//     };
//     return (
//         <div
//             className={`p-2 bg-gray-900 rounded-lg shadow-md text-center hover:shadow-lg transform ${
//                 hasAccess ? "hover:scale-105" : "opacity-50 cursor-not-allowed"
//             } transition-all`}
//         >
//             <h4 className="text-sm font-medium mb-2 text-white">{collectionName}</h4>
//             <input
//                 type="file"
//                 accept=".csv"
//                 multiple
//                 onChange={handleFileChange}
//                 className="w-full text-xs mb-2 p-1 border rounded text-gray-300 file:bg-white file:text-black file:rounded"
//                 disabled={!hasAccess}
//             />
//             <button
//                 onClick={handleUpload}
//                 disabled={loading || !hasAccess}
//                 className={`w-full px-2 py-1 text-xs font-semibold text-white rounded ${
//                     loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
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
// export default function UploadPage() {
//     const { access } = useAuth();
//     const hasUploadAccess = access.includes("upload");
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
//     const tbsCollections = Object.fromEntries(
//         Object.entries(collections).filter(([key]) => key.startsWith("mastertbs"))
//     );
//     const masterCollections = Object.fromEntries(
//         Object.entries(collections).filter(([key]) => key.startsWith("master") && !key.startsWith("mastertbs"))
//     );
//     return (
//         <ProtectedRoute>
//             <div className="min-h-screen bg-black text-gray-200 p-4">
//                 <header className="mb-6 text-center">
//                     <h1 className="text-xl font-bold mb-1">Upload CSV Files</h1>
//                     <p className="text-xs text-gray-300">Upload your files into the respective categories below.</p>
//                 </header>
//                 <div className="flex flex-col md:flex-row gap-8">
//                     {/* Left Section */}
//                     <section className="flex-1 border border-amber-300 rounded-lg p-4">
//                         <h2 className="text-xl font-semibold mb-4 text-center">Data Collections</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {Object.entries(dataCollections).map(([key, name]) => (
//                                 <CollectionUploader key={key} collectionKey={key} collectionName={name} hasAccess={access.includes(key)} />
//                             ))}
//                         </div>
//                     </section>
//                     {/* Right Section */}
//                     <div className="flex-1 flex flex-col gap-8">
//                         <section className="border border-amber-300 rounded-lg p-4">
//                             <h2 className="text-xl font-semibold mb-4 text-center">TBS Collections</h2>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                                 {Object.entries(tbsCollections).map(([key, name]) => (
//                                     <CollectionUploader key={key} collectionKey={key} collectionName={name} hasAccess={access.includes(key)} />
//                                 ))}
//                             </div>
//                         </section>
//                         <section className="border border-amber-300 rounded-lg p-4">
//                             <h2 className="text-xl font-semibold mb-4 text-center">Master Collections</h2>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                                 {Object.entries(masterCollections).map(([key, name]) => (
//                                     <CollectionUploader key={key} collectionKey={key} collectionName={name} hasAccess={access.includes(key)} />
//                                 ))}
//                             </div>
//                         </section>
//                     </div>
//                 </div>
//             </div>
//         </ProtectedRoute>
//     );
// }
const { jsxDEV: _jsxDEV } = __turbopack_require__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
function CollectionUploader({ collectionKey, collectionName, hasAccess }) {
    const [files, setFiles] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { username } = useAuth();
    const apiUrl = ("TURBOPACK compile-time value", "http://localhost:8080/api");
    // Handles file selection
    const handleFileChange = (event)=>{
        if (event.target.files) {
            setFiles(Array.from(event.target.files));
            setMessages([]);
        }
    };
    // Handles file upload
    const handleUpload = async ()=>{
        if (!hasAccess || !username) {
            setMessages([
                "Access restricted or username missing."
            ]);
            return;
        }
        if (files.length === 0) {
            setMessages([
                "Please select at least one CSV file first."
            ]);
            return;
        }
        setLoading(true);
        const newMessages = [];
        for (const file of files){
            const formData = new FormData();
            formData.append("file", file);
            try {
                const response = await fetch(`${apiUrl}/uploadData?collection=${encodeURIComponent(collectionKey)}&username=${encodeURIComponent(username)}`, {
                    method: "POST",
                    body: formData
                });
                if (!response.ok) {
                    const errorResponse = await response.json();
                    newMessages.push(`Failed to upload ${file.name}: ${errorResponse.error || "Unknown error"}`);
                } else {
                    const responseData = await response.json();
                    newMessages.push(`${file.name} uploaded successfully to ${collectionName}: Records Added: ${responseData.recordsAdded}, Before Count: ${responseData.beforeCount}, After Count: ${responseData.afterCount}`);
                }
            } catch (error) {
                newMessages.push(`Error uploading ${file.name}. Please try again.`);
            }
        }
        setMessages(newMessages);
        setFiles([]);
        setLoading(false);
    };
    // Handles header download
    const downloadHeaders = async ()=>{
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        try {
            const response = await fetch(`${apiUrl}/fetchHeadersAndExport?collection=${encodeURIComponent(collectionKey)}`);
            if (!response.ok) {
                setMessages([
                    "Failed to download headers. Try again later."
                ]);
                return;
            }
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = `${collectionKey}_headers.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setMessages([
                "Headers downloaded successfully."
            ]);
        } catch (error) {
            setMessages([
                "Error downloading headers."
            ]);
        }
    };
    return /*#__PURE__*/ _jsxDEV("div", {
        className: `p-2 bg-gray-900 rounded-lg shadow-md text-center hover:shadow-lg transform ${hasAccess ? "hover:scale-105" : "opacity-50 cursor-not-allowed"} transition-all`,
        children: [
            /*#__PURE__*/ _jsxDEV("h4", {
                className: "text-sm font-medium mb-2 text-white",
                children: collectionName
            }, void 0, false, {
                fileName: "[project]/app/upload/page.tsx",
                lineNumber: 2428,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ _jsxDEV("button", {
                onClick: downloadHeaders,
                disabled: !hasAccess,
                className: `w-full px-2 py-1 mb-2 text-xs font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 ${!hasAccess && "opacity-50 cursor-not-allowed"}`,
                children: "Cek Header"
            }, void 0, false, {
                fileName: "[project]/app/upload/page.tsx",
                lineNumber: 2431,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ _jsxDEV("input", {
                type: "file",
                accept: ".csv",
                multiple: true,
                onChange: handleFileChange,
                className: "w-full text-xs mb-2 p-1 border rounded text-gray-300 file:bg-white file:text-black file:rounded",
                disabled: !hasAccess
            }, void 0, false, {
                fileName: "[project]/app/upload/page.tsx",
                lineNumber: 2442,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ _jsxDEV("button", {
                onClick: handleUpload,
                disabled: loading || !hasAccess,
                className: `w-full px-2 py-1 text-xs font-semibold text-white rounded ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`,
                children: loading ? "Uploading..." : "Upload File"
            }, void 0, false, {
                fileName: "[project]/app/upload/page.tsx",
                lineNumber: 2452,
                columnNumber: 13
            }, this),
            messages.map((msg, index)=>/*#__PURE__*/ _jsxDEV("p", {
                    className: "mt-1 text-xs text-gray-400",
                    children: msg
                }, index, false, {
                    fileName: "[project]/app/upload/page.tsx",
                    lineNumber: 2464,
                    columnNumber: 17
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/app/upload/page.tsx",
        lineNumber: 2423,
        columnNumber: 9
    }, this);
}
}}),
"[project]/app/upload/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_namespace__(__turbopack_import__("[project]/app/upload/page.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/.next-internal/server/app/upload/page/actions.js [app-rsc] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
"[project]/node_modules/next/dist/esm/build/templates/app-page.js?page=/upload/page { METADATA_0 => \"[project]/app/favicon.ico.mjs { IMAGE => \\\"[project]/app/favicon.ico [app-rsc] (static)\\\" } [app-rsc] (structured image object, ecmascript, Next.js server component)\", MODULE_1 => \"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)\", MODULE_2 => \"[project]/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_3 => \"[project]/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_4 => \"[project]/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_5 => \"[project]/app/upload/page.tsx [app-rsc] (ecmascript, Next.js server component)\" } [app-rsc] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "__next_app__": (()=>__next_app__),
    "pages": (()=>pages),
    "routeModule": (()=>routeModule),
    "tree": (()=>tree)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_import__("[project]/app/upload/page.tsx [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/lib/metadata/get-metadata-route.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_import__('[project]/app/favicon.ico.mjs { IMAGE => "[project]/app/favicon.ico [app-rsc] (static)" } [app-rsc] (structured image object, ecmascript, Next.js server component)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_import__("[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$module$2e$compiled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/route-kind.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
// We inject the tree and pages here so that we can use them in the route
// module.
const tree = [
    "",
    {
        "children": [
            "upload",
            {
                "children": [
                    "__PAGE__",
                    {},
                    {
                        metadata: {},
                        "page": [
                            ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__,
                            "[project]/app/upload/page.tsx"
                        ]
                    }
                ]
            },
            {
                metadata: {}
            }
        ]
    },
    {
        metadata: {
            icon: [
                async (props)=>[
                        {
                            url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fillMetadataSegment"])("//", props.params, "favicon.ico") + `?${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29$__["default"].src.split("/").splice(-1)[0]}`,
                            sizes: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29$__["default"].width}x${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29$__["default"].height}`,
                            type: `image/x-icon`
                        }
                    ]
            ]
        },
        "layout": [
            ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__,
            "[project]/app/layout.tsx"
        ],
        "not-found": [
            ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__,
            "[project]/node_modules/next/dist/client/components/not-found-error.js"
        ],
        "forbidden": [
            ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__,
            "[project]/node_modules/next/dist/client/components/forbidden-error.js"
        ],
        "unauthorized": [
            ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__,
            "[project]/node_modules/next/dist/client/components/unauthorized-error.js"
        ]
    }
];
const pages = [
    "[project]/app/upload/page.tsx"
];
;
;
const __next_app_require__ = __turbopack_require__;
const __next_app_load_chunk__ = __turbopack_load__;
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};
;
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$module$2e$compiled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppPageRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RouteKind"].APP_PAGE,
        page: "/upload/page",
        pathname: "/upload",
        // The following aren't used in production.
        bundlePath: '',
        filename: '',
        appPaths: []
    },
    userland: {
        loaderTree: tree
    }
}); //# sourceMappingURL=app-page.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/app-page.js?page=/upload/page { METADATA_0 => \"[project]/app/favicon.ico.mjs { IMAGE => \\\"[project]/app/favicon.ico [app-rsc] (static)\\\" } [app-rsc] (structured image object, ecmascript, Next.js server component)\", MODULE_1 => \"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)\", MODULE_2 => \"[project]/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_3 => \"[project]/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_4 => \"[project]/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_5 => \"[project]/app/upload/page.tsx [app-rsc] (ecmascript, Next.js server component)\" } [app-rsc] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/lib/metadata/get-metadata-route.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_import__('[project]/app/favicon.ico.mjs { IMAGE => "[project]/app/favicon.ico [app-rsc] (static)" } [app-rsc] (structured image object, ecmascript, Next.js server component)');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_import__("[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29$__ = __turbopack_import__("[project]/app/upload/page.tsx [app-rsc] (ecmascript, Next.js server component)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$module$2e$compiled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/route-kind.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$error$2d$boundary$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/components/error-boundary.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__('[project]/node_modules/next/dist/esm/build/templates/app-page.js?page=/upload/page { METADATA_0 => "[project]/app/favicon.ico.mjs { IMAGE => \\"[project]/app/favicon.ico [app-rsc] (static)\\" } [app-rsc] (structured image object, ecmascript, Next.js server component)", MODULE_1 => "[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)", MODULE_2 => "[project]/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_3 => "[project]/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_4 => "[project]/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_5 => "[project]/app/upload/page.tsx [app-rsc] (ecmascript, Next.js server component)" } [app-rsc] (ecmascript) <locals>');
}}),
"[project]/node_modules/next/dist/esm/build/templates/app-page.js?page=/upload/page { METADATA_0 => \"[project]/app/favicon.ico.mjs { IMAGE => \\\"[project]/app/favicon.ico [app-rsc] (static)\\\" } [app-rsc] (structured image object, ecmascript, Next.js server component)\", MODULE_1 => \"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)\", MODULE_2 => \"[project]/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_3 => \"[project]/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_4 => \"[project]/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_5 => \"[project]/app/upload/page.tsx [app-rsc] (ecmascript, Next.js server component)\" } [app-rsc] (ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ClientPageRoot": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ClientPageRoot"]),
    "ClientSegmentRoot": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ClientSegmentRoot"]),
    "GlobalError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$error$2d$boundary$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]),
    "HTTPAccessFallbackBoundary": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HTTPAccessFallbackBoundary"]),
    "LayoutRouter": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LayoutRouter"]),
    "MetadataBoundary": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MetadataBoundary"]),
    "OutletBoundary": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OutletBoundary"]),
    "Postpone": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Postpone"]),
    "RenderFromTemplateContext": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RenderFromTemplateContext"]),
    "ViewportBoundary": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewportBoundary"]),
    "__next_app__": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["__next_app__"]),
    "actionAsyncStorage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["actionAsyncStorage"]),
    "collectSegmentData": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collectSegmentData"]),
    "createMetadataComponents": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createMetadataComponents"]),
    "createPrerenderParamsForClientSegment": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPrerenderParamsForClientSegment"]),
    "createPrerenderSearchParamsForClientPage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPrerenderSearchParamsForClientPage"]),
    "createServerParamsForMetadata": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerParamsForMetadata"]),
    "createServerParamsForServerSegment": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerParamsForServerSegment"]),
    "createServerSearchParamsForMetadata": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerSearchParamsForMetadata"]),
    "createServerSearchParamsForServerPage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerSearchParamsForServerPage"]),
    "createTemporaryReferenceSet": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTemporaryReferenceSet"]),
    "decodeAction": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeAction"]),
    "decodeFormState": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeFormState"]),
    "decodeReply": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decodeReply"]),
    "pages": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["pages"]),
    "patchFetch": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["patchFetch"]),
    "preconnect": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["preconnect"]),
    "preloadFont": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["preloadFont"]),
    "preloadStyle": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["preloadStyle"]),
    "prerender": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prerender"]),
    "renderToReadableStream": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["renderToReadableStream"]),
    "routeModule": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["routeModule"]),
    "serverHooks": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serverHooks"]),
    "taintObjectReference": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["taintObjectReference"]),
    "tree": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["tree"]),
    "workAsyncStorage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["workAsyncStorage"]),
    "workUnitAsyncStorage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["workUnitAsyncStorage"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$error$2d$boundary$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/components/error-boundary.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$app$2d$render$2f$entry$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/app-render/entry-base.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__('[project]/node_modules/next/dist/esm/build/templates/app-page.js?page=/upload/page { METADATA_0 => "[project]/app/favicon.ico.mjs { IMAGE => \\"[project]/app/favicon.ico [app-rsc] (static)\\" } [app-rsc] (structured image object, ecmascript, Next.js server component)", MODULE_1 => "[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)", MODULE_2 => "[project]/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_3 => "[project]/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_4 => "[project]/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_5 => "[project]/app/upload/page.tsx [app-rsc] (ecmascript, Next.js server component)" } [app-rsc] (ecmascript) <locals>');
}}),
"[project]/node_modules/next/dist/esm/build/templates/app-page.js?page=/upload/page { METADATA_0 => \"[project]/app/favicon.ico.mjs { IMAGE => \\\"[project]/app/favicon.ico [app-rsc] (static)\\\" } [app-rsc] (structured image object, ecmascript, Next.js server component)\", MODULE_1 => \"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)\", MODULE_2 => \"[project]/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_3 => \"[project]/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_4 => \"[project]/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)\", MODULE_5 => \"[project]/app/upload/page.tsx [app-rsc] (ecmascript, Next.js server component)\" } [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ClientPageRoot": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["ClientPageRoot"]),
    "ClientSegmentRoot": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["ClientSegmentRoot"]),
    "GlobalError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["GlobalError"]),
    "HTTPAccessFallbackBoundary": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["HTTPAccessFallbackBoundary"]),
    "LayoutRouter": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["LayoutRouter"]),
    "MetadataBoundary": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["MetadataBoundary"]),
    "OutletBoundary": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["OutletBoundary"]),
    "Postpone": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["Postpone"]),
    "RenderFromTemplateContext": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["RenderFromTemplateContext"]),
    "ViewportBoundary": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["ViewportBoundary"]),
    "__next_app__": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["__next_app__"]),
    "actionAsyncStorage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["actionAsyncStorage"]),
    "collectSegmentData": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["collectSegmentData"]),
    "createMetadataComponents": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["createMetadataComponents"]),
    "createPrerenderParamsForClientSegment": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["createPrerenderParamsForClientSegment"]),
    "createPrerenderSearchParamsForClientPage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["createPrerenderSearchParamsForClientPage"]),
    "createServerParamsForMetadata": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["createServerParamsForMetadata"]),
    "createServerParamsForServerSegment": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["createServerParamsForServerSegment"]),
    "createServerSearchParamsForMetadata": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["createServerSearchParamsForMetadata"]),
    "createServerSearchParamsForServerPage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["createServerSearchParamsForServerPage"]),
    "createTemporaryReferenceSet": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["createTemporaryReferenceSet"]),
    "decodeAction": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["decodeAction"]),
    "decodeFormState": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["decodeFormState"]),
    "decodeReply": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["decodeReply"]),
    "pages": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["pages"]),
    "patchFetch": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["patchFetch"]),
    "preconnect": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["preconnect"]),
    "preloadFont": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["preloadFont"]),
    "preloadStyle": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["preloadStyle"]),
    "prerender": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["prerender"]),
    "renderToReadableStream": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["renderToReadableStream"]),
    "routeModule": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["routeModule"]),
    "serverHooks": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["serverHooks"]),
    "taintObjectReference": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["taintObjectReference"]),
    "tree": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["tree"]),
    "workAsyncStorage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["workAsyncStorage"]),
    "workUnitAsyncStorage": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__["workUnitAsyncStorage"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__('[project]/node_modules/next/dist/esm/build/templates/app-page.js?page=/upload/page { METADATA_0 => "[project]/app/favicon.ico.mjs { IMAGE => \\"[project]/app/favicon.ico [app-rsc] (static)\\" } [app-rsc] (structured image object, ecmascript, Next.js server component)", MODULE_1 => "[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)", MODULE_2 => "[project]/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_3 => "[project]/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_4 => "[project]/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_5 => "[project]/app/upload/page.tsx [app-rsc] (ecmascript, Next.js server component)" } [app-rsc] (ecmascript) <module evaluation>');
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$app$2d$page$2e$js$3f$page$3d2f$upload$2f$page__$7b$__METADATA_0__$3d3e$__$225b$project$5d2f$app$2f$favicon$2e$ico$2e$mjs__$7b$__IMAGE__$3d3e$__$5c225b$project$5d2f$app$2f$favicon$2e$ico__$5b$app$2d$rsc$5d$__$28$static$295c22$__$7d$__$5b$app$2d$rsc$5d$__$28$structured__image__object$2c$__ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_1__$3d3e$__$225b$project$5d2f$app$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_2__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$not$2d$found$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_3__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$forbidden$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_4__$3d3e$__$225b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$unauthorized$2d$error$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$29222c$__MODULE_5__$3d3e$__$225b$project$5d2f$app$2f$upload$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2c$__Next$2e$js__server__component$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_import__('[project]/node_modules/next/dist/esm/build/templates/app-page.js?page=/upload/page { METADATA_0 => "[project]/app/favicon.ico.mjs { IMAGE => \\"[project]/app/favicon.ico [app-rsc] (static)\\" } [app-rsc] (structured image object, ecmascript, Next.js server component)", MODULE_1 => "[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)", MODULE_2 => "[project]/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_3 => "[project]/node_modules/next/dist/client/components/forbidden-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_4 => "[project]/node_modules/next/dist/client/components/unauthorized-error.js [app-rsc] (ecmascript, Next.js server component)", MODULE_5 => "[project]/app/upload/page.tsx [app-rsc] (ecmascript, Next.js server component)" } [app-rsc] (ecmascript) <exports>');
}}),

};

//# sourceMappingURL=_218c1f._.js.map
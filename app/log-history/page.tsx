"use client";

import { useEffect, useState } from "react";

type UploadLog = {
    CollectionName: string;
    CSVTotalCount: number;
    RecordCount: number;
    UploadedAt: string;
    Status: string;
    ErrorMessage?: string;
    UploadedBy: string;
    DataBefore: number;
    DataAfter: number;
    DuplicateCount: number;
    Action: string;
};

const collectionAliases: { [key: string]: string } = {
    datakof: "Data Konsolidator Outbound Fee",
    datakif: "Data Konsolidator Inbound Fee",
    datasof: "Data Subkonsolidator Outbound Fee",
    datasif: "Data Subkonsolidator Inbound Fee",
    datapof: "Data Pick Up Fee",
    datafro: "Data Forward Origin Fee",
    datafrd: "Data Forward Destination Fee",
    mastermn_1: "Master Mitra Name",
    masteric_2: "Master IC",
    masterls_3: "Master Last Status",
    mastertbs_4: "TBS Konsolidator Outbound Fee",
    mastertbs_41: "TBS Konsolidator Inbound Fee",
    mastertbs_42: "TBS Subkonsolidator Outbound Fee",
    mastertbs_43: "TBS Subkonsolidator Inbound Fee",
    mastertbs_44: "TBS Pick Up Fee",
    mastertbs_45: "TBS Forward Origin Fee",
    mastertbs_46: "TBS Forward Destination Fee",
    masterbc_5: "Master Berat Corp",
    masterrg_6: "Master Routing",
    masterrf_7: "Master Rate Forward",
    masterrt_8: "Master Rate Trucking",
    masterdl_9: "Master DTPL",
    mastermt_10: "Master MTUC",
};

export default function LogHistoryPage() {
    const [logs, setLogs] = useState<UploadLog[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const logsPerPage = 8;

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUploadLogs`);
                if (!response.ok) throw new Error("Failed to fetch logs");
                const result = await response.json();
                setLogs(result);
                setError(null);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchLogs();
    }, []);

    const formatDate = (dateString: string) => {
        try {
            const options: Intl.DateTimeFormatOptions = {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            };
            return new Date(dateString).toLocaleDateString(undefined, options);
        } catch {
            return "Invalid Date";
        }
    };

    const headTbl = [
        "Tanggal dan Jam",
        "Nama Collection",
        "Action",
        "Jumlah Data Upload",
        "Data yang sudah ada",
        "Data Duplicate",
        "Data Diinsert",
        "Hasil Akhir",
        "Upload by User",
        "Status",
        "Error Message",
    ];

    // Sort and paginate logs
    const sortedLogs = [...logs].sort((a, b) => new Date(b.UploadedAt).getTime() - new Date(a.UploadedAt).getTime());
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = sortedLogs.slice(indexOfFirstLog, indexOfLastLog);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-black text-gray-200 p-4">
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-xl font-bold mb-1">Log History</h1>
                <p className="font-mono text-xs text-gray-50">A detailed overview of all data uploads and their results.</p>
            </header>

            {/* Content Layout */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1 border border-amber-300 rounded-lg p-4">
                    <h2 className="text-xl font-bold mb-4 text-center">Data Upload Logs</h2>
                    {isLoading ? (
                        <p className="text-center text-gray-400">Loading logs...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        <div className="w-full overflow-x-auto">
                            <table className="w-full border-collapse text-xs font-medium">
                                <thead className="bg-gray-900 text-white">
                                    <tr>
                                        {headTbl.map((head) => (
                                            <th key={head} className="py-2 px-2 text-left border border-gray-700">
                                                {head}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentLogs.length > 0 ? (
                                        currentLogs.map((log, index) => (
                                            <tr key={index} className="odd:bg-gray-50 even:bg-gray-50 hover:bg-gray-600">
                                                <td className="py-px px-2 border text-xs text-black border-gray-700">{formatDate(log.UploadedAt)}</td>
                                                <td className="py-px px-2 border text-xs text-black border-gray-700">
                                                    {collectionAliases[log.CollectionName] || log.CollectionName}
                                                </td>
                                                <td className="py-px px-2 border text-xs text-black border-gray-700">{log.Action || "Upload CSV"}</td>
                                                <td className="py-px px-2 border text-xs text-black border-gray-700">{log.CSVTotalCount.toLocaleString()}</td>
                                                <td className="py-px px-2 border text-xs text-black border-gray-700">{log.DataBefore.toLocaleString()}</td>
                                                <td className="py-px px-2 border text-xs text-black border-gray-700">{log.DuplicateCount.toLocaleString()}</td>
                                                <td className="py-px px-2 border text-xs text-black border-gray-700">{log.RecordCount.toLocaleString()}</td>
                                                <td className="py-px px-2 border text-xs text-black border-gray-700">{log.DataAfter.toLocaleString()}</td>
                                                <td className="py-px px-2 border text-xs text-black border-gray-700">{log.UploadedBy}</td>
                                                <td className="py-px px-2 border text-xs text-black border-gray-700">{log.Status}</td>
                                                <td className="py-px px-2 border text-xs text-black border-gray-700">{log.ErrorMessage || "N/A"}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={headTbl.length} className="text-center py-4 text-gray-900">
                                                No logs available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 mx-1 bg-blue-resistance text-white rounded-md disabled:opacity-50"
                                >
                                    Prev
                                </button>
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={indexOfLastLog >= logs.length}
                                    className="px-3 py-1 mx-1 bg-blue-resistance text-white rounded-md disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

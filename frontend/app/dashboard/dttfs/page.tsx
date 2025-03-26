"use client";

import { useState } from "react";
import SubpageGuard from "../../components/SubpageGuard";
import ProtectedRoute from "../../components/ProtectedRoute";
import { FaFileDownload, FaPlay } from "react-icons/fa";

export default function DtkofPage() {
    const [vlookupMessage, setVlookupMessage] = useState("Initializing...");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDownloadEnabled, setIsDownloadEnabled] = useState(false);
    const [eventSource, setEventSource] = useState<EventSource | null>(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const handleVlookupProcess = async () => {
        if (!apiUrl) {
            setVlookupMessage("API URL is not configured.");
            return;
        }

        setVlookupMessage("Initializing VLOOKUP process...");
        setIsProcessing(true);
        setIsDownloadEnabled(false); // Disable download during processing

        try {
            const es = new EventSource(`${apiUrl}/lookupAndSavetfs`);
            setEventSource(es);

            es.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.message) {
                        setVlookupMessage(data.message);
                    }
                } catch (error) {
                    console.error("Error parsing SSE message:", error, event.data);
                    setVlookupMessage("Error processing server message.");
                }
            };

            es.addEventListener("complete", () => {
                setVlookupMessage("VLOOKUP process completed successfully!");
                setIsProcessing(false);
                setIsDownloadEnabled(true); // Enable download after process completes
                es.close();
                setEventSource(null);
            });

            es.onerror = () => {
                setVlookupMessage("An error occurred during VLOOKUP. Retrying...");
                es.close();
                setEventSource(null);
                setTimeout(handleVlookupProcess, 5000); // Retry after 5 seconds
            };
        } catch (error) {
            console.error("VLOOKUP Error:", error);
            setVlookupMessage("An unexpected error occurred during VLOOKUP.");
            setIsProcessing(false);
            if (eventSource) {
                eventSource.close();
                setEventSource(null);
            }
        }
    };

    const handleDownload = async () => {
        if (!apiUrl) {
            setVlookupMessage("API URL is not configured.");
            return;
        }

        setIsDownloadEnabled(false); // Disable download immediately after clicking

        try {
            const response = await fetch(`${apiUrl}/exportCSVtfs`);
            if (!response.ok) {
                setVlookupMessage("Failed to download CSV. Try again later.");
                return;
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = "Trucking (STT)_Fee.csv";
            document.body.appendChild(a);
            a.click();
            a.remove();

            setVlookupMessage("CSV file downloaded successfully!");
        } catch (error) {
            console.error("Download Error:", error);
            setVlookupMessage("An error occurred while downloading the CSV file.");
        }
    };

    return (
        <ProtectedRoute>
            <SubpageGuard requiredAccess="dttfs">
                <div className="min-h-screen bg-background text-black p-4">
                    <header className="mb-6">
                        <h1 className="text-xl font-bold mb-1">
                            Data Trucking (STT) Fee
                        </h1>
                        <p className="font-mono text-xs text-black">
                            Data Trucking (STT) Fee Lookup and Export CSV Process.
                        </p>
                    </header>
                    <div className="flex flex-wrap gap-5 justify-center">
                        {/* VLOOKUP Process Section */}
                        <div className="p-4 bg-foreground rounded shadow text-center w-56 hover:shadow-lg transform hover:scale-105 transition">
                            <h2 className="text-sm font-semibold text-black mb-3">
                                Proses Vlookup Trucking (STT) Fee
                            </h2>
                            <button
                                onClick={handleVlookupProcess}
                                disabled={isProcessing}
                                className={`w-full px-3 py-1.5 text-xs font-semibold text-black rounded ${
                                    isProcessing
                                        ? "bg-secondary cursor-not-allowed"
                                        : "bg-secondary hover:bg-secondary"
                                }`}
                            >
                                {isProcessing ? "Processing..." : <><FaPlay className="inline mr-1" /> Start VLOOKUP</>}
                            </button>
                            <p className="mt-3 text-xs text-black">{vlookupMessage}</p>
                        </div>

                        {/* CSV Download Section */}
                        <div
                            className={`p-4 bg-foreground rounded shadow text-center w-56 ${
                                isDownloadEnabled
                                    ? "hover:shadow-lg transform hover:scale-105 transition"
                                    : "opacity-50 cursor-not-allowed"
                            }`}
                        >
                            <h2 className="text-sm font-semibold text-black mb-3">
                                Download CSV Trucking (STT) Fee
                            </h2>
                            <button
                                onClick={handleDownload}
                                disabled={!isDownloadEnabled}
                                className={`w-full px-3 py-1.5 text-xs font-semibold text-black rounded ${
                                    isDownloadEnabled
                                        ? "bg-secondary hover:bg-secondary"
                                        : "bg-secondary cursor-not-allowed"
                                }`}
                            >
                                {isDownloadEnabled ? <><FaFileDownload className="inline mr-1" /> Download CSV</> : "Download Disabled"}
                            </button>
                        </div>
                    </div>
                </div>
            </SubpageGuard>
        </ProtectedRoute>
    );
}



import { exportExcel, exportPDF } from "../../services/api";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";

export default function Export() {

    const handleExcel = async () => {

        try {

            const response = await exportExcel();

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "Hajj_Feedback_Report.xlsx";

            document.body.appendChild(link);

            link.click();

            link.remove();

        }

        catch (err) {

            console.error(err);

            alert("Failed to export Excel.");

        }

    };

    const handlePDF = async () => {

        try {

            const response = await exportPDF();

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "Hajj_Feedback_Report.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

        }

        catch (err) {

            console.error(err);

            alert("Failed to export PDF.");

        }

    };

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold">
                    Export Reports
                </h1>

                <p className="text-gray-500 mt-2">
                    Download Hajj Feedback reports in Excel or PDF format.
                </p>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-white rounded-xl shadow p-8 text-center">

                    <FaFileExcel
                        className="mx-auto text-green-600"
                        size={60}
                    />

                    <h2 className="text-xl font-bold mt-4">
                        Excel Report
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Export all feedback into an Excel spreadsheet.
                    </p>

                    <button
                        onClick={handleExcel}
                        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                    >
                        Download Excel
                    </button>

                </div>

                <div className="bg-white rounded-xl shadow p-8 text-center">

                    <FaFilePdf
                        className="mx-auto text-red-600"
                        size={60}
                    />

                    <h2 className="text-xl font-bold mt-4">
                        PDF Report
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Export all feedback into a PDF report.
                    </p>

                    <button
                        onClick={handlePDF}
                        className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
                    >
                        Download PDF
                    </button>

                </div>

            </div>

        </div>

    );

}
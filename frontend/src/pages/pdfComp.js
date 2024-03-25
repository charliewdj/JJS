import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set the worker URL to load PDFs in worker mode for better performance
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfComp = ({ pdfFile }) => {
    const [numPages, setNumPages] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const goToPreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    const goToNextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    return (
        <div>
            <div>
                <button onClick={goToPreviousPage} disabled={pageNumber === 1}>
                    Halaman Sebelumnya
                </button>
                <button onClick={goToNextPage} disabled={pageNumber === numPages}>
                    Halaman Selanjutnya
                </button>
            </div>
            <p>
                Page {pageNumber} of {numPages}
            </p>
            <Document
                file={pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            
        </div>
    );
};

export default PdfComp;

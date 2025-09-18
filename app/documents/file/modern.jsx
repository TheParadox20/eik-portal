'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
// import { FaSearchPlus, FaSearchMinus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function PdfViewer() {
  const containerRef = useRef(null);
  const searchParams = useSearchParams();
  const file = searchParams.get('file');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1.5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Load pdf.js library
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Set the worker source for pdf.js
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';

      // Load and render the PDF
      const loadPdf = async () => {
        try {
          if (!file) {
            setError('No document specified');
            setLoading(false);
            return;
          }
          const pdf = await window.pdfjsLib.getDocument(`/documents/${file}`).promise;
          setTotalPages(pdf.numPages);
          const container = containerRef.current;
          container.innerHTML = ''; // Clear previous content

          // Render each page
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale });

            // Create a canvas for each page
            const canvas = document.createElement('canvas');
            canvas.className = 'pdf-page';
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Append canvas to container
            container.appendChild(canvas);

            // Render PDF page into canvas context
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
            await page.render(renderContext).promise;
          }
          setLoading(false);
        } catch (error) {
          console.error('Error rendering PDF:', error);
          setError('Failed to load document');
          setLoading(false);
        }
      };

      loadPdf();
    };

    // Disable right-click context menu
    const disableContextMenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', disableContextMenu);

    // Disable print functionality
    const disablePrint = () => {
      if (window.matchMedia) {
        const mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener((mql) => {
          if (mql.matches) {
            window.location.reload(); // Reload to prevent printing
          }
        });
      }
    };
    disablePrint();

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.body.removeChild(script);
    };
  }, [file, scale]);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {file ? file.replace(/\.pdf$/, '') : 'Document Viewer'}
          </h1>
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleZoomOut}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                disabled={scale <= 0.5}
                aria-label="Zoom out"
              >
                {/* <FaSearchMinus /> */}
              </button>
              <span className="text-sm text-gray-600">{Math.round(scale * 100)}%</span>
              <button
                onClick={handleZoomIn}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                disabled={scale >= 3}
                aria-label="Zoom in"
              >
                {/* <FaSearchPlus /> */}
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevPage}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                disabled={currentPage <= 1}
                aria-label="Previous page"
              >
                {/* <FaChevronLeft /> */}
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={handleNextPage}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                disabled={currentPage >= totalPages}
                aria-label="Next page"
              >
                {/* <FaChevronRight /> */}
              </button>
            </div>
          </div>
        </header>
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 p-4 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        <div
          ref={containerRef}
          className="flex flex-col items-center max-w-full bg-white p-6 rounded-lg shadow-md overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 200px)' }}
        >
          {/* Canvases will be appended here dynamically */}
        </div>
      </div>
      <style jsx>{`
        .pdf-page {
          margin-bottom: 16px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }
        * {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        @media print {
          body * {
            visibility: hidden;
          }
        }
      `}</style>
    </main>
  );
}
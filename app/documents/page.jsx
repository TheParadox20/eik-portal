'use client';

import Link from 'next/link';

export default function DocsPage() {
  const documents = [
    {
      name: 'Audit Procurement Evaluation Summary.pdf',
      description: 'Summary of the procurement evaluation process for 2025.',
      lastUpdated: 'June 15, 2025',
    },
    {
      name: 'Technical Assessment Report Auditor 2025---AWN.pdf',
      description: 'Technical assessment report for AWN auditors, 2025.',
      lastUpdated: 'June 10, 2025',
    },
    {
      name: 'Technical Assessment Report Auditor 2025---Evaluation TKM.pdf',
      description: 'TKM evaluation report for auditors, 2025.',
      lastUpdated: 'June 12, 2025',
    },
    {
      name: 'Technical Assessment Report Auditor 2025.pdf',
      description: 'General technical assessment report for auditors, 2025.',
      lastUpdated: 'June 14, 2025',
    },
    {
      name: 'The-Terms-of-Reference-EIK-Auditor-2025_2026-Financial-Year.pdf',
      description: 'Terms of reference for EIK auditors, 2025-2026.',
      lastUpdated: 'June 8, 2025',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Document Library
        </h1>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, i) => (
            <Link
              href={`/documents/file?file=${doc.name}`}
              key={i}
              className="group bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              aria-label={`View ${doc.name}`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-red-500 icon-[codicon--file-pdf] text-3xl" aria-hidden="true" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {doc.name.replace(/\.pdf$/, '')}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Last Updated: {doc.lastUpdated}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
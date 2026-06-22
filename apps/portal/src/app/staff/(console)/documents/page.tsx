import DocumentBuilder from "./DocumentBuilder";

export const dynamic = "force-dynamic";

export const metadata = { title: "Document Builder · GIO4X Service Console" };

// Staff Document Builder — drag-block editor that exports PDF / Word.
// Self-contained client component (blocks + jspdf + docx), no external service.
export default function StaffDocumentsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-navy">Assets &amp; Documents</h1>
        <p className="text-sm text-steel">Build letters, agreements and reports, then export to PDF or Word.</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#0b1020] p-5 text-white shadow-sm">
        <DocumentBuilder />
      </div>
    </div>
  );
}

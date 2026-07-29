import { useState } from "react";
import SectionPageShell from "../../components/SectionPageShell";
import { verifyCertificate } from "../../api/certificateApi";

const CertificatePage = () => {
  const [certificateNumber, setCertificateNumber] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!certificateNumber.trim()) {
      setError("সার্টিফিকেট নম্বর দিন।");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await verifyCertificate(certificateNumber.trim());
      setCertificate(data);
    } catch (err) {
      console.error("Verification failed:", err);
      setError("সার্টিফিকেটটি পাওয়া যায়নি।");
      setCertificate(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionPageShell title="সার্টিফিকেট যাচাই" description="সার্টিফিকেট নম্বর দিয়ে যাচাই করুন।">
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
          <input
            type="text"
            value={certificateNumber}
            onChange={(e) => setCertificateNumber(e.target.value)}
            placeholder="সার্টিফিকেট নম্বর"
            className="w-full rounded-xl border border-gray-200 px-4 py-3"
          />
          <button type="submit" className="rounded-xl bg-green-700 px-4 py-2.5 font-semibold text-white hover:bg-green-800">
            {loading ? "চেক করা হচ্ছে..." : "যাচাই করুন"}
          </button>
        </form>

        {error ? <div className="mt-6 text-red-600">{error}</div> : null}

        {certificate ? (
          <div className="mt-8 rounded-2xl border border-green-100 bg-green-50 p-5">
            <h4 className="font-semibold text-green-800">যাচাই সফল</h4>
            <div className="mt-3 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
              <p><span className="font-semibold">নম্বর:</span> {certificate.certificate_number}</p>
              <p><span className="font-semibold">ছাত্র/ছাত্রী:</span> {certificate.student_name}</p>
              <p><span className="font-semibold">কোর্স:</span> {certificate.course_name}</p>
              <p><span className="font-semibold">তারিখ:</span> {certificate.issue_date}</p>
              <p><span className="font-semibold">স্ট্যাটাস:</span> {certificate.status}</p>
              <p><span className="font-semibold">মন্তব্য:</span> {certificate.remarks || "—"}</p>
            </div>
          </div>
        ) : null}
    </SectionPageShell>
  );
};

export default CertificatePage;

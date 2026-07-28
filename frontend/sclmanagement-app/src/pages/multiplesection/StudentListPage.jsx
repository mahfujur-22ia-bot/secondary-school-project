import { useEffect, useState } from "react";
import SectionPageShell from "../../components/SectionPageShell";
import { fetchAllStudents } from "../../api/studentApi";

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStudents() {
      try {
        const data = await fetchAllStudents();
        setStudents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError("শিক্ষার্থীদের তথ্য লোড করতে সমস্যা হয়েছে।");
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, []);

  return (
    <SectionPageShell
      title="শিক্ষার্থীদের তালিকা"
      description="নির্বাচিত শ্রেণি ও তথ্য অনুযায়ী ছাত্রছাত্রীদের তালিকা দেখুন।"
    >
      {loading ? (
          <div className="text-center py-10 text-gray-500">তালিকা লোড হচ্ছে...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-600">{error}</div>
        ) : students.length === 0 ? (
          <div className="text-center py-10 text-gray-500">কোনো শিক্ষার্থী পাওয়া যায়নি।</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-sm">
                  <th className="px-4 py-3 font-semibold">নাম</th>
                  <th className="px-4 py-3 font-semibold">শ্রেণি</th>
                  <th className="px-4 py-3 font-semibold">রোল</th>
                  <th className="px-4 py-3 font-semibold">শাখা</th>
                  <th className="px-4 py-3 font-semibold">ফোন</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-t border-gray-100 text-sm text-gray-700">
                    <td className="px-4 py-3">{student.name}</td>
                    <td className="px-4 py-3">{student.class_name}</td>
                    <td className="px-4 py-3">{student.roll_number}</td>
                    <td className="px-4 py-3">{student.section}</td>
                    <td className="px-4 py-3">{student.phone || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </SectionPageShell>
  );
};

export default StudentListPage;

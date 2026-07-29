import { useEffect, useState } from "react";
import SectionPageShell from "../../components/SectionPageShell";
import { fetchAllAttendance } from "../../api/attendanceApi";

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAttendance() {
      try {
        const data = await fetchAllAttendance();
        setAttendance(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch attendance:", err);
        setError("উপস্থিতি তথ্য লোড করতে সমস্যা হয়েছে।");
      } finally {
        setLoading(false);
      }
    }

    loadAttendance();
  }, []);

  return (
    <SectionPageShell title="উপস্থিতি সূচি" description="শিক্ষার্থীদের গতকালের ও সাম্প্রতিক উপস্থিতির তথ্য দেখুন।">
      {loading ? (
          <div className="text-center py-10 text-gray-500">উপস্থিতি তথ্য লোড হচ্ছে...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-600">{error}</div>
        ) : attendance.length === 0 ? (
          <div className="text-center py-10 text-gray-500">কোনো উপস্থিতি তথ্য পাওয়া যায়নি।</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-sm">
                  <th className="px-4 py-3 font-semibold">নাম</th>
                  <th className="px-4 py-3 font-semibold">শ্রেণি</th>
                  <th className="px-4 py-3 font-semibold">তারিখ</th>
                  <th className="px-4 py-3 font-semibold">অবস্থা</th>
                  <th className="px-4 py-3 font-semibold">মন্তব্য</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id} className="border-t border-gray-100 text-sm text-gray-700">
                    <td className="px-4 py-3">{record.student_name}</td>
                    <td className="px-4 py-3">{record.class_name}</td>
                    <td className="px-4 py-3">{record.attendance_date}</td>
                    <td className="px-4 py-3">{record.status}</td>
                    <td className="px-4 py-3">{record.remarks || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </SectionPageShell>
  );
};

export default AttendancePage;

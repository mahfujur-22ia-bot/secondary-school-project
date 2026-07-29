import { useEffect, useState } from "react";
import SectionPageShell from "../../components/SectionPageShell";
import { fetchAllExamSchedules } from "../../api/examScheduleApi";

const ExamSchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSchedules() {
      try {
        const data = await fetchAllExamSchedules();
        setSchedules(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch exam schedules:", err);
        setError("পরীক্ষার সময়সূচি লোড করতে সমস্যা হয়েছে।");
      } finally {
        setLoading(false);
      }
    }

    loadSchedules();
  }, []);

  return (
    <SectionPageShell title="পরীক্ষার সময়সূচি" description="পরীক্ষার তারিখ ও বিশদ তথ্য দেখুন।">
      {loading ? (
          <div className="text-center py-10 text-gray-500">সময়সূচি লোড হচ্ছে...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-600">{error}</div>
        ) : schedules.length === 0 ? (
          <div className="text-center py-10 text-gray-500">কোনো সময়সূচি পাওয়া যায়নি।</div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {schedules.map((item) => (
              <div key={item.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <p className="mt-2 text-sm text-gray-600">শ্রেণি: {item.class_name}</p>
                <p className="mt-1 text-sm text-gray-600">তারিখ: {item.exam_date}</p>
                <p className="mt-2 text-sm text-gray-600">{item.details || "—"}</p>
              </div>
            ))}
          </div>
        )}
    </SectionPageShell>
  );
};

export default ExamSchedulePage;

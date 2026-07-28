import { useEffect, useState } from "react";
import SectionPageShell from "../../components/SectionPageShell";
import { fetchAllRoutines } from "../../api/routineApi";

const RoutinePage = () => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRoutines() {
      try {
        const data = await fetchAllRoutines();
        setRoutines(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch routines:", err);
        setError("রুটিন লোড করতে সমস্যা হয়েছে।");
      } finally {
        setLoading(false);
      }
    }

    loadRoutines();
  }, []);

  return (
    <SectionPageShell title="রুটিন" description="দৈনিক শ্রেণি রুটিন দেখুন।">
      {loading ? (
          <div className="text-center py-10 text-gray-500">রুটিন লোড হচ্ছে...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-600">{error}</div>
        ) : routines.length === 0 ? (
          <div className="text-center py-10 text-gray-500">কোনো রুটিন পাওয়া যায়নি।</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-sm">
                  <th className="px-4 py-3 font-semibold">শ্রেণি</th>
                  <th className="px-4 py-3 font-semibold">দিন</th>
                  <th className="px-4 py-3 font-semibold">সময়</th>
                  <th className="px-4 py-3 font-semibold">বিষয়</th>
                  <th className="px-4 py-3 font-semibold">শিক্ষক</th>
                </tr>
              </thead>
              <tbody>
                {routines.map((item) => (
                  <tr key={item.id} className="border-t border-gray-100 text-sm text-gray-700">
                    <td className="px-4 py-3">{item.class_name}</td>
                    <td className="px-4 py-3">{item.day}</td>
                    <td className="px-4 py-3">{item.time_slot}</td>
                    <td className="px-4 py-3">{item.subject}</td>
                    <td className="px-4 py-3">{item.teacher_name || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </SectionPageShell>
  );
};

export default RoutinePage;

import { useState } from "react";
import SectionPageShell from "../../components/SectionPageShell";
import { searchResults } from "../../api/resultApi";

const ResultPage = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [className, setClassName] = useState("");
  const [passingYear, setPassingYear] = useState("");
  const [resultItems, setResultItems] = useState([]);
  const [resultSummary, setResultSummary] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResultItems([]);
    setResultSummary({});

    const { data, error: searchError } = await searchResults({
      rollNumber,
      className,
      passingYear,
    });

    if (searchError) {
      setError(searchError);
    } else if (data && data.detail_scores) {
      // Extract detail_scores array from the Result object
      setResultItems(data.detail_scores);
      // Store summary data separately
      setResultSummary({
        student_name: data.student_name,
        roll_number: data.roll_number,
        class_name: data.class_name,
        passing_year: data.passing_year,
        total_subjects: data.total_subjects,
        total_marks: data.total_marks,
        average_gpa: data.average_gpa,
        final_grade: data.final_grade,
        result_status: data.result_status,
        published_at: data.published_at,
      });
    } else {
      setResultItems([]);
    }

    setLoading(false);
  };

  const summary = resultSummary || {};

  return (
    <SectionPageShell
      title="Student Result Search"
      description="Search by roll number, class and passing year to view a student's academic result instantly."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Search Form */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
          <form onSubmit={handleSearch} className="space-y-4">

            {/* Roll */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Roll Number
              </label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Enter Roll Number"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Class */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Class
              </label>

              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                required
              >
                <option value="">Select Class</option>
                <option value="class_6">Class 6</option>
                <option value="class_7">Class 7</option>
                <option value="class_8">Class 8</option>
                <option value="class_9">Class 9</option>
                <option value="class_10">Class 10</option>
              </select>
            </div>

            {/* Passing Year */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Passing Year
              </label>

              <input
                type="number"
                value={passingYear}
                onChange={(e) => setPassingYear(e.target.value)}
                placeholder="e.g. 2026"
                min="2000"
                max="2100"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-[#0B0D91] px-4 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              {loading ? "Searching..." : "Search Result"}
            </button>

          </form>
        </div>

        {/* Result */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {loading ? (
            <div className="flex h-40 items-center justify-center text-sm font-medium text-gray-600">
              Loading Result...
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          ) : resultItems.length > 0 ? (
            <div className="space-y-4">

              {/* Student Info */}
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-sm text-blue-700">Student Name</p>

                <h3 className="text-xl font-bold text-gray-900">
                  {summary.student_name || "N/A"}
                </h3>

                <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-700">

                  <span className="rounded-full bg-white px-3 py-1">
                    Roll: {summary.roll_number || "N/A"}
                  </span>

                  <span className="rounded-full bg-white px-3 py-1">
                    Class: {summary.class_name || "N/A"}
                  </span>

                  <span className="rounded-full bg-white px-3 py-1">
                    Passing Year: {summary.passing_year || "N/A"}
                  </span>

                  <span className="rounded-full bg-white px-3 py-1">
                    Published: {summary.published_at ? new Date(summary.published_at).toLocaleDateString() : "N/A"}
                  </span>

                </div>
              </div>

              {/* Result Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-left text-gray-700">
                      <th className="px-3 py-2">Subject</th>
                      <th className="px-3 py-2">Marks</th>
                      <th className="px-3 py-2">Total</th>
                      <th className="px-3 py-2">GPA</th>
                      <th className="px-3 py-2">Grade</th>
                    </tr>
                  </thead>

                  <tbody>
                    {resultItems.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-gray-200"
                      >
                        <td className="px-3 py-2">{item.subject_name || "N/A"}</td>
                        <td className="px-3 py-2">{item.marks || "—"}</td>
                        <td className="px-3 py-2">
                          {item.full_marks || "—"}
                        </td>
                        <td className="px-3 py-2">
                          {item.gpa || "—"}
                        </td>
                        <td className="px-3 py-2">
                          {item.grade || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

              {/* Summary Statistics */}
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                <h4 className="mb-3 font-semibold text-gray-800">Result Summary</h4>
                <div className="grid gap-3 sm:grid-cols-4">
                  <div className="rounded-lg bg-white p-3 shadow-sm">
                    <p className="text-xs font-medium text-gray-600">Total Subjects</p>
                    <p className="text-lg font-bold text-gray-900">{summary.total_subjects || "—"}</p>
                  </div>
                  <div className="rounded-lg bg-white p-3 shadow-sm">
                    <p className="text-xs font-medium text-gray-600">Total Marks</p>
                    <p className="text-lg font-bold text-gray-900">{summary.total_marks || "—"}</p>
                  </div>
                  <div className="rounded-lg bg-white p-3 shadow-sm">
                    <p className="text-xs font-medium text-gray-600">Average GPA</p>
                    <p className="text-lg font-bold text-gray-900">{summary.average_gpa || "—"}</p>
                  </div>
                  <div className={`rounded-lg p-3 shadow-sm ${summary.result_status === 'PASS' ? 'bg-green-100' : 'bg-red-100'}`}>
                    <p className="text-xs font-medium text-gray-600">Status</p>
                    <p className={`text-lg font-bold ${summary.result_status === 'PASS' ? 'text-green-700' : 'text-red-700'}`}>
                      {summary.result_status || "—"}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-gray-300 text-center text-sm text-gray-500">
              Enter Roll Number, Class and Passing Year to view the student
              result.
            </div>
          )}
        </div>
      </div>
    </SectionPageShell>
  );
};

export default ResultPage;
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function StudentDirectory() {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/students");
        const data = await res.json();
        setStudents(data);
        setFiltered(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching students:", err);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);


  useEffect(() => {
    const results = students.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
  }, [search, students]);

  return (
    <div className="w-screen h-screen bg-gray-50 p-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
          🎓 Student Directory
        </h1>

        <input
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 mb-8 text-blue-700 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500 text-center">No students found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {filtered.map((student) => (
              <div
                key={student.id}
                className="bg-white border rounded-2xl shadow hover:shadow-lg transition-transform hover:-translate-y-1 p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {student.name}
                </h2>
                <p className="text-gray-600">{student.age}</p>
                <p className="text-gray-500 text-sm">Age: {student.major}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

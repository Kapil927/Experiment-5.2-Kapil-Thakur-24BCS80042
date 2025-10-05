import { useEffect, useState } from "react";
import axios from "axios";
import "./StudentManager.css";

const API_URL = "http://localhost:5000/api/students"; // Update if deployed

const courses = ["Computer Science", "Electronics", "Mechanical", "Civil", "Mathematics"];

const StudentManager = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", course: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get(API_URL);
    setStudents(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ name: "", age: "", course: "" });
    fetchStudents();
  };

  const handleEdit = (student) => {
    setForm({ name: student.name, age: student.age, course: student.course });
    setEditId(student._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchStudents();
  };

  return (
    <div className="student-manager">
      <div className="info-header">
        <p><strong>Developed by:</strong> <span className="shine-name">Kapil Thakur</span></p>
        <p><strong>UID:</strong> 24BCS80042 | <strong>Section:</strong> 625 | <strong>Group:</strong> A</p>
        <p><strong>Under Guidance of:</strong> <span className="shine-name">Mayank Sharma</span></p>
      </div>
      <h2>Student Management System</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
          required
        />
        <input 
          type="number" 
          placeholder="Age" 
          value={form.age} 
          onChange={(e) => setForm({ ...form, age: e.target.value })} 
          required
        />
        
        {/* Dropdown for course */}
        <select 
          value={form.course} 
          onChange={(e) => setForm({ ...form, course: e.target.value })} 
          required
        >
          <option value="">Select Course</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>{course}</option>
          ))}
        </select>

        <button type="submit">{editId ? "Update" : "Add"} Student</button>
      </form>

      <ul className="student-list">
        {students.map(student => (
          <li key={student._id}>
            <span>{student.name} - {student.age} - {student.course}</span>
            <div>
              <button onClick={() => handleEdit(student)}>Edit</button>
              <button onClick={() => handleDelete(student._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentManager;
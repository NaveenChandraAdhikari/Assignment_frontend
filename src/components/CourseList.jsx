import React, { useState, useEffect } from 'react';
import CourseDetailsModal from './CourseDetailModal';


function CourseList() {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, [page]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/courses?page=${page}&size=10`);
      const data = await response.json();
      setCourses(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/courses/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchCourses();
      } else {
        throw new Error('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course');
    }
  };

  const viewCourseDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/courses/${id}`);
      const data = await response.json();
      setSelectedCourse(data);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchCourses}>List courses</button>
      <table>
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.code}</td>
              <td>
                <button onClick={() => viewCourseDetails(course.id)}>View</button>
                <button onClick={() => handleDelete(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0}>
          Previous
        </button>
        <span>Page {page + 1} of {totalPages}</span>
        <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))} disabled={page === totalPages - 1}>
          Next
        </button>
      </div>
      <CourseDetailsModal 
        course={selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
      />
    </div>
  );
}

export default CourseList;
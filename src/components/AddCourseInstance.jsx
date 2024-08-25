import React, { useState, useEffect } from 'react';


function AddCourseInstance() {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [courses, setCourses] = useState([]);
  
    useEffect(() => {
      fetchCourses();
    }, []);
  
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/courses');
        const data = await response.json();
        setCourses(data.content);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:8080/api/instances', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ courseId: selectedCourse, year, semester }),
        });
        if (response.ok) {
          // Clear form and show success message
          setSelectedCourse('');
          setYear('');
          setSemester('');
          alert('Course instance added successfully');
        } else {
          throw new Error('Failed to add course instance');
        }
      } catch (error) {
        console.error('Error adding course instance:', error);
        alert('Failed to add course instance');
      }
    };


    

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        <option value="">Select course</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>{course.title}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input
        type="text"
        placeholder="Semester"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      />
      <button type="submit">Add instance</button>
    </form>
  );
}

export default AddCourseInstance;
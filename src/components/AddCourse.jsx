import React, { useState } from 'react';

function AddCourse() {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    //API CALLS TO ADD COURSE,,
    try {
      const response = await fetch('http://localhost:8080/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, code, description }),
      });
      if (response.ok) {
        // Clear form and show success message
        setTitle('');
        setCode('');
        setDescription('');
        alert('Course added successfully');
      } else {
        throw new Error('Failed to add course');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Course title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Course code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <textarea
        placeholder="Course description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add course</button>
    </form>
  );
}

export default AddCourse;
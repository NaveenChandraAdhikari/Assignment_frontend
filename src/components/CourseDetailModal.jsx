import React from 'react';

function CourseDetailsModal({ course, onClose }) {
  if (!course) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Course Details</h2>
        <p><strong>Title:</strong> {course.title}</p>
        <p><strong>Code:</strong> {course.code}</p>
        <p><strong>Description:</strong> {course.description}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
  
}

export default CourseDetailsModal;
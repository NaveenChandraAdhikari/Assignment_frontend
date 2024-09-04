

import React from 'react';

const InstanceDetailsModal = ({ instance, onClose }) => {
  if (!instance) return null;

  return (
    <div className="modal-overlay" style={modalOverlayStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <h2>Course Instance Details</h2>
        {/* <p><strong>Course Title:</strong> {instance.courseTitle}</p> */}
        {/* <p><strong>Course Code:</strong> {instance.courseCode}</p> */}
        <p><strong>Year:</strong> {instance.year}</p>
        <p><strong>Semester:</strong> {instance.semester}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  maxWidth: '500px',
  width: '100%',
};

export default InstanceDetailsModal;


import React, { useState, useEffect } from 'react';
import InstanceDetailsModal from './InstanceDetailsModal';

function CourseInstanceList() {
  const [instances, setInstances] = useState([]);
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedInstance, setSelectedInstance] = useState(null);
  const [availableSemesters, setAvailableSemesters] = useState([]);
  useEffect(() => {
    if (year && semester) {
      fetchInstances();
    }
  }, [page, year, semester]);

  const fetchInstances = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/instances/${year}/${semester}?page=${page}&size=10`);
      const data = await response.json();
      // console.log('Fetched instances:', data.content);
      setInstances(data.content);
      // console.log(data.content)
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching instances:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/instances/${year}/${semester}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchInstances(); // Refresh the list after deletion
      } else {
        throw new Error('Failed to delete course instance');
      }
    } catch (error) {
      console.error('Error deleting course instance:', error);
      alert('Failed to delete course instance');
    }
  };

  const viewInstanceDetails = async (id) => {
    console.log('Instance ID:', id); // Log the ID to check if it's correct
    if (!id) {
      console.error('Instance ID is undefined');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/api/instances/${year}/${semester}/${id}`);
      if (!response.ok) {
        console.error('Response status:', response.status);
        throw new Error('Failed to fetch instance details');
      }
      const data = await response.json();
      // console.log('Fetched data:', data); // Log the data to see what's being returned
      setSelectedInstance({
        // courseTitle: data.courseTitle,
        // courseCode: data.courseCode,
        year: data.year,
        semester: data.semester,
      });
    } catch (error) {
      console.error('Error fetching instance details:', error);
    }
  };
  

  const closeModal = () => {
    setSelectedInstance(null);
  };
  // console.log(instances)

  return (
    <div style={containerStyle}>
      <div style={inputContainerStyle}>
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={inputStyle}
        />
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          style={inputStyle}
        >
          {/* <option value="">Select semester</option>
          <option value="1">1</option>
          <option value="2">2</option> */}
            <option value="" disabled>Select semester</option>
          {availableSemesters.map((sem, index) => (
            <option key={index} value={sem}>{sem}</option>
          ))}
        </select>
        <button onClick={fetchInstances} style={buttonStyle}>List instances</button>
      </div>
      <table style={tableStyle}>
        <thead>
          <tr style={headerRowStyle}>
            <th style={cellStyle}>Course Title</th>
            <th style={cellStyle}>Year-Sem</th>
            <th style={cellStyle}>Code</th>
            <th style={cellStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
        {instances.map((instance, index) => {
  // console.log('Rendering instance with id:', instance.courseId);
  return (
    <tr key={instance.courseId} style={{ ...rowStyle, backgroundColor: index % 2 === 0 ? '#E8F0FE' : 'white' }}>
      <td style={cellStyle}>{instance.courseTitle}</td>
      <td style={cellStyle}>{`${instance.year}-${instance.semester}`}</td>
      <td style={cellStyle}>{instance.courseCode}</td>
      <td style={cellStyle}>
        <button onClick={() => viewInstanceDetails(instance.courseId)} style={actionButtonStyle}>🔍</button>
        <button onClick={() => handleDelete(instance.courseId)} style={actionButtonStyle}>🗑️</button>
      </td>
    </tr>
  );
})}

        </tbody>
      </table>
      
      <div style={paginationStyle}>
        <button onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0} style={pageButtonStyle}>
          Previous
        </button>
        <span style={pageTextStyle}>Page {page + 1} of {totalPages}</span>
        <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))} disabled={page === totalPages - 1} style={pageButtonStyle}>
          Next
        </button>
      </div>
      
      {selectedInstance && (
        <InstanceDetailsModal instance={selectedInstance} onClose={closeModal} />
      )}
    </div>
  );
}

const containerStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const inputContainerStyle = {
  display: 'flex',
  marginBottom: '20px',
};

const inputStyle = {
  flex: 1,
  marginRight: '10px',
  padding: '10px',
  fontSize: '16px',
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#4285F4',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const headerRowStyle = {
  backgroundColor: '#4285F4',
  color: 'white',
};

const rowStyle = {
  textAlign: 'left',
};

const cellStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
};

const actionButtonStyle = {
  marginRight: '5px',
  padding: '5px',
  cursor: 'pointer',
};

const paginationStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const pageButtonStyle = {
  margin: '0 10px',
  padding: '10px',
  backgroundColor: '#4285F4',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

const pageTextStyle = {
  fontSize: '16px',
};

export default CourseInstanceList;

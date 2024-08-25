
import './App.css';
import AddCourse from './components/AddCourse';
import AddCourseInstance from './components/AddCourseInstance';
import CourseInstanceList from './components/CourseInstanceList';
import CourseList from './components/CourseList';


function App() {
  return (
    <div className="App">
      <div className="course-management">
        <AddCourse />
        <AddCourseInstance />
      </div>
      <CourseList />
      <CourseInstanceList />
    </div>
  );
}

export default App;

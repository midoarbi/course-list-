import React, { Component } from 'react';
import CourseForm from './components/CourseForm';
import CourseList from './components/CourseList';

class App extends Component {
state = {
  courses : [
    {name: "HTML"},
    {name: "CSS"},
    {name: "JS"},
  ],
  current: ''
}

componentDidMount()
{
  try{
    const json = localStorage.getItem('courses');
    const courses = JSON.parse(json);
  
    if(courses)
    {
      this.setState(() => ({courses}));
    }
  }
  catch(e)
  {

  }
  
}
componentDidUpdate(prevProps, prevState)
{
  if(prevState.courses.length !== this.state.current.length)
  {
    const json = JSON.stringify(this.state.courses);
    localStorage.setItem('courses', json);
  }
}
//update Course
updateCourse = (e) =>
{
this.setState({
  current: e.target.value
})
}

//add course
addCourse = (e) =>
{
  e.preventDefault();
  if( this.state.current === '')
  {
    return false;
  }
  else{
    let current = this.state.current;
  let courses = this.state.courses;
  courses.push({name:current})
  this.setState({
    courses,
    current: ''
  })
  }
}

deleteCourse = (index) =>
{
let courses = this.state.courses;
courses.splice(index, 1);
this.setState({
  courses
})
}

//editCourse

editCourse = (index, value) =>
{
  let courses = this.state.courses;
  let course = courses[index];
  course['name'] = value;
  this.setState({
    courses
  })
}

  render() {
    const {courses} = this.state;
    let length = courses.length;
    const courseList = length ? (
      courses.map((course, index)=> {
        return <CourseList details={course} key={index} index={index} deleteCourse={this.deleteCourse} editCourse={this.editCourse} />
      })
    ) : (<p>There is No Item To Add</p>)
    return (
      <div className="App">

      <h2>Add Course</h2>
        <CourseForm updateCourse={this.updateCourse} addCourse={this.addCourse} current={this.state.current} />
        <ul>{courseList}</ul> 
      </div>
    );
  }
}

export default App;

import React, { Component, Fragment } from 'react';

class CourseList extends Component {


  state = {
    isEdit : false
  }

    renderCourse = () => 
    {
        return(
            <li>
            <span>{this.props.details.name}</span>
            <button onClick={() => this.toggleState()}>Edit Course</button>
            <button onClick={ () => { this.props.deleteCourse(this.props.index)}}>Delete Course</button>
            </li>
        )
    }

//toggleState 1

toggleState = () =>
{
 let {isEdit} = this.state;
 this.setState({
   isEdit : !isEdit
 })
}

//updateCourseItem 3

updateCourseItem = (e) =>
{
e.preventDefault();
this.props.editCourse(this.props.index, this.input.value );
this.toggleState();
}

//render Update Form  2

renderUpdateForm = () =>
{
  return(
    <form onSubmit={this.updateCourseItem}>
    <input type="text" ref={(v) => {this.input = v}} defaultValue={this.props.details.name}/>
    <button>Update course</button>
    </form>
  )
}

  render(props) {
    let {isEdit} = this.state;
    return (
      <Fragment>
     { isEdit ? this.renderUpdateForm() :  this.renderCourse()}
      </Fragment>
    );
  }
}

export default CourseList;
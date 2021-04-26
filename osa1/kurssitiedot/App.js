import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course = {course}/>
      <Content part1 = {part1.name} excersises1 = {part1.exercises}
      part2 = {part2.name} excersises2 = {part2.exercises}
      part3 = {part3.name} excersises3 = {part3.exercises}/>
      <Total ex1 = {part1.exercises} ex2 = {part2.exercises} ex3 = {part3.exercises}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.excersises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part = {props.part1} excersises = {props.excersises1}/>
      <Part part = {props.part2} excersises = {props.excersises2}/>
      <Part part = {props.part3} excersises = {props.excersises3}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
  )
}

export default App
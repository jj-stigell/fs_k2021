import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course}/>
      <Content part1 = {part1} excersises1 = {exercises1}
      part2 = {part2} excersises2 = {exercises2}
      part3 = {part3} excersises3 = {exercises3}/>
      <Total ex1 = {exercises1} ex2 = {exercises2} ex3 = {exercises3}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      <p>
        {props.part1} {props.excersises1}
      </p>
      <p>
        {props.part2} {props.excersises2}
      </p>
      <p>
        {props.part3} {props.excersises3}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
  )
}

export default App
import React from 'react';

const Header = ({course}) => {
	return (
		<h2>{course.name}</h2>
	)
}

const Total = ({course}) => {
	const reducer = (accumulator, currentValue) => accumulator + currentValue
	const array = [];
  
	for (let i = 0; i < course.parts.length; i++) {
		array.push(course.parts[i].exercises)
	}

	return(
		<p>
			<b>Number of exercises {array.reduce(reducer)}</b>
		</p>
	)
}

const Part = ({part}) => (part.map(part => <li key = {part.id}>{part.name} {part.exercises}</li>))

const Content = ({course}) => {
	
	return (
		<div>
			<Part part={course.parts} />
		</div>  
  )
}

const Course = (props) => {
	
	return (
		<div>
			<h1>Web development curriculum</h1>
			<Header course = {props.course[0]} />
			<Content course = {props.course[0]} />
			<Total course = {props.course[0]} />
			<Header course = {props.course[1]} />
			<Content course = {props.course[1]} />
			<Total course = {props.course[1]} />
		</div>
	)
}

export default Course
import React, { useState } from 'react'

const Vote = ({votes, setVote, selected}) => {
	const copy = [...votes]
	copy[selected] += 1
	return (
		<button onClick={ () => setVote(copy)}>vote</button>
	)
}

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
	]
   
	const [selected, setSelected] = useState(0)
	const [votes, setVote] = useState([0, 0, 0, 0, 0, 0])

	return (
		<div>
			<h1>Anecdote of the day</h1>
			{anecdotes[selected]}
			<br />
			has {votes[selected]} votes
			<br />
			<Vote votes={votes} setVote={setVote} selected={selected}/>
			<button onClick={ () => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
			<h1>Anecdote with most votes</h1>
			{anecdotes[votes.indexOf(Math.max(...votes))]}
			<br />
			has {Math.max(...votes)} votes
		</div>
	)
}

export default App
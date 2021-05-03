import React, {useState} from 'react'

const StatisticLine = ({text, value}) => {
	return(
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

const Button = ({text, value, set}) => (<button onClick={ () => set(value + 1)}>{text}</button>)

const Statistics = ({good, bad, neutral}) => {
	if ((good + neutral + bad) === 0) {
		return (
			<div>
				<h1>statistics</h1>
				<p>No feedback given</p>
			</div>
		)
	}
	return (
		<div>
			<h1>statistics</h1>
			<table>
				<tbody>
				<StatisticLine text="good" value={good}/>
				<StatisticLine text="neutral" value={neutral}/>
				<StatisticLine text="bad" value={bad}/>
				<tr>
					<td>all</td>
					<td>{good + neutral + bad}</td>
				</tr>
				<tr>
					<td>average </td>
					<td>{(good * 1 + bad * -1) / (good + neutral + bad)}</td>
				</tr>
				<tr>
					<td>positive </td>
					<td>{(good / (good + neutral + bad)) * 100} %</td>
				</tr>
				</tbody>
			</table>
		</div>
	)
}

const App = () => {
  // save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

  return (
		<div>
			<h1>give feedback</h1>
			<Button value={good} text="good" set={setGood}/>
			<Button value={neutral} text="neutral" set={setNeutral}/>
			<Button value={bad} text="bad" set={setBad}/>
			<Statistics good={good} neutral={neutral} bad={bad}/>
		</div>
  )
}

export default App
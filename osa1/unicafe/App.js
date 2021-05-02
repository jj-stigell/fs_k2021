import React, {useState} from 'react'

const App = () => {
  // save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)



	//total, keskiarvo, positiivisten prosentti

  return (
		<div>
			<h1>give feed back</h1>
			<button onClick={ () => setGood(good +1)}>good</button>
			<button onClick={ () => setNeutral(neutral + 1)}>neutral</button>
			<button onClick={ () => setBad(bad + 1)}>bad</button>
			<h1>statistics</h1>
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
			
			<Total good={good} neutral={neutral} bad={bad}/>
			<Average good={good} neutral={neutral} bad={bad}/>
			<PositiveFeedback good={good} neutral={neutral} bad={bad}/>
		</div>
  )
}

const Total = ({good, neutral, bad}) => {
	return (
	<p>all {good + neutral + bad}</p>
	)
}

const Average = ({good, neutral, bad}) => {
	return (
	<p>average {(good * 1 + bad * -1) / (good + neutral + bad)}</p>
	)
}

const PositiveFeedback = ({good, neutral, bad}) => {
	return (
	<p>positive {(good / (good + neutral + bad)) * 100} %</p>
	)
}

export default App
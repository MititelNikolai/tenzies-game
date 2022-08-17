import './App.css'
import Game from './components/Game/Game'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import useWindowSize from './hooks/useWindowSize'
function App() {
	function generateNewDie() {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		}
	}

	function allNewDice() {
		const newDice = []
		for (let i = 0; i < 10; i++) {
			newDice.push(generateNewDie())
		}
		return newDice
	}

	const [dice, setDice] = useState(allNewDice())
	const date = new Date()
	const [statistic, setStatistic] = useState({
		count: 0,
		record:
			JSON.parse(localStorage.getItem('recordTime')) !== null
				? JSON.parse(localStorage.getItem('recordTime'))
				: 100,
	})
	const [time, setTime] = useState({ startTime: 0, EndTime: 0 })
	const diceElements = dice.map(prevItem => (
		<Game
			key={prevItem.id}
			value={prevItem.value}
			isHeld={prevItem.isHeld}
			holdDice={() => holdDice(prevItem.id)}
		/>
	))

	function rollDice() {
		if (!tenzies) {
			setDice(oldDice =>
				oldDice.map(diceItem => {
					return !diceItem.isHeld ? generateNewDie() : diceItem
				})
			)
			setStatistic(prevCount => {
				return { ...prevCount, count: prevCount.count + 1 }
			})
			if (time.startTime === 0) {
				setTime(prevTime => {
					return { ...prevTime, startTime: date.getTime() }
				})
			}
		} else {
			setTenzies(false)
			setDice(allNewDice())
			setStatistic(prevCount => {
				return { ...prevCount, count: 0 }
			})
			setTime(prevTime => {
				return { ...prevTime, startTime: 0 }
			})
		}
	}

	function holdDice(id) {
		setDice(diceItem =>
			diceItem.map(oldDice => {
				return oldDice.id === id
					? { ...oldDice, isHeld: !oldDice.isHeld }
					: oldDice
			})
		)
	}
	const [tenzies, setTenzies] = useState(false)
	useEffect(() => {
		const gameTime = (time.EndTime - time.startTime) / 1000
		if (statistic.record > gameTime && time.EndTime !== 0) {
			setStatistic(prevStat => {
				return { ...prevStat, record: gameTime }
			})
			JSON.stringify(localStorage.setItem('recordTime', gameTime))
		}
	}, [tenzies])
	useEffect(() => {
		const date = new Date()
		const allHeld = dice.every(diceItem => diceItem.isHeld)
		const firstValue = dice[0].value
		const allSameValue = dice.every(diceItem => diceItem.value === firstValue)

		if (allHeld && allSameValue) {
			setTenzies(true)
			setTime(prevTime => {
				return { ...prevTime, EndTime: date.getTime() }
			})
		}
	}, [dice])
	const { width, height } = useWindowSize()

	return (
		<main className='main--body container'>
			{tenzies && <Confetti width={width} height={height} />}
			<div className='main--game'>
				<div className='main--game--block'>
					<div className='counts'>
						<h5 className='counter'>Count: {statistic.count}</h5>
						{tenzies && (
							<h5 className='timer'>
								Your time: {(time.EndTime - time.startTime) / 1000} seconds
							</h5>
						)}
					</div>
					<div className='main--title--container'>
						<h1 className='game--title'>Tenzies</h1>
						<span className='game--subtitle'>
							Roll until all dice are the same. Click each die to freeze it at
							its current value between rolls.
						</span>
					</div>
					<div className='game--zone'>{diceElements}</div>
					<button className='roll-button' onClick={rollDice}>
						{!tenzies ? 'Roll' : 'Restart'}
					</button>
					<div className='statistic'>
						<h4 className='record'>Record: {statistic.record}</h4>
					</div>
				</div>
			</div>
		</main>
	)
}

export default App

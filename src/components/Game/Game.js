import '../Game/game.css'
export default function Game(props) {
	function diceStyles(value) {
		switch (value) {
			case 1:
				return (
					<div
						className={
							props.isHeld
								? 'dice first-face dice--element--active'
								: 'dice first-face'
						}
					>
						<span className='dot'></span>
					</div>
				)
			case 2:
				return (
					<div
						className={
							props.isHeld
								? 'dice second-face dice--element--active'
								: 'dice second-face'
						}
					>
						<span className='dot'></span>
						<span className='dot'></span>
					</div>
				)
			case 3:
				return (
					<div
						className={
							props.isHeld
								? 'dice third-face dice--element--active'
								: 'dice third-face'
						}
					>
						<span className='dot'></span>
						<span className='dot'></span>
						<span className='dot'></span>
					</div>
				)
			case 4:
				return (
					<div
						className={
							props.isHeld
								? 'dice fourth-face dice--element--active'
								: 'dice fourth-face'
						}
					>
						<div className='column'>
							<span className='dot'></span>
							<span className='dot'></span>
						</div>
						<div className='column'>
							<span className='dot'></span>
							<span className='dot'></span>
						</div>
					</div>
				)
			case 5:
				return (
					<div
						className={
							props.isHeld
								? 'dice fifth-face dice--element--active'
								: 'dice fifth-face'
						}
					>
						<div className='column'>
							<span className='dot'></span>
							<span className='dot'></span>
						</div>

						<div className='column'>
							<span className='dot'></span>
						</div>

						<div className='column'>
							<span className='dot'></span>
							<span className='dot'></span>
						</div>
					</div>
				)
			case 6:
				return (
					<div
						className={
							props.isHeld
								? 'dice sixth-face dice--element--active'
								: 'dice sixth-face'
						}
					>
						<div className='column'>
							<span className='dot'></span>
							<span className='dot'></span>
							<span className='dot'></span>
						</div>
						<div className='column'>
							<span className='dot'></span>
							<span className='dot'></span>
							<span className='dot'></span>
						</div>
					</div>
				)
			default:
				return <div></div>
		}
	}

	return <div onClick={props.holdDice}>{diceStyles(props.value)}</div>
}

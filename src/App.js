import React from 'react'
import mazda from './images/mazda.png'
import './App.css'

function App() {
	// Variables that calculate the max amount of miles that can be driven up until today
	const buyDate = new Date('October 28, 2019 12:00:00')
	const now = new Date()
	const days = Math.round((now - buyDate) / (1000 * 3600 * 24))
	const mpd = 32.87
	const mileage = Math.round(days * mpd)

	// Setting the state for the input, available miles and a NaN error
	const [inputMiles, setInputMiles] = React.useState('')
	const [availableMiles, setAvailableMiles] = React.useState('')
	const [error, setError] = React.useState(false)

	const setBlur = (e) => {
		if (e.keyCode === 13) {
			e.target.blur()
		}
	}

	// If the enter key is pressed inside the input box, and there is a valid number, it will run the calculation, else it will throw an error
	const calculate = (e) => {
		if (inputMiles !== '') {
			const miles = mileage - inputMiles
			setAvailableMiles(miles)
			if (isNaN(miles) || inputMiles === '') {
				setError(true)
			} else {
				setError(false)
			}
		}
	}

	// Gives outputted numbers commas separators
	const formatNumber = (num) => {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}

	return (
		<div className="App">
			<h1>Mileage Tracker</h1>
			<img src={mazda} alt="Red Mazda CX-5" className="vehicle-image"></img>
			<input type="text" inputMode="numeric" placeholder="Enter Mileage" onChange={(e) => setInputMiles(e.target.value)} onKeyDown={setBlur} onBlur={calculate} pattern="[0-9]" min="1" max="1000000" />
			{error ? <p className="error">Please Enter a Number</p> : null}
			<div className="output-container" style={{ display: `${availableMiles ? 'block' : 'none'}` }}>
				{availableMiles > 0 ? (
					<div>
						<svg className="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" className="mileage-symbol">
							<path fill="#ADFF97" d="M125.44 2.24C57.61 2.24 2.56 57.29 2.56 125.12S57.61 248 125.44 248s122.88-55.05 122.88-122.88S193.27 2.24 125.44 2.24zm-24.57 184.32l-61.44-61.44 17.33-17.33 44.11 43.99 93.27-93.27 17.33 17.45-110.6 110.6z" />
						</svg>
						<p>
							You are <span className="positive-miles">{formatNumber(availableMiles)}</span> miles under your target.
						</p>
					</div>
				) : (
					<div>
						<svg className="warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" className="mileage-symbol">
							<path fill="#FFBC55" d="M1.69 232H249.2L125.44 18.24 1.69 232zm135-33.75h-22.5v-22.5h22.5v22.5zm0-45h-22.5v-45h22.5v45z" />
						</svg>
						<p>
							You are <span className="negative-miles">{formatNumber(Math.abs(availableMiles))}</span> miles over your target.
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default App

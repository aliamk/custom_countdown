const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

// Set Date Input (Minimum) with Today's Date
const today = new Date().toISOString().split('T')[0] // 2020-07-16T16:55:20.243Z
// console.log(today)
dateEl.setAttribute('min', today)
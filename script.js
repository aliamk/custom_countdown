const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdown-form')
const dateEl = document.getElementById('date-picker')

// GLobal Variables
let countdownTitle = ''
let countdownDate = ''

// Set Date Input (Minimum) with Today's Date (stop date picker letting user pick historical dates)
const today = new Date().toISOString().split('T')[0] // 2020-07-16T16:55:20.243Z
// console.log(today)
dateEl.setAttribute('min', today)

// Take Values from Form Input
function updateCountdown(e) {
  e.preventDefault()
  countdownTitle = e.srcElement[0].value // 
  countdownDate = e.srcElement[1].value
  // console.log(e):  submitEvent > srcElement > 0: input#title + 1:#date-picker > value
  console.log(countdownTitle, countdownDate)
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown)
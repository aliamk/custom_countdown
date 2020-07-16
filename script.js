const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdown-form')
const dateEl = document.getElementById('date-picker')

const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')

const completeEl = document.getElementById('complete')
const completeElInfo = document.getElementById('complete-info')
const completeBtn = document.getElementById('complete-button')

// Global Variables
let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date
let countdownActive
let savedCountdown

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

// Set Date Input (Minimum) with Today's Date (stop date picker letting user pick historical dates)
const today = new Date().toISOString().split('T')[0] // 2020-07-16T16:55:20.243Z
// console.log(today)
dateEl.setAttribute('min', today)

// Populate Countdown
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime() // return number of milliseconds from Jan 1970 to now
    const distance = countdownValue - now
    // console.log('distance:', distance)
    
    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour)
    const minutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)
    // console.log(days, hours, minutes, seconds)

    // Hide Countdown Input Form
    inputContainer.hidden = true

    // If countdown has ended, show complete
    if ( distance < 0 ) {
      countdownEl.hidden = true
      clearInterval(countdownActive)
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
      completeEl.hidden = false
    } else {
      // Else, show countdown in progress - Populate Countdown after User's pressed the Submit button
      countdownElTitle.textContent = `${countdownTitle}`
      timeElements[0].textContent = `${days}`
      timeElements[1].textContent = `${hours}`
      timeElements[2].textContent = `${minutes}`
      timeElements[3].textContent = `${seconds}`
      completeEl.hidden = true
      countdownEl.hidden = false
    }
  }, second) // the setInterval function will run every second, checking whether the countdown needs to end
} 

// Take Values from the Form Input
function updateCountdown(e) {
  e.preventDefault()
  countdownTitle = e.srcElement[0].value // 
  countdownDate = e.srcElement[1].value
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate
  }
  // console.log(savedCountdown)
  localStorage.setItem('countdown', JSON.stringify(savedCountdown))
  // console.log(e):  submitEvent > srcElement > 0: input#title + 1:#date-picker > value
  // console.log(countdownTitle, countdownDate)
  // CHECK FOR VALID DATE
  if (countdownDate === '') {
    alert('Please select a date for the countdown')
  } else {
    // Get number version of current Date and updateDOM
    countdownValue = new Date(countdownDate).getTime()
    // console.log('countdown value:', countdownValue)
    updateDOM()
  }
}

// Reset All Values
function reset() {
  // Hide countdowns and show input
  countdownEl.hidden = true
  completeEl.hidden = true
  inputContainer.hidden = false
  // Stop countdown
  clearInterval(countdownActive)
  // Reset the values
  countdownTitle = ''
  countdownDate = ''
  localStorage.removeItem('countdown')
}

function restorePreviousCountdown() {
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true
    savedCountdown = JSON.parse(localStorage.getItem('countdown'))
    countdownTitle = savedCountdown.title
    countdownDate = savedCountdown.date
    countdownValue = new Date(countdownDate).getTime()
    updateDOM()
  }
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown)
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click', reset)

// On load, check localStorage
restorePreviousCountdown()
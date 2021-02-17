const balanceSpan = document.getElementById("balance")
const paySpan = document.getElementById("pay")

const workButton = document.getElementById("work")
const bankButton = document.getElementById("bank")

const work = function() {
    console.log(`Worked! Pay increased by ${payEearnedPerClick} €.`)
    pay += payEearnedPerClick
    paySpan.innerText = pay
}

const bank = function() {
    console.log(`Transferred ${pay} € to the bank.`)
    balance += pay
    balanceSpan.innerText = balance
    pay = 0
    paySpan.innerText = pay
}

const payEearnedPerClick = 100

let balance = 0
let pay = 0

workButton.addEventListener('click', work)
bankButton.addEventListener('click', bank)

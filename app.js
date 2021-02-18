const outstandingLoanTr = document.getElementById("outstandingLoanTr")

const balanceSpan = document.getElementById("balance")
const paySpan = document.getElementById("pay")
const outstandingLoanSpan = document.getElementById("outstandingLoan")

const workButton = document.getElementById("work")
const bankButton = document.getElementById("bank")
const getLoanButton = document.getElementById("getLoan")
const repayLoanButton = document.getElementById("repayLoan")

const work = function() {
    console.log(`Worked! Pay increased by ${payEearnedPerClick} €.`)
    pay += payEearnedPerClick
    paySpan.innerText = pay
    console.log(`Pay balance is now ${pay} €.`)
    bankButton.disabled = false
    repayLoanButton.disabled = false
}

const getInstalment = (amount) => {
    if (outstandingLoan === 0) {
        return 0
    }

    if (outstandingLoan < amount) {
        return outstandingLoan
    }

    return amount
}

const checkLoanStatus = () => {
    if (outstandingLoan === 0) {
        outstandingLoanTr.style.visibility = 'hidden'
        repayLoanButton.style.visibility = 'hidden'
        getLoanButton.disabled = false
    } else {
        outstandingLoanSpan.innerText = outstandingLoan
        outstandingLoanTr.style.visibility = 'visible'
        repayLoanButton.style.visibility = 'visible'
    }
}

const payInstalment = function(instalment) {
    console.log(`Transferred ${instalment} € towards the outstanding loan balance.`)
    outstandingLoan -= instalment
    console.log(`Outstanding loan balance is now ${outstandingLoan} €.`)
}

const bank = function() {
    console.log(`Attempting to transfer ${pay} € to the bank.`)
    
    const instalment = getInstalment(payTowardsLoanFactor * pay)
    const transferredAmount = pay - instalment

    if (instalment > 0) {
        payInstalment(instalment)
    }

    checkLoanStatus()
    
    console.log(`Transferred ${transferredAmount} € to the bank.`)
    balance += transferredAmount
    balanceSpan.innerText = balance
    pay = 0
    paySpan.innerText = pay
    bankButton.disabled = true
    repayLoanButton.disabled = true
    
    console.log(`Account balance is now ${balance} €.`)
}

requestAmountInput = message => {
    return prompt(
        `${message} Please enter an amount (€):`, 0)
}

const getLoanAmount = function() {
    let message = 'Applying for a loan.'

    while (true) {
        const input = requestAmountInput(message)
        
        if (input === null) {
            return null
        }
        
        if (input.trim() == '') {
            console.log('The input was empty.')
            message = 'Your input was empty. Please try again.'
            continue
        }

        const amount = Number(input)
        
        if (isNaN(amount) || amount < 0) {
            console.log(`Invalid input: ${input}.`)
            message = 'Invalid input. Please enter a valid positive number.'
            continue
        }

        console.log(`Applied for a loan of ${amount} €.`)

        if (amount > 2 * balance) {
            console.log('Loan request rejected due to insufficient balance.')
            message = `Loan request rejected. The maximum loan you can apply for is ${2 * balance} €.`
            continue
        }

        return amount
    }
}

const getLoan = function() {
    console.log('Attempting to get a loan.')

    const amount = getLoanAmount()

    if (amount === null) {
        console.log('Loan request cancelled.')
        return
    }

    if (amount === 0) {
        console.log('Loan request will not be processed, as the requested amount is 0 €.')
        return
    }

    outstandingLoan = amount
    checkLoanStatus()
    
    balance += amount
    balanceSpan.innerText = balance

    getLoanButton.disabled = true

    console.log(`Loan request approved. Account balance is now ${balance} €. Outstanding loan is now ${outstandingLoan} €.`)
}

const repayLoan = () => {
    const instalment = getInstalment(pay)
    payInstalment(instalment)
    checkLoanStatus()

    pay -= instalment
    paySpan.innerText = pay

    console.log(`Pay balance is now ${pay} €.`)

    if (pay === 0) {
        bankButton.disabled = true
        repayLoanButton.disabled = true
    }
}

const payEearnedPerClick = 100
const payTowardsLoanFactor = 0.1

let balance = 0
let pay = 0
let outstandingLoan = 0

workButton.addEventListener('click', work)
bankButton.addEventListener('click', bank)
getLoanButton.addEventListener('click', getLoan)
repayLoanButton.addEventListener('click', repayLoan)

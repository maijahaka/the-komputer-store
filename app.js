const outstandingLoanTr = document.getElementById("outstandingLoanTr")

const balanceSpan = document.getElementById("balance")
const paySpan = document.getElementById("pay")
const outstandingLoanSpan = document.getElementById("outstandingLoan")

const workButton = document.getElementById("work")
const bankButton = document.getElementById("bank")
const getLoanButton = document.getElementById("getLoan")

const work = function() {
    console.log(`Worked! Pay increased by ${payEearnedPerClick} €. Pay balance is now ${pay} €.`)
    pay += payEearnedPerClick
    paySpan.innerText = pay
}

const getInstalment = (pay) => {
    if (outstandingLoan === 0) {
        return 0
    }

    if (outstandingLoan < 0.1 * pay) {
        return outstandingLoan
    }

    return 0.1 * pay
}

const repayLoan = function(instalment) {
    console.log(`Transferred ${instalment} € towards the outstanding loan balance.`)
    outstandingLoan -= instalment

    if (outstandingLoan != 0) {
        outstandingLoanSpan.innerText = outstandingLoan
    } else {
        outstandingLoanTr.style.visibility = 'hidden'
    }

    console.log(`Outstanding loan balance is now ${outstandingLoan} €.`)
}

const bank = function() {
    console.log(`Attempting to transfer ${pay} € to the bank.`)
    
    const instalment = getInstalment(pay)
    const transferredAmount = pay - instalment

    if (instalment > 0) {
        repayLoan(instalment)
    }
    
    console.log(`Transferred ${transferredAmount} € to the bank.`)
    balance += transferredAmount
    balanceSpan.innerText = balance
    pay = 0
    paySpan.innerText = pay
    console.log(`Account balance is now ${balance} €.`)
}

requestAmountInput = message => {
    return prompt(
        `${message} Please enter an amount (€):`
        , 0)
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
            console.log('Loan request rejected.')
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
    outstandingLoanTr.style.visibility = 'visible'
    outstandingLoanSpan.innerText = outstandingLoan
    
    balance += amount
    balanceSpan.innerText = balance

    console.log(`Loan request approved. Account balance is now ${balance} €. Outstanding loan is now ${outstandingLoan} €.`)
}

const payEearnedPerClick = 100

let balance = 0
let pay = 0
let outstandingLoan = 0

workButton.addEventListener('click', work)
bankButton.addEventListener('click', bank)
getLoanButton.addEventListener('click', getLoan)

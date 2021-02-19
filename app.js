const outstandingLoanTr = document.getElementById("outstandingLoanTr")

const balanceSpan = document.getElementById("balance")
const paySpan = document.getElementById("pay")
const outstandingLoanSpan = document.getElementById("outstandingLoan")

const workButton = document.getElementById("work")
const bankButton = document.getElementById("bank")
const getLoanButton = document.getElementById("getLoan")
const repayLoanButton = document.getElementById("repayLoan")

const laptopsSelect = document.getElementById("laptops")

const featuresDiv = document.getElementById("features")
const laptopPhotoDiv = document.getElementById("laptopPhoto")
const laptopInfoDiv = document.getElementById("laptopInfo")
const laptopPriceDiv = document.getElementById("laptopPrice")

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

const renderLaptop = (laptop) => {
    const featuresList = document.createElement('ul')
    laptop.features.forEach(feature => {
        const item = document.createElement('li')
        item.innerText = feature
        featuresList.appendChild(item)
    })
    featuresDiv.innerHTML = featuresList.innerHTML

    laptopPhotoDiv.innerHTML = `<img src="${laptop.imageUrl}">`

    laptopInfoDiv.innerHTML =
    `
        <h2>${laptop.name}</h2>
        <p>${laptop.description}</p>
    `

    laptopPriceDiv.innerText = `${laptop.price} €`
}

const selectLaptop = (event) => {
    console.log(`Selected ${event.target.value}.`)
    const laptop = laptops[event.target.selectedIndex]
    renderLaptop(laptop)
}

const payEearnedPerClick = 100
const payTowardsLoanFactor = 0.1

let balance = 0
let pay = 0
let outstandingLoan = 0

let laptops = [
    {
        name: "Basic laptop",
        features: [
            "It has a screen.",
            "It has a keyboard."
        ],
        description: "Great for casual web browsing.",
        imageUrl: "/images/basic-laptop.jpg",
        price: 600
    },
    {
        name: "Premium laptop",
        features: [
            "The screen renders colours perfectly.",
            "It has a soft-touch keyboard."
        ],
        description: "Perfect for working in a café while drinking a latte.",
        imageUrl: "/images/premium-laptop.jpg",
        price: 1800
    },
    {
        name: "Gaming laptop",
        features: [
            "It offers ultra-high FPS.",
            "The keyboard has LED effects."
        ],
        description: "Name a game and you can play it with this laptop.",
        imageUrl: "/images/gaming-laptop.jpg",
        price: 2200
    },
    {
        name: "Professional laptop",
        features: [
            "It has a built-in privacy screen.",
            "It has a quiet keyboard.",
        ],
        description: "Ideal for doing a bootcamp on JavaScript.",
        imageUrl: "/images/professional-laptop.jpg",
        price: 3200
    }
]

workButton.addEventListener('click', work)
bankButton.addEventListener('click', bank)
getLoanButton.addEventListener('click', getLoan)
repayLoanButton.addEventListener('click', repayLoan)

laptopsSelect.addEventListener('change', selectLaptop)

laptops.forEach(laptop => {
    const option = document.createElement('option')
    option.innerText = laptop.name
    laptopsSelect.appendChild(option)
})

renderLaptop(laptops[0])
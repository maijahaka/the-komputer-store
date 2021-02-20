import { getLoanAmount } from './inputHandler.js'

const outstandingLoanTr = document.getElementById("outstandingLoanTr")

const balanceSpan = document.getElementById("balanceSpan")
const outstandingLoanSpan = document.getElementById("outstandingLoanSpan")
const paySpan = document.getElementById("paySpan")

const featuresDiv = document.getElementById("featuresDiv")
const laptopPhotoDiv = document.getElementById("laptopPhotoDiv")
const laptopInfoDiv = document.getElementById("laptopInfoDiv")
const cannotAffordMessageDiv = document.getElementById("cannotAffordMessageDiv")
const laptopPriceDiv = document.getElementById("laptopPriceDiv")

const laptopsSelect = document.getElementById("laptopsSelect")

const getLoanButton = document.getElementById("getLoanButton")
const bankButton = document.getElementById("bankButton")
const workButton = document.getElementById("workButton")
const repayLoanButton = document.getElementById("repayLoanButton")
const buyNowButton = document.getElementById("buyNowButton")

const manageOutstandingLoanTr = () => {
    if (outstandingLoan > 0) {
        outstandingLoanTr.style.visibility = 'visible'
    } else {
        outstandingLoanTr.style.visibility = 'hidden'
    }
}

const manageBankButton = () => {
    if (pay > 0) {
        bankButton.disabled = false
    } else {
        bankButton.disabled = true
    }
}

const manageGetLoanButton = () => {
    // Can only get a new loan if the previous loan is paid. Only one loan per laptop.
    if (balance > 0 && outstandingLoan === 0 && !loanForLaptopReceived) {
        getLoanButton.disabled = false
    } else {
        getLoanButton.disabled = true
    }
}

const manageRepayLoanButton = () => {
    if (outstandingLoan > 0) {
        repayLoanButton.style.visibility = 'visible'        
    } else {
        repayLoanButton.style.visibility = 'hidden'
    }
    
    if (pay > 0) {
        repayLoanButton.disabled = false
    } else {
        repayLoanButton.disabled = true
    }
}

const showCannotAffordMessage = () => {
    cannotAffordMessageDiv.style.visibility = 'visible'
}

const hideCannotAffordMessage = () => {
    cannotAffordMessageDiv.style.visibility = 'hidden'
}

const renderLaptop = laptop => {
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

    hideCannotAffordMessage()
}

const work = () => {
    pay += payEearnedPerClick
    paySpan.innerText = pay

    manageBankButton()
    manageRepayLoanButton()
}

const bank = amount => {
    balance += amount
    balanceSpan.innerText = balance

    pay -= amount
    paySpan.innerText = pay

    manageBankButton()
    manageGetLoanButton()
    manageRepayLoanButton()
    hideCannotAffordMessage()
}

const getLoan = amount => {
    outstandingLoan += amount
    outstandingLoanSpan.innerText = outstandingLoan
    
    balance += amount
    balanceSpan.innerText = balance

    loanForLaptopReceived = true

    manageOutstandingLoanTr()
    manageGetLoanButton()
    manageRepayLoanButton()
    hideCannotAffordMessage()
}

const getInstalment = amount => {
    if (outstandingLoan === 0) {
        return 0
    }

    if (outstandingLoan < amount) {
        return outstandingLoan
    }

    return amount
}

const payInstalment = instalment => {
    pay -= instalment
    paySpan.innerText = pay

    outstandingLoan -= instalment
    outstandingLoanSpan.innerText = outstandingLoan

    manageOutstandingLoanTr()
    manageBankButton()
    manageGetLoanButton()
    manageRepayLoanButton()
}

const buyLaptop = laptop => {
    balance -= laptop.price
    balanceSpan.innerText = balance
    
    loanForLaptopReceived = false
    
    manageGetLoanButton()
}

const handleWorkButtonClick = () => {
    work()
    console.log(`Worked! Pay increased by ${payEearnedPerClick} €. Pay balance is now ${pay} €.`)
}

const handleBankButtonClick = () => {
    console.log(`Attempting to transfer ${pay} € to the bank.`)

    // a part of the pay balance is used to repay any outstanding loan
    const instalment = getInstalment(minimumInstalmentFactor * pay)
    if (instalment > 0) {
        payInstalment(instalment)
        console.log(`Transferred ${instalment} € towards the outstanding loan balance. Outstanding loan balance is now ${outstandingLoan} €.`)
    }

    const transferredAmount = pay
    bank(transferredAmount)
    console.log(`Transferred ${transferredAmount} € to the bank. Account balance is now ${balance} €.`)
}

const handleGetLoanButtonClick = () => {
    console.log('Attempting to get a loan.')

    // request loan amount from the user
    const amount = getLoanAmount(balance)

    if (amount === null) {
        console.log('Loan request cancelled.')
        return
    }

    if (amount === 0) {
        console.log('Loan request will not be processed, as the requested amount is 0 €.')
        return
    }

    getLoan(amount)
    console.log(`Loan request approved. Account balance is now ${balance} €. Outstanding loan is now ${outstandingLoan} €.`)
}

const handleRepayLoanButtonClick = () => {
    const instalment = getInstalment(pay)
    payInstalment(instalment)
    console.log(`Transferred ${instalment} € towards the outstanding loan balance. Outstanding loan balance is now ${outstandingLoan} €. Pay balance is now ${pay} €.`)
}

const handleBuyNowButtonClick = () => {
    if (selectedLaptop.price <= balance) {
        buyLaptop(selectedLaptop)
        console.log(`Bought a ${selectedLaptop.name} with ${selectedLaptop.price} €. Account balance is now ${balance} €.`)
        alert(`Congratulations! You are now the owner of a ${selectedLaptop.name}.`)
    } else {
        console.log(`Cannot afford to buy a ${selectedLaptop.name}. Missing ${selectedLaptop.price - balance} €.`)
        showCannotAffordMessage()
    }
}

const handleLaptopsSelectChange = event => {
    selectedLaptop = laptops[event.target.selectedIndex]
    console.log(`Selected ${event.target.value}.`)
    renderLaptop(selectedLaptop)
}

// the amount of money earned when clicking the 'Work' button
const payEearnedPerClick = 100

// the part of transfers to bank account that is used to repay loan
const minimumInstalmentFactor = 0.1

let balance = 0
let pay = 0
let outstandingLoan = 0

let loanForLaptopReceived = false

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

let selectedLaptop = laptops[0]

workButton.addEventListener('click', handleWorkButtonClick)
bankButton.addEventListener('click', handleBankButtonClick)
getLoanButton.addEventListener('click', handleGetLoanButtonClick)
repayLoanButton.addEventListener('click', handleRepayLoanButtonClick)
buyNowButton.addEventListener('click', handleBuyNowButtonClick)

laptopsSelect.addEventListener('change', handleLaptopsSelectChange)

laptops.forEach(laptop => {
    const option = document.createElement('option')
    option.innerText = laptop.name
    laptopsSelect.appendChild(option)
})

renderLaptop(selectedLaptop)
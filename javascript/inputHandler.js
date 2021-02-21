export const getLoanAmount = balance => {
    let message = 'Applying for a loan.'

    while (true) {
        // open a prompt window to request input from the user
        const input = requestAmountInput(message)
        
        // input is null if the user presses 'Cancel' in the prompt window
        if (input === null) {
            return null
        }
        
        if (input.trim() == '') {
            console.log('The input was empty.')
            message = 'Your input was empty. Please try again.'
            continue
        }

        // Cents are rounded down to euros
        const amount = Math.floor(Number(input))
        
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

const requestAmountInput = message => prompt(`${message} Please enter an amount (€):`, 0)
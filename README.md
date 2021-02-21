# The Komputer Store

This is a simple single-page application built with JavaScript, HTML and CSS. Currently all data is stored as JavaScript variables, so the content refreshes when the page is reloaded.

## Functionality

The application has three parts: Bank, Work and Laptops.

### Bank

The bank section shows the current bank account balance as well as the outstanding loan balance, if there is outstanding loan.

The _Get a loan_ button opens a prompt window requesting the user to enter a loan amount in euros. If the user enters cents, the amount is rounded down to euros. If the user input is 0 or the user presses _Cancel_ in the prompt window, the loan application will not be processed. The loan amount is added to the bank account balance.

The maximum loan the user can get is twice the current account balance. The user has to repay the current loan before receiving new one. The user can only get one loan per laptop, i.e. they must buy a laptop and repay their previous loan before applying for another loan.

### Work

By pressing the _Work_ button, the user can 'earn' 100 €. This amount is added to their pay balance.

By pressing the _Bank_ button, the user can transfer the pay balance to their bank account. If the user has an outstanding loan, 10 % of this amount is used to repay the loan and the remaining amount is added to the bank account balance. If the outstanding loan balance is less than 10 % of the pay balance, the loan is paid in full and the remaining amount is transferred to the bank account.

The _Repay loan_ button appears if the user has outstanding loan. By pressing this button, the user can use their full pay balance to repay loan. If the outstanding loan amount is less than the pay balance, only the outstanding loan amount is deducted from the pay balance and the loan is paid in full.

### Laptops

Through the menu in the _Laptops_ section, the user can select a laptop. The details of the selected laptop are shown on the page.

By pressing the _Buy now_ button, the user can attempt to purchase the selected laptop. If the user has sufficient balance on their bank account, the price of the selected laptop is deducted from the bank account balance and a popup message indicating a successful purchase is shown. Otherwise, an error message is shown.

## How to use

The application is accessible at https://maijahaka.github.io/the-komputer-store/.

The application works in the newer versions of all main browsers.

## Picture credits

[Karsten Madsen / Pexels](https://www.pexels.com/photo/laptop-macbook-pro-office-computer-18104/)  
[Monoar Rahman / Pexels](https://www.pexels.com/photo/gray-laptop-computer-109371/)  
[Negative Space / Pexels](https://www.pexels.com/photo/macbook-pro-92904/)  
[Danny Meneses / Pexels](https://www.pexels.com/photo/photo-of-turned-on-laptop-computer-943096/)
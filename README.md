# Cash Register

## Goal

Implement a simple grocery cash register.

## Scope

The focus is to demonstrate ability in designing object oriented systems. The focus is not on wiring together systems or developing full stack applications. So, to save time, I will not implement a UI or database, but only the domain model.

## Kata

This project is inspired by these katas:

http://codekata.com/kata/kata01-supermarket-pricing/
http://codekata.com/kata/kata09-back-to-the-checkout/

Though it is not exactly the same. The goal was to demonstrate my ability in object oriented design and test driven development, not to exactly match the katas.

## Use cases from email

* As a customer I want to know the total price of a list of items so I can buy them
* As a store manager I want to be able to price items per item (each)
* As a store manager I want to be able to price items per unit of weight
* As a store manager I want to be able to give a list of sale prices that override item prices
* As a store manager I want to be able to give bulk discount sales (eg. Buy two, get one free)
* As a store manager I want to be able to advertise coupons for customers to save money when the bill is above a certain threshold (eg. $5 off when you spend $100 or more)

## Assumptions / Requirements

- in memory domain model only. No database, no UI.
- all inputs are JSON
- all inputs must be validated
- sale rules and coupons are also inputs
- an output is the total price
- no receipt is required (though it would be easy to add)
- must be a way to determine if a sku just scanned needs to be weighed (not implemented yet)
- errors will be thrown exceptions
- no tax
- price math happens in cents internally, rounded to the nearest cent when necessary (sort of implemented)
- sale rules are very likely to change
- coupon rules are very likely to change
- voiding scans is not necessary (in the real world you would want to of course)
- all products have skus... not necessary to manually enter the price for a Line (which is also not valid in the real world)
- value/entity objects use ES6 getters to make sure attributes are immutable
- member variables/methods starting with _ are private
- the mocha documentation says not to use arrow functions. I think arrow functions are easier to read so I ignored this
- all sales are valid as long as they are added to the system (no time checks)
- things can't be removed/voided from the system (for simplicity / time)

## Glossary

* Register - top level object with public API, a cash register
* Product - something that can be bought
* Products - a list of products
* Money - representation of monetary amounts
* Bill - a list of things currently being bought and coupons applied
* Line - a line on a Bill
* Sales - a list of active sale rules
* SaleRule - the logic for how a sale price works and how its valid
* Price - what and how the customer is charged for a Product
* Coupon - the logic for how a coupon works and how its valid
* Coupons - a list of valid coupons in circulation and their skus

* PriceSale - a sale that modifies a product's price to a new price
* XForYSale - a sale that applies a X for the price of Y discount (eg. 2 for 1)

* ThresholdCoupon - a coupon that applies a discount after a certain amount is bought

* sku - the ID of a product, alphanumeric
* qty - quantity of something, either weight or number

## Finishing up

This project is incomplete according to the use cases above. In order to finish, I to implement the coupon system which would be very similar in design to the sales system. A coupon can only be applied to a Bill once. It would calculate a discount similar to sales but would be calculated after sales and be given the intermediate total. Many kinds of coupons could be easily added to the system. Potentially coupons could apply to specific products and some coupons could have multiple instances added to a bill. Another alternative is to have coupons enable a sale in the system if applied to a bill (which may be easier / simpler).

There are also many TODO comments throughout the code to indicate where I was aware changes need to be made for cleaner code and/or optimizations that may need to be made. Some of them should be fixed right away and would be if I had more time, others could wait until there was a need (such as slow performance or a change).

## Running

Tested on node 6.x.

First install modules:

	npm install

Since this is just a domain model, the only way to run is to run the tests:

	npm test

## License

MIT -- See LICENSE for details

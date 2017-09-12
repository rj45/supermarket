# Cash Register

## Goal

Implement a simple grocery cash register.

## Scope

The focus is to demonstrate ability in designing object oriented systems. The focus is not on wiring together systems or developing full stack applications. So, to save time, I will not implement a UI or database, but only the domain model.

## Disclaimer on feedback

I would very much appreciate a list of jot notes of potential problems with the code. No need to edit it or make sure the tone is appropriate. No need to ensure you are correct. Just your raw first impressions. Sometimes I do not get the feedback I am looking for and I thought I would ask up front for it. I am very eager to improve and without feedback that's very difficult.

## Use cases from email

As a customer I want to know the total price of a list of items so I can buy them
As a store manager I want to be able to price items per item (each)
As a store manager I want to be able to price items per unit of weight
As a store manager I want to be able to give a list of sale prices that override item prices
As a store manager I want to be able to give bulk discount sales (eg. Buy two, get one free)
As a store manager I want to be able to advertise coupons for customers to save money when the bill is above a certain threshold (eg. $5 off when you spend $100 or more)

## Assumptions / Requirements

- in memory domain model only. No database, no UI.
- all inputs are JSON
- all inputs must be validated
- sale rules and coupons are also inputs
- one output is the total price
- no receipt is required (though it would be easy to add)
- must be a way to determine if a sku just scanned needs to be weighed
- errors will be thrown exceptions
- no tax
- price math happens in cents internally, rounded to the nearest cent when necessary
- sale rules are very likely to change
- coupon rules are very likely to change

## Glossary

Register - top level object with public API, a cash register
Product - something that can be bought
Products - a list of products
Money - representation of monetary amounts
Bill - a list of things currently being bought and coupons applied
Line - a line on a Bill
Sales - a list of active sale rules
SaleRule - the logic for how a sale price works and how its valid
Price - what and how the customer is charged for a Product
Coupon - the logic for how a coupon works and how its valid
Coupons - a list of valid coupons in circulation and their skus

sku - the ID of a product, alphanumeric
qty - quantity of something, either weight or number

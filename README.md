# Cash Register

## Goal

Implement a sample cash register.

## Scope

The focus is to demonstrate ability in designing object oriented systems. The focus is not on wiring together systems or developing full stack applications. So, to save time, I will not implement a UI or database, but only the domain model with unit tests designed to operate the domain model from the user's perspective.

## Use cases from email

As a customer I want to know the total price of a list of items so I can buy them
As a store manager I want to be able to price items per item (each)
As a store manager I want to be able to price items per unit of weight
As a store manager I want to be able to give a list of sale prices that override item prices
As a store manager I want to be able to give bulk discount sales (eg. Buy two, get one free)
As a store manager I want to be able to advertise coupons for customers to save money when the bill is above a certain threshold (eg. $5 off when you spend $100 or more)

## Assumptions

- supplied with a map (object) of items already loaded from the database
- the other input is the various kinds of pricing rules, again already loaded from the database
- the input was JSON and comes from the internet (so needs validation)
- one output is the total price (no receipt)
- the other output is a list of errors if validation / sanity checks failed
- the ID/SKU of an item is its name (for simplicity)
- no tax
- price math happens in cents internally, rounded to the nearest cent when necessary



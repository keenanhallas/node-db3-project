-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
select
    p.productname as Item,
    c.categoryname as Category
from product as p
join category as c
    on p.categoryid = c.id;


-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
select
    o.id as OrderNumber,
    s.companyname as Shipper
from [order] as o
join shipper as s
    on o.shipvia = s.id
where o.orderdate < "2012-08-09";


-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
select
    p.productname as Product,
    od.quantity as Quantity
from orderdetail as od
join product as p
    on od.productid = p.id
where od.orderid = 10251
order by p.productname;


-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
select
    o.id as OrderNumber,
    c.companyname as CompanyName,
    e.lastname as Buyer
from [order] as o
join customer as c
    on o.customerid = c.id
join employee as e
    on o.employeeid = e.id
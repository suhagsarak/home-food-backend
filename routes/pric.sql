



select 

O.oid, O.time, O.totalPrice, O.status, 

U.uid, U.name,  U.email, U.gender, U.address,  U.city, U.type 


from orders O INNER JOIN user U where O.uid = U.uid;


select P.name  from orders O INNER JOIN product P INNER JOIN  productsinorders PO  where PO.oid = O.oid and PO.pid = P.pid and O.oid = 10;



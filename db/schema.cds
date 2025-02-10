namespace sap.b1.phoneshop;

entity Product {
    key productID: Integer;  //primary key
    brand: String;
    model: String;
    mobile_name: String = brand|| '-' ||model;
    rom: Integer;
    ram:Integer;
    price:Decimal;
}
entity Customer {
    key customerID: Integer;    //primary key
    name: String;
    mobile_no:Integer;
}
entity Order {
    key orderID: Integer;   //primary key
    orderDate: Date;
    amount: Integer;
    customerID : Integer;   
}

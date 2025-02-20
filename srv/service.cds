using {sap.b1.phoneshop as my} from '../db/schema';

service PhoneshopServices {
    entity Product  as projection on my.Product;
    entity Customer as projection on my.Customer;
    entity Order    as projection on my.Order;
    
    function msg(txt : String)   returns String;
    function text(you : Integer) returns String;
}

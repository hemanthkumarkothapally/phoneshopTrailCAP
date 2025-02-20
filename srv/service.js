const { update } = require('@sap/cds');
const cds = require('@sap/cds');
module.exports = (src) => {
    src.on('msg', req => {
        return "helo " + req.data.txt
    })
    src.on('text', req => `you have ${req.data.you} orders`)

    const { Product, Customer, Order } = cds.entities('sap.b1.phoneshop');

    // on is the event handler....
    // it will directly push the data when product is called....
    src.on('READ', "Product", async (req) => {
        console.log("This function is working");
        const data = await SELECT.from(Product);

        const add = {
            "productID": 123,
            "brand": "oppo",
            "model": "y11",
            "model_name": "oppo-y11",
            "rom": 6,
            "ram": 128,
            "price": 12000.00
        };
        data.push(add);
        return data;
    });


    //adding data through test.http file ......
    //post call event 
    src.on('CREATE', "Customer", async (req) => {
        console.log("Creating a new product...");

        const { customerID, name, mobile_no } = req.data;

        const newcustomer = {
            customerID,
            name,
            mobile_no

        };

        // Insert the new product into the database
        await INSERT.into(Customer).entries(newcustomer);

        return newcustomer;
    });

    src.on('READ', "Order", async (req) => {
        try {
            const wholedata = await SELECT.from(Order);
            return wholedata;
        } catch (error) {
            return req.reject(500, 'not getting data : ' + error.message);
        }
    });

    src.on('CREATE', "Order", async (req) => {
        const { orderID, orderDate, amount, customerID } = req.data;
        if (!orderID || !orderDate || !amount || !customerID) {
            return req.reject(400, "all fields are mandatory");
        }
        const neworder = {
            orderID,
            orderDate,
            amount,
            customerID
        };
        try {
            await INSERT.into(Order).entries(neworder);
            return neworder;
        } catch (error) {
            return req.reject(500, 'not inserting : ' + error.message);
        }

    });
    src.on('UPDATE', "Order", async (req) => {
        const orderID = req.data.orderID;
        if (!orderID) {
            return req.reject(400, "orderID not given");
        }
        const updatedorder = req.data;
        try {
            await UPDATE(Order).set(updatedorder).where({ orderID });
            return updatedorder;

        } catch (error) {
            return req.reject(500, 'unable to update: ' + error.message);
        }
    });

    src.on('DELETE', "Order", async (req) => {
        const { orderID } = req.data;
        if (!orderID) {
            return req.reject(400, 'Order ID not entered');
        }
        try {
            const deletedorder = await DELETE.from(Order).where({ orderID });
            if (deletedorder === 0) {
                return req.reject(404, 'Order not found');
            }
        } catch (error) {
            return req.reject(500, 'Not able to Delete: ' + error.message);
        }
    });

    src.on('CREATE', "Product", async (req) => {
        const { productID, brand, model, rom, ram, price } = req.data;
        console.log("product is posted");
        if (!productID || !brand || !model || !rom || !ram || !price) {
            return req.reject(400, 'All Fields Are Mandatory');
        }
        const newproduct = {
            productID, brand, model, rom, ram, price
        }
        try {
            await INSERT.into(Product).entries(newproduct);
            return newproduct;
        } catch (error) {
            return req.reject(500, 'Unable To Push the data' + error.message);
        }
    });

}
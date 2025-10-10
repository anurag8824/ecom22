const razorpay = require("../config/razorpayClient");
const orderService=require("../services/order.service.js");
const axios = require("axios");
const querystring = require("querystring");

const crypto = require("crypto");

function md5_sign(data, key) {
  const sortedKeys = Object.keys(data).sort();
  const queryString = sortedKeys.map(k => `${k}=${data[k]}`).join('&');
  const stringToSign =`${queryString}&key=${key}`;
  const md5 = crypto.createHash('md5').update(stringToSign.trim(), 'utf8').digest('hex');
  return md5.toUpperCase();
}


const getRechargeOrderId = () => {
  const date = new Date();
  let id_time = date.getUTCFullYear() + '' + date.getUTCMonth() + 1 + '' + date.getUTCDate();
  let id_order = Math.floor(Math.random() * (99999999999999 - 10000000000000 + 1)) + 10000000000000;

  return id_time + id_order
}

async function http_post(url, data = {}) {
  try {
    const response = await axios.post(url, querystring.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      timeout: 120000
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return `http code from server is not 200`;
    } else {
      return `HTTP POST error: ${error.message}`;
    }
  }
}

const createPaymentLink= async (orderId)=>{
    // const { amount, currency, receipt, notes } = reqData;
    

    try {
        
        const order = await orderService.findOrderById(orderId);
    
        // const paymentLinkRequest = {
        //   amount: order.totalPrice * 100,
        //   currency: 'INR',
        //   customer: {
        //     name: order.user.firstName + ' ' + order.user.lastName,
        //     contact: order.user.mobile,
        //     email: order.user.email,
        //   },
        //   notify: {
        //     sms: true,
        //     email: true,
        //   },
        //   reminder_enable: true,
        //   callback_url: `https://apit.shopssy.shop/payment/callback`,
        //   callback_method: 'get',
        // };
        const url = 'https://www.lg-pay.com/api/order/create';
        const key = 'rjmRrFvpvWQKx2g52pfWBR5OLZREyTKH';
        const app_id = 'YD4480';
    
        const params = {
          app_id,
          trade_type: 'INRUPI',      //INRUPI         // test channel for collection
          order_sn: orderId.toString(),  // unique order number
          money: order.totalPrice * 100,                // order amount
          notify_url: 'https://api.enjoy-call.me/api/callback', // your callback URL
          return_url: 'https://enjoy-call.me', // user redirect URL
          subject: 'Test Order'            // order description
        };
    
        const sign = md5_sign(params, key);
        const payload = { ...params, sign };
    
        const lgres = await http_post(url, payload);
        console.log('LG-Pay Response:', lgres);


        // if(lgres.data.status == 1){
        //   await order.updateOne({})
        // }
    
        // const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
    
        // const paymentLinkId = paymentLink.id;
        const payment_link_url = lgres?.data?.pay_url;
    
     
    
        // Return the payment link URL and ID in the response
        const resData = {
          // paymentLinkId: paymentLinkId,
          payment_link_url,
        };
        return resData;
      } catch (error) {
        console.error('Error creating payment link:', error);
        throw new Error(error.message);
      }
}

const updatePaymentInformation=async(reqData)=>{
    const paymentId = reqData.payment_id;
  const orderId = reqData.order_id;

  try {
    // Fetch order details (You will need to implement the 'orderService.findOrderById' function)
    const order = await orderService.findOrderById(orderId);

    // Fetch the payment details using the payment ID
    const payment = await razorpay.payments.fetch(paymentId);
  

    if (payment.status === 'captured') {
     

      order.paymentDetails.paymentId=paymentId;
      order.paymentDetails.status='COMPLETED'; 
      order.orderStatus='PLACED';
     

     
      await order.save()
    }
    console.log( 'payment status',order);
    const resData = { message: 'Your order is placed', success: true };
    return resData
  } catch (error) {
    console.error('Error processing payment:', error);
    throw new Error(error.message)
  }
}

module.exports={createPaymentLink,updatePaymentInformation}
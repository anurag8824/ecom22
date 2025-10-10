// const twilio = require('twilio');
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const User = require("../models/user.model");

const otpStore = {}; // You can use Redis or DB in real-world use

const sendOtp = async (mobile) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[mobile] = otp;

     // Send OTP via NinzaSMS
     try {

       // पहले user check करो
       let user = await User.findOne({ mobile });

       // अगर user नहीं मिला तो temporary create कर सकते हो (empty fields के साथ)
       if (!user) {
           user = new User({
               firstName: "TEMP",
               lastName: "USER",
               mobile,
               OTPcode: otp,
           });
           await user.save();
       } else {
           // अगर user मिला तो सिर्फ OTP update करो
           user.OTPcode = otp;
           await user.save();
       }



        const response = await fetch("https://ninzasms.in.net/auth/send_sms", {
          method: "POST",
          headers: {
            "authorization": "NINZASMSe77e84feddca7b0fd97d515c8d5a97e48a3c7cefaa4dbec88399",
            "content-type": "application/json"
          },
          body: JSON.stringify({
            sender_id: "15539",
            variables_values: otp,
            numbers: mobile, // phone number from body
          }),
        });
    
        const data = await response.json();
        console.log("OTP:", otp, "| NinzaSMS Response:", data);
    
        if (!response.ok) throw new Error("Failed to send OTP");
        return { success: true , otp}; // return otp for testing purposes};
      } catch (error) {
        console.error("Error sending OTP:", error.message);
        throw new Error("Failed to send OTP");
      }
};

const verifyOtp = async (mobile, otp) => {
  const user = await User.findOne({ mobile });
    if (!user) return false;

    const isValid = user.OTPcode === otp;

    if (isValid) {
        // success होने पर OTPcode null कर दो
        user.OTPcode = null;
        await user.save();
    }

    return isValid ? user : false;
};

module.exports = { sendOtp, verifyOtp };

const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

exports.forgotPassword = async (req, res, next) => {
  try {
    
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.API_KEY;
    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
    const sender = {
      email: "kesav2661998@gmail.com",
    };
    const receivers = [
      {
        email: "kesavaprasad558@gmail.com",
      },
    ];

    const response = tranEmailApi.sendTransacEmail({
      subject: "this is a another test message",
      sender,
      to: receivers,

      textContent: `
    This is a text message to check the mail service`,
    });
    const email = req.body.email;
    res.status(200).json({ message: email });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getForgotPasswordPage = async (req, res, next) => {
  try {
    res.sendFile("forgotPassword.html", { root: "views" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

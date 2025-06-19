const SibApiV3Sdk = require('sib-api-v3-sdk');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY; // Replace with your actual key

const sendTransEmail = new SibApiV3Sdk.TransactionalEmailsApi();

module.exports = sendTransEmail;

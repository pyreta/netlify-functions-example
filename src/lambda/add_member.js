const Mailchimp = require("mailchimp-api-v3")

const { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID } = process.env;

exports.handler = async (event, context) => {
  try {
    const mailchimp = new Mailchimp(MAILCHIMP_API_KEY);
    return mailchimp.post(`lists/${MAILCHIMP_LIST_ID}/members`, {
      email_address: event.queryStringParameters.email,
      merge_fields: {
        'FNAME': event.queryStringParameters.name,
      },
      status: "subscribed",
      tags: ["testing"]
    }).then(res => {
      return {
        statusCode: 200,
        body: JSON.stringify({msg: `Thank you! The email ${res.email_address} has been added to our mailing list.`})
      }
    }).catch(err => {
      return {
        statusCode: 500,
        body: JSON.stringify({msg: err.message})
      }
    })
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
  return {
    statusCode: 200,
    body: `MAILCHIMP_API_KEY: ${MAILCHIMP_API_KEY} - MAILCHIMP_LIST_ID: ${MAILCHIMP_LIST_ID}`
  };
};

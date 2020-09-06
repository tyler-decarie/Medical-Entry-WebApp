var fs = require("fs");
var nodemailer = require("nodemailer");
var ejs = require("ejs");
var transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
        user: "apikey",
        pass: "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",
    }
});
async function sendEmail(to, name, type, token) {
    var mainOptions = null;

    console.log(`DATA:` + token);
    if (type === "reset") {
        await ejs.renderFile(__dirname + "/templates/reset.ejs", { name: name, token: token }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                mainOptions = {
                    from: "Project Clear <azure_281ed64e8c8d782f18fafed04055e293@azure.com>",
                    to: to,
                    subject: `Project Clear Password Reset`,
                    html: data
                };
                // console.log("html data ======================>", mainOptions.html);

            }

        });
    } else if (type === "register") {
        await ejs.renderFile(__dirname + "/templates/register.ejs", { name: name, token: token }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                mainOptions = {
                    from: "Project Clear <azure_281ed64e8c8d782f18fafed04055e293@azure.com>",
                    to: to,
                    subject: `Project Clear Account Verification`,
                    html: data
                };
                // console.log("html data ======================>", mainOptions.html);

            }

        });
    }
    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}

module.exports = { sendEmail }
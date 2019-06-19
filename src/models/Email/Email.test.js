export default class Email_Test {
    constructor(modules) {
        return new Promise(async (resolve, reject) => {
            try {
                const results = await this.run(modules)
                resolve(results)
            } catch (err) {
                reject(err)
            }

        })
    }

    run(modules) {
        modules.test(`Email Validator`, async (t) => {
            try {
                //Trim Emails
                const ws_parallel = await Promise.all([
                    modules.weevioValidator.email.trim(modules.sample.ws_emails[0]),
                    modules.weevioValidator.email.trim(modules.sample.ws_emails[1]),
                    modules.weevioValidator.email.trim(modules.sample.ws_emails[2]),
                    modules.weevioValidator.email.trim(modules.sample.ws_emails[3])
                ])
                t.equal(ws_parallel[0].indexOf(' '), -1, `Email Validator v1 - Email '${modules.sample.ws_emails[0]}' trimmed - '${ws_parallel[0]}'`)
                t.equal(ws_parallel[1].indexOf(' '), -1, `Email Validator v1 - Email '${modules.sample.ws_emails[1]}' trimmed - '${ws_parallel[1]}'`)
                t.equal(ws_parallel[2].indexOf(' '), -1, `Email Validator v1 - Email '${modules.sample.ws_emails[2]}' trimmed - '${ws_parallel[2]}'`)
                t.equal(ws_parallel[3].indexOf(' '), -1, `Email Validator v1 - Email '${modules.sample.ws_emails[3]}' trimmed - '${ws_parallel[3]}'`)
                //Validate Emails
                const parallel = await Promise.all([
                    modules.weevioValidator.email.isValid(modules.sample.emails[0]),
                    modules.weevioValidator.email.isValid(modules.sample.emails[1]),
                    modules.weevioValidator.email.isValid(modules.sample.emails[2]),
                    modules.weevioValidator.email.isValid(modules.sample.emails[3])
                ])
                t.equal(parallel[0], true, `Email Validator v1 - Email '${modules.sample.emails[0]}' is valid`)
                t.equal(parallel[0], true, `Email Validator v1 - Email '${modules.sample.emails[1]}' is valid`)
                t.equal(parallel[0], true, `Email Validator v1 - Email '${modules.sample.emails[2]}' is valid`)
                t.equal(parallel[0], true, `Email Validator v1 - Email '${modules.sample.emails[3]}' is valid`)
                t.end()
            } catch (e) {
                t.end(e.message)
            }
        })
    }
}
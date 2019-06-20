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
                //Trim Emails with Inner-Whitespace
                const inner_ws1 = await modules.weevioValidator.email.trim("    this    at welcome!@test.com  ")
            } catch (e) {
                t.equal(
                    e.message, 
                    `Email 'this    at welcome!@test.com' contains space(s) within. Remove all whitespace.`,
                    `Email Validator v1 - Email 'this    at welcome!@test.com' failed successfully.`
                )
            }
            try {
                //Trim Emails with Inner-Whitespace
                const inner_ws2 = await modules.weevioValidator.email.trim("testing inner@example.com")
            } catch (e) {
                t.equal(
                    e.message, 
                    `Email 'testing inner@example.com' contains space(s) within. Remove all whitespace.`,
                    `Email Validator v1 - Email 'testing inner@example.com' failed successfully.`
                )
            }
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
                t.equal(parallel[1], true, `Email Validator v1 - Email '${modules.sample.emails[1]}' is valid`)
                t.equal(parallel[2], true, `Email Validator v1 - Email '${modules.sample.emails[2]}' is valid`)
                t.equal(parallel[3], true, `Email Validator v1 - Email '${modules.sample.emails[3]}' is valid`)
            } catch (e) {
                t.end(e.message)
            }
            //Validate Bad Emails
            try {
                const bad_emails = await Promise.all([
                    modules.weevioValidator.email.isValid("te@#$%@gmail.com"),
                    modules.weevioValidator.email.isValid("te˙˚∆˙@test.com"),
                    modules.weevioValidator.email.isValid("∆˚¬∫@example.com"),
                    modules.weevioValidator.email.isValid("👍🏼🙃@gmail.com")
                ])
                t.equal(bad_emails[0], false, `Email Validator v1 - Email 'te@#$%@gmail.com' is not valid.`)
                t.equal(bad_emails[0], false, `Email Validator v1 - Email 'te˙˚∆˙@test.com' is not valid.`)
                t.equal(bad_emails[0], false, `Email Validator v1 - Email '∆˚¬∫@example.com' is not valid.`)
                t.equal(bad_emails[0], false, `Email Validator v1 - Email '👍🏼🙃@gmail.com' is not valid.`)
            } catch (e) {
                t.end(e.message)
            }
            t.end()
        })
    }
}
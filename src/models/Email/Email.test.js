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
                const parallel = await Promise.all([
                    modules.weevioValidator.email.isValid(modules.sample.emails[0]),
                    modules.weevioValidator.email.isValid(modules.sample.emails[1]),
                    modules.weevioValidator.email.isValid(modules.sample.emails[2]),
                    modules.weevioValidator.email.isValid(modules.sample.emails[3])
                ])
                t.equal(parallel[0], true, `Email Validator v1 - Email '${modules.sample.emails[0]}'' is valid`)
                t.equal(parallel[0], true, `Email Validator v1 - Email '${modules.sample.emails[1]}'' is valid`)
                t.equal(parallel[0], true, `Email Validator v1 - Email '${modules.sample.emails[2]}'' is valid`)
                t.equal(parallel[0], true, `Email Validator v1 - Email '${modules.sample.emails[3]}'' is valid`)
                t.end()
            } catch (e) {
                t.end(e.message)
            }
        })
    }
}
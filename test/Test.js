//In-House Modules
const WeevioValidator = require('../dist/index').default

//Test Modules
const Email_Test = require('../dist/models/Email/Email.test').default

//Third-Party Modules
const faker = require('faker')

/** Test Class */
class Test {

    constructor() {
        //Modules
        this.assert = require('assert')
        this.test = require('tape')

        //Sample Data
        this.sample = {
            emails: null,
            emails_ws: null
        }

        this.weevioValidator = new WeevioValidator()
        this.start()
    }

    /** Preconditions Method - Gathers random sample emails. */
    preconditions() {
        return new Promise(async (resolve, reject) => {
            this.test(`Preconditions (gathers random sample emails via faker.js)`, async (t) => {
                try {
                    var samples = ['','','','']
                    var emails = samples.map(async element => {
                        return faker.internet.email()
                    })
                    var wsSamples = ['','','','']
                    var whitespaceEmails = wsSamples.map(async element => `    ${faker.internet.email()}     `)
                    this.sample.emails = await Promise.all(emails)
                    this.sample.ws_emails = await Promise.all(whitespaceEmails)
                    t.pass(`Generated random sample emails from faker.js`)
                    t.end()
                    resolve()
                } catch (err) {
                    console.error(err)
                    const msg = `Failed to generate random sample emails via faker.js...`
                    t.end(msg)
                    reject(msg)
                }
            })
        })
    }

    async start() {
        try {
            //Get the required sample data
            await this.preconditions()

            //Then, run tests...
            new Email_Test(this)
        } catch (err) {
            console.error(err)
        }
    }
}

new Test()

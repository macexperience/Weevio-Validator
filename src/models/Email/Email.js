//In-House Modules
import WeevioValidator from '../WeevioValidator/WeevioValidator'

//Third-Party Modules
import validator from 'validator'

/** Email Class */
class Email extends WeevioValidator {

    constructor() {
        super()
    }

    /** isEmail
     * @version 1.0
     * @param {String} email - Email to be validated
     * @returns {Boolean}
     */
    isValid(email) {
        this.method = "email.isValid"
        return new Promise(async (resolve, reject) => {
            try {
                const trimmed = await this.trim(email);
                resolve(validator.isEmail(trimmed))
            } catch (err) {
                console.log(err)
                reject(err)
            }
        })
    }
    
    /** Trim Email
     * @version 1.0
     * @param {String} email - Email to trim
     */
    trim(email) {
        this.method = "email.trim"
        return new Promise((resolve, reject) => {
            try {
                const outerTrim = email.trimLeft().trimRight()
                //Look for internal whitespace
                if (outerTrim.indexOf(" ") === -1) {
                    resolve(outerTrim)
                } else {
                    reject(new Error(`Email '${outerTrim}' contains space(s) within. Remove all whitespace.`))
                }
            } catch (e) {
                reject(e)
            }
        })
    }
}

export default Email
//Third-Party Modules
import validator from 'validator'

/** Email Class */
class Email {
    /** isEmail
     * @version 1.0
     * @param {String} emailS - Email to be validated
     * @returns {Boolean}
     */
    isValid(email) {
        this.method = "email.isEmail"
        return new Promise((resolve, reject) => {
            try {
                resolve(validator.isEmail(email))
            } catch (err) {
                reject(err)
            }
        })
    }
}

export default Email
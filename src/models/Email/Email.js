//Third-Party Modules
import validator from 'validator'

/** Email Class */
class Email {
    /** isEmail
     * @version 1.0
     * @param {String} emailStr - Email to be validated
     * @returns {Boolean}
     */
    isEmail(emailStr) {
        this.method = "email.isEmail"
        return new Promise((resolve, reject) => {
            try {
                resolve(validator.isEmail(emailStr))
            } catch (err) {
                reject(err)
            }
        })
    }
}

export default Email;
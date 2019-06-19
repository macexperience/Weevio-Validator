//Third-Party Modules
import validator from 'validator'

/** Email Class */
class Email {
    /** isEmail
     * @version 1.0
     * @param {String} email - Email to be validated
     * @returns {Boolean}
     */
    isValid(email) {
        this.method = "email.isEmail"
        return new Promise(async (resolve, reject) => {
            try {
                const trimmed = await this.trim(email);
                resolve(validator.isEmail(trimmed))
            } catch (err) {
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
                resolve(
                    email.trimLeft().trimRight()
                )
            } catch (e) {
                reject(e)
            }
        })
    }
}

export default Email
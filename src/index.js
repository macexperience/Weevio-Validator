//Third-Party Modules
import "core-js/shim";
import "regenerator-runtime/runtime";

//In-House Modules
import WeevioValidator from './models/WeevioValidator/WeevioValidator'
import Email from './models/Email/Email'

export default class Index {
    constructor() {
        return {
            weevioValidator: new WeevioValidator(),
            email: new Email()
        }
    }
}
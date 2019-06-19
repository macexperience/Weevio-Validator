//Third-Party Modules
import "core-js/shim";
import "regenerator-runtime/runtime";

//In-House Modules
import Email from './models/Email/Email';

export default class Index {
    constructor() {
        return {
            email: new Email()
        }
    }
}
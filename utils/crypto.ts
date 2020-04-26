'use strict';
import uuidv4 from 'uuid/v4';
import crypto from 'crypto';


class Crypto {
    /**
     * generates random string of characters i.e salt
     * @function
     * @param {number} length - Length of the random string.
     */
    genRandomString(length: number){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
    };

    /**
     * hash password with sha512.
     * @function
     * @param {string} password - List of required fields.
     * @param {string} salt - Data to be validated.
     */
    async sha512 (password: string, salt: string ){
        var hash = await crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        await hash.update(password);
        var value = hash.digest('hex');
        return {
            salt:salt,
            hash:value
        };
    };

    async saltHashPassword(userpassword: string) {
        var salt = this.genRandomString(16); /** Gives us salt of length 16 */
        var passwordData = await this.sha512(userpassword, salt);
        return passwordData
    }

    async compare(myPlaintextPassword: string, hash: any) {
        var { salt, encryptedPassword } = hash;
        let password =  await this.sha512(salt, myPlaintextPassword );
        return password.hash === encryptedPassword;
    };

    UUID() {
        return uuidv4();
    };
}
export default new Crypto();
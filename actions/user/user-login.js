
const { UserRepository } = require('../../repository/user');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || 3;

class UserLogin {
    constructor(phone_number, password, tenant) {
        this.phone_number = phone_number;
        this.password = password;
        this.tenant = 'basis';
        this.user_detail = {};
        this.payload = {};
    }
    async execute() {
        try {
            let userRepo = new UserRepository();
            const user_detail = await userRepo.getUserWithPassword(this.phone_number);
            if (!user_detail) throw new Error('Invalid email or password');
            this.user_detail = user_detail;

            if (this.validatePassword()) {
                return this.formulateTokenResponse()
            }
            else {
                throw new Error('Invalid email or password')
            }
        } catch (error) {
            throw error;
        }
    }
    validatePassword() {
        if (this.user_detail.password === md5(this.password))
            return true;
        else
            return false;
    }
    getExpiryTime() {
        const now = new Date();
        const secondsSinceEpoch = Math.round(now.getTime() / 1000);
        return secondsSinceEpoch + TOKEN_EXPIRY * 60 * 60
    }
    formulateTokenBody() {
        this.payload.id = this.user_detail._id;
        this.payload.first_name = this.user_detail.first_name;
        this.payload.last_name = this.user_detail.last_name;
        this.payload.email = this.user_detail.email;
        this.payload.phone_number = this.user_detail.phone_number;
        this.payload.tenant = this.tenant;
        this.payload.expires = this.getExpiryTime()
    }
    generateToken() {
        this.formulateTokenBody();
        const token = jwt.sign(this.payload, process.env.secret || 'jwt_secret_key', { expiresIn: TOKEN_EXPIRY * 60 * 60 });
        return token
    }
    formulateTokenResponse() {
        return {
            "token": this.generateToken(),
            "realname": this.payload.first_name,
            "userid": this.payload.id
        }
    }
}

exports.UserLogin = UserLogin;
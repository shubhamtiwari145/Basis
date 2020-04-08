class Principal {
    constructor(payload, token)
    {
        this.thetokenInfo = payload;
        this.thetoken = token;
    }

    get tokenInfo() {
        return this.thetokenInfo;
    }

    get token() {
        return this.thetoken;
    }

}

exports.Principal = Principal;
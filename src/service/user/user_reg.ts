import Service from '../index';
class UserRegService extends Service {
    constructor() {
        super();
    }
    async isReg(username: string) {
        let count = null;
        try {
            count = await this.db.count('cms_user', {
                condition: {
                    username: username
                }
            });
        } catch (error) {}
        return count > 0;
    }
    async userReg(username: any, password: any, email: any, client_info: any) {
        password = this.plugins.createCrypto(password);
        const uid = this.plugins.getUuid();
        let location, ip;
        const res = await this.plugins.getClientIp()
        if (res) {
            location = res.location
            ip = res.ip
        }
        return await this.db.insert('cms_user', {
            uid,
            username,
            password,
            client_info: client_info,
            client_ip: ip,
            email,
            location
        });
    }
}
export default new UserRegService();

import Service from '../index';
class ArticleAddService extends Service {
    constructor() {
        super();
    }
    async getUserInfo(username: any) {
        return await this.db.findOne('cms_user', { username });
    }
    /**
     * @description 比较密码是否一致
     * @param {string} password 密码
     * @param {string} resPassword 加密密码
     * @returns 返回true or false
     */
    async checkUserLogin(username: string, password: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const result: any = await this.getUserInfo(username);
                if (result && result.uid) {
                    const isRight = this.plugins.checkCrypto(
                        password,
                        result.password
                    );
                    if (isRight) {
                        const token = this.plugins.enCodeToken({
                            uid: result.uid
                        });
                        resolve({ ...result, token });
                    } else {
                        reject(isRight);
                    }
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}
export default new ArticleAddService();

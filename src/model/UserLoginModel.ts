export default class UserLoginModel {

    /* 用户id */
    private uid: string;

    /* 用户名 */
    private username: string;

    /* 是否是管理员 */
    private is_admin: boolean;

    /* token */
    private token: string;

    constructor(data: any) {
        this.uid = data.uid;
        this.username = data.username;
        this.is_admin = data.is_admin === 1;
        this.token = data.token;
    }
}

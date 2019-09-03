import Service from '../index'
class FriendLinkService extends Service {
    constructor() {
        super()
    }
    async getList() {
        //查询数据库数量
        const sql = `SELECT ??,??,?? from ??`
        let data = await this.db.query(sql, ['id','name','link','cms_friendlink'])
        return {
            data
        }
    }
}
export default new FriendLinkService()

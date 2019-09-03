import Service from '../index'
class ArticleAddService extends Service {
    constructor() {
        super()
    }
    async getList() {
        //查询数据库数量
        let count = await this.db.count('cms_tag')
        const sql = `SELECT tag_name from ??`
        let data = await this.db.query(sql, 'cms_tag')
        if(data && data.length){
            data = data.map((item:any)=>item.tag_name);
        }
        return {
            data,
            count
        }
    }
}
export default new ArticleAddService()

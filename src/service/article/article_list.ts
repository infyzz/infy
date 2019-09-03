import Service from '../index';
class ArticleAddService extends Service {
    constructor() {
        super();
    }
    async getList(skip: number, limit: number) {
        //查询数据库数量
        let count = await this.db.count('cms_post');
        console.log(count);
        const sql = `
            SELECT
                a.id,
                a.title,
                a.intro,
                a.views,
                a.is_top,
                b.path pic,
                DATE_FORMAT(a.create_time,'%Y-%m-%d') create_time
            FROM
                ?? a,
                ?? b
            WHERE
                a.pid = b.id
            ORDER BY
                a.create_time DESC
            LIMIT
                ?,?
        `;
        if (count / limit < skip / limit) skip = 0;
        let data = await this.db.query(sql, [
            'cms_post',
            'cms_upload',
            skip,
            limit
        ]);
        return {
            data,
            count
        };
    }
}
export default new ArticleAddService();

import Service from '../index';
class ArticleAddService extends Service {
    response: any;
    uid: string;
    constructor() {
        super();
        this.uid = '';
        this.response = {
            0: {
                status: 0,
                msg: '新增失败'
            },
            1: {
                status: 1,
                msg: '新增成功'
            },
            3: {
                status: 1,
                msg: '修改成功'
            },
            4: {
                status: 0,
                msg: '文章不存在'
            },
            5: {
                status: 0,
                msg: '文章标题必须在5-25位'
            },
            6: {
                status: 0,
                msg: '文章内容不能少于5位'
            }
        };
    }
    setUid(uid: string) {
        this.uid = uid;
    }
    getUid(){
        return this.uid
    }
    checkData({ title = '', content = '' }) {
        if (!this.validator.isLength(title, { min: 5, max: 20 })) {
            return this.response[5];
        }
        if (!this.validator.isLength(content, { min: 5 })) {
            return this.response[6];
        }
        return true;
    }
    async saveTags(tags = []) {
        let tagsId = [];
        for (const tag_name of tags) {
            try {
                let count = await this.db.count('cms_tag', {
                    condition: tag_name
                });
                if (count === 0) {
                    const tag_id = this.plugins.getUuid();
                    await this.db.insert('cms_tag', { tag_name, tag_id });
                    tagsId.push(tag_id);
                } else {
                    const result = await this.db.findOne('cms_tag', {
                        tag_name
                    });
                    let tag_id = null;
                    if (result) {
                        //@ts-ignore
                        tag_id = result.tag_id;
                    }
                    tagsId.push(tag_id);
                    await this.db.query(
                        `UPDATE cms_tag SET tag_count=tag_count+'1' WHERE ?`,
                        { tag_name }
                    );
                }
            } catch (error) {
                tagsId.push(null);
            }
        }
        return tagsId;
    }
    async saveArticle({ title, content, intro, tags, pid }: any) {
        const id = this.plugins.getUuid();
        return await this.db.insert('cms_post', {
            id,
            uid: this.uid,
            title,
            content,
            intro,
            tags,
            pid
        });
    }
}
export default new ArticleAddService();

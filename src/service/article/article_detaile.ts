import Service from '../index'
import { IArticleDetaile } from '../../@types/IArticle'
const toc = require('markdown-toc')
class ArticleAddService extends Service {
    private _id: string
    constructor() {
        super()
        this._id = ''
    }
    set id(id: string) {
        this._id = id
    }
    get id() {
        return this._id
    }
    viewsIncrease() {
        this.db.query(`UPDATE cms_post SET views=views+'1' WHERE ?`, {
            id: this._id
        })
    }
    async getDetailes() {
        const id = this.id
        try {
            let result = (await this.db.findOne('cms_post', { id })) as IArticleDetaile
            if (result) {
                this.viewsIncrease()
                result.views++
                result.create_time = this.monent(result.create_time).format('YYYY-MM-DD')
                result.toc = toc(result.content).content
            }
            return result
        } catch (e) {
            return null
        }
    }
    validate(id: string) {
        return this.validator.isUUID(id)
    }
}
export default new ArticleAddService()

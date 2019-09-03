import Service from '../index';
import Qiniu from '../../utils/Qiniu';
class uploadService extends Service {
    uid: null | string;
    constructor() {
        super();
        this.uid = null;
    }
    setUid(uid: null) {
        this.uid = uid;
    }
    /**
     * @param type {number} 类型 1 图片 2文件
     */
    async getUploadList(type: number) {
        return await this.db.query(`SELECT * from cms_upload where ?`, {
            uid: this.uid
        });
    }
}
export default new uploadService();

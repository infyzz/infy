import Service from '../index';
import Qiniu from '../../utils/Qiniu';
class uploadService extends Service {
    uid: null;
    uploadpath: never[];
    files: any;
    qiniu: Qiniu;
    constructor() {
        super();
        this.uid = null;
        this.uploadpath = [];
        this.files = [];
        this.qiniu = new Qiniu();
    }
    getUUID() {
        return this.plugins.getUuid();
    }
    setUid(uid: null) {
        this.uid = uid;
    }
    setFiles(files: never[] | {}) {
        this.files = files;
    }
    setUploadpath(uploadpath: never[]) {
        this.uploadpath = uploadpath;
    }
    getUpdateData() {
        let updateData: any[] = [];
        if (Array.isArray(this.files)) {
            this.files.forEach((item, index) => {
                updateData.push([
                    this.getUUID(),
                    this.uid,
                    item.size,
                    item.type,
                    item.name,
                    this.uploadpath[index]
                ]);
            });
        } else {
            updateData.push([
                this.getUUID(),
                this.uid,
                this.files.size,
                this.files.type,
                this.files.name,
                this.uploadpath[0]
            ]);
        }
        return updateData;
    }
    /**
     * 保存文件信息
     * @return {Promise} 返回保存状态
     * */
    saveFile() {
        return new Promise(async (resolve, reject) => {
            const updateColnum = [
                ['id', 'uid', 'size', 'mimeType', 'sourceName', 'path']
            ];
            const updateData = this.getUpdateData();
            const result: any = await this.db.query(
                `INSERT into cms_upload (??) values ?`,
                [updateColnum, updateData]
            );
            let resData: any[] = [];
            if (result.affectedRows > 0) {
                for (let i = 0; i < updateData.length; i++) {
                    resData[i] = {};
                    for (let j = 0; j < updateColnum[0].length; j++) {
                        resData[i][updateColnum[0][j]] = updateData[i][j];
                    }
                }
            }
            resolve(resData);
        });
    }
    upToQiniu() {
        /* 上传到七牛云 */
        if (Array.isArray(this.files)) {
            let filesTask = [];
            for (let i = 0; i < this.files.length; i++) {
                filesTask.push(
                    this.qiniu.uploadFile(this.files[i], this.uploadpath[i])
                );
            }
            return Promise.all(filesTask);
        } else {
            return this.qiniu.uploadFile(this.files, this.uploadpath[0]);
        }
    }
}
export default new uploadService();

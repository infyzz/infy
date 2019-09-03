import qiniu from 'qiniu';
const { QINIU_BUCKET, QINIU_ACCESS_KEY, QINIU_SECRET_KEY } = process.env;
class QiniuUpload {
    constructor() {
        qiniu.conf.ACCESS_KEY = QINIU_ACCESS_KEY || '';
        qiniu.conf.SECRET_KEY = QINIU_SECRET_KEY || '';
    }
    //构建上传策略函数 生成上传 Token
    uptoken() {
        var mac = new qiniu.auth.digest.Mac(QINIU_ACCESS_KEY, QINIU_SECRET_KEY);
        var options = {
            scope: QINIU_BUCKET
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        return putPolicy.uploadToken(mac);
    }
    uploadFile(files: any, name: string) {
        return new Promise((resolve, reject) => {
            const token = this.uptoken();
            const config: any = new qiniu.conf.Config();
            config.zone = qiniu.zone.Zone_z0;
            const formUploader = new qiniu.form_up.FormUploader(config);
            const putExtra = new qiniu.form_up.PutExtra();
            const localFile = files.path;
            const key = name;
            // 文件上传
            formUploader.putFile(
                token,
                key,
                localFile,
                putExtra,
                (respErr, respBody, respInfo) => {
                    if (respErr) {
                        reject(respErr);
                    }
                    if (respInfo.statusCode === 200) {
                        resolve({ respInfo, respBody });
                    } else {
                        reject(respInfo);
                    }
                }
            );
        });
    }
}

export default QiniuUpload;

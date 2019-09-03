import moment from 'moment';
export default class UploadListModel {
    /* 用户id */
    private id: string;
    private size: string;
    private created_time: string;
    private path: string;

    /* 用户名 */
    private update_time: string;

    /* 是否是管理员 */
    private mimeType: boolean;

    /* token */
    private sourceName: string;

    constructor(data: any) {
        this.id = data.id;
        this.sourceName = data.sourceName;
        this.size = data.size/ 1000 +'KB';
        this.mimeType = data.mimeType;
        this.sourceName = data.sourceName;
        this.path = data.path;
        this.created_time = moment().format('YYYY-MM-DD hh:mm:ss');
        this.update_time = moment().format('YYYY-MM-DD hh:mm:ss');
    }
}

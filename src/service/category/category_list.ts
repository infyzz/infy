import Service from '../index';
class ArticleAddService extends Service {
    constructor() {
        super();
    }
    async getCategoryList():Promise<any> {
        let result = await this.db.find({
            table:"cms_classify"
        });
        let newList:any;
        result.forEach((element: { root_id: number; }) => {
            if (element.root_id > 0) {
                newList.forEach((item:any) => {
                    if (item.id == element.root_id) {
                        if (!item.children) item.children = [];
                        item.children.push(element);
                    }
                });
            } else {
                newList.push(element);
            }
        });
        return newList;
    }
}
export default new ArticleAddService();

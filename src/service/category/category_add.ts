import Service from '../index';
class ArticleAddService extends Service {
    constructor() {
        super();
    }
    async getCategoryList() {
        let result = await this.db.find({
            table:"cms_classify"
        });
        let id = result.map((item: { id: any; }) => ({
            id: item.id
        }));
        let newList:any[] =[] ;
        result.forEach((element: { root_id: number; }) => {
            if (element.root_id > 0) {
                newList.forEach((item: { id: any; children: any[]; }) => {
                    if (item.id === element.root_id) {
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

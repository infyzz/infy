/**
* author: zhaopeng
* date: 2018-01-01 21:35:37
* @api {GET} /article/list 更新文章
* @apiDescription 更新文章
* @apiName article_list2
* @apiParam (list) {Number} page 默认为1
* @apiParam (list) {Number} pagenum 默认为10
* @apiHeader {String} [token] 用户token
* @apiSampleRequest /article/list
* @apiGroup article
* @apiVersion 1.0.0
*/
import { isLength, isEmpty } from 'validator';
import Koa from 'koa';
const response = {
    0: {
        status: 0,
        msg: "新增失败"
    },
    1: {
        status: 1,
        msg: "新增成功"
    },
    3: {
        status: 1,
        msg: "修改成功"
    },
    4: {
        status: 0,
        msg: "文章不存在"
    },
    5: {
        status: 0,
        msg: "文章标题必须在5-20位"
    },
    6: {
        status: 0,
        msg: "文章内容不能少于5位"
    }
}
import ControllerConfig from '../../@types/Controller';
class Controller {
    config: ControllerConfig = {
        method: 'GET',
        path: '/article/update',
        middleware: []
    };
    async controller(ctx: Koa.Context) {
        /* let { id: _id, title, content, tags } = req.body
		let uid = req.userInfo._id
		if (title) {
			if (!isLength(title, { min: 5, max: 20 })) {
				return res.json(response[5])
			}
		} else {
			return res.json(response[5])
		}
		if (content) {
			if (!isLength(content, { min: 5 })) {
				return res.json(response[6])
			}
		} else {
			return res.json(response[6])
		}
		// 存储tag到数据库
		let tagId = await SaveTags(tags)
		try {
			const result = await Article.findByIdAndUpdate({ _id }, { title, content, tags })
			return res.json(response[3])
		} catch (error) {
			return res.json(response[4])
		} */
    }
};
export default new Controller();
// function SaveTags(tags) {
//     try {
//         let tagArr = tags.split(',')
//         if (!tags) return
//         return new Promise(async (resolve, reject) => {
//             let tagId = []
//             for (const item of tagArr) {
//                 let result = await Tag.findOne({ tag_name: item })
//                 if (result) {
//                     tagId.push(result._id)
//                 } else {
//                     let tag = await new Tag({
//                         tag_name: item
//                     }).save((err, update) => Promise.resolve(update))
//                     tagId.push(tag._id)
//                 }
//             }
//             resolve(tagId)
//         })
//     } catch (error) {
//         return null
//     }
// }

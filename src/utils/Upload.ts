import fs = require('fs');
export const getUploadDirName = (): string => {
    const date = new Date();
    let month: string = String(Number.parseInt(String(date.getMonth())) + 1);
    month = month.length > 1 ? month : `0${month}`;
    return `${date.getFullYear()}${month}${date.getDate()}`;
};

/**
 * @description 判断文件夹是否存在 如果不存在则创建文件夹
 */
export const checkDirExist = (p: string): void => {
    if (!fs.existsSync(p)) {
        
        fs.mkdirSync(p);
    }
};

export const getUploadFileName = (ext: string): string => {
    // @ts-ignore
    return `${Date.now()}${Number.parseInt(Math.random() * 10000)}.${ext}`;
};

/**
 * @description 判断文件夹是否存在 如果不存在则创建文件夹
 */
export const getUploadFileExt = (name: string): string => {
    let ext = name.split(".");
    return ext[ext.length - 1];
};

// 生成唯一的uuid保存至localStorage
import { v4 as uuidv4 } from 'uuid';

export const getUUID = function() {
    let UUID = uuidv4()
    if (!localStorage.getItem('UUID')) {
        localStorage.setItem('UUID', UUID)
    }
    return localStorage.getItem('UUID')
}

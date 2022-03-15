import Mock from 'mockjs'; // 引入mockjs
import banner from './banner.json'; // 引入数据
import floor from './floor.json';

Mock.mock('/mock/banner',{code:200,data:banner}) // 使用假数据
Mock.mock('/mock/floor',{code:200,data:floor})

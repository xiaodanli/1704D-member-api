/*
 * @Author: 李晓丹 
 * @Date: 2019-10-15 11:42:09 
 * @Last Modified by: 李晓丹
 * @Last Modified time: 2019-10-15 11:53:55
 */

const router = require('koa-router')();

const query = require('../db/query');

//查询成员列表
router.get('/userlist',async ctx => {
    // connect.query(sql语句,(error,data) => {})  异步
    let res = await query('select * from userlist');
    ctx.body = res
})


//添加成员接口 insert into <表名> (字段1，字段2，字段3...) values (?,?,?...)

router.post('/api/add',async ctx => {
    //排重
    let {username,age,phone,address} = ctx.request.body;
    let res = await query('insert into userlist (username,age,phone,address) values (?,?,?,?)',[username,age,phone,address]);

    if(res.msg === 'error'){
        ctx.body = '添加失败'
    }else{
        ctx.body = '添加成功'
    }
})
module.exports = router;

// select * from userlist where idCard=?   [{}]     
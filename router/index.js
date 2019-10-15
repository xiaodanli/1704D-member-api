/*
 * @Author: 李晓丹 
 * @Date: 2019-10-15 11:42:09 
 * @Last Modified by: 李晓丹
 * @Last Modified time: 2019-10-15 15:47:57
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

    let {username,age,phone,address,idCard} = ctx.request.body;

    if(!username || !age || !phone || !address || !idCard){
        return ctx.body = {code:3,msg:'参数缺少'}
    }

    //排重

    let selectData = await query('select * from userlist where idCard=?',[idCard])  //[{}]

    console.log(selectData)

    if(selectData.data.length){
        //存在
        ctx.body = {code:2,msg:'此人已存在'}
    }else{
        //不存在
        let res = await query('insert into userlist (username,age,phone,address,idCard) values (?,?,?,?,?)',[username,age,phone,address,idCard]);
    

        if(res.msg === 'error'){
            ctx.body = {code:0,msg:'添加失败'}
        }else{
            ctx.body = {code:1,msg:'添加成功'}
        }
    } 
})

//删除成员 delete from userlist where id=?

router.get('/api/del',async ctx => {
    let {id} = ctx.query;
    let res = query('delete from userlist where id=?',[id]);

    if(res.msg === 'error'){
        ctx.body = {code:0,msg:'删除失败'}
    }else{
        ctx.body = {code:1,msg:'删除成功'}
    }
})

//修改成员信息
router.post('/api/update',async ctx => {
    let {username,age,phone,address,idCard,id} = ctx.request.body;

    if(!username || !age || !phone || !address || !idCard || !id){
        return ctx.body = {code:3,msg:'参数缺少'}
    }

    let sql = 'update userlist u set u.username=?,u.age=?,u.phone=?,u.address=?,u.idCard=? where id=?';

    let res = await query(sql,[username,age,phone,address,idCard,id]);
    if(res.msg === 'error'){
        ctx.body = {code:0,msg:'修改失败'}
    }else{
        ctx.body = {code:1,msg:'修改成功'}
    }
})

module.exports = router;

// select * from userlist where idCard=?   [{}]     


// 查询  select * from <表名> where 字段名=?

// 删除 delete from <表名> where 字段名=?

// 插入 insert into <表名> (字段1，字段2,...) values (?,?....)

// 修改 update <表名> <别名> set 别名.字段名1=?,别名.字段名2=?  where 字段名=?
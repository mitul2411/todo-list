var mysql = require('mysql');
var express = require('express');
var bodyparser = require('body-parser');


var app = express();


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tudu_list"
});


connection.connect();

app.use(bodyparser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');


app.get('/admin', function (req, res) {
    var select = "select * from admin ";
    connection.query(select, function (error, result, index) {
        if (error) throw error;
        res.render('admin', { result });
    })
});




app.get('/userdash', function (req, res) {
    var select = "select * from task";
    connection.query(select, function (error, results, index) {
        if (error) throw error;
        res.render('userdash', { results });
    })
});

app.get('/status/:role/:id',function(req,res){
    var status=req.params.role;
    var id=req.params.id;

    var query="update task set status='"+status+"' where task_id='"+id+"'";
    connection.query(query, function (error, results, index) {
        if (error) throw error;
        res.redirect('/userdash');
    })
});
app.get('/viewtask',function(req,res){
    var select = "select * from task";
    connection.query(select, function (error, results, index) {
        if (error) throw error;
        res.render('viewtask', { results });
    })
});





app.get('/admindash', function (req, res) {
    var select = "select * from  admin";
    connection.query(select, function (error, result, index) {
        if (error) throw error;
        res.render('admindash', { result });
    })
});

app.post('/admin', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    var select = "select *from admin where email='" + email + "'and password='" + password + "'";
    connection.query(select, function (error, result, index) {
        if (error) throw error;
        if (result.length != 0) {
            res.redirect('/admindash');
        }
        else {
            res.redirect('/admin');
        }
    })
});
app.get('/userreg', function (req, res) {
    var select = "select * from  user";
    connection.query(select, function (error, result, index) {
        if (error) throw error;
        res.render('userreg', { result });
    })
});
app.post('/userreg',function(req,res){
    var name=req.body.name;
    var email=req.body.email;
    var password=req.body.password;

    var insert="insert into user (name,email,password) values ('"+name+"','"+email+"','"+password+"')";

    connection.query(insert, function (error, results, field) {
        if (error) throw error;
        res.redirect('/userreg');
    })
});
app.get('/userlogin', function (req, res) {
    var select = "select * from user ";
    connection.query(select, function (error, results, index) {
        if (error) throw error;
        res.render('userlogin', { results });
    })
});


app.post('/userlogin', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    var select = "select *from user where email='" + email + "'and password='" + password + "'";
    connection.query(select, function (error, results, index) {
        if (error) throw error;
        if (results.length != 0) {
            res.redirect('/userdash');
        }
        else {
            res.redirect('/userlogin');
        }
    })
});
app.get('/mangeuser', function (req, res) {
    var select = "select *from user";
    connection.query(select, function (error, results, field) {
        if (error) throw error;
        res.render('mangeuser', { results });
    })
});
app.get('/mangeuser/delete/:id', function (req, res) {
    var id = req.params.id;
    var aos = "delete from user where user_id = '" + id + "'";
    connection.query(aos, function (error, results, field) {
        if (error) throw error;
        res.redirect('/mangeuser');
    })
});
app.get('/mangeuser/updateuser/:id', function (req, res) {
    var id = req.params.id;
    var select = "select * from user  where user_id='" + id + "'";
    connection.query(select, function (error, results, field) {
        if (error) throw error;
        res.render('updateuser', { results });
    })
});
app.post('/mangeuser/updateuser/:id', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var id = req.params.id;

    var update = "update user set name='" + name + "',email='" + email + "',password='" + password + "' where user_id='" + id + "' ";
    connection.query(update, function (error, results, index) {
        if (error) throw error;
        res.redirect('/mangeuser');
    })
});
app.get('/addtask', function (req, res) {
    var select = "select *from user";
    connection.query(select, function (error, results, field) {
        if (error) throw error;
        res.render('addtask', { results });
    })
});
app.post('/addtask',function(req,res){
    var task_name=req.body.task_name;
    var id=req.body.id;

    var insert="insert into task (task_name,task_user) values ('"+task_name+"','"+id+"')";
    connection.query(insert, function (error, results, field) {
        if (error) throw error;
        res.redirect('addtask');
    })
});
app.get('/mangetask',function(req,res){
    var select="select * from task";
    connection.query(select, function (error, results, field) {
        if (error) throw error;
        res.render('mangetask', { results });
    })
});
app.get('/mangetask/delete/:id', function (req, res) {
    var id = req.params.id;
    var aos = "delete from task where task_id = '" + id + "'";
    connection.query(aos, function (error, results, field) {
        if (error) throw error;
        res.redirect('/mangetask');
    })
});
app.get('/mangetask/updatetask/:id', function (req, res) {
    var id = req.params.id;
    var select = "select * from task  where task_id='" + id + "'";
    connection.query(select, function (error, results, field) {
        if (error) throw error;
        res.render('updatetask', { results });
    })
});
app.post('/mangetask/updatetask/:id', function (req, res) {
    var task_name = req.body.task_name;
    var task_user = req.body.task_user;
    var status = req.body.status;
    var id = req.params.id;

    var update = "update task set task_name='" + task_name + "',task_user='" + task_user + "',status='" + status + "' where task_id='" + id + "' ";
    connection.query(update, function (error, results, index) {
        if (error) throw error;
        res.redirect('/mangetask');
    })
});

app.get('/userdash', function (req, res) {
    var select = "select  task.*,user.* from task join user on task.task_user=user.user_id ";
    connection.query(select, function (error, results, index) {
        if (error) throw error;
        res.render('userdash', { results });
    })
});

 
app.listen(3000);   

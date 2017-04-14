/**
 * Created by hyochan on 12/12/15.
 * https://github.com/mscdex/node-mariasql
 * for window : npm install -g -production window-build-tools
 */
const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    // socketPath : '/opt/local/var/run/mysql56/mysqld.sock',
    user : 'root',
    port : '3306',
    password : 'your_password',
    database : 'your_db',
    multipleStatements : true
});

const
    userTable = 'users'
;

connection.query('DROP TABLE IF EXISTS ' + userTable);

connection.query('CREATE TABLE ' + userTable + '(' +
    '_id CHAR(36), ' +
    'email VARCHAR(255) NOT NULL UNIQUE, ' +
    'pw VARCHAR(255) NOT NULL, ' +
    'nickname VARCHAR(255), ' + // 한글 1자당 utf8일 떄는 3바이트씩
    'created timestamp, ' +
    'updated timestamp, ' +
    'primary key(email),' +
    'index(_id)' +
    ')'
);

connection.end();

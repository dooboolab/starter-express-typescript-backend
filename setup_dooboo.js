/**
 * Created by hyochan on 12/12/15.
 * https://github.com/mscdex/node-mariasql
 * for window : npm install -g -production window-build-tools
 */
const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    // socketPath : '/opt/local/var/run/mysql56/mysqld.sock',
    user : 'hyochan',
    port : '3306',
    password : 'tltlqlql87!',
    database : 'dooboo',
    multipleStatements : true
});

const
    emailLeftTable = 'email_left'
;

connection.query('DROP TABLE IF EXISTS ' + emailLeftTable);

connection.query('CREATE TABLE ' + emailLeftTable + '(' +
    '_id INTEGER AUTO_INCREMENT, ' +
    'email VARCHAR(255) NOT NULL, ' +
    'created timestamp, ' +
    'updated timestamp, ' +
    'primary key(_id), ' +
    'index (email) ' +
    ')'
);

connection.end();

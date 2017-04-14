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
    database : 'swpswp',
    multipleStatements : true
});

const
    userTable = 'users',
    findPwTable = 'find_pw',
    locationTable = 'locations',
    imageTable = "images",
    tradeTable = "trades",
    voteTable = "votes",
    chatRoomTable = "chatrooms",
    chatTable = "chats",
    itemTable = "items"
;

connection.query('DROP TABLE IF EXISTS ' + chatTable);
connection.query('DROP TABLE IF EXISTS ' + chatRoomTable);
connection.query('DROP TABLE IF EXISTS ' + tradeTable);
connection.query('DROP TABLE IF EXISTS ' + imageTable);
connection.query('DROP TABLE IF EXISTS ' + voteTable);
connection.query('DROP TABLE IF EXISTS ' + itemTable);
connection.query('DROP TABLE IF EXISTS ' + findPwTable);
connection.query('DROP TABLE IF EXISTS ' + locationTable);
connection.query('DROP TABLE IF EXISTS ' + userTable);

connection.query('CREATE TABLE ' + userTable + '(' +
    '_id CHAR(36), ' +
    'email VARCHAR(255) NOT NULL UNIQUE, ' +
    'pw VARCHAR(255) NOT NULL, ' +
    'nickname VARCHAR(255), ' + // 한글 1자당 utf8일 떄는 3바이트씩
    'first_name VARCHAR(255), ' +
    'last_name VARCHAR(255), ' +
    'photo VARCHAR(255), ' +
    'locale VARCHAR(100), ' +
    'social VARCHAR(255), ' +
    'first_service VARCHAR(255), ' +
    'authenticated TINYINT(1), ' + 
    'withdraw TINYINT(1), ' + 
    'created timestamp, ' +
    'updated timestamp, ' +
    'primary key(email),' +
    'index(_id)' +
    ')'
);
connection.query('CREATE TABLE ' + findPwTable + '(' +
    '_id INTEGER AUTO_INCREMENT, ' +
    'user_id CHAR(36) NOT NULL UNIQUE, ' +
    'url TEXT, ' +
    'created timestamp, ' +
    'updated timestamp, ' +
    'primary key(_id), ' +
    'foreign key (user_id) REFERENCES ' + userTable + ' (_id)' +
    ')'
);

connection.query('CREATE TABLE ' + locationTable + '(' +
    '_id INTEGER NOT NULL AUTO_INCREMENT, ' +
    'user_id CHAR(36) NOT NULL UNIQUE, ' +
    'lat DECIMAL(11,7) NOT NULL, ' +
    'lng DECIMAL(11,7) NOT NULL, ' +
    'primary key(_id), ' +
    'foreign key (user_id) REFERENCES ' + userTable + ' (_id)' +
    ')'
);

connection.query('CREATE TABLE ' + itemTable + '(' +
    '_id INTEGER AUTO_INCREMENT, ' +
    'user_id CHAR(36) NOT NULL, ' + 
    'title VARCHAR(255), ' +
    'description VARCHAR(255), ' + 
    'created timestamp, ' +
    'updated timestamp, ' +
    'visible tinyint(1), ' +
    'primary key(_id), ' + 
    'index(user_id), ' + 
    'foreign key (user_id) REFERENCES ' + userTable + ' (_id)' +
    ')'
);
connection.query('CREATE TABLE ' + voteTable + '(' +
    '_id INTEGER AUTO_INCREMENT, ' +
    'item_src INTEGER NOT NULL, ' +
    'item_dest INTEGER NOT NULL, ' +
    'vote tinyint(1), ' +
    'visible tinyint(1), ' +
    'created timestamp, ' +
    'updated timestamp, ' +
    'primary key(_id), ' +
    'index(item_src, item_dest)'  +
    ')'
);
connection.query('CREATE TABLE ' + imageTable + '(' +
    '_id INTEGER AUTO_INCREMENT, ' +
    'item_id INTEGER NOT NULL, ' +
    'path VARCHAR(255), ' +
    'visible tinyint(1), ' +
    'created timestamp, ' +
    'updated timestamp, ' + 
    'primary key(_id), ' +
    'foreign key (item_id) REFERENCES ' + itemTable + ' (_id)' +
    ')'
);
connection.query('CREATE TABLE ' + tradeTable + '(' +
    '_id INTEGER AUTO_INCREMENT, ' +
    'vote_id INTEGER NOT NULL, ' +
    'trade TINYINT(1), ' +
    'visible tinyint(1), ' +
    'created timestamp, ' +
    'updated timestamp, ' +
    'primary key(_id), ' +
    'index(vote_id), '  +
    'foreign key (vote_id) REFERENCES ' + voteTable + '(_id) ' +
    ')'
);
connection.query('CREATE TABLE ' + chatRoomTable + '(' +
    '_id INTEGER AUTO_INCREMENT, ' +
    'user_id CHAR(36) NOT NULL, ' +
    'type INTEGER(4), ' +
    'msg TEXT, ' +
    'visible tinyint(1), ' +
    'created timestamp, ' +
    'updated timestamp, ' +
    'primary key(_id), ' +
    'index(user_id)'  +
    ')'
);
connection.query('CREATE TABLE ' + chatTable + '(' +
    '_id INTEGER AUTO_INCREMENT, ' +
    'room_id INTEGER NOT NULL, ' +
    'user_id CHAR(36) NOT NULL, ' +
    'target_id CHAR(36) NOT NULL, ' +
    'type INTEGER(4), ' +
    'msg TEXT, ' +
    'created timestamp, ' +
    'updated timestamp, ' +
    'primary key(_id), ' +
    'foreign key (room_id) REFERENCES ' + chatRoomTable + ' (_id)' + 
    ')'
);
/*
// prepare statement example
var prep = c.prepare('SELECT * FROM users WHERE id = :id AND name = :name');

c.query(prep({ id: 1337, name: 'Frylock' }), function(err, rows) {
  if (err)
    throw err;
  console.dir(rows);
});

c.end();
*/

connection.end();

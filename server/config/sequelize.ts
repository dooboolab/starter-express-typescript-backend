import * as  Sequelize from 'sequelize';
const { STRING, BOOLEAN, INTEGER, TEXT, UUID, UUIDV1 } = Sequelize;

const myConfig = {
  database: 'your_db',
  username: 'root',
  password: 'your_password',
}

// TODO: use config
const settings = {
  database: myConfig.database,
  options: {
    define: {
      freezeTableName: true, // 이거하면 자동으로 테이블 뒤에 s 붙는거 막음.
    },
    dialect: 'mariadb',
    host: 'localhost',
    pool: {
      min: 0,
      max: 1,
      idle: 10000,
    },
  },
  password: myConfig.password,
  username: myConfig.username,
};

const { database, username, password, options } = settings;
const sequelize = new Sequelize(database, username, password, options);



const User = sequelize.define('users', {
  _id: {
    type: UUID,
    defaultValue: UUIDV1,
    allowNull: true,
  },
  email: { type: STRING, primaryKey: true },
  pw: { type: STRING },
  nickname: { type: STRING, allowNull: true },
}, {
  timestamps: true,
  createdAt: 'created',
  updatedAt: 'updated',
});

export { User, };

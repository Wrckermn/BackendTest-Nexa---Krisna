const pool = require('../../../configs/db');

module.exports = {
  loginAdmin: (username, callBack) => {
    pool.query(
      'select * from admin where username=?',
      [username],
      (error, results, fields) => {
        if(error){
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    )
  },
  saveToken: (data, callBack) => {
    pool.query(
      'insert into admin_token(id_admin, token, expired_at) values(?,?,?)',
      [
        data.id_admin,
        data.token,
        data.expired_at
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          callBack(err, null);
        } else {
          callBack(null, result);
        }
      }
    );
  }
};

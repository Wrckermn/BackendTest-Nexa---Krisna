const { compareSync } = require('bcryptjs');
const { loginAdmin, saveToken } = require('../middleware/authMiddleware');
const { sign } = require('jsonwebtoken');

module.exports = {
  loginAdm: (req, res) => {
    const body = req.body;
    loginAdmin(body.username, (err, results) => {
      if(err){
        console.log(err);
      }
      if(!results){
        return res.json({
          status: 401,
          message: "Invalid username or password"
        });
      }
      const userPassword = String(body.password); 
      const hashedPassword = String(results.password);
      const cmprpass = compareSync(userPassword, hashedPassword);
      const nexatest = "nexatest";
      if(cmprpass){
        results.password = undefined;
        const jsntoken = sign({ cmprpass: results }, nexatest, {
          expiresIn: "1h"
        });

        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 1);

        saveToken({ id_admin: results.id, token: jsntoken, expired_at: expirationTime }, (err, result) => {
          if (err) {
            console.log(err);
            return res.json({
              status: 500,
              message: "Error occurred while saving token"
            });
          }
  
          return res.json({
            status: 200,
            message: "Login successfully!!",
            token: jsntoken
          });
        });
      } else {
        return res.json({
          status: 401,
          message: "Invalid username or password"
        });
      }
    });
  }
}
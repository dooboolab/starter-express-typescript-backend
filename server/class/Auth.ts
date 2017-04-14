import jwt = require('jsonwebtoken');
import compose = require('composable-middleware');
const SECRET = 'your_secret';
const EXPIRES = 1440 * 24 * 100; // 100day

class Auth {
  // JWT 토큰 생성 함수
  public signToken (payLoad: any) {
    return jwt.sign(
      payLoad,
      SECRET, {
        algorithm : 'HS256',
        expiresIn: EXPIRES,
      },
    );
  }
  // 토큰을 해석하여 유저 정보를 얻는 함수
  public isAuthenticated() {
    return compose()
      // Validate jwt
      .use( ( req, res, next ) => {
        jwt.verify (req.headers.authorization, SECRET, (err, decoded) => {
          if (err) {
            req.err = err;
            return next();
          } else {
            req.user = {
              id: decoded.id, // 다른 정보 빼고 아이디만 보낸다
              locale: decoded.locale ? decoded.locale : 'kr',
              token: undefined,
            };
            const date: Date = new Date();
            date.setMonth(date.getMonth() - 3);
            console.log('time : ' + date.getTime() / 1000);
            console.log('exp : ' + decoded.exp);
            if (decoded.exp < date.getTime() / 1000 ) {
              // 새로운 토큰 발급
              req.user.token = this.signToken(req.user);
              console.log('new token!!!');
            }
            // console.log('id : ' + JSON.stringify(decoded));
            return next();
          }
        });
      }
    );
  }
}

export default Auth;

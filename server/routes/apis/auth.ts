import { Router } from 'express';
import sha256 = require('sha256');
import jwt = require('jsonwebtoken');
import flakeIdgen = require('flake-idgen');
import intformat = require('biguint-format');
import nodemailer = require('nodemailer');
import multer = require('multer');
import fs = require('fs');

import statusCode from '../../config/statusCode';
import Result from '../../class/Result';
import Auth from '../../class/Auth';
import Params from '../../global/params';
import { User } from '../../config/sequelize';
import myLocalize from '../../config/myLocalize';

const auth = new Auth();
const router = Router();

const onLogin = async function(req, res){
  const result = new Result();
  const email: string = req.body.email;
  const locale = req.body.locale ? req.body.locale.toString().toLowerCase() : 'kr';
  let pw: string = req.body.pw;
  if (!email || !pw) {  // email이랑 pw로 로그인한 경우
    result.message = 'req params are missing';
    result.status = statusCode.BAD_REQUEST;
    res.json(result);
    return;
  }
  try {
    pw = sha256(pw);
    const user: any = await User.findOne({ where: { email, pw, withdraw: false }, raw: true });
    if (!user) {
      console.log('user is zero');
      result.message = 'user is zero';
      result.status = statusCode.NO_CONTENT;
      // res.json(result);
      res.json(result);
      return;
    }
    const payLoad = { id: user._id };
    result.message = 'user found';
    const token = auth.signToken(payLoad);
    result.value = { token };
    console.log('result : ' + result);
    result.status = statusCode.SUCCESS;
    res.json(result);
    return;
  } catch (err) {
    result.message = err;
    result.status = statusCode.ERROR;
    res.json(result);
    return;
  }
};

const onIsAuthenticated = function(req: any, res){
  const result = new Result();
  if (!req.user) {
    result.message = 'req param token is missing';
    result.status = statusCode.BAD_REQUEST;
    res.json(result);
    return;
  }
  if (req.err) {
    result.message = req.err;
    result.status = statusCode.ERROR;
    res.json(result);
    return;
  }
  result.value = req.user;
  result.status = statusCode.SUCCESS;
  res.json(result);
  return;
};

router
  .post('/login', onLogin)
  .post('/isAuthenticated', auth.isAuthenticated(), onIsAuthenticated)
;

export default router;

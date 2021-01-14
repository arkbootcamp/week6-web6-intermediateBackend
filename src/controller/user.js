const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const helper = require('../helper/response')
const { registerUserModel, checkEmailModel } = require('../model/user')

module.exports = {
  registerUser: async (request, response) => {
    try {
      const { user_name, user_email, user_password } = request.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)
      // console.log('before Encrypt = ' + user_password)
      // console.log('after Encrypt = ' + encryptPassword)
      const setData = {
        user_name,
        user_email,
        user_password: encryptPassword,
        user_created_at: new Date()
      }
      // kondisi cek email apakah sudah ada di database ?
      const result = await registerUserModel(setData)
      return helper.response(response, 200, 'Success Register User', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body
      // proses 1 pengecekan apakah email ada di database atau tidak ?
      const checkDataUser = await checkEmailModel(user_email)
      if (checkDataUser.length > 0) {
        // proses 2 pengecekan apakah password yang dimasukan sesuai atau tidak
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkDataUser[0].user_password
        )
        if (checkPassword) {
          // proses 3 kita akan ser JWT supaya menghasilkan token
          const { user_id, user_name, user_email } = checkDataUser[0]
          const payload = {
            user_id,
            user_name,
            user_email
            // user role dan status masuk
          }
          const token = jwt.sign(payload, 'RAHASIA', { expiresIn: '3h' })
          const result = { ...payload, token }
          return helper.response(response, 200, 'Success Login !', result)
        } else {
          return helper.response(response, 400, 'Wrong Password !')
        }
      } else {
        return helper.response(response, 400, 'Email / Account not Registed !')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  forgotPassword: async (request, response) => {
    try {
      // https://myaccount.google.com/u/3/lesssecureapps?pli=1&rapt=AEjHL4PwrGKni81Ds5ZdQe2-3TSvpboyIiNBfeyflAPbZeRDOEEWFGhrGZQx3mhcbhbmLW-mW5wzigMcZ6NX3N-yvAquwjEcRA
      console.log(request.body)
      const { user_email } = request.body
      const checkDataUser = await checkEmailModel(user_email)
      if (checkDataUser.length >= 1) {
        const keys = '1234' // buat generate angka bisa 4/6 angka
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'ISI EMAIL', // generated ethereal user
            pass: 'ISI PASSWORD' // generated ethereal password
          }
        })
        const mailOptions = {
          from: '"Coffee Shop 👻" <memo.in.aja@gmail.com>', // sender address
          to: user_email, // list of receivers
          subject: 'Coffe Shop - Forgot Password', // Subject line
          html: `Your Code is <b>${keys}</b>` // html body
          // html: `<a href="http://localhost:8080/changePassword?keys=${keys}">Click Here To Change Password</a>`,
        }
        await transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
            return helper.response(response, 400, 'Email not send !')
          } else {
            console.log(info)
            return helper.response(response, 200, 'Email has been send !')
          }
        })
      } else {
        return helper.response(response, 400, 'Email / Account not Registed !')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

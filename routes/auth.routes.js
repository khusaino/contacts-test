const {Router} = require('express')
const bcrypt = require('bcryptjs') // шифрование
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

//  /api/auth/register
router.post(
  '/register', 
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'минимальная длина пароля 6 символов').isLength({min:6}),
    check('firstName', 'введите имя'),
    check('lastName', 'введите фамилию'),
  ],
  async (req, res)=>{
  try {
    const errors = validationResult(req)  

    if(!errors.isEmpty()){
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при регистрации',
      })
    }

    const {email, password, firstName, lastName} = req.body

    const candidate = await User.findOne({ email })

    if(candidate){
      return res.status(400).json({message: 'пользоатель c таким email уже существует'})
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User ({email, password: hashedPassword, firstName, lastName})

    await user.save()

    res.status(201).json({message: 'Пользователь создан'})

  } catch (error) {
    res.status(500).json({message: 'что то пошло не так, попробуйте снова!'})
  }
})

//  /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ], 
  async (req, res)=>{
    try {
      const errors = validationResult(req)
  
      if(!errors.isEmpty()){
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе',
        })
      }
  
      const {email, password} = req.body

      const user = await User.findOne({email})
      console.log(user)

      if (!user){
        return res.status(400).json({message: "пользователь не найден"})
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch){
        return res.status(400).json({message: "не верный пароль"})
      }
      res.json({userId: user.id, firstName: user.firstName, lastName: user.lastName})

    } catch (error) {
      res.status(500).json({message: 'что то пошло не так, попробуйте снова!'})
    }
})

module.exports = router
const {Router} = require('express')
const Contact = require('../models/Contact')
const router = Router()

router.post('/generate',  async(req, res)=>{
  try {
    const {firstName, phone, email, userId} = req.body // данные запроса
    const contact = new Contact({    // 
      firstName, phone, email, owner : userId
    })
    console.log(contact)
    await contact.save()
    res.status(201).json({message: 'Контакт добавлен'})

    
    
  } catch (error) {
    res.status(500).json({message: 'что то пошло не так, попробуйте снова!'})
  }
})

router.post('/contacts',  async (req, res)=>{
  try {
    const {userId} = req.body
    const contacts = await Contact.find({owner: userId}).exec()
    res.status(200).json(contacts)
  } catch (error) {
    res.status(500).json({message: 'что то пошло не так, попробуйте снова!'})
  }
})

router.post('/remove', async(req, res)=>{
  try {
    const {id} = req.body
    const response = await Contact.remove({_id: id})
    res.status(201).json({message: 'удалено', status: true})
  } catch (error) {
    res.status(500).json({message: 'что то пошло не так, попробуйте снова!'})
  }
})

router.post('/id', async (req, res)=>{
  try {
    const {id} = req.body
    const contact = await Contact.findById(id)
    res.status(200).json(contact)
  } catch (error) {
    res.status(500).json({message: 'что то пошло не так, попробуйте снова!'})
  }
})
router.post('/change', async (req, res)=>{
  try {
    const {id, userId, firstName, phone, email} = req.body
    const contact = await Contact.updateOne({_id: id, owner: userId}, {firstName, phone, email})
    res.status(200).json({message: "Сохранено"})
  } catch (error) {
    res.status(500).json({message: 'что то пошло не так, попробуйте снова!'})
  }
})

module.exports = router
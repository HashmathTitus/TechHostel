const express =require('express')

const { ewalletCreate,addExpenses, getExpense, createExpense, deleteExpense, updateExpense, verificationDetails, getAllPayments, verifyPayment}= require('../controllers/paymentcontroller')

const router=express.Router()


router.post('/createewallet',ewalletCreate)
router.get('/getexpense',getExpense)
router.post('/createexpense',addExpenses)
router.post('/expenseadd',createExpense)
router.delete('/delete/:id',deleteExpense)
router.put('/update',updateExpense)
router.post('/verify',verificationDetails)
router.get('/getpayments',getAllPayments)
router.put('/verifypay/:id',verifyPayment)

module.exports= router

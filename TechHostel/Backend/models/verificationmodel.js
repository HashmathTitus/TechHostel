const mongoose=require('mongoose')
const Schema=mongoose.Schema

const PaymentSchema = new mongoose.Schema({
    studentName: String,
    nicNumber: String,
    accountNumber: String,
    bank: String,
    amount: String,
    date: Date,
    status: {
      type: String,
      enum: ['verified', 'not_verified'], 
      default: 'not_verified' 
    }
  })

module.exports=mongoose.model('payment',PaymentSchema)
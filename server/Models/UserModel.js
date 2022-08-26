const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'Name is Required'],
    },
    email:{
        type:String,
        required: [true,'Email is Required'],
        unique:true,
    },
    block:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:[true,"password is Required"]
    },
})

userSchema.pre ('save',async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            return user
        }else{
            throw Error('Incorrect Password')
        }
    }else{
        throw Error('Incorrect Email')
    }
}

module.exports = mongoose.model('users',userSchema)
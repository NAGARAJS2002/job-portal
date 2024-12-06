import mongoose from "mongoose"

const jobSchema =  new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    logo:{
        type: String
    },
    requirements: {
        type: String
    },
    
    createdUser: {
       type: mongoose.Schema.Types.ObjectId, ref: 'user'
    }
},{timestamps: true})

const jobs = mongoose.model('job', jobSchema);

export default jobs;
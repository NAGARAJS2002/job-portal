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
        type: String,
        required: true
    },
    
    createdUser: {
        type: Object,
        required: true,
    }
},{timestamps: true})

const jobs = mongoose.model('job', jobSchema);

export default jobs;
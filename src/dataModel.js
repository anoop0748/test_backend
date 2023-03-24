
const mongoose = require('mongoose');
const schema = mongoose.Schema
let events  = new schema({
    title : {type:String,required:true},
    description : {type:String, required:true},
    location : {type:String , required:true},
    start_time:{type: Date,required:true},
    end_time : {type: Date, required:true}

})
let backend_model = mongoose.model("second_prt_data",events);

module.exports = backend_model;
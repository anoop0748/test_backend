
const express = require('express');

let data = require("./dataModel")

const end_points = express();
end_points.post("/POST/v1/events",async(req,res)=>{
    try {
        
        let req_data = req.body;
        if(req_data.title === "" || req_data.description === "" || req_data.location === ""  || req_data.start_time === "" || req_data.end_time === ""){
            res.header(400).json({
                status: 'Failed',
                massage:"All Fildes are required please check all inputs"
            })
        }
        let saved_data = await data.create(req_data);
        console.log(saved_data)
        res.header(201).json({
            status: "Success",
            PostedData:saved_data

        })
        
    } catch (e) {
        res.header(400).json(
            {
                status : "Failed",
                error : e.massage
            }
        )
        
    }
});
end_points.get("/GET/v1/events", async(req,res)=>{
    try{
        
        let id = req.query.id
        let all_events ;
        if(id !== undefined){
            all_events = await data.find({_id:id});
        }
        else{all_events = await data.find();}
        res.header(200).json({
            status: "success",
            events : all_events
        })
    }
    catch(e){
        res.header(404).json({
            status : "Failed",
            massage:"There is no event whith given id"
        })
    }
});
end_points.delete("/DELETE/v1/events", async(req,res)=>{
    try{
        let id = req.query.id;
        let deleted = await data.deleteOne({_id:id});
        res.header(204).json({
            status: "Success",
            massage:"Given event id Deleted successfully"
        })
    }catch(e){
        res.header(404).json({
            status : "Failed",
            massage:"There is no event whith given id"
        })
    }
})
end_points.put("/PUT/v1/events", async(req,res)=>{
    try{
        let update_event = req.body;
        if(update_event.title === "" || update_event.description === "" || update_event.location === ""  || update_event.start_time === "" || update_event.end_time === ""){
            res.header(400).json({
                status: 'Failed',
                massage:"All Fildes are required please check all inputs"
            })
        }
        let id = req.query.id;
        let updates = await data.updateOne({_id:id},{$set:{
            _id:id,
            title:update_event.title,
            description:update_event.description,
            location: update_event.location,
            start_time:update_event.start_time,
            end_time:update_event.end_time
        }}).then((res)=>console.log(res))
        .catch((e)=>console.log(e));
        let updated_data = await data.find({_id:id})
        res.header(200).json({
            status: "Success",
            updated_data
        })

    }catch(e){
        res.header(404).json({
            status : "Failed",
            massage:"There is no event whith given id"
        })
    }
})
module.exports = end_points;
// import express from "express";
// import mongoose from "mongoose";
// const router=express.Router();

// const amulSchema=mongoose.Schema({
//          amul:[{
//         productname:{
//             type:String,
//                    },
//        quantity:{
//             type:String,
//                    },
//        price:{
//              type:String,
//                },
//        offer:{
//              type:String,
//              },
//     }
// ]})
// var Amul=mongoose.model("Amul",amulSchema);
// amulSchema.plugin(Amul);

// const amul={
//     amul:[
//     {
//        productname:"Buttermilk",
//        quantity:"500 gm",
//        price:"450",
//        offer:"30%"
//     },
//     {
//         productname:"Lassi",
//         quantity:"500 gm",
//         price:"450",
//         offer:"30%"
//      },
//      {
//         productname:"panchamrit",
//         quantity:"500 gm",
//         price:"450",
//         offer:"30%"
//      },
//      {
//         productname:"Rasmalai",
//         quantity:"500 gm",
//         price:"450",
//         offer:"30%"
//      },
//      {
//         productname:"Almando",
//         quantity:"500 gm",
//         price:"450",
//         offer:"30%"
//      },
//      {
//         productname:"Sugar free dark chocolate",
//         quantity:"500 gm",
//         price:"450",
//         offer:"30%"
//      },
// ]}
// //get
// router.get("/",(req,res) =>
// {
//     try{
//         res.status(200).send(amul);
//     }
//     catch(error){
//         res.json({message:"not available"});
//     }
// });
// router.post("/",async(req,res)=>{
//     try{
//         const details={
//            amul:req.body.amul
//         }
//         console.log(details);
//         var create=new Amul(amul);
//         var amulCreated=await create.save();
      
//         if(amulCreated){
//             console.log("created");
//         res.status(201).json({message:"show details"});
//         }
// else{
//     res.status(401);
//     throw new error("not found");
// }
// }catch(err){
//     return res.status(500).json({message:err.message});
// }}
// );
// // specific data
// router.get("/:id",(req,res)=>{
//     console.log(req.params.id);
//     Amul.findById(req.params.id)
    
//     .then(result=>{
//         res.status(200).json({
//             amul:result
//         })
//     })
//     .catch(err=> {
//     console.log(err);
//     res.status(505).json({
//         error:err
//     })
//     }
//   )
//   })
//   router.put('/:id',(req,res)=>{
//     console.log(req.params.id);
//     Amul.findOneAndUpdate({_id:req.params.id},{
//         $set:{
//             amul:req.body.amul

//         }
//     })
//     .then(result=>{
//         res.status(200).json({
//             updated_amul:result       
//          })
//     })
//     .catch(err=>{
//         console.log(err)
//         res.status(500).json({
//             error:err
//         })
//     })
//     })
//     router.delete("/:id",(req,res)=>{
//         console.log(req.params.id);
//         Amul.deleteOne({_id:req.params.id},{
//             $set:{
//                 amul:req.body.amul
    
//             }
//         })
//         .then(result=>{
//             res.status(200).json({
//                 deleted_amul:result       
//              })
//         })
//         .catch(err=>{
//             console.log(err)
//             res.status(500).json({
//                 error:err
//             })
//         })
//         })
//         router.delete("/",(req,res)=>{
    
//             Amul.deleteMany({amul},(err,result)=>{
//             if(err) throw err
//             res.send(amul)
//             })
//         })
//   export default router;
import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import connectDB from "./db.js";

const router =express.Router();
connectDB();

const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')
const amulSchema=mongoose.Schema({
  amul:[ {
    image:{
        data:String,
        contentType: String
    },
    productname:{
        type:String,
       
        },
  price:{
         type:String,
      
     },
     quantity:{
        type:String,
     
    },
offer:{
    type:String,
}

 } ]
}
)

var Amul = mongoose.model('Amul', amulSchema);
amulSchema.plugin(Amul);
const amulbrand={
  amul:[ {
    image:{
        data:"amullassi.png",
contentType:"image/png"
    },
    productname:"Lassi",
    price:"Rs.550",
    quantity:"2L",
    offer:"30%"
},
  {
    image:{
        data:"amulbuttermilk.png",
contentType:"image/png"
    },
    productname:"Butter milk",
    price:"Rs.550",
    quantity:"1L",
    offer:"30%"
},
{
    image:{
        data:"amulbuttermilk.png",
contentType:"image/png"
    },
    productname:"camel milk",
    price:"Rs.550",
    quantity:"500 gm",
    offer:"30%"
},
{
    image:{
        data:"amulbuttermilk.png",
contentType:"image/png"
    },
    productname:"rasmalai",
    price:"Rs.550",
    quantity:"500 gm",
    offer:"30%"
}

]
}
// connectDB();
// const app=express();
// app.use(express.json());




router.get('/',(req,res) =>
{
    try{
        res.status(200).send(amulbrand);
    }
    catch(error){
        res.json({message:"not available"});
    }
});



router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    Amul.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            amulbrand:result
        })
    })
    .catch(err=> {
    console.log(err);
    res.status(505).json({
        error:err
    })
    }
  )
})


router.post('/',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newAmul = new Amul({
               amul:req.body.amul
            })
            newAmul.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    amulbrand.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            amul:req.body.amul

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_amulbrand:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
    router.delete('/:id',(req,res)=>{
        console.log(req.params.id);
        amulbrand.deleteOne({_id:req.params.id},{
            $set:{
               
                amul:req.body.amul
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_amulbrand:result       
             })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
        })
        router.delete('/',(req,res)=>{
    
          amulbrand.deleteMany({amulbrand},(err,result)=>{
            if(err) throw err
            res.send(amulbrand)
            })
        })

        export default router;
        
const express = require("express");
const router = express.Router();
const multer = require('multer');
const Poster = require("../model/PosterModel");


router.post("/", (req, res) => {
    console.log('ok');
});

router.use(express.static(`${__dirname}/client/build`));
router.use('/uploadedfile', express.static('uploadedfile'));

const storage = multer.diskStorage(
    {
        destination: 'uploadedfile/',
        filename: function (req, file, cb) {
            cb(null, file.originalname + '-' + ".png");
        }
    }
);


const upload = multer({ storage: storage });


const photoUpload = upload.fields([{ name: 'file', maxCount: 1 }]);

router.post("/addPoster", photoUpload, async(req,res) =>{
    let title = req.body.title;
    let description = req.body.description;

    let file = req.files['file'][0].filename;



    if (title == undefined || description == undefined) {

        res.json({ 'status': 'failed', 'response': "Invalid Request" });
        return;
    }

    if (title == '' || description == '') {

        res.json({ 'status': 'failed', 'response': "Feild are required" });
        return;
    }


    const poster = new Poster(
        {
            "title": title,
            "description": description,
            "photo": file

        }
    );
    poster.save().then(() => {
        res.json({ 'status': 'Success', 'response': "Successfully Saved" });

    }).catch((err) => {
        console.log(err),
            res.json({ 'status': 'Failed', 'response': "Unable To Save" })
    });

});

router.post("/getAllPoster", async(req,res) =>{
        const search = Poster.find({});
        const result = await search.exec();
        
        res.json({ 'data': result, 'status': 'OK' });
});

router.post("/editPoster/:id",photoUpload, async(req,res) =>{

    let file = req.files['file'][0].filename;

    const id = req.params.id;

    const edit={
        "photo":file
    }
    if (req.file){
        const image=req.files.filename
        edit.photo=image
    }
    Poster.findOneAndUpdate(id,{
        $set:edit
    }, {
        new:true
    }).then(poster => {
        res.json({ 'status': 'Success', 'response': "Edited Successfully" })
    })
    .catch(err => {
        res.json({ 'status': 'Failed', 'response': "Server Error" })
    });
});

router.get("/searchByTitle/:id",async (req,res) =>{
    // const title = req.body.title;
    
    // const search={
    //     "title":title
    // }
    // Poster.find(title,{
    //     $set:search
    // }, {
    //     new:true
    // }).then(poster => {
    //     res.json({ 'status': 'Success', 'response': "Ttile Found" })
    //     res.redirect('/poster');
    // })
    // .catch(err => {
    //     res.json({ 'status': 'Failed', 'response': "Server Error" })
    // });
    try{
        const search = await Poster.findOne({
            search:req.body
        });
        if(!search){
            res.json({'status': 'Failed', 'response': "Titile Not Found" })
        }
        return res.json(search);
    }catch(err){
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
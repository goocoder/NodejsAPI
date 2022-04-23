//import tea model
const Tea = require('../models/tea');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadImg = multer({storage: storage}).single('image');

//GET '/tea'
const getAllTea = (req, res) => {
    Tea.find({}, (err, data) => {
        if(err) {
            return res.json({Error: err});
        }      
        return res.json(data);
    })
};

//POST '/tea'
const newTea = (req, res) => {
    Tea.findOne({name: req.body.name}, (err, data) => {
        if(!data) {
            const newTea = new Tea({
                name: req.body.name,
                image: req.file.path,
                description: req.body.description,
                keywords: req.body.keywords,
                origin: req.body.origin,
                brew_time: req.body.brew_time,
                temperature: req.body.temperature,
            })

            newTea.save((err, data) => {
                if(err) return res.json({Error: err});
                return res.json(data);
            })
        } else {
            if(err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({message:"Tea already exists"});
        }
    })
};

//DELETE '/tea'
const deleteAllTea = (req, res) => {
    Tea.deleteMany({}, err => {
        if(err) {
            return res.json({message: "Complete delete failed"})
        }
        res.json({message: "Complete DELETE all tea"});
    })
};

//GET '/tea/:name'
const getOndTea = (req, res) => {
    let name = req.params.name;

    Tea.findOne({name:name}, (err, data) => {
        if (err || !data) {
            return res.json({message: "Tea doesn't exist"});
        } else {
            return res.json(data); // return the tea object if found
        }
    });
}

//POST '/tea/:name'
const newComment = (req, res) => {
    let name = req.params.name;
    let newComment = req.body.comment;

    const comment = {
        text: newComment,
        date: new Date()
    }

    //find the tea object
    Tea.findOne({name:name}, (err, data) => {
        if(err || !data || !newComment) {
            return res.json({message: "Tea doesn't exist"});
        } else {
            data.comments.push(comment);

            data.save(err => {
                if (err) {
                    return res.json({message: "Comment failed to add.", error:err});
                } 
                return res.json(data);
            })
        }
    })
};

//DELETE '/tea/:name'
const deleteOneTea = (req, res) => {
    let name = req.params.name;

    Tea.deleteOne({name:name}, (err, data) => {
        if(data.deletedCount == 0) 
            return res.json({message: "Tea doesn't exist"});
        else if (err) {
            return res.json(`Something went wrong, please try again. ${err}`);
        } else {
            return res.json({message: "Tea deleted."});
        }
    });
};

//export controller functions
module.exports = {
    getAllTea,
    uploadImg,
    newTea,
    deleteAllTea,
    getOndTea,
    newComment,
    deleteOneTea
};

/*
//GET '/tea'
const getAllTea = (req, res, next) => {
    res.json({message: "GET all tea"});
}

//POST '/tea'
const newTea = (req, res, next) => {
    res.json({message: "POST new tea"}); // dummy function for now
};

//DELETE '/tea'
const deleteAllTea = (req, res, next) => {
    res.json({message: "DELETE all tea"});
};

//GET '/tea/:name'
const getOndTea = (req, res, next) => {
    res.json({message: "GET 1 tea"});
}

//POST '/tea/:name'
const newComment = (req, res, next) => {
    res.json({message: "POST 1 tea comment"});
}

//DELETE '/tea/:name'
const deleteOneTea = (req, res, next) => {
    res.json({message: "DELETE 1 tea"});
};
*/

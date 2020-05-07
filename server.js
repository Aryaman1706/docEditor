const express=require('express');
const mongoose=require('mongoose');
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// importing models
const { Doc }  = require('./models/docs');
const { User } = require('./models/users');

// importing routes
const user = require('./routes/user');
const doc = require('./routes/doc');
const auth = require('./routes/auth');

// importing auth middleware
const authM = require('./middleware/auth');

const app=express();

app.use(express.json());

app.use(fileUpload());

// ROUTES
app.use('/api/doc',doc);
app.use('/api/user',user);
app.use('/api/auth',auth);

// upload a new doc
app.post('/api/upload', async(req,res)=>{

    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
      const file = req.files.file;
      var uploadedFileName = uuidv4() + path.extname(file.name);
    
      file.mv(`${__dirname}/client/public/uploads/${uploadedFileName}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
      });

      let doc = new Doc ({
        title: req.body.title,
        // authors: req.user._id,
        body: `/uploads/${uploadedFileName}`
      });
      doc = await doc.save();

      res.json(doc);
});

mongoose.connect('mongodb://localhost/test')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err=> console.error('Not Connected...'));

const port=process.env.PORT || 5000;
app.listen(port,()=> console.log(`Listening on Port ${port}...`)); 

const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");
const app = express();

// Set Storage Engine

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000 },
  fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
  }
}).fields([{name:'single'},{name:'mfiles',maxCount:5}])
  
  // .single('single');

// Multiple files
// const multipleUploads = upload.field
// const multipleUploads = upload.fields([{ name: "mpiles" }]);

// checkFileType
function checkFileType(file, cb) {
  //    Allowed extension  //

  console.log(file)
  const fileTypes = /jpeg|jpg|png|gif/;

  // check ext
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mim type

  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error :Images only");
  }
}

// EJS
app.set("view engine", "ejs");

// Set Static files
app.use(express.static("./public"));

// app get

app.get("/", (req, res) => {
  res.render("index");
});



// app.post('/muploads',)
app.post("/upload",
  (req, res) => {

  upload(req, res, (err) => {
      if (err) {
          res.render('index', {
              msg:err
          })

          // console.log(err);
      } else {

          if (req.files == undefined) {
              res.render('index', {
                  msg:"Error No file Selected"
              })
          } else {
              res.render('index', {
                  msg:'File Uploaded uccessfully',
                  file:`uploads/${req.files[0]}`
              })
          }

      }
  })
});




const PORT = 8081;

app.listen(PORT, () => {
  console.log(`Connected on Port ${PORT}`);
});

// // Set Storage Engine

// const storage = multer.diskStorage({
//     destination: "./public/uploads/",
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname +'-'+Date.now()+path.extname(file.originalname));

//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 100000 },
    //// fileFilter: function (req, file, cb) {
    ////     checkFileType(file, cb);
    //// }
//// }).single('crock');
//});

// Multiple files
// const multipleUploads = upload.fields([{ name: "crock" },{name:"mpiles",maxCount:5}]);



// // checkFileType
// function checkFileType(file,cb) {
// //    Allowed extension  //
//     const fileTypes = /jpeg|jpg|png|gif/;

//     // check ext
//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     // Check mim type

//     const mimetype = fileTypes.test(file.mimetype);

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error :Images only')
//     }

// }

// // EJS
// app.set("view engine","ejs");

// // Set Static files
// app.use(express.static("./public"));

// // app get

// app.get("/",(req,res)=>{
//     res.render("index")
// })

// app.post("/upload", (req,res) => {
//     upload(req, res, (err) => {
//         if (err) {
//             res.render('index', {
//                 msg:err
//             })

//             // console.log(err);
//         } else {

//             if (req.file == undefined) {
//                 res.render('index', {
//                     msg:"Error No file Selected"
//                 })
//             } else {
//                 res.render('index', {
//                     msg:'File Uploaded uccessfully',
//                     file:`uploads/${req.file.filename}`
//                 })
//             }

//         }
//     })
// })

// const PORT=8081

// app.listen(PORT,()=>{
//     console.log(`Connected on Port ${PORT}`);
// })

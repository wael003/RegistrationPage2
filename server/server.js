const express = require('express');
const cors = require('cors');
const Database = require('./Database');
const bodyParser = require('body-parser');

const db = new Database();

const app = express();
const port = 3000;
// Cross origin resource sharing. Important so that client will be able to make calls to APIs on a different domain.
app.use(cors());
app.use(bodyParser.json());
// The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false)
// or the qs library (when true). 
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/User", (req, res) => {
    const body = req.body;
    console.log("BODY :", body);
    db.addUser(body).then((data) => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send(err);
        })
});
app.post("/User/:Email", (req, res) => {
    const body = req.body;
    
    db.checkPass(body).then((data) => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send(err);
        })
});
app.post("/User/:Email/:VerificationCode",(req,res)=>{
  const body=req.body;
  db.sendEmail(body)
  .then(data=>{
    res.send(data);
  })
  .catch(err=>{
    res.status(500).send(err);
  })
})

// app.get("/User/:Email/pass", (req, res) => {
//     const Email  = req.params.Email;

//     if(Email){
//         db.checkAndGet(Email)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         })

//     }
    
// });
app.get("/User/:Email", (req, res) => {
    const Email  = req.params.Email;

    if(Email){
        db.checkAndGetData(Email)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })

    }
    
});

// app.get("/User/:Email", (req, res) => {
//     const email = req.params.Email;
//     db.getEmail(email)
//         .then(data => {
//             if (!data) {
//                 res.status(404).send("email not found");
//             } else {
//                 res.send(data);
//             }
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         })

// });
// app.get("/notes/:title", (req, res) => {
//     const { title } = req.params;
//     db.getNoteByTitle(title)
//         .then(data => {
//             if (!data) {
//                 res.status(404).send("Note not found");
//             } else {
//                 res.send(data);
//             }
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         })

// });
app.put("/User", (req, res) => {

    db.updateUser(req.body)
        .then(data => {
            if (!data) {
                res.status(404).send("Note not found");
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send(err);
        })

});
// app.delete("/notes/:id", (req, res) => {
//     const id = req.params.id;
//     db.deleteNote(id)
//         .then(data => {
//             if (!data) {
//                 res.status(404).send("Note not found");
//             } else {
//                 res.send(data);
//             }
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         })

// });


// const nodeMailer = require("nodemailer");
// const Transporter = nodeMailer.createTransport({
//   port: 587, // Correct property name
//   host: "smtp.gmail.com",
//   secure: false, 
//   auth :{
//     user : "waelalmallah7@gmail.com",
//     pass : 'sgkk nxmf vbcr iuvj',
//   },
//   tls: {
//     rejectUnauthorized: false
//   },
//   connectionTimeout : 5000,
//   greetingTimeout : 3000
// });

// var message = {
//   from: "waelalmallah7@gmail.com", // Correct property name
//   to: "waelalmallah003@gmail.com",
//   subject: "Hello from Node.js",
//   text: "Hello from Node.js ",
// };

// Transporter.sendMail(message, (error, info) => {
//   if (error) {
//     console.log(error + " error happened");
//   } else {
//     console.log("Email sent: " + info.response); // Log the response from the email server
//   }
// });

app.listen(port, () => {
  console.log(`Started node server and listening to port ${port}`);
  db.connect();
});


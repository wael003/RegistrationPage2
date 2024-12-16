const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./Sheme/UserSheme");

class Database {
    constructor() {
        this.URL = "mongodb://localhost:27017/MiddleEast";
    }
    connect() {
        mongoose.connect(this.URL)
            .then(() => {
                console.log('Database connection successful');
            }).catch((err) => {
                console.error('Database connection error:', err);
            });

    }
    addUser(user) {
        return new Promise((resolve, reject) => {
            user["VerificationCode"] = 0;

            const query = { Email: user["Email"] };

            User.findOne(query)
                .then(data => {
                    if (data) {
                        reject(new Error("this email is already exist"))
                    } else {
                        const hash = bcrypt.hashSync(user["Password"], 10);
                        user["Password"] = hash;

                        let newUser = User(user);

                        newUser.save().then((doc => {
                            resolve(doc);
                        }))
                            .catch(err => {
                                reject(err);
                            })
                    }
                }).catch(err => {
                    reject(err);
                })




        })
    }
    checkAndGet(email) {
        return new Promise((resolve, reject) => {
            const query = { Email: email };

            User.findOne(query)
                .then(data => {
                    if (!data) {
                        reject('User not found');
                    } else {
                        resolve(data);
                        console.log(data);
                    }
                })
                .catch(err => {
                    reject(err);
                });

        });
    }
    checkPass(user) {
        return new Promise((resolve, reject) => {
            const query = { Email: user["Email"] };
            User.findOne(query)
                .then(data => {
                    if (data) {
                        console.log("yes")
                        console.log(user["Password"]);
                        const isMatch = bcrypt.compareSync(user["Password"], data.Password);

                        if (isMatch) {
                            resolve(data);
                        }
                        else {
                            reject(new Error("wrong password"))
                        }
                    } else {
                       
                    }
                })


        })
    }
    updateUser(user) {
        return new Promise((resolve, reject) => {

            user["Password"] = bcrypt.hashSync(user["Password"], 10);

            let newUser = User(user);
            User.updateOne(
                { Email: newUser["Email"] },
                {
                    $set: {
                        Password: newUser["Password"],
                        VerificationCode: newUser["VerificationCode"]
                    }
                }).then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })

        });
    }
}

module.exports = Database;
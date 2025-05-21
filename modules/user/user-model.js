const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { randomUUID } = require("crypto")

const userSchema = new mongoose.Schema(
    {
        uuid: {
            type: "UUID",
            default: () => randomUUID(),
        },
        pseudo: {
            type: String,
            required: true,
            unique: true,
            match: /[a-zA-Z0-9_]{4,30}/,
            message: "This pseudo of user already exists",
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            match: /.+\@.+\..+/,
            unique: true,
            message: "This email of user already exists",
        },
        password: {
            type: String,
            match: /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{7,50}$/,
            required: [true, "Password is required"],
            message: 'Password must be 8 to 50 characters and check 3 of the following: uppercase, lowercase, number, special character'

        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        strict: "throw",
    }
)

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const message = `Le champ '${Object.keys(error.keyValue)[0]}' doit être unique.`;
        next(new Error(message));
    } else {
        next(error);
    }
})

userSchema.methods.comparePassword = function (pwd, callback) {
    bcrypt.compare(pwd, this.password, (err, isMatch) => {
        if (err) return callback(err)
        callback(null, isMatch)
    })
}


userSchema.methods.createJWT = function () {
    return jwt.sign({
        uuid: this.uuid,
        email: this.email
    }, process.env.KEY_JWT, {expiresIn: '24h'})
}

module.exports = mongoose.model("User", userSchema);
const User = require('../DataBase/models/user');

const register = async (req, res) => {
console.log(req.body);
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
    })

    try {

        if (!await newUser.save()) {
            return res.status(400).json({
                message: `Nie udało się zarejestrować`
            })
        }

        res.status(201).json({
            message: `Dodano użytkownika`,
            newUser: `newUser`
        })
    } catch (error) {
        return res.status(400).json({
            message: `Nie udało się zarejestrować: ${error.message}`
        })
    }
}

const userActions = {
    register,
}

module.exports = userActions;
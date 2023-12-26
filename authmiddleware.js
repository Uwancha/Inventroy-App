module.exports.isAuth = async(req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports.isAdmin = async(req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
        next()
    } else {
        res.status(401).send("<h2>Only admins can make changes to items and products</h2>")
    }
}
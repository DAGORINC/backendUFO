module.exports = function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if(token !== 'faketok' && token !== 'faketok2') return res.status(403).json({ message: 'Dostęp zabroniony' }); 

    next();
}
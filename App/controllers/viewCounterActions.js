const viewCounter = require ('../DataBase/models/viewCounter')


const getViewCount = async (req, res) => {

    
    try {
    const counts = await viewCounter.countDocuments();

    res.status(200).json({
        message: 'Success',
        counts: counts

    })
    
} catch (error) {
    return res.status(400).json({ message: `Nie znaleziono` })
}

}


const newView = async (req, res) => {

    const newCount = new viewCounter({
        countDate: req.body.countDate,
    })

    try {

        if (!await newCount.save()) {
            return res.status(400).json({
                message: `Błąd zapisu`
            });
        }

        res.status(201).json({
            message: `Dodano odwiedzenie`
            
        });

    } catch (error) {
        return res.status(400).json({
            message: `Błąd zapisu`
        })
    }
    
}


const viewCounterActions = {
    getViewCount,
    newView,
}

module.exports = viewCounterActions;
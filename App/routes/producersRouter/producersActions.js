const Producer = require('../../DataBase/models/producer');
const fs = require('fs');

const getAllProducers = async (req, res) => {

    try {
        const producers = await Producer.find({}).sort({ name: 1 });
        if (!producers) return res.status(400).json({ message: `Nie znaleziono producentów.` })

        res.status(200).json({
            message: 'Success',
            producers: producers,

        })
    } catch (error) {
        return res.status(400).json({ message: `Nie znaleziono producentów. ${error.message}` })
    }

}

const getProducer = async (req, res) => {

    try {
        const _id = req.params._id;
        const producer = await Producer.findOne({ _id: _id });


        if (!producer) return res.status(400).json({ message: `Nie znaleziono producenta.` })

        res.status(200).json({
            message: 'Success',
            data: {
                producer: producer,
            }
        })

    } catch (error) {
        return res.status(400).json({ message: `Nie znaleziono producenta. ${error.message}` })
    }

}

const saveProducer = async (req, res) => {

    const newProducer = new Producer({
        name: req.body.name,
        link: req.body.link,
        logo: req.file.path
    })

    try {

        if (!await newProducer.save()) {
            fs.unlinkSync(newProducer.logo)
            return res.status(400).json({
                message: `Nie udało się zapisać producenta w bazie.`
            });
        }

        res.status(201).json({
            message: `Zapisano ${newProducer.name} w bazie producentów!`,
            newProducer: newProducer
        });

    } catch (error) {
        if (error) fs.unlinkSync(newProducer.logo);
        return res.status(400).json({
            message: `Nie zapisano producenta. ${error.message}`
        })
    }
}

const editProducer = async (req, res) => {
    try {
        let logo;
        const _id = req.params._id;

        const name = req.body.name;
        const link = req.body.link;
        if (req.file) { logo = req.file.path }

        let logoToDelete;


        const producer = await Producer.findOne({ _id: _id });
        if (!producer) return res.status(400).json({ message: `Nie znaleziono producenta` })

        if (logo && producer.logo) {
            logoToDelete = producer.logo;
        }


        if (name) producer.name = name;
        if (link) producer.link = link;
        if (logo) producer.logo = logo;


        if (!await producer.save()) return res.status(400).json({ message: `Nie odnaleziono producenta` })

        if (logoToDelete) fs.unlinkSync(logoToDelete)

        res.status(201).json({
            message: `Success`,
            editedProducer: producer
        })

    } catch (error) {
        res.status(400).json({ message: `Nie edytowano użytkownika błąd: ${error.message}` })
    }
}

const deleteProducer = async (req, res) => {
    try {

        const _id = req.params._id;

        const producer = await Producer.findOne({ _id: _id });

        if (!await producer.deleteOne({ _id: _id })) return res.status(400).json({ message: `Nie usunięto producenta` });

        fs.unlinkSync(producer.logo)
        res.sendStatus(204);

    } catch (error) {
        res.status(400).json({ message: `Nie usunięto producenta. ${error.message}` });
    }

}

const deleteImage = async (req, res) => {

    try {

        const _id = req.params._id;
        const producer = await Producer.findOne({ _id: _id });

        fs.unlinkSync(producer.logo)
        producer.logo = '';

        if (!await producer.save()) return res.status(400).json({ message: 'Nie można usunąć zdjęcia' });

    } catch (error) {

        return res.status(400).json({ message: `Nie można usunąć zdjęcia ${error.message}` });
    }
}

const procudersActions = {
    getAllProducers,
    getProducer,
    saveProducer,
    editProducer,
    deleteProducer,
    deleteImage
}

module.exports = procudersActions;
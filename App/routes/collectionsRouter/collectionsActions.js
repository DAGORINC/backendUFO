const Collections = require('../../DataBase/models/collections');
const fs = require('fs');

const getAllCollections = async (req, res) => {

    try {
        const collections = await Collections.find({});
        if (!collections) return res.status(400).json({ message: `Nie znaleziono kolekcji` });

        res.status(200).json({
            message: 'Success',
            collections: collections
        })

    } catch (error) {
        return res.status(400).json({ message: `Nie znaleziono kolekcji ${error.message}` })
    }

}

const getCollection = async (req, res) => {

    try {
        const _id = req.params._id;
        const collection = await Collections.findOne({ _id: _id });

        if(!collection) return res.status(400).json({ message: `Nie odnaleziono kolekcji` });

        res.status(200).json({
            message: 'Success',
            collection: collection
        })

    } catch (error) {
        return res.status(400).json({ message: `Nie odnaleziono kolekcji: ${error.message}` })
    }

}

const saveCollection = async (req, res) => {
    
    const newCollection = new Collections({
        name: req.body.name,
        producer: req.body.producer,
        image: req.file.path
    })

    try {

        if (!await newCollection.save()) {
            fs.unlinkSync(newCollection.image)
            return res.status(400).json({
                message: `Nie udało się dodać kolekcji`
            });
        }

        res.status(201).json({
            message: `Dodano kolekcję ${newCollection.name} do bazy`,
            newCollection: newCollection
        });

    } catch (error) {
        if (error) fs.unlinkSync(newCollection.path);
        return res.status(400).json({
            message: `Nie udało się dodać kolekcji ${error.message}`
        })
    }

}

const editCollection = async (req, res) => {
    
    try {
        let image;
        const _id = req.params._id;

        const name = req.body.name;
        const producer = req.body.producer;
        if (req.file) { image = req.file.path }

        let imageToDelete;


        const collection = await Collections.findOne({ _id: _id });
        if (!collection) return res.status(400).json({ message: `Nie odnaleziono kolekcji` });

        if (image && collection.image) {
            imageToDelete = collection.image;
        }


        if (name) collection.name = name;
        if (producer) collection.producer = producer;
        if (image) collection.image = image;

        if (!await collection.save()) return res.status(400).json({ message: `Nie odnaleziono kolekcji` });

        if (imageToDelete) fs.unlinkSync(imageToDelete)

        res.status(201).json({
            message: 'Success',
            collection: collection
        })
        
    } catch (error) {
        return res.status(400).json({ message: `Nie edytowano kolekcji błąd: ${error.message}` });
    }

}

const deleteCollection = async (req, res) => {

    try {

        const _id = req.params._id;

        const collection = await Collections.findOne({ _id: _id });

        if (!await collection.deleteOne({ _id: _id })) return res.status(400).json({ message: `Nie usunięto kolekcji` });

        fs.unlinkSync(collection.image)
        res.sendStatus(204);

    } catch (error) {
        res.status(400).json({ message: `Nie usunięto kolekcji. ${error.message}` });
    }

}

const deleteImage = async (req, res) => {

}

const collectionsActions = {
    getAllCollections,
    getCollection,
    saveCollection,
    editCollection,
    deleteCollection,
    deleteImage
}

module.exports = collectionsActions;
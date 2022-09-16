const Furniture = require('../../DataBase/models/furniture');
const fs = require('fs');

const getAllFurniture = async (req, res) => {

    try {
        const furniture = await Furniture.find({});
        if (!furniture) return res.status(400).json({ message: `Nie znaleziono mebli` });

        res.status(200).json({
            message: `Success`,
            data: {
                furniture: furniture
            }
        })

    } catch (error) {
        return res.status(400).json({ message: `Nie odnaleziono mebli błąd: ${error.message}` })
    }

}

const getPieceOfFurniture = async (req, res) => {

    try {
        const _id = req.params._id;
        const furniture = await Furniture.findOne({ _id: _id });

        if (!furniture) return res.status(400).json({ message: `Nie odnaleziono mebla` });

        res.status(200).json({
            message: `Success`,
            data: {
                furniture: furniture
            }
        })

    } catch (error) {
        return res.status(400).json({ message: `Nie odnaleziono mebla: ${error.message}` })
    }

}

const saveFurniture = async (req, res) => {

    const newFurniture = new Furniture({
        name: req.body.name,
        producer: req.body.producer,
        collection: req.body.collection,
        price: req.body.price,
        width: req.body.width,
        depth: req.body.depth,
        height: req.body.height,
        crossed: req.body.crossed,
        isPriceVissible: req.body.isPriceVissible,
        image: req.file.path,
    })

    try {

        if (!await newFurniture.save()) {
            fs.unlinkSync(newFurniture.image)
            return res.status(400).json({
                message: `Nie udało się dodać!`
            });
        }

        res.status(201).json({
            message: `Dodano ${newFurniture.name} do bazy`,
            data: {
                newFurniture: newFurniture
            }
        });

    } catch (error) {
        if (error) fs.unlinkSync(newFurniture.path);
        return res.status(400).json({
            message: `Nie udało się dodać ${newFurniture.name} do bazy`
        })
    }

}

const editFurniture = async (req, res) => {

    try {
        let image;
        const _id = req.params._id;

        const name = req.body.name;
        const producer = req.body.producer;
        const partCollection = req.body.partCollection;
        const price = req.body.price;
        const width = req.body.width;
        const depth = req.body.depth;
        const height = req.body.height;
        const crossed = req.body.crossed;
        const isPriceVissible = req.body.isPriceVissible;
        if (req.file) { image = req.file.path }

        let imageToDelete;

        const furniture = await Furniture.findOne({ _id: _id });
        if (!furniture) return res.status(400).json({ message: `Nie odnaleziono mebla` });

        if (image && furniture.image) {
            imageToDelete = furniture.image;
        }


        if (name) furniture.name = name;
        if (producer) furniture.producer = producer;
        if (partCollection) furniture.partCollection = partCollection;
        if (price) furniture.price = price;
        if (width) furniture.width = width;
        if (depth) furniture.depth = depth;
        if (height) furniture.height = height;
        if (crossed) furniture.crossed = crossed;
        if (isPriceVissible) furniture.isPriceVissible = isPriceVissible;
        if (image) furniture.image = image;

        if (!await furniture.save()) return res.status(400).json({ message: `Nie odnaleziono mebla` });

        if (imageToDelete) fs.unlinkSync(imageToDelete);

        res.status(201).json({
            message: `Success`,
            data: {
                furniture: furniture
            }
        })

    } catch (error) {
        return res.status(400).json({ message: `Nie edytowano mebla błąd: ${error.message}` });
    }

}

const deleteFurniture = async (req, res) => {

    try {

        const _id = req.params._id;

        const furniture = await Furniture.findOne({ _id: _id });

        if(!await furniture.deleteOne({ _id: _id })) return res.status(400).json({ message: `Nie usunięto mebla` });

        fs.unlinkSync(furniture.image)
        res.sendStatus(204);

    } catch (error) {
        res.status(400).json({ message: `Nie usunięto mebla błąd: ${error.message}` });
    }

}

const deleteImage = async (req, res) => {

}

const furnitureActions = {
    getAllFurniture,
    getPieceOfFurniture,
    saveFurniture,
    editFurniture,
    deleteFurniture,
    deleteImage
}

module.exports = furnitureActions;
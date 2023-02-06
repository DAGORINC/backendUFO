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
        partCollection: req.body.collection,
        price: req.body.price,
        width: req.body.width,
        depth: req.body.depth,
        height: req.body.height,
        crossed: req.body.crossed,
        designedForTheLivingRoom: req.body.designedForTheLivingRoom,
        designedForTheKitchen: req.body.designedForTheKitchen,
        designedForTheBedroom: req.body.designedForTheBedroom,
        designedForTheOffice: req.body.designedForTheOffice,
        designedForTheYouthRoom: req.body.designedForTheYouthRoom,
        designedForTheHallway: req.body.designedForTheHallway,
        designedForTheChildrensRoom: req.body.designedForTheChildrensRoom,
        designedForTheBathroom: req.body.designedForTheBathroom,
        categories: req.body.categories,
        isPriceVissible: req.body.isPriceVissible,
        image: req.file.path
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
        if (error && newFurniture.path) fs.unlinkSync(newFurniture.path);
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
        const partCollection = req.body.collection;
        const price = req.body.price;
        const width = req.body.width;
        const depth = req.body.depth;
        const height = req.body.height;
        const crossed = req.body.crossed;
        const designedForTheLivingRoom = req.body.designedForTheLivingRoom;
        const designedForTheKitchen = req.body.designedForTheKitchen;
        const designedForTheBedroom = req.body.designedForTheBedroom;
        const designedForTheOffice = req.body.designedForTheOffice;
        const designedForTheYouthRoom = req.body.designedForTheYouthRoom;
        const designedForTheHallway = req.body.designedForTheHallway;
        const designedForTheChildrensRoom = req.body.designedForTheChildrensRoom;
        const designedForTheBathroom = req.body.designedForTheBathroom;
        const categories = req.body.categories;
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
        if (designedForTheLivingRoom) furniture.designedForTheLivingRoom = designedForTheLivingRoom;
        if (designedForTheKitchen) furniture.designedForTheKitchen = designedForTheKitchen;
        if (designedForTheBedroom) furniture.designedForTheBerdoom = designedForTheBedroom;
        if (designedForTheOffice) furniture.designedForTheOffice = designedForTheOffice;
        if (designedForTheYouthRoom) furniture.designedForTheYouthRoom = designedForTheYouthRoom;
        if (designedForTheHallway) furniture.designedForTheHallway = designedForTheHallway;
        if (designedForTheChildrensRoom) furniture.designedForTheChildrensRoom = designedForTheChildrensRoom;
        if (designedForTheBathroom) furniture.designedForTheBathroom = designedForTheBathroom;
        if (categories) furniture.categories = categories;
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

        if (!await furniture.deleteOne({ _id: _id })) return res.status(400).json({ message: `Nie usunięto mebla` });

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
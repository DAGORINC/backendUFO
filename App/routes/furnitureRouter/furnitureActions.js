const Furniture = require('../../DataBase/models/furniture');
const fs = require('fs');
const { Parser } = require('json2csv')
const csv = require('csv-parser');

const getAllFurniture = async (req, res) => {

    try {
        const furniture = await Furniture.find({});
        if (!furniture) return res.status(400).json({ message: `Nie znaleziono mebli` });

        res.status(200).json({
            message: `Success`,
            furniture: furniture
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
            furniture: furniture
        })

    } catch (error) {
        return res.status(400).json({ message: `Nie odnaleziono mebla: ${error.message}` })
    }

}

const saveFurniture = async (req, res) => {

    const newFurniture = new Furniture({
        name: req.body.name,
        description: req.body.description,
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
            newFurniture: newFurniture
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
        const description = req.body.description;
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
        if (description) { furniture.description = description } else furniture.description = '';
        if (producer) furniture.producer = producer;
        if (partCollection) { furniture.partCollection = partCollection } else furniture.partCollection = '';
        if (price) { furniture.price = price } else furniture.price = 0;
        if (width) { furniture.width = width } else furniture.width = 0;
        if (depth) { furniture.depth = depth } else furniture.depth = 0;
        if (height) { furniture.height = height } else furniture.height = 0;
        if (crossed) { furniture.crossed = crossed } else furniture.crossed = 0;
        if (designedForTheLivingRoom) furniture.designedForTheLivingRoom = designedForTheLivingRoom;
        if (designedForTheKitchen) furniture.designedForTheKitchen = designedForTheKitchen;
        if (designedForTheBedroom) furniture.designedForTheBedroom = designedForTheBedroom;
        if (designedForTheOffice) furniture.designedForTheOffice = designedForTheOffice;
        if (designedForTheYouthRoom) furniture.designedForTheYouthRoom = designedForTheYouthRoom;
        if (designedForTheHallway) furniture.designedForTheHallway = designedForTheHallway;
        if (designedForTheChildrensRoom) furniture.designedForTheChildrensRoom = designedForTheChildrensRoom;
        if (designedForTheBathroom) furniture.designedForTheBathroom = designedForTheBathroom;
        if (categories) furniture.categories = categories;
        if (isPriceVissible) furniture.isPriceVissible = isPriceVissible;
        if (image) furniture.image = image;

        if (!await furniture.save()) return res.status(400).json({ message: `Nie odnaleziono mebla` });

        if (imageToDelete) {
            fs.unlinkSync(imageToDelete)
            fs.unlinkSync(imageToDelete.replace('furnituresImages', 'furnituresImages/thumbnailImages'))
        };

        res.status(201).json({
            message: `Success`,
            editedFurniture: furniture
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
        fs.unlinkSync(furniture.image.replace('furnituresImages', 'furnituresImages/thumbnailImages'));
        res.sendStatus(204);

    } catch (error) {
        res.status(400).json({ message: `Nie usunięto mebla błąd: ${error.message}` });
    }

}


// Kontroler do przesyłania pliku CSV i dodawania danych do bazy
const uploadCSV = async (req, res) => {
    try {
        const { file } = req; // Plik CSV

        if (!file) {
            return res.status(400).json({ message: 'Brak pliku CSV.' });
        }

        const results = [];

        fs.createReadStream(file.path)
            .pipe(csv({ separator: ';' })) // Ustaw separator na średnik
            .on('data', (row) => {
                // Tworzenie nowego mebla na podstawie danych z pliku CSV
                const newFurniture = new Furniture({
                    name: row.name,
                    description: row.description,
                    producer: row.producer,
                    partCollection: row.partCollection,
                    price: row.price,
                    width: row.width,
                    depth: row.depth,
                    height: row.height,
                    crossed: row.crossed,
                    isPriceVissible: row.isPriceVissible,
                    designedForTheLivingRoom: row.designedForTheLivingRoom,
                    designedForTheKitchen: row.designedForTheKitchen,
                    designedForTheBedroom: row.designedForTheBedroom,
                    designedForTheOffice: row.designedForTheOffice,
                    designedForTheYouthRoom: row.designedForTheYouthRoom,
                    designedForTheHallway: row.designedForTheHallway,
                    designedForTheChildrensRoom: row.designedForTheChildrensRoom,
                    designedForTheBathroom: row.designedForTheBathroom,
                    categories: row.categories,
                    image: row.image,
                });

                results.push(newFurniture);
            })
            .on('end', async () => {
                // Dodawanie wszystkich mebli do bazy danych
                const savedFurniture = await Furniture.insertMany(results);

                res.status(201).json({
                    message: `Dodano ${savedFurniture.length} mebli do bazy.`,
                    data: {
                        newFurniture: savedFurniture,
                    },
                });

                // Usunięcie pliku CSV po zakończeniu operacji
                fs.unlinkSync(file.path);
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Wystąpił błąd podczas przetwarzania pliku CSV.',
        });
    }
};

const deleteImage = async (req, res) => {

}

const furnitureActions = {
    getAllFurniture,
    getPieceOfFurniture,
    saveFurniture,
    editFurniture,
    deleteFurniture,
    deleteImage,
    uploadCSV,
}

module.exports = furnitureActions;
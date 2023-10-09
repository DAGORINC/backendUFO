const ImageSlider = require('../DataBase/models/imageSlider');
const fs = require('fs');

const getAllImages = async (req, res) => {

    try {
        const images = await ImageSlider.find({});
        if(!images) return res.status(400).json({ message: `Nie znaleziono zdjęć` });

        res.status(200).json({
            message: 'Sucess',
            images: images
        })

    } catch (error) {
        return res.status(400).json({ message: `Nie znaleziono zdjęć. ${error.message}` });
    }

}

const saveImage = async (req, res) => {

    const newImage = new ImageSlider({
        image: req.file.path,
        link: req.body.link,
        isVissible: req.body.isVissible
    })

    try {
        
        if (!await newImage.save()) {
            fs.unlinkSync(newImage.image)
            return res.status(400).json({
                message: `Nie udało się zapisać slajdu`
            });
        }

        res.status(201).json({
            message: `Zapisano slajd w bazie`,
            newImage: newImage
        });

    } catch (error) {
        if (error) fs.unlinkSync(newImage.image);
        return res.status(400).json({
            message: `Nie zapisano slajdu. ${error.message}`
        })
    }
}


const deleteImage = async (req, res) => {
    try {
        
        const _id = req.params._id;

        const imageSlider = await ImageSlider.findOne({ _id: _id });

        if (!await imageSlider.deleteOne({ _id: _id })) return res.status(400).json({ message: `Nie usunięto slajdu` });

        fs.unlinkSync(imageSlider.image)
        res.sendStatus(204);

    } catch (error) {
        res.status(400).json({ message: `Nie usunięto slajdu. ${error.message}` });
    }
}

const imageSliderActions = {
    getAllImages,
    saveImage,
    deleteImage
}

module.exports = imageSliderActions;
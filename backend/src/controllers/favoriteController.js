import { User } from "../models/userModel.js";
import { Product } from "../models/productModel.js";



export const addFavorite = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId } = req.params;

        const product = await Product.findById(productId);
        if (!product){ 
            return res.status(404).json({message: "Product not found"});
        }

        const user = await User.findById(userId);

        if (user.favorites.includes(productId)) {
            return res.status(400).json({
                message: "Already in favorites",
            });
        }

        user.favorites.push(productId);
        await user.save();

        res.status(200).json({
            message: "Added to favorites",
            favorites: user.favorites,
        });

    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};



export const removeFavorite = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId} = req.params;

        const user = await User.findById(userId);


        user.favorites = user.favorites.filter( 
            (id) => id.toString() !== productId
        );

        await user.save();

        res.status(200).json({message: "Removed from favrites",
        favorites: user.favorites,
        });

    }catch (error) {
        res.status(500).json({message: "server error"});
    }
};


export const getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)

        .populate("favorites");

        res.status(200).json(user.favorites);

    } catch (error){
        res.status(500).json({message: "Server error"});
    }
};
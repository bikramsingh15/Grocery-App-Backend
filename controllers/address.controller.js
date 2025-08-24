import Address from "../models/address.model.js";


// Add address: /api/address/add

export const addAddress = async (req, res) => {
    try {
        const userId = req.user;
        const { address } = req.body;
        await Address.create({
            ...address,
            userId
        })

        return res.status(201).json({
            message: "Address Added successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

// get user Address : /api/address/get

export const getAddress = async (req, res) => {
    try {
        const userId = req.user;
        const address = await Address.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Address fetched successfully",
            success: true,
            address
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}
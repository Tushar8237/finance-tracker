import Transaction from "../models/transaction.model.js";

// Add a new transaction
export const createTransaction = async (req, res) => {
    try {
        // Destructure validated fields
        const { title, amount, type, date, category, notes } = req.body;

        // Create new transaction document
        const transaction = new Transaction({
            userId: req.user._id, // Assumes user ID is set via auth middleware
            title,
            amount,
            type,
            date,
            category,
            notes,
        });

        // Save to DB
        const savedTransaction = await transaction.save();

        // Return created transaction
        res.status(201).json(savedTransaction);
    } catch (err) {
        console.error("Error in createTransaction:", err.message);
        res
            .status(500)
            .json({ message: "Server error while creating transaction" });
    }
};

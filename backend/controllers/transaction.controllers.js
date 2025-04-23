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

// Get all transactions for a user with optional filters and pagination
export const getAllTransactions = async (req, res) => {
    try {
        // Destructure query parameters
        const {
            page = 1,
            type,
            category,
            search = "",
            startDate,
            endDate,
        } = req.query;

        const limit = 10; // Set a default limit for pagination

        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        const query = {
            userId: req.user._id, // Filter by user ID
        };

        // Filter by type
        if (type) {
            query.type = type; // Filter by transaction type
        }

        // Filter by category
        if (category) {
            query.category = category; // Filter by category
        }

        // Date range filter
        if (startDate || endDate) {
            query.date = {}; // Initialize date filter object

            if (startDate) {
                query.date.$gte = new Date(startDate); // Greater than or equal to start date
            }

            if (endDate) {
                query.date.$lte = new Date(endDate); // Less than or equal to end date
            }
        }

        // Sear by title or category
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } }, // Case-insensitive search in title
                { category: { $regex: search, $options: "i" } }, // Case-insensitive search in category
            ];
        }

        // Count total documents for pagination
        const totalCount = await Transaction.countDocuments(query); // Get total count of transactions

        // Find matching transactions
        const transactions = await Transaction.find(query)
            .sort({ date: -1 }) // Sort by date descending
            .skip(skip) // Skip documents for pagination
            .limit(limit); // Limit number of documents returned

        // Return paginated transactions and total count
        res.status(200).json({
            success: true,
            totalPages: Math.ceil(totalCount / limit), // Calculate total pages
            currentPage: Number(page), // Current page number
            totalItems: totalCount, // Total number of transactions
            transactions, // All transactions
        });
    } catch (err) {
        console.error("Error in getAllTransactions:", err.message);
        res
            .status(500)
            .json({ message: "Server error while fetching transactions" });
    }
};

// Get a single transaction by ID
export const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params; // Extract transaction ID from request parameters

        // Find transaction by ID and user ID
        const transaction = await Transaction.findOne({
            _id: id,
            userId: req.user._id,
        });

        // If transaction not found, return 404 error
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        // Return the found transaction
        res.status(200).json(transaction);
    } catch (err) {
        console.error("Error in getTransactionById:", err.message);
        res
            .status(500)
            .json({ message: "Server error while fetching transaction" });
    }
};

// Update a transaction by ID
export const updateTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id; // Extract transaction ID from request parameters

        // Find and update transaction by ID and user ID
        const updatedTransaction = await Transaction.findOneAndUpdate(
            { _id: transactionId, userId: req.user._id },
            req.body,
            { new: true } // Return the updated document
        );

        // If transaction not found, return 404 error
        if (!updatedTransaction) {
            return res
                .status(404)
                .json({ message: "Transaction not found or unauthorized" });
        }

        // Return the updated transaction
        res.status(200).json(updatedTransaction);
    } catch (error) {
        console.error("Error in updateTransaction:", error.message);
        res
            .status(500)
            .json({ message: "Server error while updating transaction" });
    }
};

// Delete a transaction by ID
export const deleteTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id; // Extract transaction ID from request parameters

        // Find and delete transaction by ID and user ID
        const deletedTransaction = await Transaction.findOneAndDelete({
            _id: transactionId,
            userId: req.user._id,
        });

        // If transaction not found, return 404 error
        if (!deletedTransaction) {
            return res
                .status(404)
                .json({ message: "Transaction not found or unauthorized" });
        }

        // Return success message
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        console.error("Error in deleteTransaction:", error.message);
        res
            .status(500)
            .json({ message: "Server error while deleting transaction" });
    }
};

// Get Total Income, Expense and Balance
export const getTotalIncomeExpense = async (req, res) => {
    try {
        const userId = req.user._id; // Get user ID from request

        const transaction = await Transaction.find({ userId }); // Find all transactions for the user

        const summary = transaction.reduce(
            (acc, tnx) => {
                if (tnx.type === "income") {
                    acc.totalIncome += tnx.amount; // Add to total income
                } else {
                    acc.totalExpense = tnx.amount; // Add to total expense
                }
                return acc; // Return the accumulator
            },
            { totalIncome: 0, totalExpense: 0 } // Initial values for the accumulator
        );

        summary.balance = summary.totalIncome - summary.totalExpense; // Calculate balance

        res.status(200).json({
            message: "Total income, expense and balance fetched successfully",
            data: summary, // Return the summary
        });
    } catch (error) {
        console.error("Error in getTotalIncomeExpense:", error.message);
        res
            .status(500)
            .json({
                message: "Server error while fetching total income and expense",
            });
    }
};

// Get pie chart data for income vs expense
export const getPieChartData = async (req, res) => {
    try {
        const userId = req.user.id;

        const transactions = await Transaction.find({ userId: userId });

        let income = 0;
        let expense = 0;
        
        transactions.forEach((tx) => {
            if (tx.type === "income") {
                income += tx.amount;
            } else if (tx.type === "expense") {
                expense += tx.amount;
            }
        });

        res.status(200).json({
            data: [
                { name: "Income", value: income },
                { name: "Expense", value: expense },
            ],
        });
    } catch (error) {
        console.error("Pie chart data error:", error.message);
        res
            .status(500)
            .json({ message: "Server error while fetching pie chart data" });
    }
};

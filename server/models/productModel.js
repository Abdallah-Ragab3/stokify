const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a product name'],
            trim: true
        },
        barcode: {
            type: String,
            required: [true, 'Please add a barcode'],
            unique: true,
            trim: true
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
            trim: true
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
            min: [0, 'Price cannot be negative']
        },
        costPrice: {
            type: Number,
            required: [true, 'Please add a cost price'],
            min: [0, 'Cost price cannot be negative']
        },
        quantity: {
            type: Number,
            required: [true, 'Please add quantity'],
            min: [0, 'Quantity cannot be negative'],
            default: 0
        },
        unit: {
            type: String,
            required: [true, 'Please add a unit'],
            enum: ['piece', 'kg', 'liter', 'meter'],
            default: 'piece'
        },
        minQuantity: {
            type: Number,
            required: [true, 'Please add minimum quantity'],
            min: [0, 'Minimum quantity cannot be negative'],
            default: 0
        },
        description: {
            type: String,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

// Add index for barcode search
productSchema.index({ barcode: 1 });

// Add index for category and name search
productSchema.index({ category: 1, name: 1 });

// Virtual for profit margin
productSchema.virtual('profitMargin').get(function() {
    return ((this.price - this.costPrice) / this.price * 100).toFixed(2);
});

// Method to check if product is low in stock
productSchema.methods.isLowStock = function() {
    return this.quantity <= this.minQuantity;
};

// Middleware to prevent deletion if quantity > 0
productSchema.pre('remove', async function(next) {
    if (this.quantity > 0) {
        throw new Error('Cannot delete product with existing stock');
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);

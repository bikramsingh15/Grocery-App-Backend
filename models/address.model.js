import mongoose from 'mongoose'

const AddressSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            require: true
        },
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        street: {
            type: String,
            require: true
        },
        city: {
            type: String,
            require: true
        },
        state: {
            type: String,
            require: true
        },
        zipCode: {
            type: Number,
            require: true
        },
        country: {
            type: String,
            require: true
        },
        phone: {
            type: Number,
            require: true
        }
    },
    { timestamps: true }
)

const Address = mongoose.model('Address', AddressSchema);

export default Address;
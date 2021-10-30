import mongoose, { Schema, Model, model, Document } from 'mongoose'

const productsSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        shortDescription: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: [
            {
                type: String,
                required: true
            }
        ],
        category: [
            {
                type: String,
                required: true
            }
        ]
    },
    { timestamps: true }
)

export interface ProductsDocument extends Document {
    name: string
    url: string
    shortDescription: string
    description: string
    price: number
    image: string[]
    category: string[]
}

const Products: Model<ProductsDocument> = model('Product', productsSchema)

delete mongoose.connection.models['Product']

export default mongoose.models.Products || Products

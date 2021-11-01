import mongoose, { Schema, Model, model, Document } from 'mongoose'

const productsSchema: Schema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true
        },
        url: {
            type: Schema.Types.String,
            required: true
        },
        description: {
            type: Schema.Types.String,
            required: true
        },
        price: {
            type: Schema.Types.Number,
            required: true
        },
        image: [
            {
                type: Schema.Types.String,
                required: true
            }
        ],
        category: [
            {
                type: Schema.Types.String,
                required: true
            }
        ],
        fields: [{}]
    },
    { timestamps: true }
)

export interface ProductsDocument {
    _id: string
    name: string
    url: string
    description: string
    price: number
    image: string[]
    category: string[]
    fields: object[]
    qty?: number
}

const Products: Model<ProductsDocument> = model('Product', productsSchema)

delete mongoose.connection.models['Product']

export default Products

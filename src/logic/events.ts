import { event } from '@pulsejs/core'

// Types
import { ProductsDocument } from '../models/products'
import { ProductField } from './../config/types'

const logout = event()

const changeTitle = event<string>()

const addProductField = event()
const handleAddProductField = event<ProductField>()

const editProduct = event<ProductsDocument>()
const deleteProduct = event<ProductsDocument[]>()

const fetchProductsList = event()

const events = {
    logout,

    changeTitle,

    addProductField,
    handleAddProductField,

    editProduct,
    deleteProduct,

    fetchProductsList
}

export default events

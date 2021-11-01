import { event } from '@pulsejs/core'
import { ProductField } from './../config/types'

const logout = event()

const changeTitle = event<string>()

const addProductField = event()
const handleAddProductField = event<ProductField>()

const events = {
    logout,

    changeTitle,

    addProductField,
    handleAddProductField
}

export default events

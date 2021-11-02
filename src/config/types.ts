import { IconProps } from 'phosphor-react'

// Primary types
export interface ProductField {
    type: 'text'
    textTitle?: string
    textValue?: string
}

export interface Cart {
    product_id: string
    qty: number
}

// Auth
export interface User {
    _id: string
    role: 'customer' | 'admin'
    firstname: string
    lastname: string
    email: string
    address: string
    phone: string
    exp: number
    iat: number
}

// Misc
export interface NavLinks {
    title: string
    path: string
}

export interface BottomNavLinks {
    title: string
    path: string
    icon: React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
    >
}

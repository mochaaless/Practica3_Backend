export type Movement ={
    sender: Iban
    receiver: Iban
    quantity: number
}

export type Client = {
    dni: string
    name: string
    phone: number
    iban: Iban
    balance: number
    movements: Movement[]
    hipoteca: Hipoteca[]
    gestor: Gestor
}

export type Hipoteca ={
    total_quantity: number
    cuotes: Cuotes[]
    dni_client: string

}

export type Gestor = {
    name: string
    hipotecas : Hipoteca[] 
}

export type Cuotes = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

export type Iban = `ES${string & { length: 20 }}`;

export interface Item {
    amount: number,
    cost: number,
    description: string,
    id: number,
    name: string,
    photo: string,

}

export interface ItemAdd {
    cost: number,
    description: string,
    name: string,
    photo: string,
    type:string,
}

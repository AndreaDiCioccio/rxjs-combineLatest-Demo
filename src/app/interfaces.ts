export interface Item{
    id:number
    name:string
    price:number
    rating?:number
    ratingCount?:number
}

export interface Rating{
    id:number
    itemId:number
    rate:number
}

export interface ItemAndRating extends Item{
    rating:number
    ratingCount:number
}
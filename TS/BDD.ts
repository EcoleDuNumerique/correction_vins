export const BDD:{ 
    categories : { id:number, name:string}[],
    products : { id:number, name: string, categoryId: number }[],
    vendors : { id: number, name: string, products: number[] }[]
 } 
    = {

    categories: [
        {
            id: 1,
            name: "rouge"
        },
        {
            id: 2,
            name: "rose"
        },
        {
            id: 3,
            name: "blanc"
        },
    ],
    products : [
        {
            id : 1,
            name : "bordeaux",
            categoryId : 1
        },
        {
            id : 2,
            name : "rivesalte",
            categoryId : 3
        }
    ],
    vendors : [
        {
            id: 1,
            name: "Paul",
            products : [ 1, 2 ]
        },
        {
            id: 2,
            name: "Jeremy",
            products : [ 2 ]
        },
        {
            id: 3,
            name: "Stephane",
            products : [ 1 ]
        }

    ]


}
export const initialState = {
    basket: [],
    user: null,

}
//this is a selector
export const getBasketTotal = (basket) =>
    // this acts as a for loop adds everything and puts the value in amount variable
    basket?.reduce((amount, item) => item.price + amount, 0)


const reducer = (state , action ) => {
    console.log(action)
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]

            }
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket:[],
            }

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            )
            let newBasket = [...state.basket];

            if ( index >= 0) {
                newBasket.splice(index , 1)
            } else {
                console.warn('cant remove id of product (id: ${ action.id }) as its not in Basket')
            }
            return {
                ...state,
                basket:newBasket
            }
            case 'SET_USER':
                return {
                    ...state,
                    user : action.user
                }    
        default:
            return state    
    }
}

export default reducer;
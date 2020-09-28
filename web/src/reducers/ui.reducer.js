// import Constant from '../helper/constant';
const initState = {
  isLoading: false,
  hidden_hf: false,
  popup: {
    display: false,
    title:'',
    message: ''
  },
  hidden_modal: false,
  categories: [],
  brands: [],
  products: {},
  new_products: [],
  carts: []
}
const ui = (state = initState, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true };
    case 'READY':
      return { ...state, isLoading: false };
    case 'TOGGLE_POPUP':
      return { ...state, popup: action.popup };
    case 'TOGGLE_MODAL':
      return { ...state, hidden_modal: !state.hidden_modal };
    case 'GET_HOME':
      let home = {}
      if(action.categories)home.categories = action.categories
      if(action.brands)home.brands = action.brands
      if(action.new_products)home.new_products = action.new_products
      if(action.products)home.products = action.products
      return { ...state, ...home };
    case 'LOAD_MODE_PRODUCTS':
      return { ...state, products: action.products };
    // case 'GET_CATEGORIES':
    //   return { ...state, categories: action.categories };
    // case 'GET_BRANDS':
    //   return { ...state, brands: action.brands };
    case 'GET_CARTS':
      return { ...state, carts: action.carts };
    case 'HIDDEN_HF':
      return { ...state, hidden_hf: action.hidden_hf };
    default:
      return state
  }
}

export default ui
// Contestants
const WITHDRAW_MONEY = "WITHDRAW_MONEY";
const DEPOSIT_MONEY = "DEPOSIT_MONEY";
const ADD_PRODUCT = "ADD_PRODUCT";
const GET_PRODUCT = "GET_PRODUCT";

// Action creators
const withdraw = (amount) => ({
  type: WITHDRAW_MONEY,
  payload: amount,
});

const deposit = (amount) => ({
  type: DEPOSIT_MONEY,
  payload: amount,
});

const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

const getProducts = (products) => ({
  type: GET_PRODUCT,
  payload: products,
});

const fetchProducts = () => async (dispatch) => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  dispatch(getProducts(data));
};

// Reducers
const bankReducer = (state = 1000, action) => {
  switch (action.type) {
    case WITHDRAW_MONEY:
      return state - action.payload;
      break;
    case DEPOSIT_MONEY:
      return state + action.payload;
      break;
    default:
      return state;
      break;
  }
};

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return [...action.payload];
      break;
    case ADD_PRODUCT:
      return [...state, action.payload];
      break;
    default:
      return state;
      break;
  }
};

const appReducer = Redux.combineReducers({
  bank: bankReducer,
  products: productsReducer,
});

const store = Redux.createStore(appReducer, Redux.applyMiddleware(ReduxThunk));

document.querySelector("#value").innerHTML = store.getState().bank;
let amountInput = document.querySelector("input");
document.querySelector("#withdraw").addEventListener("click", () => {
  store.dispatch(withdraw(+amountInput.value));
});
document.querySelector("#deposit").addEventListener("click", () => {
  store.dispatch(deposit(+amountInput.value));
});

store.subscribe(() => {
  document.querySelector("#value").innerHTML = store.getState().bank;
});

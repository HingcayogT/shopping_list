import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  UPDATE_ITEM,
} from '../actions/types';

const initialState = {
  items: [],
  loading: false
};

export default function (state = initialState, action) {

  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: updateItem_([...state.items], action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

//only change the updated name value of the items 
const updateItem_ = (items, payload) => {
  let index = items.findIndex(item => item._id === payload.id);
  items[index].name = payload.name;
  return items
}




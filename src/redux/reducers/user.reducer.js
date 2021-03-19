const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

// export const editUser = (state ={}, action) => {
//   switch (action.type) {
//     case 'UPDATE_USER':
//       return {...state, [action.payload.key]: action.payload}
//   }
// }

// //then
// import state, { editUser } from './'

// user will be on the redux state at:
// state.user
export default userReducer;

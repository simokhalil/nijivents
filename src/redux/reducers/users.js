// users reducer

const initialState = {
  isUserFetchFinished: false,
};

export default function users(state = initialState, action) {
  const authUser = action.data;

  switch (action.type) {
    case 'USER_SIGNED_IN':
      return {
        ...state,
        authUser,
        isUserFetchFinished: true,
      };

    case 'USER_SET_REDUX':
      return {
        ...state,
        authUser: {
          ...state.authUser,
          ...action.payload.user,
        },
        isUserFetchFinished: true,
      };

    case 'USER_SIGNED_OUT':
      return {
        isUserFetchFinished: true,
      };

    // initial state
    default:
      return state;
  }
}

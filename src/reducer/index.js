
export const INITIAL_STATE = {
  loading: true,
  data: {},
  error: '',
}

export const reducer = (state, action) => {
  if (action === 'REQUEST') {
    return {
      ...state,
      loading: true,
    }
  }

  if (action.type === 'SUCCESS') {
    return {
      ...state,
      loading: false,
      data: action.data,
    };
  }

  if (action.type === 'FAILURE') {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }
  return state
}

import { useReducer, useEffect } from 'react'
import api from '../api'

const INITIAL_STATE = {
  loading: true,
  data: {}
}

const reducer = (state, action) => {
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
  return state
}

const useModel = () => {
  const useGet = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const carregar = async () => {
      dispatch({ type: "REQUEST" })
      const res = await api.get(`${resource}.json`)
      dispatch({ type: "SUCCESS", data: res.data })
    }

    useEffect(() => {
      carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resource])
    
    return {
      ...data,
      refetch: carregar
    }
  }

  const usePost = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    const post = async(data) => {
      dispatch({ type: 'REQUEST' })
        
      const res = await api.post(`${resource}.json`, data)
      dispatch({
        type: 'SUCCESS',
        data: res.data,
      })
    }
    return [data, post]
  }

  const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    const remove = async(resource) => {
      dispatch({ type: 'REQUEST' })

      await api.delete(`${resource}.json`)
      dispatch({ type: 'SUCCESS' })
    }
    return [data, remove]
  }

  const usePatch = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    const patch = async (resource, data) => {
      dispatch({ type: 'REQUEST' })

      await api.patch(`${resource}.json`, data)
      dispatch({ type: 'SUCCESS' })
    }
    return [data, patch]
  }

  return {
    useGet,
    usePost,
    useDelete,
    usePatch
  }
}

export default useModel
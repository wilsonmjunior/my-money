import { useReducer, useEffect } from 'react'
import { getToken } from './useAuth'

import api from '../api'
import { reducer, INITIAL_STATE } from '../reducer'

// axios.defaults.validateStatus = code => code < 500


const useModel = () => {
  const useGet = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const carregar = async () => {
      dispatch({ type: "REQUEST" })
      await api.get(`${resource}.json?auth=${getToken()}`)
        .then(res => {
          dispatch({ type: "SUCCESS", data: res.data })
        })
        .catch(error => {
          dispatch({ type: "FAILURE", error: error.response.data.error })
        })
      
      // try {
      //   dispatch({ type: "REQUEST" })
      //   const res = await axios.get(`https://mymoney-c13cc.firebaseio.com/${resource}.json${getAuth()}`)

      //   if (res.data.error && Object.keys(res.data.error).length > 0) {
      //     dispatch({ type: "FAILURE", error: res.data.error })
      //   } else {
      //     dispatch({ type: "SUCCESS", data: res.data })
      //   }
      // } catch (error) {
      //   dispatch({ type: "FAILURE", error: error.response.data.error })
      // }
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
        
      const res = await api.post(`${resource}.json?auth=${getToken()}`, data)
      dispatch({
        type: 'SUCCESS',
        data: res.data,
      })
    }
    return [data, post]
  }

  const useDelete = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    const remove = async(id) => {
      dispatch({ type: 'REQUEST' })

      await api.delete(`${resource}/${id}.json?auth=${getToken()}`)
      dispatch({ type: 'SUCCESS' })
    }
    return [data, remove]
  }

  const usePatch = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

    const patch = async (data) => {
      dispatch({ type: 'REQUEST' })

      await api.patch(`${resource}.json?auth=${getToken()}`, data)
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
import { useReducer } from 'react'

import { reducer, INITIAL_STATE } from '../reducer'

import axios from 'axios'
axios.defaults.validateStatus = code => code < 500 

export const usePost = (resource) => {
  const [data, dispatch] = useReducer(reducer, INITIAL_STATE)

  const post = async (data) => {
    dispatch({ type: 'REQUEST' })

    try {
      const res = await axios.post(resource, data)
      if (res.data.error && Object.keys(res.data.error).length > 0) {
        dispatch({
          type: 'FAILURE',
          error: res.data.error.message,
        })
      } else {
        dispatch({
          type: 'SUCCESS',
          data: res.data,
        })
      }
      return res.data
    } catch (error) {
      dispatch({
        type: 'FAILURE',
        error: 'unknow error',
      })
    }
  }
  return [data, post]
}

export const isAuthenticated = () => localStorage.getItem('token') !== null;

export const getToken = () => localStorage.getItem('token');

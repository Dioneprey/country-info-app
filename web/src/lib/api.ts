import { env } from '@/env'
import axios from 'axios'
import { toast } from 'sonner'

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 500) {
      toast.error('Internal error!')
    }

    return Promise.reject(error)
  },
)
import axios from 'axios'

// State
import core from '../logic/core'

/**
 * Handles fetching with axios
 *
 * @param url - Specify endpoint
 * @param method - The method the request is going to use
 * @param data - Body data
 * @returns
 */
const fetcher = async (
    url: string,
    method: 'GET' | 'POST',
    data?: Object,
    headers?: any
) => {
    return axios({
        url,
        method: method,
        data: data,
        headers: {
            authentication: `Bearer ${core.state.token.value}`,
            ...headers
        }
    })
}

export default fetcher

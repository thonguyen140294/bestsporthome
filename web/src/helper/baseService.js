import axios from 'axios'

const requestApi = async (method, url, header, body) => {
    return new Promise((resolve, reject) => {
        axios.request({
            method: method.toUpperCase(),
            url: url,
            headers: Object.assign({'Content-Type': 'application/json'}, header),
            data: body
        })
        .then(result => resolve(result.data))
        .catch(error => reject(error))
    })
}

export default requestApi
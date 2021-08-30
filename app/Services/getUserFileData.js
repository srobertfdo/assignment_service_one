'use strict'
const axios = require('axios');
const Env = use('Env')
const ApplicationException = use('App/Exceptions/ApplicationException')

class GetUserFileData {
    async get(id) {
        try {
            let URL =  `${Env.get('SERVICE_TWO_BASEURL')}${id}${Env.get('GET_USER_FILE_DATA')}`

            return await axios.get(URL)
                .then(function (res) {
                    return res.data
                })
                .catch(function (error) {
                    throw new ApplicationException(error)
                })
        } catch (error) {
            throw new ApplicationException(error)
        }
    }
}

module.exports = GetUserFileData

'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const RabbitMq = use('Robert/RabbitMq')
const ProtoBuffer = use('Robert/ProtoBuffer')
const ApplicationException = use('App/Exceptions/ApplicationException')
const GetUserFileData = use('App/Services/GetUserFileData')
const { v4: uuidv4 } = require('uuid');
const Encryption = use('Encryption')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      let uuid = await uuidv4()
      let options = {headers: request.headers(), correlationId: uuid}

      await RabbitMq.publish(await ProtoBuffer.encode(request.body), options)
      
      return response
        .status(200)
        .send({ 
          message: 'User details created!',  
          data: {'uuid': uuid}
        })
    } catch (err) {
      throw new ApplicationException(err)
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {
    try {
      let userFileDataService =  new GetUserFileData()

      let userFileData = await userFileDataService.get(params.id)

      if(userFileData){
        return response
        .status(200)
        .send({ 
          message: 'User file details!',  
          data: JSON.parse(Encryption.decrypt(userFileData.data))
        })
      } else {
        return response
        .status(400)
        .send({ 
            message: 'User file not found!',  
        })
      }
    } catch (error) {
      throw new ApplicationException(error)
    }
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      let options = {headers: request.headers(), correlationId: params.id}

      await RabbitMq.publish(await ProtoBuffer.encode(request.body), options)

      return response
        .status(200)
        .send({ 
          message: 'User details updated!',  
          data: {'uuid': params.id}  
        })
    } catch (err) {
      throw new ApplicationException(error)
    }
  }

}

module.exports = UserController

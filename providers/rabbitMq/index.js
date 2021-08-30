const rabbit = require('amqplib');
const ApplicationException = use('App/Exceptions/ApplicationException')
const Logger = use('Logger')

class RabbitMq {
  
    constructor (Config) {
      this.RMQ_CONFIG = Config.get('rabbitmq')  
    }

    async publish(message, options) {
      try {
        Logger.info('Publishing data...!');

        const connection = rabbit.connect(this.RMQ_CONFIG.URL)
        
        return connection.then(async (conn)=>{
          const channel = await conn.createChannel();
          await channel.assertExchange(this.RMQ_CONFIG.EXCHANGE_NAME, this.RMQ_CONFIG.EXCHANGE_TYPE);
          await channel.assertQueue(this.RMQ_CONFIG.QUEUE_NAME);
          channel.bindQueue(this.RMQ_CONFIG.QUEUE_NAME, this.RMQ_CONFIG.EXCHANGE_NAME, this.RMQ_CONFIG.KEY);

          channel.sendToQueue(this.RMQ_CONFIG.QUEUE_NAME, message, options)
          
          Logger.info('Published!');
        })
      } catch (err) {
        throw new ApplicationException(err)
      }
    }
}
  
module.exports = RabbitMq
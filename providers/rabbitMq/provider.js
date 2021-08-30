const { ServiceProvider } = require('@adonisjs/fold')

class RabbitMqProvider extends ServiceProvider {
  register () {
    this.app.singleton('Robert/RabbitMq', () => {
      const Config = this.app.use('Adonis/Src/Config')

      return new (require('.'))(Config)
    })
  }

  boot () {
    
  }
}

module.exports = RabbitMqProvider
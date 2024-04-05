import { injectable } from 'tsyringe'
import amqp from 'amqplib/callback_api'
import { IMqProvider } from '../i-mq-provider'
import { noContent, serverError, HttpResponse } from '@shared/helpers'

@injectable()
class RabbitMqProvider implements IMqProvider {
  private credentials: any

  constructor() {
    this.credentials = { credentials: require('amqplib').credentials.plain(process.env.MQ_USER, process.env.MQ_PASS) }
  }

  sender(queue: string, route: string, payload: string): Promise<HttpResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        amqp.connect(`amqp://${process.env.MQ_HOST}`, this.credentials, (connectionError, connection) => {
          if (connectionError) {
            return serverError(connectionError)
          }

          connection.createChannel((channelError, channel) => {
            if (channelError) {
              return serverError(channelError)
            }

            channel.assertQueue(queue, {
              durable: true
            })

            channel.sendToQueue(queue, Buffer.from(payload))

          })
        })

        return noContent()
      } catch (error) {
        reject(serverError(error));
      }
    })
  }
  
  worker(queue: string): Promise<void> {
    amqp.connect(`amqp://${process.env.MQ_HOST}`, this.credentials, (connectionError, connection) => {
      if (connectionError) {
        return serverError(connectionError)
      }

      connection.createChannel((channelError, channel) => {
        if (channelError) {
          return serverError(channelError)
        }

        channel.assertQueue(queue, {
          durable: false
        })

        console.log("RabbitMq Worker on queue %s is running!", queue);

        channel.consume(queue, function(msg) {
          console.log(" [x] Received %s", JSON.parse(msg.content.toString()));
        }, {
          noAck: true
        })
      })
    })

    return
  }
}

export { RabbitMqProvider }

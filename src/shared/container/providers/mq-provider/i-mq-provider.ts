import { HttpResponse } from '@shared/helpers'

interface IMqProvider {
  sender(queue: string, route: string, payload: string): Promise<HttpResponse>,
  worker(queue: string): Promise<void>
}

export { IMqProvider }

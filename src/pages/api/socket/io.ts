import { Server as NetServer } from 'http'
import { NextApiRequest } from 'next'
import { Server as ServerIO } from 'socket.io'

import { NextApiResponseServerIO } from '@/types'

export const config = {
  api: {
    bodyParser: false,
  },
}

const ioHandler = (
  request: NextApiRequest,
  response: NextApiResponseServerIO,
) => {
  if (!response.socket.server.io) {
    const path = '/api/socket/io'
    const httpServer: NetServer = response.socket.server as any
    const io = new ServerIO(httpServer, {
      path,
      addTrailingSlash: false,
    })

    response.socket.server.io = io
  }

  response.end()
}

export default ioHandler

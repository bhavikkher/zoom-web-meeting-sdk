const crypto = require('crypto')

export default function handler(req, res) {
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(process.env.NEXT_PUBLIC_ZOOM_JWT_API_KEY + req.body.meetingNumber + timestamp + 0).toString('base64')
  const hash = crypto.createHmac('sha256', process.env.NEXT_PUBLIC_ZOOM_JWT_API_SECRET).update(msg).digest('base64')
  const signature = Buffer.from(`${process.env.NEXT_PUBLIC_ZOOM_JWT_API_KEY}.${req.body.meetingNumber}.${timestamp}.${req.body.role}.${hash}`).toString('base64')

  res.status(200).json({
    signature: signature
  })
}

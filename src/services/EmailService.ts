import { User } from '../models/User'

export class EmailService {
  nodeMailer = require('nodemailer')

  emailPerdidogs: string = process.env.EMAIL_USER || ''

  pass: string = process.env.EMAIL_PASS || ''

  transporter: any

  smtpConfig: any

  constructor() {
    this.smtpConfig = {
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: this.emailPerdidogs,
        pass: this.pass
      }
    }
    this.transporter = this.nodeMailer.createTransport(this.smtpConfig)
  }

  sendEmail(sender: User, receiverEmail: string, message: string) {
    const mailOptions = {
      from: `"Perdidogs" <${this.emailPerdidogs}>`,
      to: receiverEmail,
      subject: 'Nuevo mensaje de ' + sender.name + ' ' + sender.surname,
      text: message
    }

    this.transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email enviado: ' + info.response)
      }
    })
  }

  passwordRecover(receiverEmail: string, link: string) {
    const mailOptions = {
      from: `"Perdidogs" <${this.emailPerdidogs}>`,
      to: receiverEmail,
      subject: 'Nueva contraseña solicitada',
      text: 'Hace click acá: \n' + link
    }

    this.transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email enviado: ' + info.response)
      }
    })
  }
}

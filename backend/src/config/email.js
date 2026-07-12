import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const enviarEmailVerificacao = async (email, nome, codigo) => {
  await transporter.sendMail({
    from: `"Sintaxia" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🔐 Confirme seu cadastro no Sintaxia',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; background: #0a0520; color: white; padding: 32px; border-radius: 16px;">
        <h1 style="color: #a78bfa; font-size: 24px; margin-bottom: 8px;">Sintaxia</h1>
        <h2 style="color: #e2e8f0; font-size: 18px; margin-bottom: 16px;">Olá, ${nome}! 👋</h2>
        <p style="color: #94a3b8; margin-bottom: 24px;">
          Use o código abaixo para confirmar seu cadastro:
        </p>
        <div style="background: #1a0a40; border: 2px solid #7c3aed; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
          <span style="font-size: 40px; font-weight: 900; letter-spacing: 12px; color: #a78bfa;">
            ${codigo}
          </span>
        </div>
        <p style="color: #64748b; font-size: 13px;">
          Este código expira em <strong style="color: #f87171;">15 minutos</strong>.<br/>
          Se você não criou uma conta no Sintaxia, ignore este email.
        </p>
      </div>
    `
  })
}
import { BrevoClient } from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

export const enviarEmailVerificacao = async (email, nome, codigo) => {
  try {
    await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: "SintaxIA",
        email: "victor.hugo.rf4@gmail.com",
      },
      to: [
        {
          email,
          name: nome,
        },
      ],
      subject: "🔐 Confirme seu cadastro no SintaxIA",
      htmlContent: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#0a0520;color:white;padding:32px;border-radius:16px;">
          <h1 style="color:#a78bfa;">SintaxIA</h1>

          <p>Olá, <strong>${nome}</strong> 👋</p>

          <p>Use o código abaixo para confirmar seu cadastro:</p>

          <div style="
            background:#1a0a40;
            border:2px solid #7c3aed;
            padding:20px;
            text-align:center;
            border-radius:12px;
            font-size:36px;
            font-weight:bold;
            letter-spacing:10px;
            color:#a78bfa;
          ">
            ${codigo}
          </div>

          <p style="margin-top:20px;">
            Este código expira em <strong>15 minutos</strong>.
          </p>
        </div>
      `,
    });

    console.log(`Email enviado para ${email}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
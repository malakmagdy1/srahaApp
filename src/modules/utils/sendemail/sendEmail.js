import nodemailer from "nodemailer";
export const sendEmail =async (to,subject,html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOSTMAIL,
    port: process.env.PORTMAIL,
    secure: true, // true for 465, false for other ports
    auth: {
      user:process.env.USERMAIL,
      pass:process.env.PASSMAIL,
    },
  });
  const main = async () => {
    const info = await transporter.sendMail({
       from: `sarahaApp <${process.env.USERMAIL}>`,
        to,
        subject,
        html
    });
  };
  main().catch((err)=>{
    console.log({emailError:err})
  })
};

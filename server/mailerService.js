import nodemailer from 'nodemailer';

// Backend service part that uses Node Mailer

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'audie.willms@ethereal.email',
        pass: 'TGrCg11NSrD15CVD9c'
    }
});

export const send = async (content) => {
    const info = await transporter.sendMail({
        from: 'do_not_reply@northpole.com',
        to: "santa@northpole.com",
        subject: "Letter to Santa!",
        text: `Hi Santa! I my name is ${content.username}! and I live in ${content.address} 
        I wish you could send me ${content.wish} for christmas.`,
      });
    
      console.log("Message sent: %s", info.messageId);
}
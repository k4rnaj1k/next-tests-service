'use server'

export default async function sendMessage(text: string, email: string) {

    const messageText = `New Form Submission:${email && '\nEmail:' + email}\nMessage: ${text}`;
    console.log(messageText)
    console.log(JSON.stringify({ chat_id: CHAT_ID, text: messageText }))
    try {
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chat_id: CHAT_ID, text: messageText })
      });
      console.log(await res.json())
    } catch(e) {

    }
};
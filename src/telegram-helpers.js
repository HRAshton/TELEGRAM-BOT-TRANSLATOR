export const parsePayload = (payload) => {
    if ('message' in payload) {
        const chatId = payload.message.chat.id;
        const input = String(payload.message.text);
        return { chatId, input };
    }

    return null;
}

export const sendMessage = async (apiKey, chatId, text) => {
    const encodedText = encodeURIComponent(text);

    const url = `https://api.telegram.org/bot${apiKey}/sendMessage`
        + `?chat_id=${chatId}&text=${encodedText}&parse_mode=HTML`;

    await fetch(url).then(resp => resp.json());
}
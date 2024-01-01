import translit from 'translitit-latin-to-mkhedruli-georgian';
import { translate } from '@vitalets/google-translate-api';
import { parsePayload, sendMessage } from './telegram-helpers.js';

export const handle = async (payload, from, to, tlgr_api_key) => {
    const { chatId, input } = await parsePayload(payload);
    if (!chatId || !input) {
        return new Response("Invalid request", { status: 400 });
    }

    const escapedInput = input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/&/g, '&amp;');

    const slText = translit(escapedInput);

    let tlText;
    try {
        const resp = await translate(slText, { from, to });
        tlText = resp.text;
    }
    catch (err) {
        console.error(err);
    }

    const fromBlock = `<blockquote>${slText}</blockquote>`
    const toBlock = tlText
        ? `<blockquote>${tlText}</blockquote>`
        : '<i>Translation failed. Please try again later.</i>'
    const message = `${from}:\n${fromBlock}\n${to}:\n${toBlock}`;

    await sendMessage(tlgr_api_key, chatId, message);

    return new Response("OK", { status: 200 });
}
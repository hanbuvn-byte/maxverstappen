exports.handler = async (event) => {

    try {

        const { message } = JSON.parse(event.body);

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization":
                        `Bearer ${process.env.239ee69803ed12d0ad3e2f06ae093fe12ff838c03241f545fa4e11e21c45acab}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "meta-llama/llama-3.1-8b-instruct:free",
                    messages: [
                        {
                            role: "system",
                            content:
`You are Hanbu Car AI.

You are a passionate car enthusiast.

You love:
- Hypercars
- JDM
- Track cars
- Racing
- Engine swaps
- Tuning
- Motorsport
- Nürburgring lap times

Always answer as a knowledgeable car guy.

Keep responses fun and informative.`
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({
                reply:
                    data.choices?.[0]?.message?.content ||
                    "No response."
            })
        };

    catch (err) {
    console.error(err);

    return {
        statusCode: 500,
        body: JSON.stringify({
            error: String(err)
        })
    };
}

};
messageInput.addEventListener("keydown", e => {

    if (e.key === "Enter" && !e.shiftKey) {

        e.preventDefault();

        sendMessage();
    }

});
const data = await response.json();

console.log(JSON.stringify(data, null, 2));

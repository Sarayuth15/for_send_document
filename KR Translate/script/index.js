$(document).ready(function () {
    // Spport me
    $('#supportMe').on('click', function () {
    }) 
    // function clear
    const clearText = () => {
        $('#inputText').val('')
        $('#outputText').val('')
    }

    $('#clearBtn').on('click', function () {
        clearText()
    })

    $('#translateBtn').on('click', async function () {
        const koreanText = $('#inputText').val().trim()
        const $englishOutput = $('#outputText')

        if (koreanText === "") {
            alert("Please enter some Korean text to translate.")
            return
        }

        try {
            // Gemini API key is automatically provided by the Canvas environment
            const apiKey = "AIzaSyDlsTNRHY2SzsyQbApyaswKDIknRNoqECw"
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

            let chatHistory = []
            chatHistory.push({
                role: "user",
                parts: [{
                    text: `Translate the following Korean text to English: ${koreanText}`
                }]
            })

            const payload = {
                contents: chatHistory
            }

            const response = await fetch(apiUrl, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(`API error: ${response.status} ${response.statusText} - ${errorData.error.message || 'Unknown error'}`)
            }

            const result = await response.json()

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const translatedText = result.candidates[0].content.parts[0].text;
                $englishOutput.val(translatedText);
            } else {
                showMessageBox("Translation failed: No valid response from API.");
                console.error("API response structure unexpected:", result);
            }
        } catch (error) {
            alert('An error occurred during translation. Please try again. 😢')
        } finally {
            
        }
    })
})
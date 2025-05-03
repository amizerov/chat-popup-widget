export function handleSendMessage(userMessage, setChatHistory, onComplete) {
    const setOtvet = (m) => {
        setChatHistory((prev) => [
            ...prev,
            { sender: 'assistant', text: m },
        ]);
    };

    if (userMessage.trim()) {

        if(userMessage.trim().toLowerCase() === 'ver') {
            setOtvet(`Версия виджета: ${__APP_VERSION__}`);
            if (onComplete) onComplete(); // Завершаем анимацию
            return;
        }

        setChatHistory((prev) => [
            ...prev,
            { sender: 'user', text: userMessage },
        ]);
        
        const chatEndpoint = 'https://api.argoai.ru/chat';

        // Если сообщение длинное, используем POST
        if (userMessage.length > 200) {
            fetch(chatEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ msg: userMessage }),
            })
                .then((response) => {
                    if (response.ok) return response.json();
                    throw new Error('Ошибка загрузки данных');
                })
                .then((data) => {
                    setOtvet(data.reply || 'Ответ не получен');
                })
                .catch((error) => {
                    setOtvet(`Произошла ошибка: ${error.message}`);
                })
                .finally(() => {
                    if (onComplete) onComplete(); // Завершаем анимацию
                });
        }
        else {
            // Отправляем GET-запрос
            const url = `${chatEndpoint}?msg=${encodeURIComponent(userMessage)}`;
            fetch(url)
            .then((response) => {
                if (response.ok) 
                    return response.json();
            })
            .then((data) => {
                setOtvet(data.reply || 'Ответ не получен');
            })
            .catch((error) => {
                setOtvet(`Произошла ошибка: ${error.message}`);
            })
            .finally(() => {
                if (onComplete) onComplete(); // Завершаем анимацию
            });
        }
    }
}
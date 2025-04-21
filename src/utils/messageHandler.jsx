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
            return;
        }

        setChatHistory((prev) => [
            ...prev,
            { sender: 'user', text: userMessage },
        ]);
        
        const chatEndpoint = 'https://api.argoai.ru/chat';
        const url = `${chatEndpoint}?msg=${encodeURIComponent(userMessage)}`;

        // Отправляем GET-запрос
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
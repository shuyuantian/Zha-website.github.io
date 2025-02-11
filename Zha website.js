// 在页面加载时显示欢迎信息
window.onload = function() {
    console.log("welcome to Zha website！");
};

document.addEventListener('DOMContentLoaded', () => {
    // 等待DOM内容加载完成
    const userInput = document.getElementById('user-input');
    // 获取用户输入框元素
    const sendButton = document.getElementById('send-button');
    // 获取发送按钮元素
    const messagesContainer = document.getElementById('messages-container');
    // 获取消息展示容器元素
    const textDisplay = document.getElementById('text-display');
    // 获取文字展示框元素
    const imageDisplay = document.getElementById('image-display');
    // 获取图片展示框元素

    sendButton.addEventListener('click', () => {
        // 监听发送按钮点击事件
        const userMessage = userInput.value;
        // 获取用户输入的消息
        if (userMessage.trim()) {
            // 如果用户输入的消息不为空
            addMessage('user', userMessage);
            // 添加用户消息到展示容器
            userInput.value = '';
            // 清空输入框
            getAIResponse(userMessage);
            // 获取AI响应
        }
    });

    userInput.addEventListener('keypress', (event) => {
        // 监听输入框的按键事件
        if (event.key === 'Enter') {
            // 如果按下的是回车键
            sendButton.click();
            // 触发发送按钮的点击事件
        }
    });

    function addMessage(sender, text) {
        // 添加消息到展示容器的函数
        const message = document.createElement('div');
        // 创建一个新的div元素
        message.classList.add('message', sender);
        // 为新元素添加class
        message.textContent = text;
        // 设置新元素的文本内容
        messagesContainer.appendChild(message);
        // 将新元素添加到消息展示容器
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        // 将消息展示容器滚动到最底部
    }

    function getAIResponse(message) {
        // 获取AI响应的函数
        fetch('/api/chat', {
            // 发送请求到服务器端
            method: 'POST',
            // 请求方法为POST
            headers: {
                'Content-Type': 'application/json'
                // 设置请求头
            },
            body: JSON.stringify({ message })
            // 请求体为JSON格式的用户消息
        })
        .then(response => response.json())
        // 解析响应为JSON格式
        .then(data => {
            // 处理解析后的数据
            if (data && data.response) {
                // 如果响应数据有效
                addMessage('bot', data.response.text);
                // 添加机器人消息到展示容器
                textDisplay.textContent = data.response.text;
                // 设置文字展示框内容
                if (data.response.image) {
                    // 如果响应包含图片
                    const img = document.createElement('img');
                    // 创建图片元素
                    img.src = data.response.image;
                    // 设置图片源
                    imageDisplay.innerHTML = '';
                    // 清空图片展示框内容
                    imageDisplay.appendChild(img);
                    // 将图片添加到图片展示框
                } else {
                    imageDisplay.innerHTML = '无图片显示';
                    // 如果没有图片，显示默认文本
                }
            } else {
                addMessage('bot', '对不起，我没有理解你的意思。');
                // 添加默认的错误消息
                textDisplay.textContent = '对不起，我没有理解你的意思。';
                // 设置文字展示框内容
                imageDisplay.innerHTML = '无图片显示';
                // 显示默认文本
            }
        })
        .catch(error => {
            // 处理请求错误
            console.error('错误:', error);
            // 在控制台打印错误信息
            addMessage('bot', '对不起，出现了一些问题。');
            // 添加默认的错误消息
            textDisplay.textContent = '对不起，出现了一些问题。';
            // 设置文字展示框内容
            imageDisplay.innerHTML = '无图片显示';
            // 显示默认文本
        });
    }
});

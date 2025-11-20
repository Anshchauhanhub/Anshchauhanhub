// Chatbot Functions
const API_URL = 'https://ansh99-ragagent.hf.space/ai-chat';

function toggleChatbot() {
    const chatbot = document.getElementById('chatbotContainer');
    chatbot.classList.toggle('active');
    
    // Add initial message if chatbot is empty
    const messagesContainer = document.getElementById('chatbotMessages');
    if (chatbot.classList.contains('active') && messagesContainer.children.length === 0) {
        addMessage("👋 Hi! I'm Ansh's AI assistant. Ask me about his projects, skills, or experience!", 'bot');
    }
}

async function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();

    if (message === '') return;

    // Add user message
    addMessage(message, 'user');
    input.value = '';

    // Show typing indicator
    const typingId = addTypingIndicator();

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({ message: message })
        });

        removeTypingIndicator(typingId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const botResponse = data.result || data.response || data.answer || data.message || 
                           'I received your message but had trouble understanding it. Could you rephrase?';
        
        addMessage(botResponse, 'bot');

    } catch (error) {
        removeTypingIndicator(typingId);
        const fallbackResponse = getFallbackResponse(message.toLowerCase());
        addMessage(fallbackResponse, 'bot');
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// FIXED: Proper message creation with wrapper divs
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    
    // Create wrapper div for proper alignment
    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = `message-wrapper ${sender}-wrapper`;
    
    // Create message div
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}`;
    messageDiv.textContent = text;
    
    // Append message to wrapper, then wrapper to container
    wrapperDiv.appendChild(messageDiv);
    messagesContainer.appendChild(wrapperDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addTypingIndicator() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const typingId = 'typing-' + Date.now();
    
    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'message-wrapper bot-wrapper';
    wrapperDiv.id = typingId;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot';
    typingDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Thinking...';
    
    wrapperDiv.appendChild(typingDiv);
    messagesContainer.appendChild(wrapperDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    return typingId;
}

function removeTypingIndicator(typingId) {
    const typingDiv = document.getElementById(typingId);
    if (typingDiv) {
        typingDiv.remove();
    }
}

function getFallbackResponse(message) {
    const responses = {
        'hello': '👋 Hello! How can I help you learn more about Ansh?',
        'hi': '👋 Hi there! What would you like to know?',
        'projects': '🚀 Ansh has worked on 25+ AI projects including ML Prediction System, Neural Network App, and Sentiment Analysis. Check out the Projects section!',
        'skills': '💻 Ansh specializes in AI & Machine Learning, Deep Learning, Neural Networks, Data Science, Python, TensorFlow, and PyTorch.',
        'experience': '📊 Ansh has 3+ years of experience in AI development and machine learning.',
        'contact': '📧 You can reach Ansh at chauhanansh289@gmail.com or connect on LinkedIn and GitHub!',
        'email': '📧 Ansh\'s email is chauhanansh289@gmail.com',
        'github': '💻 Check out Ansh\'s GitHub at github.com/Anshchauhanhub',
        'linkedin': '👔 Connect with Ansh on LinkedIn!',
        'about': '👨‍💻 Ansh Chauhan is an AI developer passionate about creating intelligent systems that solve real-world problems.',
        'help': '🤖 I can tell you about Ansh\'s projects, skills, experience, and contact information. Just ask!',
    };

    for (let key in responses) {
        if (message.includes(key)) {
            return responses[key];
        }
    }

    return '🤔 That\'s interesting! Ask me about Ansh\'s projects, skills, experience, or how to contact him.';
}

import React, { useState, useEffect, useRef } from 'react';
import '../stylesheets/OnlineHelp.css';
import { useTranslation } from 'react-i18next';

function OnlineHelp() {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState('');
	const chatBodyRef = useRef(null);

	const toggleHelp = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!isOpen) {
				setIsOpen(true);
			}
			if (messages.length === 0) {
				setMessages(prevMessages => [
					...prevMessages,
					{ from: 'consultant', text: 'Доброго дня! Чи можу я Вам чимось допомогти?' }
				]);
			}
		}, 60000);

		return () => clearTimeout(timer);
	}, [isOpen, messages]);

	useEffect(() => {
		if (chatBodyRef.current) {
			chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
		}
	}, [messages]);

	const handleSendMessage = () => {
		if (inputMessage.trim() !== '') {
			setMessages(prevMessages => [
				...prevMessages,
				{ from: 'user', text: inputMessage }
			]);
			setInputMessage('');
		}
	};

	return (
		<div className='OnlineHelp'>
			<button className='HelpButton' onClick={toggleHelp}>
				<i className="fa-solid fa-question"></i>
			</button>
			{isOpen && (
				<div className='HelpWindow'>
					<div className='Header'>
						<i className="fa-solid fa-user ConsultantIcon"></i>
						<span>{t('Consult')}</span>
						<div className='OnlineStatus'></div>
					</div>
					<div className='ChatBody' ref={chatBodyRef}>
						{messages.map((message, index) => (
							<div
								key={index}
								className={`ChatMessage ${message.from === 'user' ? 'UserMessage' : 'ConsultantMessage'}`}
							>
								{message.text}
							</div>
						))}
					</div>
					<div className='ChatInput'>
						<input
							type='text'
							placeholder='Введіть ваше повідомлення...'
							value={inputMessage}
							onChange={e => setInputMessage(e.target.value)}
						/>
						<button onClick={handleSendMessage}>
							<i className="fa-solid fa-share"></i>
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default OnlineHelp;

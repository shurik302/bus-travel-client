import React, { useState, useEffect, useRef } from 'react';
import '../stylesheets/OnlineHelp.css';

function OnlineHelp() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([]);
	const chatBodyRef = useRef(null);


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

	

	useEffect(() => {
		// Додаємо скрипт Tawk.to
		(function () {
			window.Tawk_API = window.Tawk_API || {};
			window.Tawk_LoadStart = new Date();
			const s1 = document.createElement("script");
			const s0 = document.getElementsByTagName("script")[0];
			s1.async = true;
			s1.src = 'https://embed.tawk.to/6691bc1e32dca6db2cae9ebb/1i2kkdlpv';
			s1.charset = 'UTF-8';
			s1.setAttribute('crossorigin', '*');
			s0.parentNode.insertBefore(s1, s0);
		})();

	}, []);

	return (
		<div className='OnlineHelp'>
			
		</div>
	);
}

export default OnlineHelp;

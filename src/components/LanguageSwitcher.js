import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../stylesheets/LanguageSwitcher.css';
import UaFlag from '../images/uaflag.png';
import EngFlag from '../images/engflag.png';

const LanguageSwitcher = () => {
	const { i18n, t } = useTranslation();
	const [menuVisible, setMenuVisible] = useState(false);
	const menuRef = useRef(null);

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
		setMenuVisible(false);
	};

	const currentLanguage = i18n.language;
	const flagSrc = currentLanguage === 'ua' ? UaFlag : EngFlag;

	const toggleMenu = () => {
		setMenuVisible(!menuVisible);
	};

	const handleClickOutside = (event) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setMenuVisible(false);
		}
	};

	useEffect(() => {
		const systemLanguage = navigator.language || navigator.userLanguage;
		if (systemLanguage.startsWith('uk') || systemLanguage.startsWith('ru')) {
			i18n.changeLanguage('ua');
		} else {
			i18n.changeLanguage('en');
		}
	}, [i18n]);

	useEffect(() => {
		if (menuVisible) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [menuVisible]);

	return (
		<div className='LanguageSwitcherSetup' ref={menuRef}>
			<div className='CurrentTranslation' onClick={toggleMenu}>
				<div className='Flag'>
					<img src={flagSrc} alt='Current Language Flag' />
				</div>
				<div className='Translation'>
					<span>{t('CurrentTranslation')}</span>
				</div>
			</div>
			{menuVisible && (
				<div className='HideMenu'>
					<button onClick={() => changeLanguage('en')}>
						<div className='FlagHideMenu'>
							<img className='ChooseFlag' src={EngFlag} alt='Current Language Flag' />
						</div>
						<span className='EngTranslation'>EN</span>
					</button>
					<button onClick={() => changeLanguage('ua')}>
						<div className='FlagHideMenu'>
							<img className='ChooseFlag' src={UaFlag} alt='Current Language Flag' />
						</div>
						<span className='UkrTranslation'>UA</span>
					</button>
				</div>
			)}
		</div>
	);
};

export default LanguageSwitcher;

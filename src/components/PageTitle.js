import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async'; // Импортируйте Helmet

const PageTitle = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const pageTitleKey = location.pathname.slice(1) || 'home'; // Default to 'home' if path is '/'

  return (
    <Helmet>
      <title>{t(`titles.${pageTitleKey}`)}</title>
    </Helmet>
  );
};

export default PageTitle;

import {
  Box,
  Button,
  States,
  StatesActions,
  StatesIcon,
  StatesSubtitle,
  StatesTitle,
} from '@rocket.chat/fuselage';
import { ipcRenderer } from 'electron';
import { useTranslation } from 'react-i18next';

import { ErrorPane } from './styles';

type UnsupportedServerProps = {
  isSupported: boolean | undefined;
  instanceDomain: string;
};

const UnsupportedServer = ({
  isSupported,
  instanceDomain,
}: UnsupportedServerProps) => {
  const { t } = useTranslation();

  const handleMoreInfoButtonClick = (): void => {
    ipcRenderer.invoke(
      'server-view/open-url-on-browser',
      'https://go.rocket.chat/i/supported-versions'
    );
  };

  return (
    <ErrorPane isVisible={isSupported === false}>
      <Box
        backgroundColor='surface-light'
        display='flex'
        flexDirection='column'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
        }}
        justifyContent='center'
        alignItems='center'
        zIndex={1}
      >
        <States>
          <StatesIcon name='warning' />
          <StatesTitle>
            {t('unsupportedServer.title', {
              instanceDomain,
            })}
          </StatesTitle>
          <StatesSubtitle>{t('unsupportedServer.announcement')}</StatesSubtitle>
          <StatesActions>
            <Button secondary onClick={handleMoreInfoButtonClick}>
              {t('unsupportedServer.moreInformation')}
            </Button>
          </StatesActions>
        </States>
      </Box>
    </ErrorPane>
  );
};

export default UnsupportedServer;

import { createGlobalStyle } from 'styled-components';
import InterUIBold from '../fonts/InterUI/Inter-UI-Bold.ttf';
import InterUIMedium from '../fonts/InterUI/Inter-UI-Medium.ttf';
import InterUIRegular from '../fonts/InterUI/Inter-UI-Regular.ttf';
import MaterialIconsRegular from '../fonts/MaterialIcons/MaterialIcons-Regular.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: 'Montserrat';
    url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,500;1,600;1,700;1,800;1,900&display=swap');
  }

  @font-face {
    font-family: 'Inter UI';
    src: local('Inter UI Bold'), local('Inter UI Medium'), local('Inter UI Regular'),
    url(${InterUIBold}) format('ttf'),
    url(${InterUIMedium}) format('ttf'),
    url(${InterUIRegular}) format('ttf');
  }

  @font-face {
    font-family: 'Material Icons';
    src: local('Material Icons Regular'), 
    url(${MaterialIconsRegular}) format('ttf');
  }
`;
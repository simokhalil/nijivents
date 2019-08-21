import AppColors from './app.colors';
import AppStyles from './app.styles';

export default {

  navbarProps: {
    hideNavBar: true,
    titleStyle: AppStyles.navbarTitle,
    navigationBarStyle: AppStyles.navbar,
    navBarButtonColor: AppStyles.navbarButton.tintColor,
    leftButtonIconStyle: AppStyles.navbarButton,
    rightButtonIconStyle: AppStyles.navbarButton,
    // renderRightButton: HeaderMenu,
    sceneStyle: {
      backgroundColor: AppColors.palette.white,
      paddingTop: 64,
    },
  },

}
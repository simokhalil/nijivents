import AppColors from './app.colors';

const AppStyles = {
  navbar: {
    backgroundColor: AppColors.palette.white,
    borderBottomWidth: 0,
    height: 64,
    elevation: 0,
    shadowOpacity: 0,
  },
  navbarTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    // fontFamily: AppFonts.base.family,
    // fontSize: AppFonts.base.size,
  },
  navbarButton: {
    tintColor: AppColors.palette.primary,
  },
  
  pageTitle: {
    fontFamily: 'museo-bold',
    fontSize: 22,
    padding: 20,
  },
};

export default AppStyles;

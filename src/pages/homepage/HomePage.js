import React from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, SafeAreaView } from 'react-native';
import {
  Button,
  Layout,
  Text,
} from 'react-native-ui-kitten';

import { translate } from '../../i18n/i18n';

const HomePage = () => {
  const goToTest = () => {
    Actions.test();
  };

  console.log('Homepage OK');

  return (
    <>
      <Layout style={styles.container}>
        <Text category='h4' style={styles.text}>{`${translate('common.welcome')} to Nijievents`}</Text>
        <Button onPress={Actions.login} appearance="outline">
          LOGIN
        </Button>

        <Button onPress={goToTest} appearance="outline">
          INSCRIPTION
        </Button>
      </Layout>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginVertical: 16,
  },
});

export default HomePage;

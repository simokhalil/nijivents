import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Asset } from 'expo-asset';
import { WebView } from 'react-native-webview';

const styles = {
  containerStyle: {
    flex: 1,
  },
  content: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1,
  },
};

const ParticlesView = ({ containerStyle, children }) => {
  const [html, setHtml] = React.useState('');

  React.useEffect(() => {
    async function load() {
      const { uri } = Asset.fromModule(require('./widget/particles.html'));
      const res = await fetch(uri);
      const htmlContent = await res.text();
      setHtml(htmlContent);
    }
    load();
  }, []);

  return (
    <View style={styles.containerStyle}>
      {!!html && (
        <WebView
          originWhitelist={['*']}
          source={{ html }}
          style={{ width: '100%', flex: 1, zIndex: 0 }}
        />
      )}

      <View style={[styles.content, containerStyle]}>
        {children}
      </View>
    </View>
  );
};

ParticlesView.propTypes = {
  children: PropTypes.any,
  containerStyle: PropTypes.object,
};

ParticlesView.defaultProps = {
  children: null,
  containerStyle: {},
};

export default ParticlesView;

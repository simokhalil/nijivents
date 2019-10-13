import PropTypes from 'prop-types';
import React from 'react';
import {
  Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

import AppTheme from '../../app/app.theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  filtersContainer: {
    height: 40,
    marginVertical: 20,
  },
  filtersWrapper: {
    height: 40,
    alignItems: 'center',
  },
  filter: {
    marginHorizontal: 10,
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${AppTheme.COLORS.PRIMARY}50`,
  },
  filterSelected: {
    backgroundColor: AppTheme.COLORS.PRIMARY,
  },
  filterText: {
    color: AppTheme.COLORS.WHITE,
  },
  filterTextSelected: {
    fontWeight: 'bold',
  },
});

const HorizontalFilters = ({ items, onSelect }) => {
  const scrollRef = React.createRef();
  const [selectedFilter, setSelectedFilter] = React.useState(null);

  const handleFilterSelect = (item) => {
    setSelectedFilter(item);
    onSelect(item);
  };

  return (
    <View style={styles.filtersContainer}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.filtersWrapper}
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
      >

        <TouchableOpacity
          style={[styles.filter, !selectedFilter && styles.filterSelected]}
          onPress={() => handleFilterSelect(null)}
          onLayout={(event) => {
            if (!selectedFilter) {
              const { nativeEvent: { layout } } = event;
              scrollRef.current.scrollTo({ x: layout.x - (width / 2) + (layout.width / 2), y: layout.y });
            }
          }}
        >
          <Text style={[styles.filterText, !selectedFilter && styles.filterTextSelected]}>Tous</Text>
        </TouchableOpacity>

        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.filter, !!selectedFilter && selectedFilter.id === item.id && styles.filterSelected]}
            onPress={() => handleFilterSelect(item)}
            onLayout={(event) => {
              if (!!selectedFilter && selectedFilter.id === item.id) {
                const { nativeEvent: { layout } } = event;
                scrollRef.current.scrollTo({ x: layout.x - (width / 2) + (layout.width / 2), y: layout.y });
              }
            }}
          >
            <Text style={[styles.filterText, !!selectedFilter && selectedFilter.id === item.id && styles.filterTextSelected]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

HorizontalFilters.propTypes = {
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
};

HorizontalFilters.defaultProps = {
  onSelect: () => true,
};

export default HorizontalFilters;

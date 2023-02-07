import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Table = () => (
  <ScrollView horizontal={true}>
    <View style={styles.tableContainer}>
      <View style={styles.headerContainer}>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.headerText}>Specification</Text>
        </View>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.headerText}>Unit</Text>
        </View>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.headerText}>MB6-63 x 1500</Text>
        </View>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.headerText}>MB6-63 x 2500</Text>
        </View>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.headerText}>MB6-100 x 3100</Text>
        </View>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.headerText}>MB6-100 x 4100</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.text}>Nominal Force</Text>
        </View>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.text}>kN</Text>
        </View>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.text}>630</Text>
        </View>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.text}>1123</Text>
        </View>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.text}>2223</Text>
        </View>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.text}>3343</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.text}>Working Length</Text>
        </View>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.text}>mm</Text>
        </View>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.text}>1500</Text>
        </View>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.text}>4455</Text>
        </View>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.text}>4453</Text>
        </View>
        <View style={[styles.cell, { width: 100 }]}>
          <Text style={styles.text}>1500</Text>
        </View>
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'black',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
  },
  rowContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  cell: {
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
  },
  text: {},
});

export default Table;
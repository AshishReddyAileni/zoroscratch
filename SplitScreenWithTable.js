// SplitScreenWithTable.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplitScreenWithTable = ({ route }) => {
  const { selectedImage } = route.params;
  const navigation = useNavigation();
  const [selectedFunctions, setSelectedFunctions] = useState([]);


  const [availableOptions, setAvailableOptions] = useState([
    'MoveX--35',
    'MoveY--70',
    'MoveXY--100',
    'Hello',
    'Hmm',
    'Origin',
  ]);
  const availableFunctions = [
    {
      id: 1,
      name: 'Function 1',
      handler: () => {
        // Function 1 logic
      },
    },
    {
      id: 2,
      name: 'Function 2',
      handler: () => {
        // Function 2 logic
      },
    },
    // Add more functions as needed
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const handleOptionPress = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleRemoveOption = (option) => {
    const updatedOptions = selectedOptions.filter((item) => item !== option);
    setSelectedOptions(updatedOptions);
  };
  const handleSaveOptions = () => {
    storeSelectedOptions(selectedOptions);
  };

  const storeSelectedOptions = (subparts) => {

    console.log('Stored Selected Subparts:', subparts);
    setSelectedOptions(subparts)
    navigation.navigate('MainScreen',{data:subparts})
  };


  const moveImageToRight = () => {
    setCoordinates((prevCoordinates) => ({
      ...prevCoordinates,
      x: prevCoordinates.x + 5,
    }));
  };

  const moveImageToLeft = () => {
    setCoordinates((prevCoordinates) => ({
      x: prevCoordinates.x - 5,
      y: prevCoordinates.y,
    }));
  };
  const moveImageToR = () => {
    setCoordinates((prevCoordinates) => ({
      ...prevCoordinates,
      x: prevCoordinates.x + 5,
    }));
  };
  const moveImageToL = () => {
    setCoordinates((prevCoordinates) => ({
      x: prevCoordinates.x - 15,
      y: prevCoordinates.y,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.leftPane}>
        <Text style={styles.title}>FUNCTIONALITIES</Text>
        <FlatList
          data={availableOptions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.optionButton, selectedOptions.includes(item) && styles.selectedOptionButton]}
              onPress={() => handleOptionPress(item)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.optionList}
        />
      </View>
      <View style={styles.rightPane}>
        <Text style={styles.title}>ACTIONS</Text>
        <FlatList
          data={selectedOptions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.selectedOptionRow}>
              <Text style={styles.selectedOptionText}>{item}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveOption(item)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.selectedOptionsTable}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveOptions}>
        <Text style={styles.saveButtonText}>Confirm</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  leftPane: {
    flex: 1,
    padding: 10,
    borderWidth: 3,
    borderColor: 'green',
    borderRadius: 5,
    marginRight: 5,
  },
  rightPane: {
    flex: 1,
    padding: 10,
    borderWidth: 3,
    borderColor: 'green',
    borderRadius: 5,
    marginLeft: 5,
  },
  optionList: {
    flexGrow: 1,
  },
  optionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 3,
    borderColor: 'green',
    marginBottom: 10,
  },
  selectedOptionButton: {
    backgroundColor: 'lightgreen',
  },
  selectedOptionsTable: {
    borderWidth: 3,
    borderColor: 'green',
    borderRadius: 5,
    padding: 10,
    flexGrow: 1,
  },
  selectedOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 3,
    borderColor: 'green',
  },
  selectedOptionText: {
    flex: 1,
  },
  removeButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
  },
  saveButton: {
    alignSelf: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default SplitScreenWithTable;

import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  PanResponder,
  Modal,
} from 'react-native';

const MainScreen = ({ navigation, route }) => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFunctions, setSelectedFunctions] = useState([]);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCombinedFunctions = (actions) => {
    actions.forEach((action, index) => {
      setTimeout(() => {
        if (action === 'MoveX--35') {
          moveByCoordinates(35, 0);
        } else if (action === 'MoveY--70') {
          moveByCoordinates(0, 70);
        } else if (action === 'MoveXY--100') {
          moveByCoordinates(100, 100);
        } else if (action === 'Origin') {
          setCoordinates({ x: 0, y: 0 });
        } else if (action === 'Hello') {
          setInputText('Hello');
        } else if (action === 'Hmm') {
          setInputText('Hmm');
        }
      }, index * 2000);
    });
  };

  const moveByCoordinates = (x, y) => {
    setCoordinates((prevCoordinates) => ({
      x: prevCoordinates.x + x,
      y: prevCoordinates.y + y,
    }));
  };

  const handleOpenModalOneSec = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 1000);
  };

  const [inputText, setInputText] = useState('');

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState([
    require('./assets/zzzz.png'),
    require('./assets/ccc.png'),
    require('./assets/ssss.png'),
  ]);

  const handleNewScreenPress = () => {
    navigation.navigate('SplitScreenWithTable', { rotateImage });
  };

  const rotateImage = (degrees) => {
    if (selectedImage) {
      setSelectedImage((prevImage) => ({
        ...prevImage,
        style: {
          ...prevImage.style,
          transform: [{ rotate: `${degrees}deg` }],
        },
      }));
    }
  };

  const handleImagePress = (image) => {
    setSelectedImage(image);
  };

  const handlePanResponderMove = (e, gestureState) => {
    const { dx, dy } = gestureState;
    setCoordinates((prevCoordinates) => ({
      x: prevCoordinates.x - dx,
      y: prevCoordinates.y - dy,
    }));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: handlePanResponderMove,
    })
  ).current;

  const handleXCoordinateChange = (text) => {
    const parsedX = parseFloat(text);
    if (!isNaN(parsedX)) {
      setCoordinates((prevCoordinates) => ({
        ...prevCoordinates,
        x: parsedX,
      }));
    } else {
      setCoordinates((prevCoordinates) => ({
        ...prevCoordinates,
        x: 0,
      }));
    }
  };

  const handleYCoordinateChange = (text) => {
    const parsedY = parseFloat(text);
    if (!isNaN(parsedY)) {
      setCoordinates((prevCoordinates) => ({
        ...prevCoordinates,
        y: parsedY,
      }));
    } else {
      setCoordinates((prevCoordinates) => ({
        ...prevCoordinates,
        y: 0,
      }));
    }
  };

  const moveImageToRight = () => {
    setCoordinates((prevCoordinates) => ({
      ...prevCoordinates,
      x: prevCoordinates.x + 45,
    }));
  };

  const moveImageToLeft = () => {
    setCoordinates((prevCoordinates) => ({
      ...prevCoordinates,
      x: prevCoordinates.x - 70,
    }));
  };

  const moveImageToBottomRight = () => {
    setCoordinates((prevCoordinates) => ({
      x: prevCoordinates.x + 100,
      y: prevCoordinates.y + 100,
    }));
  };

  const renderImageItem = ({ item }) => (
    <TouchableOpacity style={styles.imageItem} onPress={() => handleImagePress(item)}>
      <Image source={item} style={styles.thumbnailImage} />
    </TouchableOpacity>
  );

  const reset = () => {
    setInputText('');
    setCoordinates({ x: 0, y: 0 });
  };

  console.log(route?.params?.data);

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <Image source={require('./assets/hello.png')} style={styles.modalImage} />
          <Button title="Close" onPress={handleCloseModal} />
        </View>
      </Modal>
      <View style={styles.topBox} {...panResponder.panHandlers}>
        {selectedImage ? (
          <View style={styles.selectedImageContainer}>
            {inputText !== '' && <Text style={styles.placeholderText}>{inputText}</Text>}
            <Image
              source={selectedImage}
              style={[
                styles.selectedImage,
                selectedImage.style,
                { left: coordinates.x, top: coordinates.y },
              ]}
            />
          </View>
        ) : (
          <Text style={styles.placeholderText}>Select an image</Text>
        )}
      </View>

      <View style={styles.middleBox}>
        <View style={styles.coordinateInputContainer}>
          <Text>X:</Text>
          <TextInput
            style={styles.coordinateInput}
            value={coordinates.x.toString()}
            onChangeText={handleXCoordinateChange}
            keyboardType="numeric"
          />
          <Text>Y:</Text>
          <TextInput
            style={styles.coordinateInput}
            value={coordinates.y.toString()}
            onChangeText={handleYCoordinateChange}
            keyboardType="numeric"
          />
          <View style={styles.inputContainer}></View>
          <Text style={styles.inputLabel}>Text:</Text>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
          />
        </View>
        <Button title="↺" onPress={reset}  color="red" />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCombinedFunctions(route?.params?.data)}
          >
            <Text style={styles.buttonText}>Combined Functions</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomBox}>
        <TouchableOpacity style={styles.imageBox} onPress={() => handleImagePress(imageData[0])}>
          <Image source={imageData[0]} style={styles.thumbnailImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageBox} onPress={() => handleImagePress(imageData[1])}>
          <Image source={imageData[1]} style={styles.thumbnailImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageBox} onPress={() => handleImagePress(imageData[2])}>
          <Image source={imageData[2]} style={styles.thumbnailImage} />
        </TouchableOpacity>
      </View>

      <View style={{ position: 'absolute', alignSelf: 'center' }}>
        <Button title="Go to New Screen" onPress={handleNewScreenPress} color="green" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  inputLabel: {
    marginRight: 5,
    fontWeight: 'bold',
  },
  topBox: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleBox: {
    borderWidth: 1,
    borderColor: 'green',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  selectedImageContainer: {
    width: '70%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bottomBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'green',
    height: 50,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedImage: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageBox: {
    width: 35,
    height: 40,
    borderWidth: 1,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coordinateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  coordinateInput: {
    width: 50,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  rotateButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default MainScreen;

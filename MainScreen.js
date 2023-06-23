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

const MainScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFunctions, setSelectedFunctions] = useState([]);

  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCombinedFunctions = () => {
    const functionsToExecute = [
      moveImageToRight,
      moveImageToLeft,
      moveImageToBottomRight,
      handleOpenModalOneSec,
    ];
  
    functionsToExecute.forEach((func, index) => {
      setTimeout(func, (index + 1) * 1500);
    });
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
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const handleNewScreenPress = () => {
    navigation.navigate('SplitScreenWithTable', { rotateImage });
  };

  const rotateImage = (degrees) => {
    if (selectedImage) {
      setSelectedImage((prevImage) => {
        return {
          ...prevImage,
          style: {
            ...prevImage.style,
            transform: [{ rotate: `${degrees}deg` }],
          },
        };
      });
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

  const handleRotationChange = (degrees) => {
    setRotation(degrees);
    rotateImage(degrees);
  };

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
      x: prevCoordinates.x + 35,
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

  const rotateImageBy90 = () => {
    handleRotationChange(rotation + 90);
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


  return (
    <View style={styles.container}>
    <Modal visible={isModalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <Image source={require('./assets/hello.png')} style={styles.modalImage} />
          </View>
      </Modal>
      <View style={styles.topBox} {...panResponder.panHandlers}>
        {selectedImage ? (
          <Image
            source={selectedImage}
            style={[
              styles.selectedImage,
              selectedImage.style,
              { left: coordinates.x, top: coordinates.y },
            ]}
          />
        ) : (
          <Text style={styles.placeholderText}>Select an image</Text>
        )}
      </View>

      <View style={styles.middleBox}>
        <View style={styles.coordinateInputContainer}>
        <Text style={{ fontWeight: 'bold', color:'green'}}>X:</Text>
          <TextInput
            style={styles.coordinateInput}
            value={coordinates.x.toString()}
            onChangeText={handleXCoordinateChange}
            keyboardType="numeric"
          />
          <Text style={{ fontWeight: 'bold', color:'green' }}>Y:</Text>
          <TextInput
            style={styles.coordinateInput}
            value={coordinates.y.toString()}
            onChangeText={handleYCoordinateChange}
            keyboardType="numeric"
          />
        </View>
        <Text>{rotation.toFixed(5)}</Text>
        <Button title="↺" onPress={(reset) => setCoordinates({ x: 0.0, y: 0.0 }) } color="blue" />
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCombinedFunctions}>
        <Text style={styles.buttonText}>▶</Text>
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
    backgroundColor:'lightgrey',
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
  topBox: {
    flex: 2,
    borderWidth: 3,
    borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
  },
  middleBox: {
    borderWidth: 3,
    borderColor: 'green',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor:'white',
  },
  bottomBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'green',
    height: 50,
    backgroundColor:'white',
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
    marginTop: 4,
  },
  coordinateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  coordinateInput: {
    width: 50,
    marginLeft: 5,
    borderWidth: 2,
    borderColor: 'green',
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
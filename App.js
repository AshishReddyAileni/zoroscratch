import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './MainScreen';
import SplitScreenWithTable from './SplitScreenWithTable';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// ...


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
      name='MainScreen'
      component={MainScreen}
      options={{
        headerTitle: () => (
          <View>
            <Image source={require('./assets/t.png')} style={styles.headerImage} />
          </View>
        ),
          }}/>
        <Stack.Screen name="SplitScreenWithTable" component={SplitScreenWithTable} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  headerImage: {
    width: 355,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center', 
  },
});

export default App;

// ImageHandler.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';

interface ImageHandlerProps {
  imageUri: string | null;
  setImageUri: (uri: string | null) => void;
}

const ImageHandler: React.FC<ImageHandlerProps> = ({ imageUri, setImageUri }) => {
  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo' }, (response: ImagePickerResponse) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      } else {
        console.log('ImagePicker Error: ', response.errorMessage || 'Unknown error');
      }
    });
  };

  const handleAddFromDevice = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response: ImagePickerResponse) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      } else {
        console.log('ImagePicker Error: ', response.errorMessage || 'Unknown error');
      }
    });
  };

  return (
    <View style={styles.imageSection}>
      <Text style={styles.title}>Add Image</Text>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text style={styles.placeholder}>No image selected</Text>
      )}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Icon name="camera" size={20} color="#000" style={styles.icon} />
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAddFromDevice}>
          <Icon name="photo" size={20} color="#000" style={styles.icon} />
          <Text style={styles.buttonText}>Add from Device</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageSection: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
  },
  image: {
    width: '10%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeholder: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 5,
    width: '46%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: '2%',
  },
  buttonText: {
    color: '#000',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default ImageHandler;

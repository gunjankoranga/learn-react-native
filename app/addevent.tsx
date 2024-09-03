import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import { ImagePickerResponse } from 'react-native-image-picker';

function handleResponse(response: ImagePickerResponse) {

}

const NewFormPage = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [expectedCost, setExpectedCost] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const handleBack = () => {
    Alert.alert("Back", "Back button clicked!");
  };

  const handleSubmit = () => {
    Alert.alert("Submit", "Submit button clicked!");
  };

  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleAddFromDevice = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <FormField
          title="Name"
          value={name}
          placeholder="Enter name"
          handleChangeText={setName}
        />
        <FormField
          title="Category"
          value={category}
          placeholder="Enter category"
          handleChangeText={setCategory}
        />
        <FormField
          title="Description"
          value={description}
          placeholder="Enter description"
          handleChangeText={setDescription}
        />
        <FormField
          title="Expected Cost"
          value={expectedCost}
          placeholder="Enter expected cost"
          keyboardType="numeric"
          handleChangeText={setExpectedCost}
        />
        <View style={styles.imageSection}>
          <Text style={styles.title}>Add Image</Text>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
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
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={handleBack}>
          <Text style={styles.footerButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleSubmit}>
          <Text style={styles.footerButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NewFormPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  footerButton: {
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    backgroundColor: '#FFF',
  },
  footerButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  imageSection: {
    alignItems: 'center',
    width: '100%',
   
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    width: '100%',
    marginLeft:50,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
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
    marginLeft:23,
  },
  buttonText: {
    color: '#000', 
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
    
  },
});

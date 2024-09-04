// NewFormPage.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert, SafeAreaView } from 'react-native';
import FormField from '@/components/FormField';
import ImageHandler from '@/components/ImageHandler';
import ActionButton from '@/components/ActionButton';

const NewFormPage = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [expectedCost, setExpectedCost] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const handleBack = () => {
    Alert.alert("Back", "Back button clicked!");
  };

  const handleSubmit = () => {
    Alert.alert("Submit", "Submit button clicked!");
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
        <ImageHandler imageUri={imageUri} setImageUri={setImageUri} />
      </View>
      <View style={styles.footer}>
        <ActionButton
          label="Back"
          onPress={handleBack}
          enabled={true}
          style={styles.footerButton}
        />
        <ActionButton
          label="Submit"
          onPress={handleSubmit}
          enabled={isSubmitEnabled}
          style={styles.footerButton}
        />
      </View>
    </SafeAreaView>
  );
};

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
    width: '45%',
  },
});

export default NewFormPage;

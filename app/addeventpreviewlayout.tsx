import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import AddItemModal from '@/components/AddItemModal'; // Adjust import path as necessary
import ActionButton from '@/components/ActionButton';
import chairImage from '../assets/images/chair.jpeg'; // Adjust path as necessary

const RootLayout = () => {
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [customerDetails, setCustomerDetails] = useState("");
  const [eventDate, setEventDate] = useState<Date | undefined>(undefined);
  const [paymentDate, setPaymentDate] = useState<Date | undefined>(undefined);
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [previewItems, setPreviewItems] = useState<string[]>([]); // Change to an array of strings

  useEffect(() => {
    const checkIfFieldsAreFilled = () => {
      return (
        name.trim() !== "" &&
        venue.trim() !== "" &&
        customerDetails.trim() !== "" &&
        eventDate !== undefined &&
        paymentDate !== undefined
      );
    };

    setIsAddButtonEnabled(checkIfFieldsAreFilled());
  }, [name, venue, customerDetails, eventDate, paymentDate]);

  useEffect(() => {
    if (selectedItems.length > 0) {
      const itemNames = selectedItems.map((item, index) => `${index + 1}. ${item.name}`);
      setPreviewItems(itemNames);
    } else {
      setPreviewItems([]);
    }
  }, [selectedItems]);

  const handleAddItems = (items: any[]) => {
    setSelectedItems(prevItems => {
      const updatedItems = [...prevItems, ...items];
      return updatedItems;
    });
    Alert.alert("Items Added", `You have selected ${items.length} items.`);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleBack = () => {
    Alert.alert("Back", "Back button clicked!");
  };

  const handleSubmit = () => {
    Alert.alert("Submit", "Submit button clicked!");
  };

  const items = [
    { id: '1', name: 'Chair', image: chairImage, price: 100 },
    { id: '2', name: 'Item 2', image: chairImage, price: 200 },
    { id: '3', name: 'Item 3', image: chairImage, price: 200 },
    { id: '4', name: 'Item 4', image: chairImage, price: 200 },
    { id: '5', name: 'Item 5', image: chairImage, price: 200 },
    { id: '6', name: 'Item 6', image: chairImage, price: 200 },
    { id: '7', name: 'Item 7', image: chairImage, price: 200 },
    { id: '8', name: 'Item 8', image: chairImage, price: 200 },
    { id: '9', name: 'Item 9', image: chairImage, price: 200 },
    { id: '10', name: 'Item 10', image: chairImage, price: 200 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.form}>
            <FormField
              title="Name"
              value={name}
              placeholder="Enter your name"
              handleChangeText={setName}
            />
            <FormField
              title="Venue"
              value={venue}
              placeholder="Enter venue"
              handleChangeText={setVenue}
            />
            <FormField
              title="Customer Details"
              value={customerDetails}
              placeholder="Enter customer details"
              handleChangeText={setCustomerDetails}
            />
            <FormField
              title="Event Date"
              value={eventDate}
              placeholder="Select event date"
              isDate={true}
              onDateChange={setEventDate}
            />
            <FormField
              title="Payment Date"
              value={paymentDate}
              placeholder="Select payment date"
              isDate={true}
              onDateChange={setPaymentDate}
            />
            {previewItems.length > 0 && ( // Show "Preview Items" only if there are selected items
              <FormField
                title="Preview Items"
                value={previewItems.join('\n')} // Join items with newline
                placeholder="No items selected"
                editable={false} // Make this field read-only
                multiline // Enable multiline to show items vertically
                numberOfLines={previewItems.length} // Adjust the number of lines
              />
            )}
            {previewItems.length === 0 && ( // Only show "Add Items" button if no items have been added
              <ActionButton
                label="Add Items"
                onPress={() => setIsModalVisible(true)}
                enabled={isAddButtonEnabled}
              />
            )}
            {previewItems.length > 0 && ( // Show "Add More" button if items are selected
              <ActionButton
                label="Add More"
                onPress={() => setIsModalVisible(true)}
                enabled={true}
              />
            )}
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
              enabled={previewItems.length > 0}
              style={styles.footerButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <AddItemModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        items={items}
        onAddItem={handleAddItems}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%', // Adjusted for better fit
    padding: 0,
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

export default RootLayout;

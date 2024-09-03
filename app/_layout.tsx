import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import AddItemModal from '@/components/AddItemModal'; // Adjust the import path as necessary

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
  const [previewItems, setPreviewItems] = useState<string>("");
  const [itemsSelected, setItemsSelected] = useState(false);

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
    setItemsSelected(previewItems.trim() !== "");
  }, [previewItems]);

  const handleAddItems = (items: any[]) => {
    setSelectedItems(prevItems => {
      const updatedItems = [...prevItems, ...items];
      const itemNames = updatedItems.map(item => item.name).join(", ");
      setPreviewItems(itemNames);
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
    { id: '10', name: 'Item 10',image: chairImage, price: 200 },
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
            <View style={styles.previewContainer}>
              <FormField
                title="Preview Items"
                value={previewItems}
                placeholder="No items selected"
                editable={false}
              />
              {itemsSelected && ( // Show "Add More" button only if items are selected
                <TouchableOpacity
                  style={styles.addMoreButton}
                  onPress={() => setIsModalVisible(true)}
                >
                  <Text style={styles.addMoreButtonText}>Add More</Text>
                </TouchableOpacity>
              )}
            </View>
            {!itemsSelected && ( // Only show "Add Items" button if no items have been added
              <TouchableOpacity
                style={[styles.addButton, { opacity: isAddButtonEnabled ? 1 : 0.5 }]}
                onPress={() => setIsModalVisible(true)}
                disabled={!isAddButtonEnabled}
              >
                <Text style={styles.addButtonText}>Add Items</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.footerButton} onPress={handleBack}>
              <Text style={styles.footerButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.footerButton, { opacity: itemsSelected ? 1 : 0.5 }]}
              onPress={handleSubmit}
              disabled={!itemsSelected}
            >
              <Text style={styles.footerButtonText}>Submit</Text>
            </TouchableOpacity>
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
  previewContainer: {
    width: '100%', // Full width for the container
    marginBottom: 20, // Space below the preview items
    marginRight:60,
  },
  previewTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Aligns items in a row
    alignItems: 'center', // Centers items vertically
  },
  addMoreButton: {
    backgroundColor: 'yellow',
    padding: 5,
    borderRadius: 5,
    
    alignSelf: 'flex-end', // Aligns button to the start of the container
    
  },
  addMoreButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    width: '60%', // Adjusted for better fit
  },
  addButtonText: {
    color: '#000',
    fontWeight: 'bold',
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
});

export default RootLayout;

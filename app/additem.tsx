import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';

const RootLayout = () => {
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [customerDetails, setCustomerDetails] = useState("");
  const [eventDate, setEventDate] = useState<Date | undefined>(undefined);
  const [paymentDate, setPaymentDate] = useState<Date | undefined>(undefined);
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

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

  const handleAddItems = () => {
    if (isAddButtonEnabled) {
      // Show the modal
      setIsModalVisible(true);
    } else {
      Alert.alert("Add Items", "Please fill all the required fields.");
    }
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

  return (
    <SafeAreaView style={styles.container}>
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
        <TouchableOpacity
          style={[styles.addButton, { opacity: isAddButtonEnabled ? 1 : 0.5 }]}
          onPress={handleAddItems}
          disabled={!isAddButtonEnabled}
        >
          <Text style={styles.addButtonText}>Add Items</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={handleBack}>
          <Text style={styles.footerButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleSubmit}>
          <Text style={styles.footerButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Component */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Item Added Successfully!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RootLayout;

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
  addButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20, // Adjusted margin for better spacing
    width: '40%',
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
    padding: 10,  // Increased padding for better touch experience
    backgroundColor: '#FFF',
  },
  footerButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

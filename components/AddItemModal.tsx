import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Image, TouchableOpacity } from 'react-native';

// Interface for the items
interface Item {
  id: string;
  name: string;
  image: any; 
  price: number;
}

interface AddItemModalProps {
  visible: boolean;
  onClose: () => void;
  items: Item[];
  onAddItem: (selectedItems: Item[]) => void; // Updated handler for selected items
}

const AddItemModal: React.FC<AddItemModalProps> = ({ visible, onClose, items, onAddItem }) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const handleItemPress = (item: Item) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.some(selectedItem => selectedItem.id === item.id)) {
        // Item already selected, deselect it
        return prevSelected.filter(selectedItem => selectedItem.id !== item.id);
      } else {
        // Item not selected, add it
        return [...prevSelected, item];
      }
    });
  };

  const handleAddItems = () => {
    onAddItem(selectedItems);
    onClose(); // Close the modal after adding items
  };

  const renderItem = (item: Item) => (
    <TouchableOpacity 
      key={item.id} 
      onPress={() => handleItemPress(item)} 
      style={[
        styles.itemContainer,
        selectedItems.some(selectedItem => selectedItem.id === item.id) && styles.itemSelected
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>

      <Image source={item.image} style={styles.itemImage} />

      <View style={styles.textContainer}>
      
        <Text style={styles.itemName}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  // Group items by row count (3 items per row)
  const rows = [];
  for (let i = 0; i < items.length; i += 3) {
    rows.push(items.slice(i, i + 3));
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.gridContainer}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>ALL ITEMS</Text>
            </View>
            <View style={styles.itemsContainer}>
              {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map(item => renderItem(item))}
                  {row.length < 3 && (
                    <View style={[styles.itemContainer, styles.placeholderContainer]}>
                      <Text style={styles.itemName}> </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[
                  styles.addButton, 
                  { backgroundColor: selectedItems.length > 0 ? 'yellow' : 'gray' }
                ]} 
                onPress={handleAddItems}
                disabled={selectedItems.length === 0}
              >
                <Text style={styles.addButtonText}>
                  {selectedItems.length > 0 ? `ADD ${selectedItems.length} ITEM${selectedItems.length > 1 ? 'S' : ''}` : 'ADD ITEMS'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  gridContainer: {
    width: '100%',
    borderWidth: 0.9,
    borderColor: '#000',
    position: 'relative',
    paddingBottom: 10,
    paddingLeft:20,
    paddingRight:20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
  },
  itemsContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemContainer: {
    alignItems: 'center',
    width: '30%',
    padding: 10,
    borderWidth: 0.8,
    borderColor: '#000',
    margin: 3,
    backgroundColor: '#FFF',
  },
  itemSelected: {
    backgroundColor: 'yellow', // Highlight selected items
  },
  placeholderContainer: {
    borderColor: 'transparent',
  },
  itemImage: {
    width: 70,
    height: 80,
    borderRadius: 10,
    marginBottom: 3,
  },
  textContainer: {
    alignItems: 'center',
  },
  itemName: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2,
  },
  addButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    
  },
  addButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
});

export default AddItemModal;

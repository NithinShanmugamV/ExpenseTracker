import React, { useState } from "react";
import { Modal, Text, View, StyleSheet, TouchableOpacity } from "react-native";

const ViewExpense = ({ visible, expenseData, onCloseModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCloseModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Expense Details</Text>
          {expenseData && (
            <View style={styles.expenseDetails}>
              <Text>Name: {expenseData.name}</Text>
              <Text>Type: {expenseData.type}</Text>
              <Text>Account: {expenseData.account}</Text>
              <Text>Category: {expenseData.category}</Text>
              <Text>Description: {expenseData.description}</Text>
              <Text>Amount: {expenseData.amount}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onCloseModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  expenseDetails: {
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ViewExpense;

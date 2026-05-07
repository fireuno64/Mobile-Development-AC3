import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ExpenseContext } from '../context/ExpenseContext';

const AddExpenseScreen = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { addExpense } = useContext(ExpenseContext);

  const handleSave = () => {
    // Validação estrita
    const parsedAmount = parseFloat(amount.replace(',', '.'));

    if (description.trim() === '') {
      setError('A descrição não pode estar vazia.');
      return;
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('O valor deve ser numérico e maior que zero.');
      return;
    }

    // Passou na validação, abre a confirmação em vez de salvar direto
    setError('');
    setShowConfirmation(true);
  };

  const confirmSave = () => {
    const parsedAmount = parseFloat(amount.replace(',', '.'));
    addExpense(description.trim(), parsedAmount);
    navigation.goBack();
  };

  const cancelSave = () => {
    setShowConfirmation(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Almoço, Internet"
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          if (error) setError('');
          if (showConfirmation) setShowConfirmation(false);
        }}
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 45.90"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => {
          setAmount(text);
          if (error) setError('');
          if (showConfirmation) setShowConfirmation(false);
        }}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {!showConfirmation ? (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar Gasto</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>Deseja realmente salvar esta despesa?</Text>
          <View style={styles.confirmationButtons}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelSave}>
              <Text style={styles.buttonText}>Não</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={confirmSave}>
              <Text style={styles.buttonText}>Sim</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fafafa',
  },
  errorText: {
    color: '#ff5252',
    fontSize: 14,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmationContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ff5252',
    marginRight: 10,
    marginTop: 0,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#4caf50',
    marginLeft: 10,
    marginTop: 0,
  },
});

export default AddExpenseScreen;

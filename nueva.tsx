import { useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { db } from '../../firebase';

export default function NuevaRemision() {
  const [cliente, setCliente] = useState('');
  const [lote, setLote] = useState('');
  const router = useRouter();

  async function guardar() {
    await addDoc(collection(db, 'remisiones'), {
      cliente,
      lote: parseFloat(lote),
      fecha: serverTimestamp(),
    });
    router.back();
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Cliente" value={cliente} onChangeText={setCliente} style={styles.input} />
      <TextInput placeholder="Lote" value={lote} onChangeText={setLote} keyboardType="default" style={styles.input} />
      <Button title="Guardar" onPress={guardar} />
      <Button title="⬅ Volver" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  input: { borderWidth: 1, padding: 8, borderRadius: 4, borderColor: '#ccc' },
});

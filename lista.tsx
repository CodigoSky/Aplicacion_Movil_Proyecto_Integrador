import { useRouter } from 'expo-router';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../../firebase';



export default function RemisionesList() {
  const [remisiones, setRemisiones] = useState<any[]>([]);
  const router = useRouter();

  async function cargarRemisiones() {
    const snap = await getDocs(collection(db, 'remisiones'));
    setRemisiones(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  }

  useEffect(() => {
    cargarRemisiones();
  }, []);

  async function borrarRemision(id: string) {
    await deleteDoc(doc(db, 'remisiones', id));
    cargarRemisiones();
  }

  return (
    <View style={styles.container}>
      <Button title="⬅ Volver" onPress={() => router.back()} />
      <Button title="Agregar" onPress={() => router.push('/remisiones/nueva')} />
      

      <FlatList
        data={remisiones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity
                onPress={() =>
                    router.push({
                        pathname: '/remisiones/[id]',
                        params: { id: item.id }
        })
      }
    >
      <View style={styles.item}>
        <Text>{item.cliente} - {item.lote}</Text>
        <Button
          title="Borrar"
          color="red"
          onPress={() => borrarRemision(item.id)}
        />
      </View>
    </TouchableOpacity>
  )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ccc' },
});

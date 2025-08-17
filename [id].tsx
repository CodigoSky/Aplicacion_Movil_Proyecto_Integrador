import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { db } from '../../firebase';

export default function DetalleRemision() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [remision, setRemision] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRemision() {
      if (!id) return;
      const snap = await getDoc(doc(db, 'remisiones', String(id)));
      if (snap.exists()) {
        setRemision({ id: snap.id, ...snap.data() });
      } else {
        setRemision(null);
      }
      setLoading(false);
    }
    fetchRemision();
  }, [id]);

  if (loading) return <Text>Cargando...</Text>;
  if (!remision) return <Text>No encontrada</Text>;

  return (
    <View style={styles.container}>
      <Text>Cliente: {remision.cliente}</Text>
      <Text>Lote: {remision.lote}</Text>
      <Button title="Volver" onPress={() => router.back()} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
});

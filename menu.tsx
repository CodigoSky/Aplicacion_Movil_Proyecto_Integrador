import { useRouter } from 'expo-router';
import { Button, StyleSheet, View } from 'react-native';

export default function RemisionesMenu() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button
        title="📄 Listado de remisiones"
        onPress={() => router.push('/remisiones/lista')} 
      />
      <Button
        title="➕ Nueva remision"
        onPress={() => router.push('/remisiones/nueva')}
      />
      <Button
        title="➕ Consulta remision"
        onPress={() => router.push('/remisiones/[id]')}
      />      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
    padding: 20,
    backgroundColor: '#fff'
  }
});

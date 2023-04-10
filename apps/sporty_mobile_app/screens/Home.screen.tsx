import { View } from 'react-native';
import styled from 'styled-components/native';

export default function HomeScreen() {
  const Card = styled.View`
    gap: 6px;
    margin: 12px 16px;
    padding: 16px;
    border-radius: 8px;
    background: white;
  `;

  const Title = styled.Text`
    font-size: 32px;
  `;

  const SubTitle = styled.Text`
    font-size: 24px;
  `;

  const Text = styled.Text`
    font-size: 20px;
  `;

  return (
    <View>
      <Card>
        <Title>Hello 👋🏼 Kuzey</Title>
        <SubTitle>Good afternoon!</SubTitle>
      </Card>

      <Card>
        <SubTitle>Workout History</SubTitle>
        <Card>
          <SubTitle>Burada kullanici bir hafta icerisinde daily traker gorecek</SubTitle>
        </Card>
      </Card>

      <Card>
        <SubTitle>Today's Workout</SubTitle>
        <Text>Sag ve sola kaydirmali workoutlar listelenecek</Text>
      </Card>
    </View>
  );
}

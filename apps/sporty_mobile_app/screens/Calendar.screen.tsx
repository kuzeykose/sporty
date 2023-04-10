import { Text, View } from 'react-native';
import styled from 'styled-components/native';

export default function CalendarScreen() {
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

  return (
    <View>
      <Card>
        <Title>Calendar</Title>
      </Card>
    </View>
  );
}

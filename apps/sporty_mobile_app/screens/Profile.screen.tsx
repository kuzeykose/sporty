import { View } from 'react-native';
import styled from 'styled-components/native';

export default function ProfileScreen() {
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

  return (
    <View>
      <Card>
        <Title>Avatar</Title>
      </Card>
      <Card>
        <Title>Profile</Title>
        <SubTitle> - Change email</SubTitle>
        <SubTitle> - Reset password</SubTitle>
      </Card>
      <Card>
        <Title>Invite friends</Title>
      </Card>
      <Card>
        <Title>Settings</Title>
        <SubTitle> - Notification settings</SubTitle>
        <SubTitle> - Language settings</SubTitle>
      </Card>
    </View>
  );
}

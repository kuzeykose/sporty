import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

const CustomView = styled.TouchableOpacity`
  background: #4e46e5;
  padding: 12px;
  border-radius: 8px;
  border-radius: 8px;
`;

const CustomText = styled.Text`
  color: white;
`;

export const Button = ({ children, ...rest }: TouchableOpacityProps) => {
  return (
    <CustomView {...rest}>
      <CustomText>{children}</CustomText>
    </CustomView>
  );
};

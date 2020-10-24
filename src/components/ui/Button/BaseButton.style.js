import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  border: none;
  color: ${ props => props.color || '#000' };
  background-color: ${ props => props.backgroundColor || '#fff' };
  text-transform: uppercase;
  padding: 10px;
  cursor: pointer;
  letter-spacing: 0.5px;
  outline: none;

  &:disabled {
    cursor: not-allowed;
    opacity: .5;
  }
`;
import styled from 'styled-components';

const FormWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 64px auto;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.palette.grey[800]};
  border-radius: 8px;
  background-color: ${(props) => props.theme.palette.background.paper};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default FormWrapper;

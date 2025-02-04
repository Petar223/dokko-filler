import React, { useContext } from "react";
import { ColorModeContext } from "../../theme/theme";
import styled from "styled-components";

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  border: 1px solid ${({ theme }) => theme.grey[900]}
  &:checked + span {
    background-color: ${({ theme }) => theme.primary[500]};
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.grey[400]};
  transition: 0.4s;
  border-radius: 20px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const ThemeSwitch = () => {
  const { toggleColorMode } = useTheme();

  return (
    <SwitchContainer>
      <SwitchLabel>
        <SwitchInput type="checkbox" onChange={toggleColorMode} />
        <Slider />
      </SwitchLabel>
    </SwitchContainer>
  );
};

export default ThemeSwitch;

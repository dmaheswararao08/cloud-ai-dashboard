import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledDiv1 = styled.div`
  border-radius: 25px;
  top: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const LoginLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
export const StyledH5 = styled.h5`
  color: #339fff;
  text-transform: capitalize;
  letter-spacing: 1px;
  border-bottom: 2px solid;
  padding-bottom: 10px;
`;

export const ErrorStyle = styled.span`
  color: red;
  font-weight: bolder;
  font-size: 12px;
  margin-bottom: 10px;
`;

export const DivStyle1 = styled.div`
  display: grid;
  justify-items: center;
  height: 40px;
  margin: 35px 0;
  border: none;
`;

export const DivStyle2 = styled.div`
  margin: 15px 25px;
  border: 2px solid;
  border-radius: 10px;
  padding: 10px;
  background: #339fff;
  color: white;
`;

export const CheckBoxStyle1 = styled.input`
  margin: 10px;
`;

export const SpanStyle1 = styled.span`
  font-size: 15px;
  font-weight: 700;
  margin: 10px;
  background: white;
  color: black;
  padding: 5px 10px;
  border-radius: 10px;
  letter-spacing: 1px;
`;

export const UlStyle1 = styled.ul`
  list-style-type: none;
  margin: 20px;
  box-shadow: 2px 2px 2px 2px #339fff;
  border-radius: 10px;
  padding: 10px 20px;
`;

export const LiStyle1 = styled.li`
  margin: 10px;
`;

export const SpanStyle3 = styled.span`
  font-weight: 500;
  letter-spacing: 1px;
`;

export const StatusStyle = styled.span`
  border: 0px solid;
  padding: 5px 15px;
  border-radius: 10px;
  font-size: 25px;
  text-transform: uppercase;
  text-align: center;
  display: flex;
  justify-content: center;
  background: #339fff;
  color: white;
  font-weight: bolder;
  letter-spacing: 1px;
`;

export const StyledDiv2 = styled.div`
  text-align: center;
`;

export const ButtonStyle1 = styled.button`
  border: none;
  background: #339fff;
  color: white;
  font-weight: 500;
  padding: 5px 15px;
  border-radius: 10px;
  cursor: pointer;
`;

export const SpanStyle2 = styled.span`
  font-size: 15px;
  font-style: oblique;
  color: #339fff;
  font-weight: bold;
`;

export const StyledLabel = styled.label`
  font-size: 15px;
  font-weight: 500;
  font-style: italic;
  text-transform: uppercase;
  color: #339fff;
`;

export const StyledLink = styled(Link)`
  font-size: 15px;
  text-decoration: none;
  color: grey;
  cursor: pointer;
  text-transform: capitalize;
`;

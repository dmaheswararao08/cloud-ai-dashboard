import styled from "styled-components";

export const StyledHeaderDiv = styled.div`
  background-color: green;
`;
export const StyledHeader = styled.nav`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Adjust the shadow as needed */
  background-color: #f8f9fa; /* Example background color, adjust as needed */
`;
export const StyledNavLink = styled.li`
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  list-style: none;
`;

export const StyledLogoutLink = styled.li`
  background: green;
  padding: 0 10px;
  border-radius: 10px;
  cursor: pointer;
  margin: 0 50px;
  list-style: none;
`;

export const StyledLogoutAnchor = styled.a`
  color: white;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: pointer;
`;

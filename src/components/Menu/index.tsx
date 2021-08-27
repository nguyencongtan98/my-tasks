import { Collapse, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const { Panel } = Collapse;
const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box,
    p {
      padding: 0 40px;
    }

    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyle = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

const MenuStyled = styled.div`
  background: #8f570a;
  color: white;
  height: 100vh;
`;

export const MenuSideBar = () => {
  return (
    <MenuStyled>
      <Collapse ghost defaultActiveKey={["1"]}>
        <PanelStyled header="List Room" key="1">
          <LinkStyle>Room 1</LinkStyle>
          <LinkStyle>Room 2</LinkStyle>
          <LinkStyle>Room 3</LinkStyle>
        </PanelStyled>
      </Collapse>
    </MenuStyled>
  );
};

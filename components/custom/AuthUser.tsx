import React from "react";
import { IconButton, Icon, Button, Text } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";

import SignOutBtn from "./SignOutBtn";
import { IoMdArrowDropdown } from "react-icons/io";

interface Props {
  userName: string;
}

const AuthUser = ({ userName }: Props) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button>
          <Text>Hi! {userName}</Text>
          <Icon>
            <IoMdArrowDropdown />
          </Icon>
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="new-txt">
          <SignOutBtn />
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default AuthUser;

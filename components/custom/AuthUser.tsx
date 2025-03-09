import React from "react";
import { IconButton, Icon, Button, Text, VStack, Box } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";

import SignOutBtn from "./SignOutBtn";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";

interface Props {
  userName: string;
  userId: string;
}

const AuthUser = ({ userName, userId }: Props) => {
  return (
    <Box
      display={{
        base: "none",
        sm: "none",
        md: "flex",
      }}
    >
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
          <MenuItem value="account">
            <Link href={`/dashboard/${userId}`}>
              <Text> Manage account </Text>
            </Link>
          </MenuItem>
          <MenuItem value="sign-out">
            <SignOutBtn />
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </Box>
  );
};

export default AuthUser;

import { Avatar } from "@chakra-ui/react";
import React from "react";

function MyAvatar({ size }: { size: string }) {
  return (
    <Avatar
      size={size}
      src={"https://avatars.dicebear.com/api/male/username.svg"}
    />
  );
}

export default MyAvatar;

import React, { useContext } from "react";
import { Button, Center, Text } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context";

const Profile = () => {
  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {};
  return (
    <Center h={"full"}>
      <Text>Profile</Text>
      <Button onPress={signOut}>Logout</Button>
    </Center>
  );
};

export default Profile;

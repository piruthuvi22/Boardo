import { useContext, useState } from "react";
import {
  Text,
  Center,
  Stack,
  Box,
  FormControl,
  Input,
  WarningOutlineIcon,
  HStack,
  Pressable,
  Button,
  VStack,
  Flex,
  Divider,
  Avatar,
  ScrollView,
  KeyboardAvoidingView,
  IconButton,
} from "native-base";
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  // ScrollView,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useToast } from "native-base";
import AuthContext from "../../context";
import ToastAlert from "../../components/Alert";

let { height, width } = Dimensions.get("screen");

const RenterLogin = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { signIn } = useContext(AuthContext);
  const toast = useToast();

  const handleEmail = (e) => {
    setEmail(e);
  };

  const handlePassword = (e) => {
    setPassword(e);
  };

  const handlePassword2 = (e) => {
    setPassword2(e);
  };

  const onSuccessRegister = () => {
    console.log("sss");
    toast.closeAll();
    navigation.navigate("student-login");
  };

  const handleRegister = () => {
    let body = { username, password };
    if (
      password === password2 &&
      username != "" &&
      password != "" &&
      password2 != ""
    ) {
      axios
        .post("http://192.168.8.139:1000/users/register", body)
        .then((res) => {
          console.log(res.data);
          toast.show({
        duration: 3000,
            onCloseComplete: () => navigation.navigate("student-login"),
            render: ({}) => {
              return (
                <ToastAlert
                  toast={toast}
                  onSuccessRegister={onSuccessRegister}
                />
              );
            },
          });
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Invalid params");
      toast.show({
        duration: 3000,
        onCloseComplete: () => navigation.navigate("student-login"),
        render: ({}) => {
          return (
            <ToastAlert toast={toast} onSuccessRegister={onSuccessRegister} />
          );
        },
      });
    }
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView h={height} behavior={"a"}>
        <ImageBackground
          source={require("../../assets/images/backkgroun-login.png")}
          resizeMode="stretch"
        >
          <Stack
            justifyContent={"space-evenly"}
            h={"full"}
            mx={{ base: "5%", sm: 10, md: 20 }}
          >
            <Box h={"30%"} justifyContent={"center"}>
              <Box alignItems={"flex-start"}>
                <Pressable
                  android_ripple={{ color: "#ddd" }}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons
                    name="chevron-back-outline"
                    size={36}
                    color="#FD683D"
                  />
                </Pressable>
              </Box>
              <Text
                color={"#FD683D"}
                fontFamily={"Poppins-Bold"}
                fontSize={"5xl"}
              >
                Sign up
              </Text>
              <Text
                color={"#A0A0A0"}
                fontFamily={"Poppins-Regular"}
                fontSize={"md"}
              >
                Create your account for free
              </Text>
            </Box>
            <VStack h={"70%"}>
              <FormControl isRequired my={2}>
                <Stack mx="4">
                  <FormControl.Label _text={{ fontFamily: "Poppins-Medium" }}>
                    Username
                  </FormControl.Label>
                  <Input
                    _focus={{
                      borderWidth: "2",
                      borderColor: "#FD683D",
                      backgroundColor: "#FD683D:alpha.5",
                    }}
                    type="text"
                    defaultValue=""
                    value={username}
                    placeholder="Username"
                    backgroundColor={"#FD683D:alpha.10"}
                    borderColor={"#FD683D"}
                    focusOutlineColor={"red"}
                    fontSize={"md"}
                    color={"#666"}
                    onChangeText={handleEmail}
                  />
                  {/* <FormControl.HelperText>
                Must be atleast 6 characters.
              </FormControl.HelperText>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Atleast 6 characters are required.
              </FormControl.ErrorMessage> */}
                </Stack>
              </FormControl>

              <FormControl isRequired my={2}>
                <Stack mx="4">
                  <FormControl.Label _text={{ fontFamily: "Poppins-Medium" }}>
                    Password
                  </FormControl.Label>
                  <Input
                    type={show ? "text" : "password"}
                    _focus={{
                      borderWidth: "2",
                      borderColor: "#FD683D",
                      backgroundColor: "#FD683D:alpha.5",
                    }}
                    InputRightElement={
                      <Feather
                        name={show ? "eye" : "eye-off"}
                        size={20}
                        style={{ marginRight: 5 }}
                        color="#999"
                        onPress={() => setShow(!show)}
                      />
                    }
                    defaultValue=""
                    value={password}
                    placeholder="Password"
                    backgroundColor={"#FD683D:alpha.10"}
                    borderColor={"#FD683D"}
                    focusOutlineColor={"red"}
                    fontSize={"md"}
                    color={"#666"}
                    onChangeText={handlePassword}
                  />
                </Stack>
              </FormControl>

              <FormControl isRequired my={2}>
                <Stack mx="4">
                  <FormControl.Label _text={{ fontFamily: "Poppins-Medium" }}>
                    Confirm Password
                  </FormControl.Label>
                  <Input
                    type={show ? "text" : "password"}
                    _focus={{
                      borderWidth: "2",
                      borderColor: "#FD683D",
                      backgroundColor: "#FD683D:alpha.5",
                    }}
                    InputRightElement={
                      <Feather
                        name={show ? "eye" : "eye-off"}
                        size={20}
                        style={{ marginRight: 5 }}
                        color="#999"
                        onPress={() => setShow(!show)}
                      />
                    }
                    defaultValue=""
                    value={password2}
                    placeholder="Password"
                    backgroundColor={"#FD683D:alpha.10"}
                    borderColor={"#FD683D"}
                    focusOutlineColor={"red"}
                    fontSize={"md"}
                    color={"#666"}
                    onChangeText={handlePassword2}
                  />
                  <HStack justifyContent={"space-between"}>
                    <FormControl.HelperText
                      _text={{ fontFamily: "Poppins-Medium" }}
                    >
                      Must be atleast 6 characters.
                    </FormControl.HelperText>
                    <FormControl.HelperText
                      _text={{ fontSize: "md", fontFamily: "Poppins-Medium" }}
                      onTouchEnd={() => console.log("Forgot password")}
                    >
                      Forgot Password
                    </FormControl.HelperText>
                  </HStack>

                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Atleast 6 characters are required.
                  </FormControl.ErrorMessage>
                </Stack>
              </FormControl>

              <Center mt={3} justify={"center"} align={"center"} w={"100%"}>
                <Button
                  android_ripple={{ color: "#F0F1F6" }}
                  backgroundColor="#223343"
                  onPress={handleRegister}
                  width="60%"
                  marginY={1}
                  height={50}
                  borderRadius={100}
                  borderColor={"#FD683D"}
                  borderWidth={2}
                  // fontFamily={"Poppins-Bold"}
                  _text={{
                    fontFamily: "Poppins-Bold",
                    fontSize: "xl",
                    textAlign: "center",
                  }}
                >
                  Login
                </Button>
                <Text fontFamily={"Poppins-Medium"} color={"#A0A0A0"} mt={2}>
                  Don't have an account?
                  <Text
                    color={"#A0A0A0"}
                    fontWeight={"extrabold"}
                    onPress={() => console.log("Dont have an acc")}
                  >
                    &nbsp;Sign up
                  </Text>
                </Text>
              </Center>

              {/* <HStack alignItems={"center"} mt={3}>
              <Divider />
              <Text
                color={"#A0A0A0"}
                onPress={() => console.log("Dont have an acc")}
              >
                &nbsp; &nbsp;Or login with&nbsp; &nbsp;
              </Text>
              <Divider />
            </HStack> */}

              {/* <HStack justifyContent={"center"} mt={3} space={5}>
              <Avatar
                source={require("../assets/images/fb.png")}
                backgroundColor={"#ddd"}
              />
              <Avatar
                source={require("../assets/images/google.png")}
                backgroundColor={"#ddd"}
              />
            </HStack> */}
            </VStack>
          </Stack>
        </ImageBackground>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default RenterLogin;

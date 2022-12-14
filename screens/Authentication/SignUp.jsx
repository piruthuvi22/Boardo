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
  useToast,
} from "native-base";
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  // ScrollView,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AuthContext from "../../context";
import showToast from "../../components/core/toast";

let { height, width } = Dimensions.get("screen");

const RenterLogin = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const toast = useToast();

  const { signIn } = useContext(AuthContext);

  const handleEmail = (e) => {
    setEmail(e);
  };

  const handlePassword = (e) => {
    setPassword(e);
  };

  const handlePassword2 = (e) => {
    setPassword2(e);
  };

  const handleRegister = () => {
    let body = { username, password };
    if (username != "" && password != "" && password2 != "") {
      if (password === password2) {
        axios
          .post("https://boardo-api.herokuapp.com/users/register", body)
          .then((res) => {
            console.log(res.data);
            showToast(toast, "warning", "Registration success", () =>
              navigation.navigate("student-login")
            );
          })
          .catch((err) => {
            showToast(toast, "error", "Registration failed");
          });
      } else {
        showToast(toast, "error", "Password not match");
      }
    } else {
      console.log("Invalid params");
      showToast(toast, "error", "Invalid credentials!");
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
                  Register
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

import { useState, useContext } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, Ionicons } from "@expo/vector-icons";
import axios from "axios";
let { height, width } = Dimensions.get("screen");
import AuthContext from "../../context";
import ShowToast from "../../components/core/toast";

const RenterLogin = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [username, setEmail] = useState("piru");
  const [password, setPassword] = useState("pass");

  const toast = useToast();

  const { signIn } = useContext(AuthContext);

  const handleEmail = (e) => {
    setEmail(e);
  };

  const handlePassword = (e) => {
    setPassword(e);
  };

  const handleOnComplete = () => {
    toast.closeAll();
    signIn({ username, password });
  };

  const handleStudentLogin = () => {
    let body = { username, password, role: "student" };
    if (username != "" && password != "") {
      axios
        .post("https://boardo-api.herokuapp.com/users/login", body)
        .then((res) => {
          console.log(res.data);
          ShowToast(toast, "warning", "Login success!", () => {
            toast.closeAll();
            signIn({ username, password });
          });
        })
        .catch((err) => {
          console.log(err);
          ShowToast(toast, "error", "Login failed. Try again!");
        });
    } else {
      ShowToast(toast, "warning", "Invalid params!");
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
            <Box h={"40%"} justifyContent={"center"}>
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
                Sign in
              </Text>
              <Text
                color={"#A0A0A0"}
                fontFamily={"Poppins-Regular"}
                fontSize={"md"}
              >
                Discover your boarding with us
              </Text>
            </Box>
            <VStack h={"60%"}>
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
                  android_ripple={{ color: "#F0F1F628" }}
                  backgroundColor="#223343"
                  onPress={handleStudentLogin}
                  width="60%"
                  marginY={1}
                  height={50}
                  borderRadius={100}
                  borderColor={"#FD683D"}
                  borderWidth={2}
                  // disabled={username == "" || password == "" ? true : false}
                  _disabled={{ backgroundColor: "#ddd" }}
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
                    onPress={() => navigation.navigate("sign-up")}
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

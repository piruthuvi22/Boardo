import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Image,
  VStack,
  Actionsheet,
  useDisclose,
} from "native-base";
import { Rating, AirbnbRating } from "react-native-ratings";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { AntDesign, Ionicons } from "@expo/vector-icons";
// import ImageSlider from "react-native-image-slider";

const Details = () => {
  const [images, setImages] = useState([
    "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg",
    "https://images.pexels.com/photos/15286/pexels-photo.jpg?cs=srgb&dl=pexels-luis-del-r%C3%ADo-15286.jpg&fm=jpg",
    "https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg",
    "https://www.undp.org/sites/g/files/zskgke326/files/migration/cn/UNDP-CH-Why-Humanity-Must-Save-Nature-To-Save-Itself.jpeg",
  ]);
  const { isOpen, onOpen, onClose } = useDisclose();
  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d7",
    },
    {
      id: "58694a0f-da1-471f-bd96-145571e29d72",
    },
    {
      id: "5864a0f-3da1-471f-bd96-145571e29d72",
    },
    {
      id: "58694a0fda1-471f-bd96-145571e29d72",
    },
  ];
  const renderItem = ({ item }) => (
    <Box bg={"amber.800"} m={3} h={10} w={100}></Box>
  );
  return (
    <Box h={"full"}>
      <HStack
        px={3}
        pt={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <VStack>
          <Text style={styles.title}>Place 1</Text>
          <Text style={styles.location}>Katubedda</Text>
        </VStack>
        <AirbnbRating
          showRating={false}
          count={5}
          defaultRating={3}
          size={18}
          selectedColor={"#F24E1E"}
          ratingBackgroundColor="blue"
          onFinishRating={(r) => console.log(r)}
        />
      </HStack>
      {/* <VStack px={3}>
        <Text style={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
          ipsa repudiandae ullam earum minima ducimus dolorem ut dolores quas
          sapiente, similique dicta itaque veniam deserunt neque illo, quae
          deleniti aliquam!
        </Text>
      </VStack> */}

      <Box px={3} pt={2}>
        {/* <SliderBox images={images} sliderBoxHeight={200} /> */}
        <Image
          w={"full"}
          alt="nature"
          source={require("../assets/images/nature.jpg")}
          h={200}
        />
      </Box>
      <HStack justifyContent={"space-between"} alignItems="baseline" px={3}>
        <HStack alignItems="baseline">
          <Text style={styles.money}>Rs. 5,000/</Text>
          <Text style={styles.month}>Month</Text>
        </HStack>
        <HStack alignItems="center" w={"1/4"} justifyContent="space-evenly">
          <Pressable
            android_ripple={{
              color: "#F24E1E22",
              borderless: true,
              radius: 25,
              foreground: true,
            }}
          >
            <AntDesign name="sharealt" size={25} color="#F24E1E" />
          </Pressable>
          <Pressable
            android_ripple={{
              color: "#F24E1E22",
              borderless: true,
              radius: 25,
              foreground: true,
            }}
          >
            <Ionicons name="bookmarks-outline" size={25} color="#F24E1E" />
          </Pressable>
        </HStack>
      </HStack>
      <Divider />
      <HStack
        style={styles.facilities}
        my={2}
        px={3}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Text style={styles.location}>Faclities</Text>
        <AntDesign name="down" size={24} color="#777" />
      </HStack>

      <Pressable onPress={onOpen}>
        <HStack
          style={styles.facilities}
          my={2}
          px={3}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Text style={styles.location}>Review</Text>
          <HStack alignItems="baseline" mx={1}>
            <AirbnbRating
              isDisabled
              showRating={false}
              count={5}
              defaultRating={3}
              size={14}
              selectedColor={"#F24E1E"}
              ratingBackgroundColor="blue"
              onFinishRating={(r) => console.log(r)}
            />
            <Text style={styles.location}>4.6</Text>
          </HStack>
        </HStack>
      </Pressable>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <ScrollView
            showsVerticalScrollIndicator={false}
            StickyHeaderComponent={() => <Text>Hello</Text>}
            style={{ width: "100%" }}
          >
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>

      <Box style={styles.bottomBar}>
        <HStack
          alignItems={"center"}
          h="full"
          justifyContent={"flex-end"}
          px={3}
          w="full"
        >
          <Button
            mx={2}
            px={6}
            style={styles.compare}
            borderRadius={5}
            _text={{
              style: { color: "#FD683D", fontFamily: "Poppins-Medium" },
            }}
            android_ripple={{ color: "#ffffff55" }}
          >
            Compare
          </Button>
          <Button
            mx={2}
            px={6}
            style={styles.reserve}
            borderRadius={5}
            _text={{ style: { color: "#fff", fontFamily: "Poppins-Medium" } }}
            android_ripple={{ color: "#ffffff55" }}
          >
            Reserve
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#223343",
  },
  location: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#666",
  },
  desc: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#777",
    lineHeight: 16,
  },
  money: {
    fontFamily: "Poppins-Bold",
    fontSize: 30,
    color: "#223343",
  },
  month: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    // paddingTop:20
  },
  bottomBar: {
    height: 60,
    width: "100%",
    backgroundColor: "#D8D8D8",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  compare: {
    backgroundColor: "#D8D8D8",
    borderColor: "#FD683D",
    borderWidth: 1,
  },
  reserve: {
    backgroundColor: "#FD683D",
    borderColor: "#FD683D",
    borderWidth: 1,
  },
  facilities: {
    backgroundColor: "#E9E9E9",
    height: 40,
  },
  reviews: {
    position: "relative",
    top: 0,
    bottom: 60,
    left: 0,
    right: 0,
    height: 200,
    width: "100%",
  },
});
export default Details;

import { LogBox } from "react-native";
import Comment from "../components/Comment";

if (__DEV__) {
  const ignoreWarns = [
    "EventEmitter.removeListener",
    "[fuego-swr-keys-from-collection-path]",
    "Setting a timer for a long period of time",
    "ViewPropTypes will be removed from React Native",
    "AsyncStorage has been extracted from react-native",
    "exported from 'deprecated-react-native-prop-types'.",
    "Non-serializable values were found in the navigation state.",
    "VirtualizedLists should never be nested inside plain ScrollViews",
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
}

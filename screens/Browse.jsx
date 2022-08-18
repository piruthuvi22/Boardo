import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Dimensions, DrawerLayoutAndroid } from "react-native";
import * as Location from "expo-location";
import {
  Box,
  HStack,
  Pressable,
  ScrollView,
  Fab,
  Icon,
  Center,
  Button,
  SectionList,
  Heading,
  Text,
  Slider,
  VStack,
  Checkbox,
  Radio,
  Actionsheet,
  useDisclose,
} from "native-base";
import Constants from "expo-constants";
import { Client } from "@googlemaps/google-maps-services-js";
import BrowseCard from "../components/BrowseCard";
import AutoComplete from "../components/AutoComplete";

import { FontAwesome, Entypo } from "@expo/vector-icons";
const client = new Client({});

const Map = ({ navigation }) => {
  const drawer = useRef(null);
  const [uniName, setUniName] = useState("");
  const [uniLocation, setUniLocation] = useState({});

  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(() => {
    console.log("Browse.jsx mounted");
  }, []);

  const handlePlaceSelected = (details) => {
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    setUniLocation(position);
    setUniName(details?.name);
    console.log("Place ==", details.name);
  };

  const filterSheet = () => {
    return (
      <Box height={"full"} w={"full"} pt={Constants.statusBarHeight} px={2}>
        <VStack mx={2} mb={3}>
          <Text style={styles.categoryTitle}>Distance</Text>
          <Slider
            w="full"
            defaultValue={2}
            minValue={1}
            maxValue={5}
            accessibilityLabel="hello world"
            step={1}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <HStack justifyContent={"space-between"}>
            <Text style={styles.slideVal}>{"<100m"}</Text>
            <Text style={styles.slideVal}>{"<200m"}</Text>
            <Text style={styles.slideVal}>{"<500m"}</Text>
            <Text style={styles.slideVal}>{"<1km"}</Text>
            <Text style={styles.slideVal}>{">1km"}</Text>
          </HStack>
        </VStack>

        <VStack mx={2} mb={3}>
          <Text style={styles.categoryTitle}>Room type</Text>
          <Checkbox.Group
            defaultValue={["A", "B"]}
            accessibilityLabel="pick an item"
            onChange={(values) => {}}
          >
            <Checkbox
              value="single"
              my="0.5"
              _text={{ style: styles.filterValues }}
            >
              Single
            </Checkbox>
            <Checkbox
              value="shared"
              my="0.5"
              _text={{ style: styles.filterValues }}
            >
              Shared
            </Checkbox>
            <Checkbox
              value="house"
              my="0.5"
              _text={{ style: styles.filterValues }}
            >
              House
            </Checkbox>
          </Checkbox.Group>
        </VStack>

        <VStack mx={2} mb={3}>
          <Text style={styles.categoryTitle}>Wash room type</Text>
          <Checkbox.Group
            // defaultValue={["A", "B"]}
            accessibilityLabel="pick an item"
            onChange={(values) => {}}
          >
            <Checkbox
              value="traditional"
              my="0.5"
              size={"sm"}
              _text={{ style: styles.filterValues }}
            >
              Traditional
            </Checkbox>
            <Checkbox
              value="western"
              my="0.5"
              size={"sm"}
              _text={{ style: styles.filterValues }}
            >
              Western
            </Checkbox>
            <Checkbox
              value="attached"
              my="0.5"
              size={"sm"}
              _text={{ style: styles.filterValues }}
            >
              Attached
            </Checkbox>
            <Checkbox
              value="common"
              my="0.5"
              size={"sm"}
              _text={{ style: styles.filterValues }}
            >
              Common
            </Checkbox>
          </Checkbox.Group>
        </VStack>

        <VStack mx={2} mb={3}>
          <Text style={styles.categoryTitle}>Offering meals</Text>
          <Radio.Group
            defaultValue={["A", "B"]}
            accessibilityLabel="pick an item"
            onChange={(values) => {}}
          >
            <Radio
              value="yes"
              size={"sm"}
              my="0.5"
              _text={{ style: styles.filterValues }}
            >
              Yes
            </Radio>
            <Radio
              value="no"
              size={"sm"}
              my="0.5"
              _text={{ style: styles.filterValues }}
            >
              No
            </Radio>
            <Radio
              value="both"
              size={"sm"}
              my="0.5"
              _text={{ style: styles.filterValues }}
            >
              Both
            </Radio>
          </Radio.Group>
        </VStack>

        <VStack mx={2} mb={3}>
          <Text style={styles.categoryTitle}>Facilities</Text>
          <Checkbox.Group
            // defaultValue={["A", "B"]}
            accessibilityLabel="pick an item"
            onChange={(values) => {}}
          >
            <Checkbox
              value="traditional"
              my="0.5"
              size={"sm"}
              _text={{ style: styles.filterValues }}
            >
              Furniture
            </Checkbox>
            <Checkbox
              value="western"
              my="0.5"
              size={"sm"}
              _text={{ style: styles.filterValues }}
            >
              {"Bed & Mattress"}
            </Checkbox>
            <Checkbox
              value="attached"
              my="0.5"
              size={"sm"}
              _text={{ style: styles.filterValues }}
            >
              AC
            </Checkbox>
            <Checkbox
              value="common"
              my="0.5"
              size={"sm"}
              _text={{ style: styles.filterValues }}
            >
              Celing fan, Wall fan, Table fan
            </Checkbox>
            <Checkbox
              value="common"
              my="0.5"
              size={"sm"}
              _text={{ style: styles.filterValues }}
            >
              Cooking facilities
            </Checkbox>
          </Checkbox.Group>
        </VStack>

        <VStack mx={2} mb={3}>
          <Text style={styles.categoryTitle}>Payment</Text>
          <Radio.Group
            defaultValue={["A", "B"]}
            accessibilityLabel="pick an item"
            onChange={(values) => {}}
          >
            <Radio
              value="monthly"
              size={"sm"}
              my="0.5"
              _text={{ style: styles.filterValues }}
            >
              Monthly
            </Radio>
            <Radio
              value="no"
              size={"sm"}
              my="0.5"
              _text={{ style: styles.filterValues }}
            >
              Contract
            </Radio>
          </Radio.Group>
        </VStack>

        <HStack mx={2} mb={3} justifyContent={"flex-end"}>
          <Button
            p={2}
            title="Close drawer"
            width={20}
            _text={{ style: { fontFamily: "Poppins-Medium" } }}
            onPress={onClose}
          >
            Filter
          </Button>
        </HStack>
      </Box>
    );
  };

  return (
    <Box style={styles.wrapper}>
      <HStack
        marginX={3}
        marginTop={3}
        alignItems="center"
        justifyContent={"flex-end"}
      >
        <Pressable
          android_ripple={{ color: "#ccc", borderless: true, radius: 30 }}
          onPress={onOpen}
        >
          <FontAwesome name="bars" size={24} color="#A0A0A0" />
        </Pressable>
      </HStack>

      <Box mx={2}>
        <Box style={styles.searchContainer}>
          <AutoComplete
            label={"University"}
            onPlaceSelected={(details) => handlePlaceSelected(details)}
          />
        </Box>
      </Box>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 70 }}
        mx={3}
      >
        <BrowseCard navigation={navigation} />
        <BrowseCard navigation={navigation} />
        <BrowseCard navigation={navigation} />
        <BrowseCard navigation={navigation} />
        <BrowseCard navigation={navigation} />
        <BrowseCard navigation={navigation} />
      </ScrollView>
      <Box style={styles.fab}>
        <Fab
          renderInPortal={false}
          onPress={() => navigation.navigate("MapView")}
          style={styles.fabBtn}
          shadow={3}
          placement="bottom-right"
          icon={<Icon color="#FF754E" as={Entypo} name="location" size="19" />}
        />
      </Box>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content bgColor={"rgba(34, 51, 67,0.95)"}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            {filterSheet()}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    top: Constants.statusBarHeight,
    backgroundColor: "#eee",
    paddingBottom: 60,
  },
  head: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#5C5A6F",
  },
  currentLocation: {
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    color: "#A0A0A0",
  },
  fab: {
    // position: "absolute",
    // bottom: 80,
    // right: 20,
  },
  fabBtn: {
    backgroundColor: "#223343",
    borderWidth: 1,
    borderColor: "#FF754E",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#eee",
    padding: 5,
    zIndex: 100,
  },
  categoryTitle: {
    fontSize: 20,
    color: "#FD683D",
    fontFamily: "Poppins-Medium",
  },
  slideVal: {
    color: "#737373",
    fontFamily: "Poppins-Medium",
  },
  filterValues: {
    color: "#fff",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
});

export default Map;

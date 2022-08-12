import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Box, Text, HStack, Image, Row, Column, Badge } from "native-base";
import Constants from "expo-constants";

import { FontAwesome } from "@expo/vector-icons";

const BrowseCard = () => {
  return (
    <Box style={styles.card} w="full" my={1} borderRadius={3}>
      <Row>
        <Box h={150} w={"40%"} py={2}>
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={{
                uri: "https://www.travelanddestinations.com/wp-content/uploads/2017/10/hostel-room-pixabay-182965_1280.jpg",
              }}
              alt="room1"
              h={"full"}
              w={"full"}
            />
          </TouchableOpacity>
        </Box>
        <Row justifyContent={"space-between"} style={{ width: "60%" }} py={2}>
          <Column marginX={1}>
            <Text style={styles.title}>Place 1</Text>
            <Text style={styles.desc}>Hello</Text>
            <Text style={styles.km}>2.1Km 3-6min</Text>
            <HStack alignItems={"center"} justifyContent="space-between">
              <Row alignItems={"center"}>
                <FontAwesome name="bathtub" size={18} color="#aaa" />
                <Text style={styles.badge} mx="1">
                  2
                </Text>
                <FontAwesome name="bed" size={18} color="#aaa" />
                <Text style={styles.badge} mx="1">
                  3
                </Text>
              </Row>
            </HStack>
          </Column>
          <Box w="20%">
            <Badge
              colorScheme="warning"
              alignSelf="center"
              fontFamily={"Poppins-Regular"}
            >
              4.2
            </Badge>
          </Box>
        </Row>
      </Row>
    </Box>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 150,
    // width: "100%",
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
  desc: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#666",
  },
  km: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#888",
  },
  badge: {
    fontFamily: "Poppins-Regular",
    color: "#aaa",
  },
});

export default BrowseCard;

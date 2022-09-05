import React, { useEffect } from "react";
import { Center, Text } from "native-base";
import * as Location from "expo-location";
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});
const WishList = () => {
  useEffect(() => {
    // (async () => {
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== "granted") {
    //     setErrorMsg("Permission to access location was denied");
    //     return;
    //   }
    //   let location = await Location.getCurrentPositionAsync({});
    //   let lantlong = {
    //     latitude: location?.coords.latitude,
    //     longitude: location?.coords.longitude,
    //   };
    //   client
    //     .placesNearby({
    //       params: {
    //         location: lantlong,
    //         radius: 10,
    //         key: "AIzaSyC7UEErM9uNLXfGOviKE5FOymLpMNcvpyI",
    //         // latlng: lantlong,
    //       },
    //     })
    //     .then((r) => {
    //       console.log(r.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // })();
  }, []);

  return (
    <Center h={"full"}>
      <Text>WishList</Text>
    </Center>
  );
};

export default WishList;

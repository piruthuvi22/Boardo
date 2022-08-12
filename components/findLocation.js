import * as Location from "expo-location";

import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

const findLocation = async () => {
  // if (Platform.OS == "android" && !Device.isDevice) {
  //   // setErrorMsg(
  //   //   "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
  //   // );
  //   return;
  // }
  let data = {};
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    data.error = "Permission to access location was denied";
    return data;
  }

  let location = await Location.getCurrentPositionAsync({});
  let lantlong = {
    latitude: location?.coords.latitude,
    longitude: location?.coords.longitude,
  };
  client
    .reverseGeocode({
      params: {
        key: "AIzaSyC7UEErM9uNLXfGOviKE5FOymLpMNcvpyI",
        latlng: lantlong,
      },
    })
    .then((r) => {
    //   console.log(r.data.results[0]?.formatted_address.split(","));
      data.locationName = r.data?.results[0]?.formatted_address;
      return data;
    })
    .catch((e) => {
      console.log(e);
    });
};

export default findLocation;

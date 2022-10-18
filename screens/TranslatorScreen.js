import react, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import * as FileSystem from "expo-file-system";
import callGoogleVisionAsync from "../googleCloudVision";

const TranslatorScreen = ({ route }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);

  useEffect(() => {
    setImage(route.params.image);
    setText(route.params.text);
    // getBase64();
  }, []);

  const showPhoto = () => {
    if (image) {
      return (
        <Image
          style={{
            width: 250,
            height: 425,
            alignSelf: "center",
          }}
          source={{
            uri: route.params.image.uri,
          }}
        />
      );
    }
  };

  // const responseData = callGoogleVisionAsync(image.base64);

  return (
    <View>
      <Text style={styles.imageContainer}> {showPhoto()}</Text>
      <Text>{text}</Text>
    </View>
  );
};

export default TranslatorScreen;

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 90,
    alignSelf: "center",
    backgroundColor: "#5A4AE3",
    borderRadius: 20,
    paddingHorizontal: 50,
    marginTop: 100,
  },
  titleFont: {
    color: "white",
    fontSize: 40,
    fontWeight: "500",
  },
  buttonContainer: {
    padding: 30,
    alignItems: "flex-end",
  },
  button: {
    borderColor: "#5A4AE3",
    borderWidth: "2",
    backgroundColor: "white",
    width: "30%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "#5A4AE3",
    fontWeight: "700",
    fontSize: 16,
  },
  text: {
    fontSize: 25,
    color: "white",
    margin: 40,
  },
});

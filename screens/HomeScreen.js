import react, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { db } from "../firebase";
import { ref, onValue, set } from "firebase/database";
import * as ImagePicker from "expo-image-picker";
import callGoogleVisionAsync from "../googleCloudVision";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("Please add an image");
  const [isLoading, isLoadingFunc] = useState(true);

  const navigation = useNavigation();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
    });

    setImage(result);
    const responseData = await callGoogleVisionAsync(result.base64);
    setText(responseData.text);
    isLoadingFunc(false);
    // const responseData = await onSubmit(result.base64);
  };

  const translate = () => {
    setModalVisible(false);
    navigation.navigate("Translator", { image: image, text: text });
  };

  const showPhoto = () => {
    if (image) {
      return (
        <View>
          <Image
            style={{ width: 150, height: 225, alignSelf: "center" }}
            source={{ uri: image.uri }}
          />
          <TouchableOpacity onPress={() => translate()}>
            {isLoading ? <Text>Loading...</Text> : <Text>Translate</Text>}
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <TouchableOpacity onPress={() => pickImage()}>
                <Text>Upload an image</Text>
              </TouchableOpacity>
              <View>{showPhoto()}</View>
              <Text style={styles.textStyle}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleFont}>Welcome {props.username}</Text>
      </View>

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "white" }}>Upload From Phone</Text>
        <MaterialCommunityIcons
          name="file-image-plus-outline"
          color="white"
          size={40}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 90,
    alignSelf: "center",
    backgroundColor: "#5A4AE3",
    borderRadius: 20,
    paddingHorizontal: 40,
    marginTop: 90,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 100,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "gray",
  },
  uploadButton: {
    alignItems: "center",
    alignSelf: "center",
    borderColor: "gray",
    borderWidth: 2,
    backgroundColor: "gray",
    width: 200,
    borderRadius: 10,
    marginTop: 50,
  },
});

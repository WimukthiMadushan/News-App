import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/getting-started.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Bottom Section */}
        <View style={styles.bottomContainer}>
          <Animated.Text
            style={styles.updateText}
            entering={FadeInRight.delay(300).duration(500)}
          >
            Stay Updated!!
          </Animated.Text>
          <Animated.Text
            style={styles.newsText}
            entering={FadeInRight.delay(700).duration(500)}
          >
            Get breaking news and personalized updates directly to your feed
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(1200).duration(500)}>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => router.replace("/(tabs)")}
            >
              <Text style={styles.updateButtonText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 5,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
  updateText: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 10,
    fontWeight: "bold",
  },
  newsText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  updateButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

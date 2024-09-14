import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { NewsDataType } from "@/types";

type Props = {
  newsList: Array<NewsDataType>;
};

const BreakingNews = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breaking News</Text>
      <FlatList
        data={props.newsList}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.newsItem}>
            {item.image_url && (
              <Image
                source={{ uri: item.image_url }}
                style={styles.newsImage}
                resizeMode="cover"
              />
            )}
            <View style={styles.textContainer}>
              {item.source_icon && (
                <Image
                  source={{ uri: item.source_icon }}
                  style={styles.sourceIcon}
                  resizeMode="contain"
                />
              )}
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 15,
    marginBottom: 10,
  },
  carousel: {
    paddingLeft: 15,
  },
  newsItem: {
    marginRight: 15,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 5, // Shadow radius for iOS
  },
  newsImage: {
    width: 280,
    height: 160,
    borderRadius: 12,
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 14,
    color: "#fff",
  },
  sourceIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 10,
  },
});

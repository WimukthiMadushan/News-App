import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router"; // Ensure you're using the right `Link` component from expo-router
import { NewsDataType } from "@/types";

type Props = {
  newsList: Array<NewsDataType>;
};

const NewsList = ({ newsList }: Props) => {
  return (
    <View style={styles.listContainer}>
      {newsList.map((news, index) => (
        <Link key={index} href={`/News/${news.article_id}`} asChild>
          <TouchableOpacity
            style={styles.newsItem}
            accessible={true}
            accessibilityLabel={`Read more about ${news.title}`}
          >
            <View>
              {/* Display image if available */}
              {news.image_url && (
                <Image
                  source={{ uri: news.image_url }}
                  style={styles.newsImage}
                />
              )}
              <View style={styles.textContainer}>
                {/* News category */}
                <Text style={styles.category}>{news.category}</Text>

                {/* News title */}
                <Text style={styles.newsTitle}>{news.title}</Text>

                {/* Source section with icon and name */}
                <View style={styles.sourceContainer}>
                  {news.source_icon && (
                    <Image
                      source={{ uri: news.source_icon }}
                      style={styles.sourceIcon}
                    />
                  )}
                  <Text style={styles.sourceName}>{news.source_name}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
};

export default NewsList;

const styles = StyleSheet.create({
  listContainer: {
    padding: 15,
    backgroundColor: "#f2f2f2",
  },
  newsItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  newsImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textContainer: {
    padding: 15,
  },
  category: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ff6347",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 10,
  },
  sourceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sourceIcon: {
    width: 20,
    height: 20,
    borderRadius: 10, // Rounds the source icon
    marginRight: 8,
  },
  sourceName: {
    fontSize: 12,
    color: "#888",
  },
});

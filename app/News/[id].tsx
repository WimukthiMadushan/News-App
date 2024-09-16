import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { NewsDataType } from "@/types";

const NewsDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isNewsLoading, setIsNewsLoading] = useState(false);

  const getNews = async () => {
    console.log(id);
    setIsNewsLoading(true);
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=pub_5345115aa8f90d8487470e274a960dbb9e8cb&id=${id}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        console.log("News details:", response.data.results);
        setNews(response.data.results);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setIsNewsLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, [id]);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconButton}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {}} style={styles.iconButton}>
              <Ionicons name="heart-outline" size={24} color="#333" />
            </TouchableOpacity>
          ),
          title: "",
        }}
      />
      <View style={styles.container}>
        {isNewsLoading ? (
          <ActivityIndicator size="large" color="#555" />
        ) : news.length > 0 ? (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* News Image */}
            {news[0].image_url && (
              <Image
                source={{ uri: news[0].image_url }}
                style={styles.newsImage}
                resizeMode="cover"
              />
            )}
            {/* Publication Date */}
            {news[0].pubDate && (
              <Text style={styles.pubDate}>
                {new Date(news[0].pubDate).toDateString()}
              </Text>
            )}
            {/* News Title */}
            <Text style={styles.newsTitle}>{news[0].title}</Text>
            {news[0].source_url && (
              <View style={styles.sourceContainer}>
                {/* Source Logo */}
                <Image
                  source={{ uri: news[0].source_icon }}
                  style={styles.sourceLogo}
                  resizeMode="contain"
                />
                {/* Source Name */}
                {news[0].source_name && (
                  <Text style={styles.sourceName}>{news[0].source_name}</Text>
                )}
              </View>
            )}

            <Text style={styles.newsDescription}>{news[0].description}</Text>
          </ScrollView>
        ) : (
          <Text style={styles.noDataText}>No news details available</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
  iconButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  newsImage: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  pubDate: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
    fontStyle: "italic",
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    lineHeight: 28,
  },
  sourceContainer: {
    flexDirection: "row", // Aligns logo and text in a row
    alignItems: "center", // Vertically aligns logo and text
    marginBottom: 20, // Add space below the source container
  },
  sourceLogo: {
    width: 40,
    height: 40,
    borderRadius: 20, // Makes the logo round
    marginRight: 10, // Adds space between the logo and the source name
    borderWidth: 1,
    borderColor: "#ccc", // Adds a subtle border around the logo
  },
  sourceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  newsDescription: {
    fontSize: 18,
    color: "#444",
    lineHeight: 26,
    textAlign: "justify",
  },
  noDataText: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
    marginTop: 50,
  },
});

export default NewsDetails;

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useRef, useState } from "react";
import newsCategoryList from "@/constants/Categories";

type Props = {
  onCategoryChange: (category: string) => void;
};

const Categories = ({ onCategoryChange }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<(TouchableOpacity | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectedCategory = (index: number) => {
    const selected = itemRef.current[index];
    setActiveIndex(index);

    // Scroll the selected item to the left
    selected?.measureLayout(
      scrollRef.current?.getScrollableNode(),
      (x, y, width, height) => {
        scrollRef.current?.scrollTo({ x: x - 5, y: 0, animated: true });
      }
    );
    onCategoryChange(newsCategoryList[index].slug);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Trending Right Now</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {newsCategoryList.map((category, index) => (
          <TouchableOpacity
            ref={(el) => (itemRef.current[index] = el)}
            key={index}
            style={[
              styles.categoryButton,
              activeIndex === index && styles.activeCategoryButton,
            ]}
            onPress={() => handleSelectedCategory(index)}
          >
            <Text
              style={[
                styles.categoryText,
                activeIndex === index && styles.activeCategoryText,
              ]}
            >
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryButton: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
    borderColor: "#ddd",
    borderWidth: 1.5,
  },
  activeCategoryButton: {
    backgroundColor: "red",
    borderColor: "red",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  activeCategoryText: {
    color: "#fff",
  },
});

export default Categories;

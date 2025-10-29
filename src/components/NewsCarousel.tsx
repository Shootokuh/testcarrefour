import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { styles } from "../styles/NewsCarousel";
import type { NewsItem } from "../types/news";
import type { NewsCarouselProps } from "../types/NewsCarouselProps";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
const H_PADDING = 16;
const CARD_WIDTH = SCREEN_W - H_PADDING * 2;
const ITEM_STRIDE = CARD_WIDTH;
const HERO_MIN = Math.round(CARD_WIDTH * 0.70);
const HERO_MAX = Math.round(SCREEN_H * 0.62);


export default function NewsCarousel({ fetchNews }: NewsCarouselProps) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [index, setIndex] = useState(0);
  const [heights, setHeights] = useState<Record<string | number, number>>({});
  const heightsRef = useRef<Record<string | number, number>>({});
  const listRef = useRef<FlatList<NewsItem>>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchNews();
        setItems(data || []);
      } catch (e) {
        console.warn("News fetch error", e);
      }
    })();
  }, [fetchNews]);

  useEffect(() => {
    items.forEach((it) => {
      if (!it.imageUrl || heightsRef.current[it.id]) return;
      Image.getSize(
        it.imageUrl,
        (w, h) => {
          const raw = Math.round((CARD_WIDTH * h) / w);
          const clamped = Math.max(HERO_MIN, Math.min(HERO_MAX, raw));
          heightsRef.current = { ...heightsRef.current, [it.id]: clamped };
          setHeights((m) => ({ ...m, [it.id]: clamped }));
        },
        () => {
          const fallback = Math.round((HERO_MIN + HERO_MAX) / 2);
          heightsRef.current = { ...heightsRef.current, [it.id]: fallback };
          setHeights((m) => ({ ...m, [it.id]: fallback }));
        }
      );
    });

  }, [items]);

  const indexRef = useRef<number>(0);
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (items.length <= 1) return;
    timerRef.current = setInterval(() => {
      const next = (indexRef.current + 1) % items.length;
      indexRef.current = next;
      listRef.current?.scrollToIndex({ index: next, animated: true });
      setIndex(next);
    }, 3500);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [items]);

  const onMomentumEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / ITEM_STRIDE);
    if (i !== indexRef.current) {
      indexRef.current = i;
      setIndex(i);
    }
  }, []);

  const renderItem = useCallback(({ item }: { item: NewsItem }) => {
    const h = heights[item.id] ?? Math.round((HERO_MIN + HERO_MAX) / 2);
    return (
      <TouchableOpacity activeOpacity={0.9} style={{ width: CARD_WIDTH }}>
        <View style={[styles.heroBox, { height: h }]}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  }, [heights]);

  return (
    <View style={styles.carouselWrapper}>
      <View style={styles.card}>
          <FlatList
          ref={listRef}
          data={items}
          horizontal
          keyExtractor={(it, i) => String(it.id ?? i)}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={ITEM_STRIDE}
          snapToAlignment="start"
          onMomentumScrollEnd={onMomentumEnd}
          contentContainerStyle={{ alignItems: "center" }}
          renderItem={renderItem}
        />

        <View style={styles.dotsRow}>
          {items.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === index ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

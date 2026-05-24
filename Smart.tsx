import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

type Props = {
  navigation: any;
};

export default function SplashScreen({ navigation }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a56db" />

      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.imageWrapper}>
          <Image 
            source={require('./assets/images/porsche911.png')} 
            style={styles.porscheImage}
            resizeMode="contain"
          />
          <View style={styles.moneyBadge}>
            <Text style={styles.moneyText}>฿</Text>
          </View>
          <View style={[styles.moneyBadge, styles.moneyBadge2]}>
            <Text style={styles.moneyText2}>$</Text>
          </View>
        </View>

        <Text style={styles.title}>Smart Auto Loan</Text>
        <Text style={styles.subtitle}>วางแผนออกรถฉบับมือโปร</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Input')}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>เริ่มต้นใช้งาน →</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* แถบเมนูด้านล่าง (Navigation Bar) */}
      <View style={styles.navBar}>
        <View style={[styles.navItem, styles.navItemActive]}>
          <Text style={styles.navIconActive}>⌂</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>หน้าหลัก</Text>
        </View>
        
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Input')}
        >
          <Text style={styles.navIcon}>⊞</Text>
          <Text style={styles.navLabel}>คำนวณ</Text>
        </TouchableOpacity>

        <View style={styles.navItem}>
          <Text style={styles.navIcon}>◉</Text>
          <Text style={styles.navLabel}>โปรไฟล์</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF008E',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 20,
  },
  imageWrapper: {
    width: width * 0.8,
    height: 180,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  porscheImage: {
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  moneyBadge: {
    position: 'absolute',
    top: 20,
    right: 40,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#05fc95',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  moneyBadge2: {
    top: 5,
    right: 15,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ffe602',
  },
  moneyText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  moneyText2: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 50,
    elevation: 6,
  },
  buttonText: {
    color: '#FF008E',
    fontSize: 17,
    fontWeight: '700',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 12,
    paddingBottom: 25,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navItemActive: {
    // ใส่ไว้เพื่อให้เรียกใช้ได้ และสามารถเพิ่มสไตล์พิเศษภายหลังได้
  },
  navIcon: {
    fontSize: 22,
    color: '#bdc3c7',
  },
  navIconActive: {
    fontSize: 22,
    color: '#FF008E',
  },
  navLabel: {
    fontSize: 11,
    color: '#bdc3c7',
    marginTop: 4,
  },
  navLabelActive: {
    color: '#FF008E',
    fontWeight: '700',
  },
});
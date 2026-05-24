import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const DOWN_PAYMENT_OPTIONS = [0, 5, 10, 15, 20, 25];
const TERM_OPTIONS = [24, 36, 48, 60, 72, 84];

export default function InputScreen({ navigation }: any) {
  const [carPrice, setCarPrice] = useState('');
  const [downPercent, setDownPercent] = useState(15);
  const [termMonths, setTermMonths] = useState(60);
  const [interestRate, setInterestRate] = useState('');

  const handleCalculate = () => {
    const price = parseFloat(carPrice.replace(/,/g, ''));
    const rate = parseFloat(interestRate);

    if (isNaN(price) || isNaN(rate) || price <= 0 || rate <= 0) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const downAmount = price * (downPercent / 100);
    const loanAmount = price - downAmount;
    const interestPerYear = loanAmount * (rate / 100);
    const totalInterest = interestPerYear * (termMonths / 12);
    const totalPayment = loanAmount + totalInterest;
    const monthly = totalPayment / termMonths;

    navigation.navigate('Result', {
      carPrice: price,
      downPercent,
      downAmount,
      loanAmount,
      termMonths,
      interestRate: rate,
      monthly,
      totalPayment,
      totalInterest,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a56db" />

      {/* Header Area */}
      <View style={styles.header}>
        <Image 
          source={require('./porsche_input.png')} 
          style={styles.carImage} 
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>คำนวณค่างวดรถ</Text>
      </View>

      {/* Form Content */}
      <ScrollView
        style={styles.formCard}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>ราคารถ (บาท)</Text>
        <TextInput
          style={styles.input}
          value={carPrice}
          onChangeText={setCarPrice}
          placeholder="เช่น 850000"
          placeholderTextColor="#b0b8cc"
          keyboardType="numeric"
        />

        <Text style={styles.label}>เลือกเงินดาวน์ (%)</Text>
        <View style={styles.chipGroup}>
          {DOWN_PAYMENT_OPTIONS.map((pct) => (
            <TouchableOpacity
              key={pct}
              style={[styles.chip, downPercent === pct && styles.chipActive]}
              onPress={() => setDownPercent(pct)}
            >
              <Text style={[styles.chipText, downPercent === pct && styles.chipTextActive]}>
                {pct}%
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>ระยะเวลาผ่อน (งวด)</Text>
        <View style={styles.chipGroup}>
          {TERM_OPTIONS.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.chip, termMonths === t && styles.chipActive]}
              onPress={() => setTermMonths(t)}
            >
              <Text style={[styles.chipText, termMonths === t && styles.chipTextActive]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>ดอกเบี้ย (% ต่อปี)</Text>
        <TextInput
          style={styles.input}
          value={interestRate}
          onChangeText={setInterestRate}
          placeholder="เช่น 2.59"
          placeholderTextColor="#b0b8cc"
          keyboardType="decimal-pad"
        />

        {carPrice !== '' && (
          <View style={styles.preview}>
            <Text style={styles.previewLabel}>เงินดาวน์</Text>
            <Text style={styles.previewValue}>
              {(parseFloat(carPrice.replace(/,/g, '')) * (downPercent / 100)).toLocaleString('th-TH')} บาท
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.calcButton} onPress={handleCalculate}>
          <Text style={styles.calcButtonText}>คำนวณค่างวด</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Splash')}>
          <Text style={styles.navIcon}>⌂</Text>
          <Text style={styles.navLabel}>หน้าหลัก</Text>
        </TouchableOpacity>
        
        <View style={[styles.navItem, styles.navItemActive]}>
          <Text style={styles.navIconActive}>⊞</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>คำนวณ</Text>
        </View>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>◉</Text>
          <Text style={styles.navLabel}>โปรไฟล์</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
  },
  header: {
    backgroundColor: '#FF008E',
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  carImage: {
    width: 300,
    height: 150,
    marginBottom: 8,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    flex: 1,
  },
  formContent: {
    padding: 20,
    paddingBottom: 30,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#dde2ef',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  chip: {
    borderWidth: 1.5,
    borderColor: '#dde2ef',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  chipActive: {
    backgroundColor: '#FF008E',
    borderColor: '#FF008E',
  },
  chipText: {
    fontSize: 13,
    color: '#555',
  },
  chipTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  preview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e8f0fe',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  previewLabel: {
    color: '#FF008E',
    fontWeight: '600',
  },
  previewValue: {
    color: '#FF008E',
    fontWeight: '700',
  },
  calcButton: {
    backgroundColor: '#FF008E',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  calcButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  navBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e8ecf4',
    paddingBottom: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActive: {
    // ใส่สไตล์ถ้าต้องการให้เมนูที่เลือกดูเด่นขึ้น
  },
  navIcon: {
    fontSize: 22,
    color: '#aaaaaa',
  },
  navIconActive: {
    fontSize: 22,
    color: '#FF008E',
  },
  navLabel: {
    fontSize: 11,
    color: '#aaaaaa',
  },
  navLabelActive: {
    color: '#FF008E',
    fontWeight: '600',
  },
});
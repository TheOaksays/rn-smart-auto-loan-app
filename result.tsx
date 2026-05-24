import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type ResultParams = {
  carPrice: number;
  downPercent: number;
  downAmount: number;
  loanAmount: number;
  termMonths: number;
  interestRate: number;
  monthly: number;
  totalPayment: number;
  totalInterest: number;
};

type Props = {
  navigation: any;
  route: { params: ResultParams };
};

function fmt(n: number): string {
  return n.toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function ResultScreen({ navigation, route }: any) {
  const {
    carPrice,
    downPercent,
    downAmount,
    loanAmount,
    termMonths,
    interestRate,
    monthly,
    totalPayment,
    totalInterest,
  } = route.params;

  const rows: { label: string; value: string }[] = [
    { label: 'ราคารถ', value: `${fmt(carPrice)} บาท` },
    { label: 'เงินดาวน์', value: `${fmt(downAmount)} บาท (${downPercent}%)` },
    { label: 'ยอดกู้', value: `${fmt(loanAmount)} บาท` },
    { label: 'ระยะผ่อน', value: `${termMonths} งวด` },
    { label: 'ดอกเบี้ยต่อปี', value: `${interestRate.toFixed(2)}%` },
    { label: 'ดอกเบี้ยรวม', value: `${fmt(totalInterest)} บาท` },
    { label: 'ยอดชำระรวม', value: `${fmt(totalPayment)} บาท` },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a56db" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ผลการคำนวณ</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Result Card */}
      <ScrollView
        style={styles.card}
        contentContainerStyle={styles.cardContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Monthly Highlight */}
        <View style={styles.highlight}>
          <Text style={styles.highlightLabel}>ค่างวดต่อเดือน</Text>
          <Text style={styles.highlightValue}>{fmt(monthly)} บาท</Text>
        </View>

        {/* Detail Rows */}
        {rows.map((row, i) => (
          <View
            key={i}
            style={[styles.row, i === rows.length - 1 && styles.rowLast]}
          >
            <Text style={styles.rowLabel}>{row.label}</Text>
            <Text style={styles.rowValue}>{row.value}</Text>
          </View>
        ))}

        {/* Buttons */}
        <TouchableOpacity
          style={styles.recalcButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.88}
        >
          <Text style={styles.recalcButtonText}>คำนวณใหม่</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Splash')}
          activeOpacity={0.88}
        >
          <Text style={styles.homeButtonText}>กลับหน้าหลัก</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Nav Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Splash')}
        >
          <Text style={styles.navIcon}>⌂</Text>
          <Text style={styles.navLabel}>หน้าหลัก</Text>
        </TouchableOpacity>
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
    backgroundColor: '#f4f6fb',
  },
  header: {
    backgroundColor: '#1a56db',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 36,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  placeholder: {
    width: 34,
  },
  card: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -18,
    flex: 1,
  },
  cardContent: {
    padding: 20,
    paddingBottom: 32,
  },
  highlight: {
    backgroundColor: '#e8f0fe',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  highlightLabel: {
    fontSize: 14,
    color: '#1a56db',
    fontWeight: '600',
  },
  highlightValue: {
    fontSize: 20,
    color: '#1a56db',
    fontWeight: '800',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f2f8',
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowLabel: {
    fontSize: 13,
    color: '#888',
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
  },
  recalcButton: {
    width: '100%',
    backgroundColor: '#1a56db',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  recalcButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  homeButton: {
    width: '100%',
    backgroundColor: '#f4f6fb',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#dde2ef',
  },
  homeButtonText: {
    color: '#1a56db',
    fontSize: 15,
    fontWeight: '600',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e8ecf4',
    paddingVertical: 10,
    paddingBottom: 16,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navIcon: {
    fontSize: 20,
    color: '#aaaaaa',
  },
  navLabel: {
    fontSize: 10,
    color: '#aaaaaa',
    marginTop: 2,
  },
});
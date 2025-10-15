import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingTop: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#a78bfa',
  },
  subtitle: {
    color: '#9ca3af',
    marginTop: 8,
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  errorText: {
    color: '#f87171',
    textAlign: 'center',
    fontSize: 16,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#fff',
  },
  cardPrice: {
    fontSize: 22,
    fontWeight: '600',
    color: '#f3f4f6',
    marginTop: 4,
  },
  changeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  positiveChangeBg: {
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
  },
  negativeChangeBg: {
    backgroundColor: 'rgba(248, 113, 113, 0.2)',
  },
  positiveChange: {
    color: '#4ade80',
    fontWeight: 'bold',
    fontSize: 16,
  },
  negativeChange: {
    color: '#f87171',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    paddingVertical: 16,
    color: '#6b7281',
    fontSize: 12,
  },
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default styles;
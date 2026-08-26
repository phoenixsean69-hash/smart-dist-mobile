import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const colors = {
  background: '#FFFFFF',
  white: '#FFFFFF',
  text: '#17213D',
  navy: '#1F3B66',
  blue: '#2478FF',
  muted: '#8A9AB5',
  border: '#E5EAF1',
  green: '#19A974',
  red: '#E05252',
};

type Bill = {
  $id: string;
  billNumber: string;
  description: string;
  amount: number;
  amountPaid: number;
  balanceDue: number;
  billingDate: string;
  dueDate: string;
  status: string;
};

const bills: Bill[] = [
  {
    $id: 'bill-001-rates',
    billNumber: 'BILL-260001',
    description: 'August property rates',
    amount: 55,
    amountPaid: 55,
    balanceDue: 0,
    billingDate: '2026-07-31T18:06:05Z',
    dueDate: '2026-08-15T18:06:05Z',
    status: 'paid',
  },
  {
    $id: 'bill-001-water',
    billNumber: 'BILL-260002',
    description: 'August water charges',
    amount: 28,
    amountPaid: 28,
    balanceDue: 0,
    billingDate: '2026-07-31T18:06:05Z',
    dueDate: '2026-08-25T18:06:05Z',
    status: 'paid',
  },
];

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.stat}>
      <Text style={styles.small}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function Bills() {
  const [activeTab, setActiveTab] = useState<'all' | 'unpaid' | 'paid'>(
    'all'
  );

  const filteredBills = useMemo(() => {
    if (activeTab === 'all') {
      return bills;
    }

    if (activeTab === 'paid') {
      return bills.filter((bill) => bill.status === 'paid');
    }

    return bills.filter((bill) => bill.balanceDue > 0);
  }, [activeTab]);

  const total = bills.reduce((sum, bill) => sum + bill.amount, 0);

  const paid = bills.reduce(
    (sum, bill) => sum + bill.amountPaid,
    0
  );

  const outstanding = bills.reduce(
    (sum, bill) => sum + bill.balanceDue,
    0
  );

  return (
    <View style={styles.root}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('all')}
        >
          <Text
            style={[
              styles.tab,
              activeTab === 'all' && styles.activeTab,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('unpaid')}
        >
          <Text
            style={[
              styles.tab,
              activeTab === 'unpaid' && styles.activeTab,
            ]}
          >
            Unpaid
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('paid')}
        >
          <Text
            style={[
              styles.tab,
              activeTab === 'paid' && styles.activeTab,
            ]}
          >
            Paid
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>My Bills</Text>

            <Text style={styles.subtitle}>
              Track your council charges and payments
            </Text>
          </View>

          <View style={styles.totalBadge}>
            <Text style={styles.totalBadgeText}>
              {formatMoney(total)}
            </Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summary}>
          <Stat
            label="Total"
            value={formatMoney(total)}
          />

          <View style={styles.divider} />

          <Stat
            label="Paid"
            value={formatMoney(paid)}
          />

          <View style={styles.divider} />

          <Stat
            label="Outstanding"
            value={formatMoney(outstanding)}
          />
        </View>

        {/* Bills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent bills</Text>

          {filteredBills.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>
                No bills found
              </Text>

              <Text style={styles.emptyText}>
                There are no bills in this category.
              </Text>
            </View>
          ) : (
            filteredBills.map((bill) => (
              <View
                key={bill.$id}
                style={styles.bill}
              >
                {/* Bill header */}
                <View style={styles.row}>
                  <View style={styles.billIcon}>
                    <Text style={styles.billIconText}>
                      $
                    </Text>
                  </View>

                  <View style={styles.titleWrap}>
                    <Text style={styles.title}>
                      {bill.description}
                    </Text>

                    <Text style={styles.meta}>
                      {bill.billNumber}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.statusBadge,
                      bill.status === 'paid'
                        ? styles.paidBadge
                        : styles.unpaidBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        bill.status === 'paid'
                          ? styles.paidText
                          : styles.unpaidText,
                      ]}
                    >
                      {bill.status === 'paid'
                        ? 'Paid'
                        : 'Unpaid'}
                    </Text>
                  </View>
                </View>

                {/* Amounts */}
                <View style={styles.stats}>
                  <Stat
                    label="Amount"
                    value={formatMoney(bill.amount)}
                  />

                  <Stat
                    label="Paid"
                    value={formatMoney(bill.amountPaid)}
                  />

                  <Stat
                    label="Due"
                    value={formatMoney(bill.balanceDue)}
                  />
                </View>

                {/* Dates */}
                <View style={styles.dates}>
                  <View>
                    <Text style={styles.small}>
                      Billing date
                    </Text>

                    <Text style={styles.dateText}>
                      {formatDate(bill.billingDate)}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.small}>
                      Due date
                    </Text>

                    <Text style={styles.dateText}>
                      {formatDate(bill.dueDate)}
                    </Text>
                  </View>
                </View>

                {/* Button */}
                <TouchableOpacity style={styles.details}>
                  <Text style={styles.detailsText}>
                    View bill details
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },

  tabs: {
    height: 48,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  tabButton: {
    width: '33.33%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tab: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: '700',
  },

  activeTab: {
    color: colors.blue,
    fontWeight: '900',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },

  heading: {
    fontSize: 25,
    fontWeight: '900',
    color: colors.text,
  },

  subtitle: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 5,
  },

  totalBadge: {
    backgroundColor: '#F2F5F9',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 18,
  },

  totalBadgeText: {
    color: colors.navy,
    fontWeight: '900',
    fontSize: 11,
  },

  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 25,
  },

  stat: {
    flex: 1,
  },

  divider: {
    width: 1,
    height: 35,
    backgroundColor: colors.border,
    marginHorizontal: 10,
  },

  small: {
    fontSize: 9,
    color: colors.muted,
  },

  value: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.text,
    marginTop: 4,
  },

  section: {
    marginTop: 2,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 14,
  },

  bill: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    backgroundColor: colors.white,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  billIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  billIconText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
  },

  titleWrap: {
    flex: 1,
    marginLeft: 10,
  },

  title: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.text,
  },

  meta: {
    fontSize: 9,
    color: colors.muted,
    marginTop: 3,
  },

  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 12,
  },

  paidBadge: {
    backgroundColor: '#EAF8F2',
  },

  unpaidBadge: {
    backgroundColor: '#FFF0F0',
  },

  statusText: {
    fontSize: 9,
    fontWeight: '900',
  },

  paidText: {
    color: colors.green,
  },

  unpaidText: {
    color: colors.red,
  },

  stats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    marginTop: 12,
  },

  dates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 11,
  },

  dateText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.text,
    marginTop: 3,
  },

  details: {
    height: 38,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailsText: {
    fontSize: 11,
    color: colors.navy,
    fontWeight: '900',
  },

  empty: {
    padding: 30,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.text,
  },

  emptyText: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 5,
  },
});
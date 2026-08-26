# SmartPay Resident Mobile UI

Expo Router screens matching the SmartPay resident mobile mockup:

- Home
- Bills
- Bill Details
- Make Payment
- Payment History
- Profile
- Notifications
- Settings

## Drop-in
Copy `app`, `components`, `constants`, and `lib` into the existing Expo project.

Required packages:

```bash
npx expo install expo-router @expo/vector-icons react-native-safe-area-context react-native-screens
npm install react-native-appwrite
```

Set environment variables:

```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://syd.cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=smart-pay
EXPO_PUBLIC_APPWRITE_DATABASE_ID=smartpay-db
```

The data layer maps directly to the SmartPay collections:
`residents`, `resident_accounts`, `bills`, and `payments`.

The seeded Tapiwa data is used as a visual fallback until an Appwrite account session exists. Once logged in, the provider calls `Account.get()` and loads the resident using `userId`.

## Routes

`/(tabs)/home`
`/(tabs)/bills`
`/bills/[id]`
`/payments/make`
`/(tabs)/payments`
`/(tabs)/profile`
`/notifications`
`/settings`

export const Config = {
    apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/v1',
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
    googleMapsKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    isProduction: process.env.EXPO_PUBLIC_ENV === 'production',
    appVersion: process.env.EXPO_PUBLIC_VERSION || '1.0.0',
};

export default Config;

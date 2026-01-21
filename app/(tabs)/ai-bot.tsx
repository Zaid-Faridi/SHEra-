import { Redirect } from 'expo-router';

export default function AiBotPlaceholder() {
    // This screen is intercepted by the custom TabBarButton in _layout.tsx
    // But we provide a redirect just in case it's accessed directly
    return <Redirect href="/ai-chat" />;
}

/**
 * MORE SCREEN - V1.0 Design
 * Houses secondary features and settings in an organized menu
 */

import { DS } from '@/components/design-system/tokens';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import {
  Activity,
  Bell,
  ChevronRight,
  Heart,
  HelpCircle,
  Info,
  LogOut,
  MessageSquare,
  Settings,
  Shield,
  TrendingUp,
  UserPlus,
  Users
} from 'lucide-react-native';
import React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface MenuItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: any;
  iconColor?: string;
  action: () => void;
  showBadge?: boolean;
  badgeCount?: number;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
}

export default function MoreScreen() {
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/onboarding/splash');
          }
        }
      ]
    );
  };

  // Discover & Social Section
  const discoverItems: MenuItem[] = [
    {
      id: 'demo',
      title: '🚀 Demo: Future Features',
      subtitle: 'Preview what\'s coming next',
      icon: TrendingUp,
      iconColor: '#8B5CF6',
      action: () => router.push('/demo'),
      showBadge: true,
      badgeCount: 9,
    },
    {
      id: 'activity',
      title: 'Activity',
      subtitle: 'See what your friends are up to',
      icon: Activity,
      iconColor: DS.colors.primaryOrange,
      action: () => router.push('/(tabs)/activity'),
      showBadge: true,
      badgeCount: 3,
    },
    {
      id: 'communities',
      title: 'Communities',
      subtitle: 'Join and create communities',
      icon: Users,
      iconColor: '#4ECDC4',
      action: () => router.push('/(tabs)/communities'),
    },
    {
      id: 'trending',
      title: 'Trending',
      subtitle: 'Discover what\'s popular',
      icon: TrendingUp,
      iconColor: '#FF6B6B',
      action: () => router.push('/trending'),
    },
    {
      id: 'invite-friends',
      title: 'Invite Friends',
      subtitle: 'Grow your network',
      icon: UserPlus,
      iconColor: '#5B8DEE',
      action: () => router.push('/invite-friends'),
    },
  ];

  // Account & Settings Section
  const accountItems: MenuItem[] = [
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      iconColor: '#FFB800',
      action: () => router.push('/notifications'),
      hasToggle: true,
      toggleValue: notificationsEnabled,
      onToggleChange: setNotificationsEnabled,
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'Privacy, account, preferences',
      icon: Settings,
      iconColor: '#64748B',
      action: () => router.push('/settings'),
    },
    {
      id: 'saved-places',
      title: 'Quick Saves',
      subtitle: 'Your bookmarked places',
      icon: Heart,
      iconColor: '#FF6B6B',
      action: () => router.push('/quick-saves'),
    },
  ];

  // Support Section
  const supportItems: MenuItem[] = [
    {
      id: 'help',
      title: 'Help & Support',
      icon: HelpCircle,
      iconColor: '#4ECDC4',
      action: () => router.push('/help'),
    },
    {
      id: 'feedback',
      title: 'Send Feedback',
      icon: MessageSquare,
      iconColor: '#5B8DEE',
      action: () => router.push('/feedback'),
    },
    {
      id: 'about',
      title: 'About Troodie',
      icon: Info,
      iconColor: '#64748B',
      action: () => router.push('/about'),
    },
    {
      id: 'terms',
      title: 'Terms & Privacy',
      icon: Shield,
      iconColor: '#9CA3AF',
      action: () => router.push('/terms'),
    },
  ];

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.action}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: `${item.iconColor}15` }]}>
          <item.icon size={20} color={item.iconColor || DS.colors.textDark} />
        </View>
        <View style={styles.menuItemText}>
          <Text style={styles.menuItemTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </View>
      
      <View style={styles.menuItemRight}>
        {item.showBadge && item.badgeCount ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badgeCount}</Text>
          </View>
        ) : null}
        
        {item.hasToggle ? (
          <Switch
            value={item.toggleValue}
            onValueChange={item.onToggleChange}
            trackColor={{ false: DS.colors.borderLight, true: DS.colors.primaryOrange }}
            thumbColor={DS.colors.textWhite}
          />
        ) : (
          <ChevronRight size={20} color={DS.colors.textGray} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ProfileAvatar size={36} style={styles.profileAvatar} />
        <Text style={styles.headerTitle}>More</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        {isAuthenticated && user && (
          <TouchableOpacity
            style={styles.profileCard}
            onPress={() => router.push('/(tabs)/profile')}
            activeOpacity={0.8}
          >
            <View style={styles.profileInfo}>
              {user.avatar_url ? (
                <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>
                    {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
                  </Text>
                </View>
              )}
              <View style={styles.profileText}>
                <Text style={styles.profileName}>{user.name || 'User'}</Text>
                <Text style={styles.profileEmail}>{user.email}</Text>
                <View style={styles.viewProfileButton}>
                  <Text style={styles.viewProfileText}>View Profile</Text>
                  <ChevronRight size={14} color={DS.colors.primaryOrange} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Discover & Social */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discover & Social</Text>
          <View style={styles.menuGroup}>
            {discoverItems.map(renderMenuItem)}
          </View>
        </View>

        {/* Account & Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account & Settings</Text>
          <View style={styles.menuGroup}>
            {accountItems.map(renderMenuItem)}
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.menuGroup}>
            {supportItems.map(renderMenuItem)}
          </View>
        </View>

        {/* Sign Out */}
        {isAuthenticated && (
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <LogOut size={20} color={DS.colors.error} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        )}

        {/* Version Info */}
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Troodie v1.0.14</Text>
          <Text style={styles.copyrightText}>© 2024 Troodie Inc.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DS.colors.background,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.md,
    backgroundColor: DS.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  profileAvatar: {
    marginRight: DS.spacing.md,
  },
  headerTitle: {
    ...DS.typography.h1,
    color: DS.colors.textDark,
  },
  
  // Profile Card
  profileCard: {
    backgroundColor: DS.colors.surface,
    margin: DS.spacing.lg,
    padding: DS.spacing.lg,
    borderRadius: DS.borderRadius.lg,
    ...DS.shadows.sm,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: DS.spacing.md,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: DS.colors.primaryOrange,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DS.spacing.md,
  },
  avatarText: {
    ...DS.typography.h2,
    color: DS.colors.textWhite,
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.xxs,
  },
  profileEmail: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    marginBottom: DS.spacing.sm,
  },
  viewProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.xxs,
  },
  viewProfileText: {
    ...DS.typography.button,
    color: DS.colors.primaryOrange,
    fontSize: 13,
  },
  
  // Sections
  section: {
    marginBottom: DS.spacing.xl,
  },
  sectionTitle: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginLeft: DS.spacing.lg,
    marginBottom: DS.spacing.sm,
  },
  menuGroup: {
    backgroundColor: DS.colors.surface,
    marginHorizontal: DS.spacing.lg,
    borderRadius: DS.borderRadius.lg,
    overflow: 'hidden',
  },
  
  // Menu Items
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: DS.spacing.md,
    paddingHorizontal: DS.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DS.spacing.md,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    ...DS.typography.body,
    color: DS.colors.textDark,
    marginBottom: 2,
  },
  menuItemSubtitle: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.sm,
  },
  badge: {
    backgroundColor: DS.colors.error,
    paddingHorizontal: DS.spacing.sm,
    paddingVertical: 2,
    borderRadius: DS.borderRadius.full,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    ...DS.typography.caption,
    color: DS.colors.textWhite,
    fontSize: 11,
    fontWeight: '600',
  },
  
  // Sign Out
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: DS.spacing.sm,
    marginHorizontal: DS.spacing.lg,
    marginBottom: DS.spacing.lg,
    paddingVertical: DS.spacing.md,
    backgroundColor: DS.colors.surface,
    borderRadius: DS.borderRadius.lg,
    borderWidth: 1,
    borderColor: DS.colors.error,
  },
  signOutText: {
    ...DS.typography.button,
    color: DS.colors.error,
  },
  
  // Version Info
  versionInfo: {
    alignItems: 'center',
    paddingVertical: DS.spacing.xl,
    marginBottom: DS.spacing.xxl,
  },
  versionText: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
    marginBottom: DS.spacing.xs,
  },
  copyrightText: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
  },
});
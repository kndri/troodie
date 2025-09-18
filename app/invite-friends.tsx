import { DS } from '@/components/design-system/tokens';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import {
  Copy,
  Mail,
  MessageCircle,
  Share2,
  UserPlus,
  Users
} from 'lucide-react-native';
import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function InviteFriendsScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const inviteCode = user?.username ? `TROODIE-${user.username.toUpperCase()}` : 'TROODIE2024';
  const inviteLink = `https://troodie.app/join?code=${inviteCode}`;
  const inviteMessage = `Hey! Join me on Troodie - the app for discovering amazing restaurants through trusted friends. Use my invite code: ${inviteCode}\n\n${inviteLink}`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: inviteMessage,
        title: 'Join me on Troodie!',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(inviteLink);
    Alert.alert('Copied!', 'Invite link copied to clipboard');
  };

  const handleCopyCode = async () => {
    await Clipboard.setStringAsync(inviteCode);
    Alert.alert('Copied!', 'Invite code copied to clipboard');
  };

  const inviteMethods = [
    {
      id: 'share',
      title: 'Share Invite Link',
      subtitle: 'Share via any app',
      icon: Share2,
      color: DS.colors.primaryOrange,
      action: handleShare,
    },
    {
      id: 'sms',
      title: 'Text Message',
      subtitle: 'Send via SMS',
      icon: MessageCircle,
      color: '#4ECDC4',
      action: () => {
        Alert.alert('Coming Soon', 'SMS invites will be available soon!');
      },
    },
    {
      id: 'email',
      title: 'Email',
      subtitle: 'Send via email',
      icon: Mail,
      color: '#5B8DEE',
      action: () => {
        Alert.alert('Coming Soon', 'Email invites will be available soon!');
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invite Friends</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.iconContainer}>
            <Users size={48} color={DS.colors.primaryOrange} />
          </View>
          <Text style={styles.heroTitle}>Grow Your Food Community</Text>
          <Text style={styles.heroSubtitle}>
            Invite friends to join Troodie and discover amazing restaurants together
          </Text>
        </View>

        {/* Invite Code Card */}
        <View style={styles.codeCard}>
          <Text style={styles.codeLabel}>Your Invite Code</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>{inviteCode}</Text>
            <TouchableOpacity onPress={handleCopyCode} style={styles.copyButton}>
              <Copy size={20} color={DS.colors.primaryOrange} />
            </TouchableOpacity>
          </View>
          <Text style={styles.codeHint}>Friends get special perks when they use your code!</Text>
        </View>

        {/* Share Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Share Your Invite</Text>
          {inviteMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={styles.methodCard}
              onPress={method.action}
              activeOpacity={0.7}
            >
              <View style={[styles.methodIcon, { backgroundColor: `${method.color}15` }]}>
                <method.icon size={24} color={method.color} />
              </View>
              <View style={styles.methodText}>
                <Text style={styles.methodTitle}>{method.title}</Text>
                <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Link Section */}
        <View style={styles.linkSection}>
          <Text style={styles.linkLabel}>Or share this link:</Text>
          <TouchableOpacity onPress={handleCopyLink} style={styles.linkContainer}>
            <Text style={styles.linkText} numberOfLines={1}>{inviteLink}</Text>
            <Copy size={16} color={DS.colors.textGray} />
          </TouchableOpacity>
        </View>

        {/* Benefits */}
        <View style={styles.benefits}>
          <Text style={styles.benefitsTitle}>Friend Benefits</Text>
          <View style={styles.benefitItem}>
            <UserPlus size={20} color={DS.colors.primaryOrange} />
            <Text style={styles.benefitText}>Skip the waitlist instantly</Text>
          </View>
          <View style={styles.benefitItem}>
            <Users size={20} color={DS.colors.primaryOrange} />
            <Text style={styles.benefitText}>Automatic connection with you</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitEmoji}>🎁</Text>
            <Text style={styles.benefitText}>Special welcome rewards</Text>
          </View>
        </View>

        {/* Coming Soon Notice */}
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            More invite features coming soon including contact import and social media integration!
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.md,
    backgroundColor: DS.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  backButton: {
    width: 50,
  },
  backText: {
    ...DS.typography.button,
    color: DS.colors.primaryOrange,
  },
  headerTitle: {
    ...DS.typography.h2,
    color: DS.colors.textDark,
  },
  hero: {
    alignItems: 'center',
    padding: DS.spacing.xl,
    paddingTop: DS.spacing.xxl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${DS.colors.primaryOrange}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DS.spacing.lg,
  },
  heroTitle: {
    ...DS.typography.h1,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.sm,
    textAlign: 'center',
  },
  heroSubtitle: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    textAlign: 'center',
    maxWidth: 280,
  },
  codeCard: {
    backgroundColor: DS.colors.surface,
    marginHorizontal: DS.spacing.lg,
    padding: DS.spacing.lg,
    borderRadius: DS.borderRadius.lg,
    alignItems: 'center',
    ...DS.shadows.sm,
  },
  codeLabel: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
    marginBottom: DS.spacing.sm,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.md,
  },
  codeText: {
    ...DS.typography.h2,
    color: DS.colors.primaryOrange,
    letterSpacing: 1,
  },
  copyButton: {
    padding: DS.spacing.sm,
  },
  codeHint: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
    marginTop: DS.spacing.sm,
    textAlign: 'center',
  },
  section: {
    marginTop: DS.spacing.xl,
    paddingHorizontal: DS.spacing.lg,
  },
  sectionTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.md,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DS.colors.surface,
    padding: DS.spacing.md,
    borderRadius: DS.borderRadius.lg,
    marginBottom: DS.spacing.sm,
    ...DS.shadows.xs,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DS.spacing.md,
  },
  methodText: {
    flex: 1,
  },
  methodTitle: {
    ...DS.typography.body,
    color: DS.colors.textDark,
    fontWeight: '600',
  },
  methodSubtitle: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
    marginTop: 2,
  },
  linkSection: {
    marginTop: DS.spacing.xl,
    paddingHorizontal: DS.spacing.lg,
  },
  linkLabel: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
    marginBottom: DS.spacing.sm,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DS.colors.surface,
    padding: DS.spacing.md,
    borderRadius: DS.borderRadius.md,
    gap: DS.spacing.sm,
  },
  linkText: {
    ...DS.typography.caption,
    color: DS.colors.textDark,
    flex: 1,
  },
  benefits: {
    marginTop: DS.spacing.xxl,
    paddingHorizontal: DS.spacing.lg,
  },
  benefitsTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.md,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.md,
    marginBottom: DS.spacing.md,
  },
  benefitEmoji: {
    fontSize: 20,
  },
  benefitText: {
    ...DS.typography.body,
    color: DS.colors.textDark,
  },
  notice: {
    backgroundColor: `${DS.colors.primaryOrange}10`,
    marginHorizontal: DS.spacing.lg,
    marginTop: DS.spacing.xl,
    marginBottom: DS.spacing.xxl,
    padding: DS.spacing.md,
    borderRadius: DS.borderRadius.md,
  },
  noticeText: {
    ...DS.typography.caption,
    color: DS.colors.textDark,
    textAlign: 'center',
  },
});
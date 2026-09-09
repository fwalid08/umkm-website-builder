import React from 'react';
import {
  Wrench,
  Utensils,
  Coffee,
  Scissors,
  Sparkles,
  Car,
  Truck,
  Shirt,
  HardHat,
  Briefcase,
  ShoppingBag,
  Palette,
  Phone,
  MapPin,
  Clock,
  Mail,
  Check,
  Star,
  Shield,
  Award,
  Calendar,
  Camera,
  Heart,
  Globe,
  Smile,
  Zap,
  Users,
  Building,
  DollarSign,
  TrendingUp,
  Tag,
  Gift,
  Search,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Share2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileText,
  Package,
  Layers,
  Sparkle,
  ThumbsUp,
  ShieldCheck,
  Compass,
  Cpu,
  Feather,
  Hammer,
  Paintbrush,
  Sparkles as SparklesIcon,
  Headphones,
  Flame,
  Droplets,
  Wind,
  LucideIcon
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  Wrench,
  Utensils,
  Coffee,
  Scissors,
  Sparkles,
  Car,
  Truck,
  Shirt,
  HardHat,
  Briefcase,
  ShoppingBag,
  Palette,
  Phone,
  MapPin,
  Clock,
  Mail,
  Check,
  Star,
  Shield,
  Award,
  Calendar,
  Camera,
  Heart,
  Globe,
  Smile,
  Zap,
  Users,
  Building,
  DollarSign,
  TrendingUp,
  Tag,
  Gift,
  Search,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Share2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileText,
  Package,
  Layers,
  Sparkle,
  ThumbsUp,
  ShieldCheck,
  Compass,
  Cpu,
  Feather,
  Hammer,
  Paintbrush,
  Headphones,
  Flame,
  Droplets,
  Wind,
};

export interface IconRegistryItem {
  name: string;
  category: 'Business' | 'Communication' | 'Services' | 'Commerce' | 'General';
}

export const ICON_CATALOG: IconRegistryItem[] = [
  { name: 'Wrench', category: 'Services' },
  { name: 'Car', category: 'Services' },
  { name: 'Hammer', category: 'Services' },
  { name: 'HardHat', category: 'Services' },
  { name: 'Paintbrush', category: 'Services' },
  { name: 'Shirt', category: 'Services' },
  { name: 'Utensils', category: 'Business' },
  { name: 'Coffee', category: 'Business' },
  { name: 'Scissors', category: 'Business' },
  { name: 'Sparkles', category: 'Business' },
  { name: 'Briefcase', category: 'Business' },
  { name: 'Building', category: 'Business' },
  { name: 'ShoppingBag', category: 'Commerce' },
  { name: 'Tag', category: 'Commerce' },
  { name: 'Gift', category: 'Commerce' },
  { name: 'Package', category: 'Commerce' },
  { name: 'DollarSign', category: 'Commerce' },
  { name: 'TrendingUp', category: 'Commerce' },
  { name: 'Phone', category: 'Communication' },
  { name: 'Mail', category: 'Communication' },
  { name: 'MessageCircle', category: 'Communication' },
  { name: 'MapPin', category: 'Communication' },
  { name: 'Clock', category: 'Communication' },
  { name: 'Globe', category: 'Communication' },
  { name: 'Star', category: 'General' },
  { name: 'Shield', category: 'General' },
  { name: 'ShieldCheck', category: 'General' },
  { name: 'Award', category: 'General' },
  { name: 'Check', category: 'General' },
  { name: 'CheckCircle2', category: 'General' },
  { name: 'Users', category: 'General' },
  { name: 'Heart', category: 'General' },
  { name: 'Zap', category: 'General' },
  { name: 'Calendar', category: 'General' },
  { name: 'Palette', category: 'General' },
];

export class IconRegistry {
  public static get(iconName: string): LucideIcon {
    return ICON_MAP[iconName] || HelpCircle;
  }

  public static getAll(): string[] {
    return Object.keys(ICON_MAP);
  }

  public static getCatalog(): IconRegistryItem[] {
    return ICON_CATALOG;
  }

  public static search(query: string): IconRegistryItem[] {
    const q = query.toLowerCase().trim();
    if (!q) return ICON_CATALOG;
    return ICON_CATALOG.filter(
      (item) => item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );
  }
}

export function DynamicIcon({
  name,
  className = 'w-5 h-5',
}: {
  name: string;
  className?: string;
}) {
  const IconComp = IconRegistry.get(name);
  return <IconComp className={className} />;
}

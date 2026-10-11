import React from 'react';
import {
  HeartPulse,
  Sparkles,
  Stethoscope,
  Baby,
  Bone,
  Brain,
  Activity,
  Eye,
  Calendar,
  Clock,
  Shield,
  Award,
  Video,
  Building,
  CheckCircle2,
  Users,
  Search
} from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name.toLowerCase()) {
    case 'heartpulse':
    case 'cardiology':
      return <HeartPulse className={className} />;
    case 'sparkles':
    case 'dermatology':
      return <Sparkles className={className} />;
    case 'stethoscope':
    case 'general medicine':
    case 'general-medicine':
      return <Stethoscope className={className} />;
    case 'baby':
    case 'pediatrics':
      return <Baby className={className} />;
    case 'bone':
    case 'orthopedics':
      return <Bone className={className} />;
    case 'brain':
    case 'neurology':
      return <Brain className={className} />;
    case 'activity':
    case 'gynecology':
      return <Activity className={className} />;
    case 'eye':
    case 'ophthalmology':
      return <Eye className={className} />;
    case 'calendar':
      return <Calendar className={className} />;
    case 'clock':
      return <Clock className={className} />;
    case 'shield':
      return <Shield className={className} />;
    case 'award':
      return <Award className={className} />;
    case 'video':
      return <Video className={className} />;
    case 'building':
      return <Building className={className} />;
    case 'check':
      return <CheckCircle2 className={className} />;
    case 'users':
      return <Users className={className} />;
    default:
      return <Search className={className} />;
  }
};

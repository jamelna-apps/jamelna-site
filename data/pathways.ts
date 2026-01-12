export interface PathwayStep {
  id: string;
  type: 'quick-win' | 'lesson' | 'project';
  title: string;
  description: string;
  duration: string;
  trackRef: string; // e.g., 'networking.project1.lesson1'
  checkpoint: string;
}

export interface Pathway {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  outcome: string;
  timeEstimate: string;
  tracks: string[];
  color: 'sky' | 'violet' | 'amber' | 'green' | 'orange' | 'rose';
  steps: PathwayStep[];
}

export const pathways: Record<string, Pathway> = {
  'secure-network': {
    slug: 'secure-network',
    title: 'Secure My Home Network',
    description: 'Take control of your home network and protect your family from tracking and threats.',
    longDescription: `Your home network is the gateway to everything you do online. Most people have no idea what devices are connected, what data is being sent, or who might be listening. This pathway will teach you to see and control your network, block unwanted tracking, and create a secure foundation for everything else you do online.`,
    outcome: 'A secured home network with DNS filtering, device monitoring, and controlled access',
    timeEstimate: '3-4 weeks',
    tracks: ['networking'],
    color: 'sky',
    steps: [
      {
        id: 'scan-network',
        type: 'quick-win',
        title: 'Discover Your Network',
        description: 'Use free tools to scan your home network and see every connected device.',
        duration: '30 min',
        trackRef: 'networking.project1.lesson1',
        checkpoint: 'I can see all devices connected to my network',
      },
      {
        id: 'router-access',
        type: 'lesson',
        title: 'Access Your Router',
        description: 'Learn to access your router admin panel and understand its settings.',
        duration: '45 min',
        trackRef: 'networking.project1.lesson2',
        checkpoint: 'I can log into my router and navigate its settings',
      },
      {
        id: 'change-defaults',
        type: 'lesson',
        title: 'Secure Default Settings',
        description: 'Change default passwords, update firmware, and enable basic security.',
        duration: '1 hour',
        trackRef: 'networking.project1.lesson3',
        checkpoint: 'I have changed my router password and updated firmware',
      },
      {
        id: 'dns-filtering',
        type: 'project',
        title: 'Set Up DNS Filtering',
        description: 'Install Pi-hole or configure DNS-level ad and tracker blocking.',
        duration: '2-3 hours',
        trackRef: 'networking.project2.lesson1',
        checkpoint: 'I have DNS filtering blocking ads and trackers network-wide',
      },
      {
        id: 'guest-network',
        type: 'lesson',
        title: 'Create a Guest Network',
        description: 'Isolate IoT devices and guests from your main network.',
        duration: '1 hour',
        trackRef: 'networking.project2.lesson2',
        checkpoint: 'I have a separate network for guests and IoT devices',
      },
      {
        id: 'monitoring',
        type: 'project',
        title: 'Network Monitoring',
        description: 'Set up alerts for new devices and unusual activity.',
        duration: '2 hours',
        trackRef: 'networking.project3.lesson1',
        checkpoint: 'I receive alerts when new devices connect to my network',
      },
    ],
  },
  'own-your-data': {
    slug: 'own-your-data',
    title: 'Own Your Data',
    description: 'Replace Google Drive, Dropbox, and iCloud with your own private cloud storage.',
    longDescription: `Every file you store in Google Drive, Dropbox, or iCloud is accessible to those companies. They can scan your files, train AI on your data, and comply with any government request. This pathway teaches you to run your own cloud storage that syncs across all your devices—with the same convenience but full privacy.`,
    outcome: 'Your own Nextcloud server syncing files across all your devices privately',
    timeEstimate: '4-5 weeks',
    tracks: ['networking', 'self-hosted'],
    color: 'violet',
    steps: [
      {
        id: 'audit-cloud',
        type: 'quick-win',
        title: 'Audit Your Cloud Usage',
        description: 'Document what cloud services you use and what data they hold.',
        duration: '30 min',
        trackRef: 'self-hosted.project1.lesson1',
        checkpoint: 'I have a list of all cloud services storing my data',
      },
      {
        id: 'choose-hardware',
        type: 'lesson',
        title: 'Choose Your Hardware',
        description: 'Decide between Raspberry Pi, old PC, or NAS for your server.',
        duration: '1 hour',
        trackRef: 'self-hosted.project1.lesson2',
        checkpoint: 'I have chosen and acquired hardware for my server',
      },
      {
        id: 'install-nextcloud',
        type: 'project',
        title: 'Install Nextcloud',
        description: 'Set up Nextcloud on your chosen hardware with initial configuration.',
        duration: '3-4 hours',
        trackRef: 'self-hosted.project1.lesson3',
        checkpoint: 'Nextcloud is installed and I can access it on my local network',
      },
      {
        id: 'mobile-sync',
        type: 'lesson',
        title: 'Set Up Mobile Sync',
        description: 'Install Nextcloud apps on your phone and enable photo backup.',
        duration: '1 hour',
        trackRef: 'self-hosted.project1.lesson4',
        checkpoint: 'My phone automatically backs up photos to my Nextcloud',
      },
      {
        id: 'remote-access',
        type: 'project',
        title: 'Enable Remote Access',
        description: 'Configure secure access to your Nextcloud from anywhere.',
        duration: '2-3 hours',
        trackRef: 'networking.project4.lesson1',
        checkpoint: 'I can access my Nextcloud securely from outside my home',
      },
      {
        id: 'migrate-data',
        type: 'project',
        title: 'Migrate Your Data',
        description: 'Move files from Google Drive/Dropbox to your Nextcloud.',
        duration: '2-4 hours',
        trackRef: 'self-hosted.project1.lesson5',
        checkpoint: 'I have migrated at least one major folder from cloud storage',
      },
      {
        id: 'desktop-sync',
        type: 'lesson',
        title: 'Desktop Sync Client',
        description: 'Install and configure the desktop sync client for seamless access.',
        duration: '30 min',
        trackRef: 'self-hosted.project1.lesson6',
        checkpoint: 'My desktop syncs files automatically with Nextcloud',
      },
    ],
  },
  'stop-tracking': {
    slug: 'stop-tracking',
    title: 'Stop Big Tech Tracking',
    description: 'Understand how you are tracked online and take concrete steps to reduce it.',
    longDescription: `Every website you visit, every app you use, and every search you make is tracked, profiled, and sold. This data is used to manipulate your behavior, influence your decisions, and create detailed profiles about your life. This pathway teaches you exactly how tracking works and gives you practical tools to reclaim your privacy.`,
    outcome: 'Dramatically reduced online tracking with privacy-respecting alternatives',
    timeEstimate: '2-3 weeks',
    tracks: ['digital-rights', 'self-hosted'],
    color: 'amber',
    steps: [
      {
        id: 'understand-tracking',
        type: 'quick-win',
        title: 'See How You Are Tracked',
        description: 'Use browser tools to visualize the trackers following you online.',
        duration: '20 min',
        trackRef: 'digital-rights.project1.lesson1',
        checkpoint: 'I can see the trackers on websites I visit',
      },
      {
        id: 'browser-privacy',
        type: 'lesson',
        title: 'Harden Your Browser',
        description: 'Configure Firefox or Brave for maximum privacy with essential extensions.',
        duration: '1 hour',
        trackRef: 'digital-rights.project1.lesson2',
        checkpoint: 'My browser blocks most trackers automatically',
      },
      {
        id: 'search-engine',
        type: 'lesson',
        title: 'Switch Search Engines',
        description: 'Move from Google to privacy-respecting alternatives like DuckDuckGo or Brave Search.',
        duration: '30 min',
        trackRef: 'digital-rights.project1.lesson3',
        checkpoint: 'I use a privacy-respecting search engine by default',
      },
      {
        id: 'email-privacy',
        type: 'lesson',
        title: 'Email Privacy Basics',
        description: 'Understand email tracking and consider privacy-focused alternatives.',
        duration: '1 hour',
        trackRef: 'digital-rights.project1.lesson4',
        checkpoint: 'I understand email tracking and have a migration plan',
      },
      {
        id: 'dns-blocking',
        type: 'project',
        title: 'Network-Level Blocking',
        description: 'Set up DNS-level blocking to stop tracking across all devices.',
        duration: '2-3 hours',
        trackRef: 'networking.project2.lesson1',
        checkpoint: 'Trackers are blocked at the network level for all my devices',
      },
      {
        id: 'data-export',
        type: 'lesson',
        title: 'Export Your Data',
        description: 'Download your data from Google, Facebook, and other services.',
        duration: '1 hour',
        trackRef: 'digital-rights.project1.lesson5',
        checkpoint: 'I have exported my data from at least one major platform',
      },
      {
        id: 'reduce-footprint',
        type: 'project',
        title: 'Reduce Your Digital Footprint',
        description: 'Delete old accounts, opt out of data brokers, and minimize exposure.',
        duration: '2-3 hours',
        trackRef: 'digital-rights.project2.lesson1',
        checkpoint: 'I have deleted or secured old unused accounts',
      },
    ],
  },
};

export const pathwayOrder = ['secure-network', 'own-your-data', 'stop-tracking'];

export function getPathway(slug: string): Pathway | undefined {
  return pathways[slug];
}

export function getAllPathways(): Pathway[] {
  return pathwayOrder.map((slug) => pathways[slug]);
}

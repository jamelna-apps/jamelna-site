export type ThreatTier = 1 | 2 | 3;

export type ResiliencePillar =
  | 'secure-communication'
  | 'data-preservation'
  | 'infrastructure-independence'
  | 'operational-security'
  | 'community-organizing';

export type PillarColor = 'emerald' | 'cyan' | 'amber' | 'rose' | 'violet';

export interface ToolRecommendation {
  name: string;
  url: string;
  replaces?: string;
  platforms: ('windows' | 'mac' | 'linux' | 'android' | 'ios' | 'web')[];
  foss: boolean;
}

export interface ResilienceAction {
  id: string;
  pillar: ResiliencePillar;
  tier: ThreatTier;
  duration: string;
  tools: ToolRecommendation[];
  stepCount: number;
  relatedTrack?: string;
}

export interface PillarConfig {
  id: ResiliencePillar;
  accentColor: PillarColor;
  icon: string;
}

export const pillarConfigs: PillarConfig[] = [
  {
    id: 'secure-communication',
    accentColor: 'emerald',
    icon: 'message-lock',
  },
  {
    id: 'data-preservation',
    accentColor: 'cyan',
    icon: 'archive-shield',
  },
  {
    id: 'infrastructure-independence',
    accentColor: 'amber',
    icon: 'server-network',
  },
  {
    id: 'operational-security',
    accentColor: 'rose',
    icon: 'eye-shield',
  },
  {
    id: 'community-organizing',
    accentColor: 'violet',
    icon: 'users-network',
  },
];

export const resilienceActions: ResilienceAction[] = [
  // ─── Secure Communication — Tier 1 ───────────────────────────────────────
  {
    id: 'signal-setup',
    pillar: 'secure-communication',
    tier: 1,
    duration: '5 min',
    tools: [
      {
        name: 'Signal',
        url: 'https://signal.org',
        replaces: 'SMS/iMessage',
        platforms: ['android', 'ios', 'windows', 'mac', 'linux'],
        foss: false,
      },
    ],
    stepCount: 3,
    relatedTrack: 'networking',
  },
  {
    id: 'protonmail-setup',
    pillar: 'secure-communication',
    tier: 1,
    duration: '15 min',
    tools: [
      {
        name: 'ProtonMail',
        url: 'https://proton.me/mail',
        replaces: 'Gmail',
        platforms: ['web', 'android', 'ios'],
        foss: false,
      },
    ],
    stepCount: 4,
    relatedTrack: 'digital-rights',
  },
  {
    id: 'disappearing-messages',
    pillar: 'secure-communication',
    tier: 1,
    duration: '10 min',
    tools: [],
    stepCount: 3,
  },

  // ─── Secure Communication — Tier 2 ───────────────────────────────────────
  {
    id: 'matrix-server',
    pillar: 'secure-communication',
    tier: 2,
    duration: '4 hours',
    tools: [
      {
        name: 'Element',
        url: 'https://element.io',
        replaces: 'Slack/Discord',
        platforms: ['windows', 'mac', 'linux', 'android', 'ios', 'web'],
        foss: true,
      },
      {
        name: 'Matrix Synapse',
        url: 'https://matrix.org/docs/projects/server/synapse',
        platforms: ['linux'],
        foss: true,
      },
    ],
    stepCount: 8,
    relatedTrack: 'self-hosted',
  },
  {
    id: 'tor-browser',
    pillar: 'secure-communication',
    tier: 2,
    duration: '30 min',
    tools: [
      {
        name: 'Tor Browser',
        url: 'https://www.torproject.org/download/',
        replaces: 'Chrome',
        platforms: ['windows', 'mac', 'linux', 'android'],
        foss: true,
      },
    ],
    stepCount: 3,
    relatedTrack: 'digital-rights',
  },
  {
    id: 'pgp-email',
    pillar: 'secure-communication',
    tier: 2,
    duration: '2 hours',
    tools: [
      {
        name: 'GPG / Kleopatra',
        url: 'https://www.openpgp.org/software/',
        platforms: ['windows', 'mac', 'linux'],
        foss: true,
      },
    ],
    stepCount: 6,
  },

  // ─── Secure Communication — Tier 3 ───────────────────────────────────────
  {
    id: 'briar-mesh',
    pillar: 'secure-communication',
    tier: 3,
    duration: '30 min',
    tools: [
      {
        name: 'Briar',
        url: 'https://briarproject.org',
        platforms: ['android'],
        foss: true,
      },
    ],
    stepCount: 4,
    relatedTrack: 'networking',
  },
  {
    id: 'mesh-comms',
    pillar: 'secure-communication',
    tier: 3,
    duration: '2-3 days',
    tools: [
      {
        name: 'Meshtastic',
        url: 'https://meshtastic.org',
        platforms: ['android', 'ios'],
        foss: true,
      },
      {
        name: 'LoRa Radios',
        url: 'https://meshtastic.org/docs/hardware/',
        platforms: [],
        foss: true,
      },
    ],
    stepCount: 10,
    relatedTrack: 'networking',
  },
  {
    id: 'onion-service',
    pillar: 'secure-communication',
    tier: 3,
    duration: '1 day',
    tools: [
      {
        name: 'Tor',
        url: 'https://www.torproject.org',
        platforms: ['linux'],
        foss: true,
      },
    ],
    stepCount: 9,
    relatedTrack: 'self-hosted',
  },

  // ─── Data Preservation — Tier 1 ──────────────────────────────────────────
  {
    id: 'encrypted-backup',
    pillar: 'data-preservation',
    tier: 1,
    duration: '20 min',
    tools: [
      {
        name: 'Cryptomator',
        url: 'https://cryptomator.org',
        replaces: 'unencrypted cloud storage',
        platforms: ['windows', 'mac', 'linux', 'android', 'ios'],
        foss: true,
      },
    ],
    stepCount: 4,
  },
  {
    id: 'backup-321',
    pillar: 'data-preservation',
    tier: 1,
    duration: '30 min',
    tools: [],
    stepCount: 5,
  },
  {
    id: 'evidence-capture',
    pillar: 'data-preservation',
    tier: 1,
    duration: '15 min',
    tools: [
      {
        name: 'ProofMode',
        url: 'https://proofmode.org',
        platforms: ['android'],
        foss: true,
      },
    ],
    stepCount: 3,
  },

  // ─── Data Preservation — Tier 2 ──────────────────────────────────────────
  {
    id: 'veracrypt-volume',
    pillar: 'data-preservation',
    tier: 2,
    duration: '1 hour',
    tools: [
      {
        name: 'VeraCrypt',
        url: 'https://veracrypt.fr',
        replaces: 'BitLocker',
        platforms: ['windows', 'mac', 'linux'],
        foss: true,
      },
    ],
    stepCount: 6,
  },
  {
    id: 'ipfs-pin',
    pillar: 'data-preservation',
    tier: 2,
    duration: '2 hours',
    tools: [
      {
        name: 'IPFS Desktop',
        url: 'https://docs.ipfs.tech/install/ipfs-desktop/',
        platforms: ['windows', 'mac', 'linux'],
        foss: true,
      },
    ],
    stepCount: 7,
    relatedTrack: 'self-hosted',
  },
  {
    id: 'chain-of-custody',
    pillar: 'data-preservation',
    tier: 2,
    duration: '1 hour',
    tools: [],
    stepCount: 5,
  },

  // ─── Data Preservation — Tier 3 ──────────────────────────────────────────
  {
    id: 'securedrop-deploy',
    pillar: 'data-preservation',
    tier: 3,
    duration: '2-3 days',
    tools: [
      {
        name: 'SecureDrop',
        url: 'https://securedrop.org',
        platforms: ['linux'],
        foss: true,
      },
    ],
    stepCount: 12,
    relatedTrack: 'self-hosted',
  },
  {
    id: 'air-gapped-archive',
    pillar: 'data-preservation',
    tier: 3,
    duration: '1 day',
    tools: [
      {
        name: 'Tails OS',
        url: 'https://tails.boum.org',
        platforms: ['linux'],
        foss: true,
      },
    ],
    stepCount: 8,
  },
  {
    id: 'distributed-evidence',
    pillar: 'data-preservation',
    tier: 3,
    duration: '1 week',
    tools: [
      {
        name: 'IPFS Desktop',
        url: 'https://docs.ipfs.tech/install/ipfs-desktop/',
        platforms: ['windows', 'mac', 'linux'],
        foss: true,
      },
      {
        name: 'GPG / Kleopatra',
        url: 'https://www.openpgp.org/software/',
        platforms: ['windows', 'mac', 'linux'],
        foss: true,
      },
    ],
    stepCount: 14,
  },

  // ─── Infrastructure Independence — Tier 1 ────────────────────────────────
  {
    id: 'local-first-apps',
    pillar: 'infrastructure-independence',
    tier: 1,
    duration: '20 min',
    tools: [
      {
        name: 'Standard Notes',
        url: 'https://standardnotes.com',
        replaces: 'Google Keep/Notes',
        platforms: ['windows', 'mac', 'linux', 'android', 'ios', 'web'],
        foss: true,
      },
      {
        name: 'Joplin',
        url: 'https://joplinapp.org',
        replaces: 'Evernote',
        platforms: ['windows', 'mac', 'linux', 'android', 'ios'],
        foss: true,
      },
    ],
    stepCount: 3,
  },
  {
    id: 'vpn-setup',
    pillar: 'infrastructure-independence',
    tier: 1,
    duration: '15 min',
    tools: [
      {
        name: 'Mullvad VPN',
        url: 'https://mullvad.net',
        replaces: 'no-VPN',
        platforms: ['windows', 'mac', 'linux', 'android', 'ios'],
        foss: false,
      },
    ],
    stepCount: 3,
    relatedTrack: 'networking',
  },
  {
    id: 'dns-privacy',
    pillar: 'infrastructure-independence',
    tier: 1,
    duration: '10 min',
    tools: [],
    stepCount: 2,
  },

  // ─── Infrastructure Independence — Tier 2 ────────────────────────────────
  {
    id: 'nextcloud-deploy',
    pillar: 'infrastructure-independence',
    tier: 2,
    duration: '1 day',
    tools: [
      {
        name: 'Nextcloud',
        url: 'https://nextcloud.com',
        replaces: 'Google Drive/Dropbox',
        platforms: ['web', 'windows', 'mac', 'linux', 'android', 'ios'],
        foss: true,
      },
    ],
    stepCount: 9,
    relatedTrack: 'self-hosted',
  },
  {
    id: 'wireguard-vpn',
    pillar: 'infrastructure-independence',
    tier: 2,
    duration: '3 hours',
    tools: [
      {
        name: 'WireGuard',
        url: 'https://www.wireguard.com',
        platforms: ['windows', 'mac', 'linux', 'android', 'ios'],
        foss: true,
      },
    ],
    stepCount: 7,
    relatedTrack: 'networking',
  },
  {
    id: 'community-dns',
    pillar: 'infrastructure-independence',
    tier: 2,
    duration: '2 hours',
    tools: [
      {
        name: 'Pi-hole',
        url: 'https://pi-hole.net',
        replaces: 'ISP DNS',
        platforms: ['linux'],
        foss: true,
      },
    ],
    stepCount: 6,
    relatedTrack: 'self-hosted',
  },

  // ─── Infrastructure Independence — Tier 3 ────────────────────────────────
  {
    id: 'mesh-network',
    pillar: 'infrastructure-independence',
    tier: 3,
    duration: '1-2 weeks',
    tools: [
      {
        name: 'LibreRouter',
        url: 'https://librerouter.org',
        platforms: [],
        foss: true,
      },
      {
        name: 'OpenWRT',
        url: 'https://openwrt.org',
        platforms: ['linux'],
        foss: true,
      },
    ],
    stepCount: 15,
    relatedTrack: 'networking',
  },
  {
    id: 'local-isp',
    pillar: 'infrastructure-independence',
    tier: 3,
    duration: '1+ months',
    tools: [],
    stepCount: 20,
    relatedTrack: 'community',
  },
  {
    id: 'offgrid-compute',
    pillar: 'infrastructure-independence',
    tier: 3,
    duration: '3-5 days',
    tools: [
      {
        name: 'Raspberry Pi',
        url: 'https://www.raspberrypi.com',
        platforms: ['linux'],
        foss: false,
      },
    ],
    stepCount: 12,
  },

  // ─── Operational Security — Tier 1 ───────────────────────────────────────
  {
    id: 'threat-model',
    pillar: 'operational-security',
    tier: 1,
    duration: '30 min',
    tools: [],
    stepCount: 5,
  },
  {
    id: 'device-security',
    pillar: 'operational-security',
    tier: 1,
    duration: '20 min',
    tools: [],
    stepCount: 6,
  },
  {
    id: 'metadata-awareness',
    pillar: 'operational-security',
    tier: 1,
    duration: '15 min',
    tools: [
      {
        name: 'ExifTool',
        url: 'https://exiftool.org',
        platforms: ['windows', 'mac', 'linux'],
        foss: true,
      },
    ],
    stepCount: 3,
  },

  // ─── Operational Security — Tier 2 ───────────────────────────────────────
  {
    id: 'tails-usb',
    pillar: 'operational-security',
    tier: 2,
    duration: '1 hour',
    tools: [
      {
        name: 'Tails OS',
        url: 'https://tails.boum.org',
        platforms: ['linux'],
        foss: true,
      },
    ],
    stepCount: 5,
  },
  {
    id: 'compartmentalization',
    pillar: 'operational-security',
    tier: 2,
    duration: '2 hours',
    tools: [],
    stepCount: 7,
  },
  {
    id: 'burner-practices',
    pillar: 'operational-security',
    tier: 2,
    duration: '30 min',
    tools: [],
    stepCount: 4,
  },

  // ─── Operational Security — Tier 3 ───────────────────────────────────────
  {
    id: 'advanced-opsec',
    pillar: 'operational-security',
    tier: 3,
    duration: '1 day',
    tools: [],
    stepCount: 10,
  },
  {
    id: 'surveillance-countermeasures',
    pillar: 'operational-security',
    tier: 3,
    duration: '1 day',
    tools: [
      {
        name: 'Haven',
        url: 'https://guardianproject.github.io/haven/',
        platforms: ['android'],
        foss: true,
      },
    ],
    stepCount: 9,
  },
  {
    id: 'travel-security',
    pillar: 'operational-security',
    tier: 3,
    duration: '2 hours',
    tools: [
      {
        name: 'VeraCrypt',
        url: 'https://veracrypt.fr',
        replaces: 'BitLocker',
        platforms: ['windows', 'mac', 'linux'],
        foss: true,
      },
    ],
    stepCount: 8,
  },

  // ─── Community Organizing — Tier 1 ───────────────────────────────────────
  {
    id: 'secure-group-chat',
    pillar: 'community-organizing',
    tier: 1,
    duration: '15 min',
    tools: [
      {
        name: 'Signal',
        url: 'https://signal.org',
        replaces: 'SMS/iMessage',
        platforms: ['android', 'ios', 'windows', 'mac', 'linux'],
        foss: false,
      },
    ],
    stepCount: 3,
    relatedTrack: 'community',
  },
  {
    id: 'comm-tree',
    pillar: 'community-organizing',
    tier: 1,
    duration: '30 min',
    tools: [],
    stepCount: 4,
  },
  {
    id: 'emergency-protocol',
    pillar: 'community-organizing',
    tier: 1,
    duration: '20 min',
    tools: [],
    stepCount: 4,
  },

  // ─── Community Organizing — Tier 2 ───────────────────────────────────────
  {
    id: 'decentralized-coord',
    pillar: 'community-organizing',
    tier: 2,
    duration: '3 hours',
    tools: [
      {
        name: 'CryptPad',
        url: 'https://cryptpad.fr',
        replaces: 'Google Docs',
        platforms: ['web'],
        foss: true,
      },
      {
        name: 'OnlyOffice',
        url: 'https://www.onlyoffice.com',
        platforms: ['windows', 'mac', 'linux', 'web'],
        foss: true,
      },
    ],
    stepCount: 6,
    relatedTrack: 'community',
  },
  {
    id: 'trust-network',
    pillar: 'community-organizing',
    tier: 2,
    duration: '2 hours',
    tools: [],
    stepCount: 5,
  },
  {
    id: 'secure-meetings',
    pillar: 'community-organizing',
    tier: 2,
    duration: '1 hour',
    tools: [
      {
        name: 'Jitsi Meet',
        url: 'https://meet.jit.si',
        replaces: 'Zoom',
        platforms: ['web', 'android', 'ios'],
        foss: true,
      },
    ],
    stepCount: 4,
    relatedTrack: 'community',
  },

  // ─── Community Organizing — Tier 3 ───────────────────────────────────────
  {
    id: 'cell-structure',
    pillar: 'community-organizing',
    tier: 3,
    duration: '1 day',
    tools: [],
    stepCount: 8,
  },
  {
    id: 'distributed-leadership',
    pillar: 'community-organizing',
    tier: 3,
    duration: '2 days',
    tools: [],
    stepCount: 10,
  },
  {
    id: 'counter-infiltration',
    pillar: 'community-organizing',
    tier: 3,
    duration: '1 day',
    tools: [],
    stepCount: 7,
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function getActionsByPillar(pillar: ResiliencePillar): ResilienceAction[] {
  return resilienceActions.filter((action) => action.pillar === pillar);
}

export function getActionsByTier(tier: ThreatTier): ResilienceAction[] {
  return resilienceActions.filter((action) => action.tier === tier);
}

export function getActionsByPillarAndTier(
  pillar: ResiliencePillar,
  tier: ThreatTier,
): ResilienceAction[] {
  return resilienceActions.filter((action) => action.pillar === pillar && action.tier === tier);
}

export function getPillarConfig(pillar: ResiliencePillar): PillarConfig {
  const config = pillarConfigs.find((p) => p.id === pillar);
  if (!config) {
    throw new Error(`No config found for pillar: ${pillar}`);
  }
  return config;
}

export function getAllTools(): ToolRecommendation[] {
  const seen = new Set<string>();
  const tools: ToolRecommendation[] = [];

  for (const action of resilienceActions) {
    for (const tool of action.tools) {
      if (!seen.has(tool.name)) {
        seen.add(tool.name);
        tools.push(tool);
      }
    }
  }

  return tools;
}

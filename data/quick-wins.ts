import type { QuickWin } from '@/components/tech-sovereignty/QuickWinCard';

export const quickWins: QuickWin[] = [
  {
    id: 'scan-network',
    title: 'Scan Your Home Network',
    description: 'Discover all the devices connected to your network and identify potential security concerns.',
    duration: '30 min',
    track: 'networking',
    trackTitle: 'Networking',
    outcome: 'See every device on your network',
    link: '/tech-sovereignty/networking?project=1&lesson=quick-win',
  },
  {
    id: 'install-pihole',
    title: 'Block Ads Network-Wide',
    description: 'Set up Pi-hole to block ads and trackers for every device on your network automatically.',
    duration: '45 min',
    track: 'self-hosted',
    trackTitle: 'Self-Hosted',
    outcome: 'No more ads on any device',
    link: '/tech-sovereignty/self-hosted?project=quick-win',
  },
  {
    id: 'run-local-llm',
    title: 'Run AI Locally with Ollama',
    description: 'Have a private conversation with an AI that runs entirely on your computer. No data sent anywhere.',
    duration: '30 min',
    track: 'ai-llm',
    trackTitle: 'AI/LLM',
    outcome: 'Chat privately with local AI',
    link: '/tech-sovereignty/ai-llm?project=2&lesson=quick-win',
  },
  {
    id: 'audit-google-data',
    title: 'Audit Your Google Data',
    description: 'Download everything Google knows about you and understand the scope of data collection.',
    duration: '45 min',
    track: 'digital-rights',
    trackTitle: 'Digital Rights',
    outcome: 'Know what Google has on you',
    link: '/tech-sovereignty/digital-rights?project=1&lesson=quick-win',
  },
  {
    id: 'linux-usb',
    title: 'Try Linux from USB',
    description: 'Boot into a full Linux desktop without installing anything. Experience open-source computing.',
    duration: '45 min',
    track: 'linux-foss',
    trackTitle: 'Linux & FOSS',
    outcome: 'Run Linux without installing',
    link: '/tech-sovereignty/linux-foss?project=1&lesson=quick-win',
  },
  {
    id: 'password-manager',
    title: 'Set Up a Password Manager',
    description: 'Stop reusing passwords. Set up Bitwarden to generate and store unique passwords for every site.',
    duration: '30 min',
    track: 'digital-rights',
    trackTitle: 'Digital Rights',
    outcome: 'Secure, unique passwords everywhere',
    link: '/tech-sovereignty/digital-rights?project=1&lesson=passwords',
  },
];

export function getQuickWinsByTrack(track: string): QuickWin[] {
  return quickWins.filter((qw) => qw.track === track);
}

export function getQuickWin(id: string): QuickWin | undefined {
  return quickWins.find((qw) => qw.id === id);
}

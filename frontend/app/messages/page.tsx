import type { Metadata } from 'next';
import { MessageGeneratorTool } from '@/features/messages/MessageGeneratorTool';

export const metadata: Metadata = {
  title: 'Gift Message Artistry & Calligraphy | CHARIS',
  description: 'Compose gold calligraphy gift card messages across 6 distinct luxury tones, powered by artificial intelligence.',
};

export default function MessagesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <MessageGeneratorTool />
    </div>
  );
}

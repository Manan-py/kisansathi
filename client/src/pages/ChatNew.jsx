import { WhatsAppChat } from '@/components/WhatsAppChat';

export default function ChatNew() {
  return (
    <div className="max-w-4xl mx-auto space-y-6" data-testid="page-chat-new">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          🤖 AI कृषि सहायक
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          अपनी खेती से जुड़े सवाल पूछें और तुरंत सलाह पाएं
        </p>
      </div>
      
      <WhatsAppChat />
      
      <div className="grid gap-4 sm:grid-cols-3 text-center">
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
          <div className="text-3xl mb-2">🌾</div>
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">फसल सलाह</h3>
          <p className="text-green-600 dark:text-green-400">बुआई से कटाई तक</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl">
          <div className="text-3xl mb-2">🔬</div>
          <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">बीमारी पहचान</h3>
          <p className="text-yellow-600 dark:text-yellow-400">तुरंत इलाज</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl">
          <div className="text-3xl mb-2">💰</div>
          <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300">मंडी भाव</h3>
          <p className="text-orange-600 dark:text-orange-400">सही कीमत पाएं</p>
        </div>
      </div>
    </div>
  );
}
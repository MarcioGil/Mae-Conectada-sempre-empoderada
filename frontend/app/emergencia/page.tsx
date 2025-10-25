import AdvancedEmergencyAlert from '@/components/AdvancedEmergencyAlert'

export default function EmergenciaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-8">
      <div className="container mx-auto px-4">
        <AdvancedEmergencyAlert />
      </div>
    </div>
  )
}
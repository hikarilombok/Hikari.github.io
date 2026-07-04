import { PropertyStatus } from '@/types'

/**
 * Property Status Configuration
 * Defines color scheme for different property statuses
 */
export const PROPERTY_STATUS_CONFIG: Record<PropertyStatus, { color: string; bgColor: string; label: string }> = {
  [PropertyStatus.AVAILABLE]: {
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    label: 'Tersedia',
  },
  [PropertyStatus.BOOKING]: {
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    label: 'Booking',
  },
  [PropertyStatus.SOLD]: {
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    label: 'Terjual',
  },
  [PropertyStatus.TAKEOVER]: {
    color: 'text-gray-700',
    bgColor: 'bg-gray-100',
    label: 'Take Over',
  },
}

/**
 * Property Status Badge Tailwind Classes
 */
export const getPropertyStatusClasses = (status: PropertyStatus): string => {
  const config = PROPERTY_STATUS_CONFIG[status]
  return `${config.bgColor} ${config.color} px-3 py-1 rounded-full font-semibold text-sm`
}

export const getPropertyStatusLabel = (status: PropertyStatus): string => {
  return PROPERTY_STATUS_CONFIG[status].label
}

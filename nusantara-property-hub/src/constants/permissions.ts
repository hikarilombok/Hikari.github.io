import { UserRole, Permission } from '@/types'

/**
 * RBAC Configuration - Role to Permissions Mapping
 * Defines what permissions each role has in the system
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    Permission.MANAGE_USERS,
    Permission.MANAGE_PROPERTIES,
    Permission.MANAGE_TRANSACTIONS,
    Permission.VIEW_ANALYTICS,
    Permission.MANAGE_SYSTEM,
    Permission.VIEW_LOGS,
    Permission.MANAGE_INTEGRATIONS,
  ],

  [UserRole.DEVELOPER]: [
    Permission.ACCESS_API,
    Permission.VIEW_LOGS,
    Permission.MANAGE_INTEGRATIONS,
  ],

  [UserRole.SELLER]: [
    Permission.CREATE_PROPERTY,
    Permission.EDIT_PROPERTY,
    Permission.DELETE_PROPERTY,
    Permission.VIEW_OFFERS,
    Permission.VIEW_PROPERTIES,
  ],

  [UserRole.MARKETING]: [
    Permission.VIEW_PROPERTIES,
    Permission.CREATE_CAMPAIGN,
    Permission.EDIT_CAMPAIGN,
    Permission.VIEW_CAMPAIGN_ANALYTICS,
    Permission.VIEW_ANALYTICS,
  ],

  [UserRole.NOTARY]: [
    Permission.REVIEW_DOCUMENTS,
    Permission.APPROVE_TRANSACTION,
    Permission.SIGN_DOCUMENTS,
    Permission.VIEW_TRANSACTIONS,
  ],

  [UserRole.BUYER]: [
    Permission.VIEW_PROPERTIES,
    Permission.MAKE_OFFER,
    Permission.VIEW_TRANSACTIONS,
  ],
}

/**
 * Role Display Names
 */
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Administrator',
  [UserRole.DEVELOPER]: 'Developer',
  [UserRole.SELLER]: 'Penjual Pribadi',
  [UserRole.MARKETING]: 'Marketing',
  [UserRole.NOTARY]: 'Notaris',
  [UserRole.BUYER]: 'Pembeli',
}

/**
 * Role Colors for UI
 */
export const ROLE_COLORS: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'bg-red-100 text-red-800',
  [UserRole.DEVELOPER]: 'bg-blue-100 text-blue-800',
  [UserRole.SELLER]: 'bg-green-100 text-green-800',
  [UserRole.MARKETING]: 'bg-purple-100 text-purple-800',
  [UserRole.NOTARY]: 'bg-yellow-100 text-yellow-800',
  [UserRole.BUYER]: 'bg-indigo-100 text-indigo-800',
}

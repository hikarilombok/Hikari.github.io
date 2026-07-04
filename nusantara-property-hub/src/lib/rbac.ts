import { UserRole, Permission, AuthUser } from '@/types'
import { ROLE_PERMISSIONS } from '@/constants/permissions'

/**
 * RBAC (Role-Based Access Control) Utility Class
 * Provides methods to check user permissions and roles
 */
export class RBAC {
  /**
   * Check if user has a specific permission
   */
  static hasPermission(user: AuthUser | null, permission: Permission): boolean {
    if (!user) return false
    return user.permissions.includes(permission)
  }

  /**
   * Check if user has any of the specified permissions
   */
  static hasAnyPermission(user: AuthUser | null, permissions: Permission[]): boolean {
    if (!user) return false
    return permissions.some((perm) => user.permissions.includes(perm))
  }

  /**
   * Check if user has all of the specified permissions
   */
  static hasAllPermissions(user: AuthUser | null, permissions: Permission[]): boolean {
    if (!user) return false
    return permissions.every((perm) => user.permissions.includes(perm))
  }

  /**
   * Check if user has a specific role
   */
  static hasRole(user: AuthUser | null, role: UserRole): boolean {
    if (!user) return false
    return user.role === role
  }

  /**
   * Check if user has any of the specified roles
   */
  static hasAnyRole(user: AuthUser | null, roles: UserRole[]): boolean {
    if (!user) return false
    return roles.includes(user.role)
  }

  /**
   * Get permissions for a given role
   */
  static getPermissionsForRole(role: UserRole): Permission[] {
    return ROLE_PERMISSIONS[role] || []
  }

  /**
   * Check if a role can perform an action
   */
  static canRolePerformAction(role: UserRole, permission: Permission): boolean {
    const permissions = this.getPermissionsForRole(role)
    return permissions.includes(permission)
  }

  /**
   * Get all possible permissions for a user's role
   */
  static getUserPermissions(user: AuthUser | null): Permission[] {
    if (!user) return []
    return this.getPermissionsForRole(user.role)
  }
}

/**
 * Type guard to check if user is authenticated
 */
export function isAuthenticated(user: AuthUser | null): user is AuthUser {
  return user !== null && !!user.id && !!user.email
}

/**
 * Type guard to check if user has admin role
 */
export function isAdmin(user: AuthUser | null): boolean {
  return user?.role === UserRole.ADMIN
}

/**
 * Type guard to check if user is a seller
 */
export function isSeller(user: AuthUser | null): boolean {
  return user?.role === UserRole.SELLER
}

/**
 * Type guard to check if user is a buyer
 */
export function isBuyer(user: AuthUser | null): boolean {
  return user?.role === UserRole.BUYER
}

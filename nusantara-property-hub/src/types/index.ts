// ============================================
// ROLE & PERMISSION TYPES
// ============================================

export enum UserRole {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  SELLER = 'SELLER',
  MARKETING = 'MARKETING',
  NOTARY = 'NOTARY',
  BUYER = 'BUYER',
}

export enum Permission {
  // Admin permissions
  MANAGE_USERS = 'MANAGE_USERS',
  MANAGE_PROPERTIES = 'MANAGE_PROPERTIES',
  MANAGE_TRANSACTIONS = 'MANAGE_TRANSACTIONS',
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  MANAGE_SYSTEM = 'MANAGE_SYSTEM',

  // Developer permissions
  ACCESS_API = 'ACCESS_API',
  VIEW_LOGS = 'VIEW_LOGS',
  MANAGE_INTEGRATIONS = 'MANAGE_INTEGRATIONS',

  // Seller permissions
  CREATE_PROPERTY = 'CREATE_PROPERTY',
  EDIT_PROPERTY = 'EDIT_PROPERTY',
  DELETE_PROPERTY = 'DELETE_PROPERTY',
  VIEW_OFFERS = 'VIEW_OFFERS',

  // Marketing permissions
  CREATE_CAMPAIGN = 'CREATE_CAMPAIGN',
  EDIT_CAMPAIGN = 'EDIT_CAMPAIGN',
  VIEW_CAMPAIGN_ANALYTICS = 'VIEW_CAMPAIGN_ANALYTICS',

  // Notary permissions
  REVIEW_DOCUMENTS = 'REVIEW_DOCUMENTS',
  APPROVE_TRANSACTION = 'APPROVE_TRANSACTION',
  SIGN_DOCUMENTS = 'SIGN_DOCUMENTS',

  // Buyer permissions
  VIEW_PROPERTIES = 'VIEW_PROPERTIES',
  MAKE_OFFER = 'MAKE_OFFER',
  VIEW_TRANSACTIONS = 'VIEW_TRANSACTIONS',
}

// ============================================
// USER & AUTHENTICATION TYPES
// ============================================

export interface User {
  id: string
  email: string
  name: string
  phone: string
  role: UserRole
  avatar?: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface AuthUser extends User {
  permissions: Permission[]
  token?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  name: string
  phone: string
  role: UserRole
}

// ============================================
// PROPERTY TYPES
// ============================================

export enum PropertyStatus {
  AVAILABLE = 'AVAILABLE', // Hijau
  BOOKING = 'BOOKING', // Kuning
  SOLD = 'SOLD', // Merah
  TAKEOVER = 'TAKEOVER', // Abu-abu
}

export enum PropertyType {
  HOUSE = 'HOUSE',
  APARTMENT = 'APARTMENT',
  COMMERCIAL = 'COMMERCIAL',
  LAND = 'LAND',
  OFFICE = 'OFFICE',
}

export interface Location {
  province: string
  city: string
  district: string
  address: string
  latitude: number
  longitude: number
}

export interface Property {
  id: string
  title: string
  description: string
  price: number
  status: PropertyStatus
  type: PropertyType
  location: Location
  bedrooms: number
  bathrooms: number
  squareMeters: number
  images: string[]
  sellerId: string
  sellerName: string
  sellerPhone: string
  createdAt: Date
  updatedAt: Date
  views: number
  favorites: number
}

export interface PropertyFilter {
  searchTerm?: string
  status?: PropertyStatus[]
  type?: PropertyType[]
  priceMin?: number
  priceMax?: number
  city?: string
  province?: string
  bedroomMin?: number
  bedroomMax?: number
  page?: number
  limit?: number
}

// ============================================
// TRANSACTION & OFFER TYPES
// ============================================

export enum OfferStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export interface PropertyOffer {
  id: string
  propertyId: string
  buyerId: string
  buyerName: string
  buyerEmail: string
  offerPrice: number
  message: string
  status: OfferStatus
  createdAt: Date
  updatedAt: Date
}

export enum TransactionStatus {
  PENDING_REVIEW = 'PENDING_REVIEW',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Transaction {
  id: string
  propertyId: string
  offerId: string
  buyerId: string
  sellerId: string
  finalPrice: number
  status: TransactionStatus
  documents: Document[]
  notaryId?: string
  approvedAt?: Date
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Document {
  id: string
  name: string
  url: string
  type: string
  uploadedAt: Date
  signedAt?: Date
}

// ============================================
// MARKETING & CAMPAIGN TYPES
// ============================================

export interface Campaign {
  id: string
  name: string
  description: string
  budget: number
  spent: number
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED'
  properties: string[]
  startDate: Date
  endDate: Date
  clicks: number
  impressions: number
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
  error?: string
  timestamp: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

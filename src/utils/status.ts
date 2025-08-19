export const STATUSES = {
  PENDING: 'pendiente',
  IN_PROGRESS: 'en_progreso',
  DONE: 'completada',
} as const

export type Status = typeof STATUSES[keyof typeof STATUSES]

export const STATUS_LABEL: Record<Status, string> = {
  [STATUSES.PENDING]: 'Pendiente',
  [STATUSES.IN_PROGRESS]: 'En progreso',
  [STATUSES.DONE]: 'Completada',
}

export const ALL_STATUSES: Status[] = [STATUSES.PENDING, STATUSES.IN_PROGRESS, STATUSES.DONE]

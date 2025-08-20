export const STATUSES = {
  PENDING: 'pendiente',
  IN_PROGRESS: 'en_progreso',
  DONE: 'completada',
}

export const STATUS_LABEL = {
  [STATUSES.PENDING]: 'Pendiente',
  [STATUSES.IN_PROGRESS]: 'En progreso',
  [STATUSES.DONE]: 'Completada',
}

export const ALL_STATUSES = [STATUSES.PENDING, STATUSES.IN_PROGRESS, STATUSES.DONE]

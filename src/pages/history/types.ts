export const STATUS_COLOR = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500'
} as const

export interface TStatusProps {
  statusColor: keyof typeof STATUS_COLOR
}

import { format } from 'd3'

export const DEFAULT_ZOOM_RANGE = [new Date('2013-01-01'), new Date('2030-01-01')]

export const COLORS = {
  PNNL: '#358D53',
  IPCC: '#FACB3D'
}

export function yFormatter (isPrecise) {
  const formatter = format(isPrecise ? '.1%' : '.0%')
  return val => formatter(val / 100)
}

export const yValueFormatter = yFormatter(true)

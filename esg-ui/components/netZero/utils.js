import { format } from 'd3'

export const COLORS = {
  PNNL: '#358D53',
  IPCC: '#FACB3D'
}

export function yFormatter (isPrecise) {
  const formatter = format(isPrecise ? '.1%' : '.0%')
  return val => formatter(val / 100)
}

export const yValueFormatter = yFormatter(true)
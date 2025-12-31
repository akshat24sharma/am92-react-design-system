export type DsRadiusKeys =
  | 'zero'
  | 'deepFreeze'
  | 'quickFreeze'
  | 'icy'
  | 'glacial'
  | 'frostbite'
  | 'bitterCold'
  | 'cool'
  | 'mild'
  | 'pleasant'

export type DsRadius = { [key in DsRadiusKeys]: string }

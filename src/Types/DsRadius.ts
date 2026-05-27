export type DsRadiusKeys =
  | 'zero'
  | 'deepFreeze'
  | 'quickFreeze'
  | 'gelid'
  | 'glacial'
  | 'frostbite'
  | 'bitterCold'
  | 'cool'
  | 'mild'
  | 'pleasant'

export type DsRadius = { [key in DsRadiusKeys]: string }

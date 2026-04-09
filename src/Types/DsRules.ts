export type DsRulesKeys =
  | 'headerMobileHeight'
  | 'headerDesktopHeight'
  | 'appBarMobileMinHeight'
  | 'stepperConnectorMinHeight'
  | 'searchbarMinWidth'
  | 'searchbarHeight'
  | 'drawerWidth'
  | 'drawerMiniWidth'
  | 'dialogMdMaxWidth'
  | 'bottomSheetWorkingAreaHeight'
  | 'avatarSSize'
  | 'avatarMSize'
  | 'avatarLSize'
  | 'avatarXLSize'
  | 'avatarXXLSize'
  | 'avatar3XLSize'
  | 'formHelperTextMinHeight'
  | 'buttonLargeLoaderWidth'
  | 'buttonMediumLoaderWidth'
  | 'buttonSmallLoaderWidth'
  | "dataGridSSize"
  | "dataGridMSize"
  | "dataGridLSize"

export type DsRules = { [key in DsRulesKeys]: string }

export const HOME_IMAGE = [
  {
    src: new URL('~/src/AssetFiles/home.png?as=avif', import.meta.url).href,
    alt: 'Home Image',
    as: 'image/avif'
  },
  {
    src: new URL('~/src/AssetFiles/home.png?as=webp', import.meta.url).href,
    alt: 'Home Image',
    as: 'image/webp'
  },
  {
    src: new URL('~/src/AssetFiles/home.png', import.meta.url).href,
    alt: 'Home Image',
    as: 'image/png'
  }
]
export const CONFIRM_CLOSE = [
  {
    src: new URL('~/src/AssetFiles/illustration.svg', import.meta.url).href,
    alt: 'Cancel Trancation',
    as: 'image/svg'
  }
]

// success-tick.svg
export const SUCCESS = [
  {
    src: new URL('~/src/AssetFiles/success-tick.svg', import.meta.url).href,
    alt: 'success ',
    as: 'image/svg'
  }
]

// bank.png
export const BANK_LOGO = [
  {
    src: new URL('~/src/AssetFiles/bank.svg', import.meta.url).href,
    alt: 'bank logo ',
    as: 'image/svg'
  }
]

export const OTP_EXHAUST = [
  {
    src: new URL('~/src/AssetFiles/otp-exhaust.svg', import.meta.url).href,
    alt: 'bank logo ',
    as: 'image/svg'
  }
]

export const SOMETHING_WENT_WRONG = [
  //
  {
    src: new URL('~/src/AssetFiles/somethingWentWrong.svg', import.meta.url)
      .href,
    // src: new URL('~/src/AssetFiles/ajax-loadeasdfasr.gif', import.meta.url).href,
    alt: 'something went wrong',
    as: 'image/gif'
  }
]

// import { DEFAULT_STATUS_MAP } from './StatusMapper'

// export class OtpError<TCode extends keyof typeof DEFAULT_STATUS_MAP> {
//   code: TCode
//   status: (typeof DEFAULT_STATUS_MAP)[TCode]

//   constructor(
//     code: TCode,
//     overrides?: Partial<(typeof DEFAULT_STATUS_MAP)[TCode]>
//   ) {
//     this.code = code

//     const defaultStatus = DEFAULT_STATUS_MAP[code]

//     if (!defaultStatus) {
//       throw new Error(`No OTP Error found for the code ${code}`)
//     }

//     this.status = {
//       ...defaultStatus,
//       ...overrides
//     }
//   }
// }
import type { StatusDetailType } from './DsOtpVerification.Types'
import { DEFAULT_STATUS_MAP } from './StatusMapper'

// Helper type: for a given code, pick the right type of StatusDetailType
type StatusForCode<TCode extends keyof typeof DEFAULT_STATUS_MAP> = Extract<
  StatusDetailType,
  { type: (typeof DEFAULT_STATUS_MAP)[TCode]['type'] }
>

export class OtpError<TCode extends keyof typeof DEFAULT_STATUS_MAP> {
  code: TCode
  status: StatusForCode<TCode>

  constructor(code: TCode, overrides?: Partial<StatusForCode<TCode>>) {
    this.code = code

    const defaultStatus = DEFAULT_STATUS_MAP[code]

    if (!defaultStatus) {
      throw new Error(`No OTP Error found for the code ${code}`)
    }

    // Merge and cast to the proper subtype
    this.status = {
      ...defaultStatus,
      ...overrides
    } as StatusForCode<TCode>
  }
}

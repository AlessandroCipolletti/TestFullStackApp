export const getObjectKeys = <T extends object>(obj: T): Array<keyof T> => {
  return Object.keys(obj) as Array<keyof T>
}

export type Nullable<T> = { [P in keyof T]: T[P] | null }

export type Optional<T> = { [P in keyof T]: T[P] | undefined }

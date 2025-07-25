// TODO: DirData should be part of PageData
export type ContentPageContext = {
  pathname: string
  pageData?: PageData
  siteData?: Frontmatter
  dirData?: DirData
  courseData?: CourseData[]
}

export type DirData = {
  path: string
  attrs?: Frontmatter
  dir?: DirData[]
  next?: Navlink
  prev?: Navlink
}

export type ParentData = {
  path: string
  name: string
}

export type PageData = {
  path: string
  attrs: Frontmatter
  md: string
  html: string
  dir?: DirData[]
  crumbs: ParentData[]
}

export type ClassesData = {
  name: string
  href: string
  groups: GroupData[]
}

export type GroupData = {
  name: string
  href: string
}

export interface Frontmatter {
  draft?: boolean
  layout?: string
  title?: string
  description?: string
  siteurl?: string // e.g. https://jldec.me
  icon?: string
  navlinks?: Navlink[] // main menu
  sociallinks?: Navlink[] // main menu
  actionlinks?: Navlink[] // contact sales, etc.
  features?: Navlink[]
  twitter?: string // e.g. jldec - for meta tags
  error?: unknown
  sortby?: string
  sortreverse?: boolean
  date?: string
  image?: string
  splashimage?: string
  splash?: Splash
  favicon?: string
  name?: string
  pathname?: string
  classes?: ClassesData[]
  footer?: Footer
  dirDepth?: number
  'meta-description'?: string
  [key: string]: unknown
}

export interface Footer {
  links: Navlink[]
  social?: Navlink[]
  terms?: Navlink[]
}

export interface Navlink {
  href: string
  text: string
  icon?: string
  image?: string
  details?: string
}

export interface Splash {
  image?: string
  title?: string
  subtitle?: string
}

export interface Redirect {
  redirect: string
  status?: number
}

export interface CourseData {
  page: string
  courseid: string
  price: string
  name: string
  groupname: string
  categoryname: string
  vendorname: string
  locationprice?: string
  duration?: string
  sched?: {
    l: string
    s: {
      d: string
      k?: string
    }[]
  }[]
}

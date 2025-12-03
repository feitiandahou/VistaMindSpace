export interface Website {
  id: number
  title: string
  url: string
  slogan: string
  description: string
  category1: string
  category2?: string
  category3?: string
  icon?: string
  tags?: string[]
  clickCount?: number
  collectionCount?: number
  createdAt?: Date
  updatedAt?: Date
}

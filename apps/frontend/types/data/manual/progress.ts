import type { ProgressDataType } from '@/enums'


export interface ManualDataProgressCategory {
    minimumLevel?: number
    name: string
    slug: string
    requiredQuestIds: number[]
    groups: ManualDataProgressGroup[]
}

export interface ManualDataProgressGroup {
    icon: string
    iconText?: string
    lookup: string
    minimumLevel?: number
    name: string
    requiredQuestIds?: number[]
    type: string
    data: Record<string, ManualDataProgressData[]>
}

export interface ManualDataProgressData {
    ids: number[]
    description?: string
    name: string
    required?: boolean
    type: ProgressDataType
    value?: number
}

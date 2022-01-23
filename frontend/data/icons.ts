import type { IconifyIcon } from '@iconify/types'

import mdiCheck from '@iconify/icons-mdi/check'
import mdiClose from '@iconify/icons-mdi/close'
import mdiLockOutline from '@iconify/icons-mdi/lock-outline'
import mdiQuestion from '@iconify/icons-mdi/help-circle-outline'

import notoBackpack from '@iconify/icons-noto/backpack'
import notoBank from '@iconify/icons-noto/bank'
import notoDogFace from '@iconify/icons-noto/dog-face'
import notoFamilyWomanWomanGirlBoy from '@iconify/icons-noto/family-woman-woman-girl-boy'

import { Constants } from '@/data/constants'
import { ItemLocation } from '@/types/enums'


export const iconStrings: Record<string, IconifyIcon> = {
    lock: mdiLockOutline,
    no: mdiClose,
    question: mdiQuestion,
    yes: mdiCheck,
}

export const locationIcons: Record<number, IconifyIcon> = {
    [ItemLocation.Bags]: notoBackpack,
    [ItemLocation.Bank]: notoBank,
    [ItemLocation.GuildBank]: notoFamilyWomanWomanGirlBoy,
    [ItemLocation.PetCollection]: notoDogFace,
}

export const imageStrings: Record<string, string> = {
    alliance: Constants.icons.alliance,
    horde: Constants.icons.horde,

    alchemy: 'spell/2259',
    blacksmithing: 'spell/2018',
    cooking: 'spell/2550',
    enchanting: 'spell/7411',
    engineering: 'spell/4036',
    fishing: 'spell/7620',
    herbalism: 'spell/2366',
    inscription: 'spell/45357',
    jewelcrafting: 'spell/25229',
    leatherworking: 'spell/2108',
    mining: 'spell/2575',
    skinning: 'spell/8617',
    tailoring: 'spell/3908',
}

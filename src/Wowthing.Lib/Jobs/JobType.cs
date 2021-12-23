﻿namespace Wowthing.Lib.Jobs
{
    public enum JobType
    {
        UserCharacters = 0,

        Character = 100,
        CharacterAchievements,
        CharacterEquipment,
        CharacterMounts,
        CharacterMythicKeystoneProfile,
        CharacterMythicKeystoneProfileSeason,
        CharacterPets,
        CharacterProfessions,
        CharacterQuestsCompleted,
        CharacterReputations,
        CharacterSoulbinds,
        CharacterMedia,
      
        DataPlayableClass = 200,
        DataReputationFaction,
        DataReputationTiers,
        DataTitle,

        // Non-Blizzard jobs
        CharacterRaiderIo = 500,

        // Internal jobs
        UserUpload = 900,

        // Scheduled jobs
        CacheStatic = 1000,
        DataMythicKeystonePeriod,
        DataMythicKeystonePeriodIndex,
        DataMythicKeystoneSeasonIndex,
        DataPlayableRaceIndex,
        DataPlayableClassIndex,
        DataRaiderIoScoreTiers,
        DataRealmIndex,
        DataReputationFactionIndex,
        DataReputationTiersIndex,
        DataTitleIndex,
        CacheTransmog,
        //CacheZoneMaps,
        ImportDumps = 1013,
        CacheJournal,
    }
}

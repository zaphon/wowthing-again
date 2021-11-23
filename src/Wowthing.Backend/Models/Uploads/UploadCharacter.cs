﻿using System.Collections.Generic;

namespace Wowthing.Backend.Models.Uploads
{
    public class UploadCharacter
    {
        public bool IsResting { get; set; }
        public bool IsWarMode { get; set; }
        public int ChromieTime { get; set; }
        public int FlightSpeed { get; set; }
        public int GroundSpeed { get; set; }
        public int KeystoneInstance { get; set; }
        public int KeystoneLevel { get; set; }
        public int LastSeen { get; set; }
        public int MountSkill { get; set; }
        public int PlayedTotal { get; set; }
        public int RestedXp { get; set; }
        public long Copper { get; set; }

        public List<UploadCharacterCovenant> Covenants { get; set; }
        public Dictionary<short, string> Currencies { get; set; }
        public List<int> DailyQuests { get; set; }
        public Dictionary<string, Dictionary<string, string>> Items { get; set; }
        public List<UploadCharacterLockout> Lockouts { get; set; }
        public List<int> Mounts { get; set; }
        public UploadCharacterMythicDungeon[] MythicDungeons { get; set; }
        public UploadCharacterMythicPlus MythicPlus { get; set; }
        public Dictionary<int, string> Paragons { get; set; }
        public Dictionary<int, int> Reputations { get; set; }
        public Dictionary<string, int> ScanTimes { get; set; }
        public List<UploadCharacterTorghast> Torghast { get; set; }
        public string Transmog { get; set; }
        public UploadCharacterVault[][] Vault { get; set; }
        public Dictionary<string, UploadWeeklyUghQuest> WeeklyUghQuests { get; set; }
    }

    public class UploadCharacterCovenant
    {
        public int Anima { get; set; }
        public int Id { get; set; }
        public int Renown { get; set; }
        public int Souls { get; set; }
        public UploadCharacterCovenantFeature Conductor { get; set; }
        public UploadCharacterCovenantFeature Missions { get; set; }
        public UploadCharacterCovenantFeature Transport { get; set; }
        public UploadCharacterCovenantFeature Unique { get; set; }
    }

    public class UploadCharacterCovenantFeature
    {
        public int Rank { get; set; }
        public int? ResearchEnds { get; set; }
        public string Name { get; set; }
    }
    
    public class UploadCharacterLockout
    {
        public bool Locked { get; set; }
        public int DefeatedBosses { get; set; }
        public int Difficulty { get; set; }
        public int Id { get; set; }
        public int MaxBosses { get; set; }
        public int ResetTime { get; set; }
        public string Name { get; set; }
        public List<string> Bosses { get; set; }
    }

    public class UploadCharacterMythicDungeon
    {
        public int Level { get; set; }
        public int Map { get; set; }
    }

    public class UploadCharacterMythicPlus
    {
        public int Season { get; set; }
        public List<UploadCharacterMythicPlusMap> Maps { get; set; }
    }

    public class UploadCharacterMythicPlusMap
    {
        public List<UploadCharacterMythicPlusMapScore> AffixScores { get; set; }
        public int MapId { get; set; }
        public int OverallScore { get; set; }
    }

    public class UploadCharacterMythicPlusMapScore
    {
        public bool OverTime { get; set; }
        public int DurationSec { get; set; }
        public int Level { get; set; }
        public int Score { get; set; }
        public string Name { get; set; }
    }

    public class UploadCharacterTorghast
    {
        public int Level { get; set; }
        public string Name { get; set; }
    }
}
